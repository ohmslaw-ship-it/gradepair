"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/project/PageHeader";
import { EmptyCasesPanel } from "@/components/project/EmptyCasesPanel";
import { Button } from "@/components/ui/Button";
import { ChangeFlag } from "@/components/ui/ChangeFlag";
import { Chip } from "@/components/ui/Chip";
import { GradeTag } from "@/components/ui/GradeTag";
import { MonoBlock } from "@/components/ui/MonoBlock";
import { StatCard } from "@/components/ui/StatCard";
import { fieldClass } from "@/lib/form-styles";
import { caseChangeFlag, passCount, summarizeCases } from "@/lib/metrics";
import type { CaseGrade, Project } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useGradepairStore } from "@/store/gradepair-store";

type Filter = "all" | "regressed" | "improved" | "unchanged";

export function CompareView({ project }: { project: Project }) {
  const setGrade = useGradepairStore((s) => s.setGrade);
  const updateCase = useGradepairStore((s) => s.updateCase);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [focusId, setFocusId] = useState<string | null>(
    project.cases[0]?.id ?? null,
  );

  const stats = useMemo(() => summarizeCases(project.cases), [project.cases]);
  const passA = passCount(project.cases, "A");
  const passB = passCount(project.cases, "B");
  const total = project.cases.length;

  const filtered = useMemo(() => {
    return project.cases.filter((c) => {
      const flag = caseChangeFlag(c.gradeA, c.gradeB);
      if (filter !== "all" && flag !== filter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          c.input.toLowerCase().includes(q) ||
          c.outputA.toLowerCase().includes(q) ||
          c.outputB.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [project.cases, filter, search]);

  const focusIndex = filtered.findIndex((c) => c.id === focusId);

  const moveFocus = useCallback(
    (delta: number) => {
      if (filtered.length === 0) return;
      const next =
        focusIndex < 0
          ? 0
          : (focusIndex + delta + filtered.length) % filtered.length;
      setFocusId(filtered[next].id);
    },
    [filtered, focusIndex],
  );

  const gradeFocused = useCallback(
    (side: "A" | "B", grade: CaseGrade) => {
      if (!focusId) return;
      setGrade(project.id, focusId, side, grade);
    },
    [focusId, project.id, setGrade],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        moveFocus(1);
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        moveFocus(-1);
      } else if (e.key === "1") {
        gradeFocused("A", "pass");
      } else if (e.key === "2") {
        gradeFocused("A", "fail");
      } else if (e.key === "3") {
        gradeFocused("B", "pass");
      } else if (e.key === "4") {
        gradeFocused("B", "fail");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gradeFocused, moveFocus]);

  if (project.cases.length === 0) {
    return (
      <div className="min-h-full bg-bg">
        <PageHeader
          breadcrumbs={[
            { label: "Projects", href: "/projects" },
            { label: project.name },
            { label: "Compare" },
          ]}
          title={project.name}
        />
        <EmptyCasesPanel projectId={project.id} />
      </div>
    );
  }

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: total },
    { key: "regressed", label: "Regressions", count: stats.regressed },
    { key: "improved", label: "Improved", count: stats.improved },
    { key: "unchanged", label: "Unchanged", count: stats.unchanged },
  ];

  return (
    <div className="min-h-full bg-bg">
      <PageHeader
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name },
          { label: "Compare" },
        ]}
        title={project.name}
        meta={`${total} cases · Prompt ${project.promptA.version} vs ${project.promptB.version} · ${project.model} · ${project.lastRunLabel}`}
        badge="Sample data"
        actions={
          <>
            <Link href={`/projects/${project.id}/prompts`}>
              <Button variant="secondary">Edit prompts</Button>
            </Link>
            <Button disabled title="Live runs coming in a later stage">
              Run comparison
            </Button>
          </>
        }
      />

      <div className="grid gap-gp-lg border-b border-border px-gp-2xl py-gp-xl lg:grid-cols-[1fr_minmax(16rem,22rem)]">
        <div className="grid gap-gp-md sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Prompt A passes"
            value={`${passA}/${total}`}
            detail={`${total ? Math.round((passA / total) * 100) : 0}% · ${project.promptA.version}`}
          />
          <StatCard
            label="Prompt B passes"
            value={`${passB}/${total}`}
            detail={`${total ? Math.round((passB / total) * 100) : 0}% · ${project.promptB.version}`}
          />
          <StatCard label="Improved" value={String(stats.improved)} />
          <StatCard label="Regressions" value={String(stats.regressed)} />
        </div>
        <aside className="rounded-gp-lg border border-border bg-accent-subtle p-gp-lg text-body-small">
          <p className="text-label text-text-muted">Suggested call</p>
          <p className="mt-gp-sm font-semibold text-text">
            {stats.regressed === 0
              ? "Ship B when you're comfortable with spot-checks."
              : `Ship B after fixing ${stats.regressed} regression${stats.regressed === 1 ? "" : "s"}.`}
          </p>
          <p className="mt-gp-sm text-text-muted">
            Your call — suggestion only, not a gate.
          </p>
        </aside>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-gp-md border-b border-border px-gp-2xl py-gp-md">
        <div className="flex flex-wrap gap-gp-sm" role="tablist" aria-label="Filter cases">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              className={cn(
                "rounded-gp-md px-gp-md py-gp-xs text-body-small",
                filter === f.key
                  ? "bg-surface-hover font-semibold text-text"
                  : "text-text-muted hover:bg-surface-hover",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
              )}
              onClick={() => setFilter(f.key)}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
        <label className="flex min-w-[12rem] flex-1 items-center gap-gp-sm sm:max-w-xs">
          <span className="sr-only">Search cases</span>
          <input
            className={fieldClass}
            placeholder="Search cases"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <p className="text-body-small text-text-muted">
          Shortcuts: j/k navigate · 1/2 grade A pass/fail · 3/4 grade B
        </p>
      </div>

      <div className="flex flex-col gap-gp-lg p-gp-2xl">
        {filtered.map((c, index) => {
          const flag = caseChangeFlag(c.gradeA, c.gradeB);
          const focused = c.id === focusId;
          return (
            <article
              key={c.id}
              id={`case-${c.id}`}
              tabIndex={focused ? 0 : -1}
              className={cn(
                "rounded-gp-lg border bg-surface p-gp-lg outline-none",
                focused ? "border-border-strong ring-2 ring-focus" : "border-border",
              )}
              onFocus={() => setFocusId(c.id)}
            >
              <header className="flex flex-wrap items-center gap-gp-sm border-b border-border pb-gp-md">
                <span className="text-mono-small text-text-muted">
                  #{String(index + 1).padStart(2, "0")}
                </span>
                {flag === "improved" ? (
                  <ChangeFlag kind="improved" />
                ) : flag === "regressed" ? (
                  <ChangeFlag kind="regressed" />
                ) : null}
                {c.tags?.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </header>
              <div className="mt-gp-md grid gap-gp-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]">
                <section>
                  <h3 className="text-label text-text-muted">Case · input & pass rule</h3>
                  <p className="mt-gp-sm text-body-small text-text">{c.input}</p>
                  <p className="mt-gp-sm text-note text-text-muted">
                    Pass if: {c.passRule}
                  </p>
                </section>
                <section>
                  <h3 className="text-label text-text-muted">
                    Prompt A · {project.promptA.version}
                  </h3>
                  <MonoBlock className="mt-gp-sm">{c.outputA}</MonoBlock>
                  <div className="mt-gp-sm flex flex-wrap items-center gap-gp-sm">
                    <GradeTag grade={c.gradeA} />
                    <button
                      type="button"
                      className="text-body-small text-text-muted underline-offset-2 hover:underline"
                      onClick={() => setGrade(project.id, c.id, "A", "pass")}
                    >
                      Mark pass
                    </button>
                    <button
                      type="button"
                      className="text-body-small text-text-muted underline-offset-2 hover:underline"
                      onClick={() => setGrade(project.id, c.id, "A", "fail")}
                    >
                      Mark fail
                    </button>
                  </div>
                  <label className="mt-gp-sm block text-body-small text-text-muted">
                    Note
                  </label>
                  <input
                    className={fieldClass}
                    value={c.noteA}
                    onChange={(e) =>
                      updateCase(project.id, c.id, { noteA: e.target.value })
                    }
                    aria-label={`Note for prompt A, case ${index + 1}`}
                  />
                </section>
                <section>
                  <h3 className="text-label text-text-muted">
                    Prompt B · {project.promptB.version}
                  </h3>
                  <MonoBlock className="mt-gp-sm">{c.outputB}</MonoBlock>
                  <div className="mt-gp-sm flex flex-wrap items-center gap-gp-sm">
                    <GradeTag grade={c.gradeB} />
                    <button
                      type="button"
                      className="text-body-small text-text-muted underline-offset-2 hover:underline"
                      onClick={() => setGrade(project.id, c.id, "B", "pass")}
                    >
                      Mark pass
                    </button>
                    <button
                      type="button"
                      className="text-body-small text-text-muted underline-offset-2 hover:underline"
                      onClick={() => setGrade(project.id, c.id, "B", "fail")}
                    >
                      Mark fail
                    </button>
                  </div>
                  <label className="mt-gp-sm block text-body-small text-text-muted">
                    Note
                  </label>
                  <input
                    className={fieldClass}
                    value={c.noteB}
                    onChange={(e) =>
                      updateCase(project.id, c.id, { noteB: e.target.value })
                    }
                    aria-label={`Note for prompt B, case ${index + 1}`}
                  />
                </section>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}