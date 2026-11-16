"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PageHeader } from "@/components/project/PageHeader";
import { EmptyCasesPanel } from "@/components/project/EmptyCasesPanel";
import { Button } from "@/components/ui/Button";
import { ChangeFlag } from "@/components/ui/ChangeFlag";
import { GradeTag } from "@/components/ui/GradeTag";
import { StatReadout } from "@/components/ui/StatReadout";
import { StatReadoutStrip } from "@/components/ui/StatReadoutStrip";
import { fieldClass } from "@/lib/form-styles";
import { caseChangeFlag, passCount, summarizeCases } from "@/lib/metrics";
import type { CaseGrade, Project } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useGradepairStore } from "@/store/gradepair-store";

type Filter = "all" | "regressed" | "improved" | "unchanged";

export function CompareView({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const setGrade = useGradepairStore((s) => s.setGrade);
  const updateCase = useGradepairStore((s) => s.updateCase);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [focusId, setFocusId] = useState<string | null>(
    project.cases[0]?.id ?? null,
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      } else if (e.key === "Enter") {
        if (focusId) {
          setExpandedId((id) => (id === focusId ? null : focusId));
        }
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
  }, [focusId, gradeFocused, moveFocus]);

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
    { key: "regressed", label: "Regressed", count: stats.regressed },
    { key: "improved", label: "Improved", count: stats.improved },
    { key: "unchanged", label: "Unchanged", count: stats.unchanged },
  ];

  return (
    <div className="flex min-h-full flex-col bg-bg">
      <PageHeader
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name },
          { label: "Compare" },
        ]}
        title={project.name}
        meta={`${total} cases · ${project.promptA.version} vs ${project.promptB.version} · ${project.model} · ${project.lastRunLabel}`}
        badge="Sample"
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

      <StatReadoutStrip
        aside={
          <p className="text-mono-small text-text-muted">
            <span className="text-label text-text">Suggested</span>
            <span className="mt-gp-2xs block text-body-small text-text">
              {stats.regressed === 0
                ? "Ship B after spot-checks."
                : `Fix ${stats.regressed} regression${stats.regressed === 1 ? "" : "s"}, then ship B.`}
            </span>
          </p>
        }
      >
        <StatReadout
          label="Prompt A"
          value={`${passA}/${total}`}
          detail={`${total ? Math.round((passA / total) * 100) : 0}% · ${project.promptA.version}`}
        />
        <StatReadout
          label="Prompt B"
          value={`${passB}/${total}`}
          detail={`${total ? Math.round((passB / total) * 100) : 0}% · ${project.promptB.version}`}
        />
        <StatReadout label="Improved" value={String(stats.improved)} large={false} />
        <StatReadout label="Regressed" value={String(stats.regressed)} large={false} />
      </StatReadoutStrip>

      <div className="flex flex-wrap items-center gap-gp-md border-b border-border px-gp-2xl py-gp-sm">
        <div className="flex flex-wrap gap-gp-2xs" role="tablist" aria-label="Filter cases">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              className={cn(
                "rounded-gp-xs border px-gp-sm py-gp-3xs text-mono-small tabular-nums",
                filter === f.key
                  ? "border-accent bg-accent-subtle text-text"
                  : "border-transparent text-text-muted hover:border-border",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
              )}
              onClick={() => setFilter(f.key)}
            >
              {f.label} {f.count}
            </button>
          ))}
        </div>
        <label className="ml-auto flex min-w-[12rem] flex-1 items-center sm:max-w-xs">
          <span className="sr-only">Search cases</span>
          <input
            className={fieldClass}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full min-w-[72rem] border-collapse text-left">
          <caption className="sr-only">Comparison</caption>
          <thead className="sticky top-0 z-10 bg-bg">
            <tr className="border-b border-border text-label text-text-muted">
              <th scope="col" className="w-14 px-gp-md py-gp-sm">#</th>
              <th scope="col" className="min-w-[14rem] px-gp-md py-gp-sm">
                Input · rule
              </th>
              <th scope="col" className="min-w-[16rem] px-gp-md py-gp-sm">
                Output A
              </th>
              <th scope="col" className="w-24 px-gp-md py-gp-sm">Grade A</th>
              <th scope="col" className="min-w-[16rem] px-gp-md py-gp-sm">
                Output B
              </th>
              <th scope="col" className="w-24 px-gp-md py-gp-sm">Grade B</th>
              <th scope="col" className="w-28 px-gp-md py-gp-sm">Change</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, index) => {
              const flag = caseChangeFlag(c.gradeA, c.gradeB);
              const selected = c.id === focusId;
              const expanded = c.id === expandedId;
              return (
                <CompareRow
                  key={c.id}
                  index={index}
                  selected={selected}
                  expanded={expanded}
                  reduceMotion={reduceMotion ?? false}
                  caseId={c.id}
                  projectId={project.id}
                  input={c.input}
                  passRule={c.passRule}
                  outputA={c.outputA}
                  outputB={c.outputB}
                  noteA={c.noteA}
                  noteB={c.noteB}
                  gradeA={c.gradeA}
                  gradeB={c.gradeB}
                  flag={flag}
                  onSelect={() => setFocusId(c.id)}
                  onToggleExpand={() =>
                    setExpandedId((id) => (id === c.id ? null : c.id))
                  }
                  onGradeA={(g) => setGrade(project.id, c.id, "A", g)}
                  onGradeB={(g) => setGrade(project.id, c.id, "B", g)}
                  onNoteA={(n) => updateCase(project.id, c.id, { noteA: n })}
                  onNoteB={(n) => updateCase(project.id, c.id, { noteB: n })}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="mt-auto border-t border-border bg-surface px-gp-2xl py-gp-sm text-mono-small text-text-muted">
        j/k row · Enter notes · 1/2 grade A · 3/4 grade B
      </footer>
    </div>
  );
}

function CompareRow({
  index,
  selected,
  expanded,
  reduceMotion,
  input,
  passRule,
  outputA,
  outputB,
  noteA,
  noteB,
  gradeA,
  gradeB,
  flag,
  onSelect,
  onToggleExpand,
  onGradeA,
  onGradeB,
  onNoteA,
  onNoteB,
}: {
  index: number;
  selected: boolean;
  expanded: boolean;
  reduceMotion: boolean;
  caseId: string;
  projectId: string;
  input: string;
  passRule: string;
  outputA: string;
  outputB: string;
  noteA: string;
  noteB: string;
  gradeA: CaseGrade | null;
  gradeB: CaseGrade | null;
  flag: ReturnType<typeof caseChangeFlag>;
  onSelect: () => void;
  onToggleExpand: () => void;
  onGradeA: (g: CaseGrade) => void;
  onGradeB: (g: CaseGrade) => void;
  onNoteA: (n: string) => void;
  onNoteB: (n: string) => void;
}) {
  return (
    <>
      <tr
        className={cn(
          "border-b border-border align-top",
          selected && "bg-accent-subtle",
        )}
        onClick={onSelect}
      >
        <td className="relative px-gp-md py-gp-md">
          {selected ? (
            <span
              aria-hidden
              className="absolute bottom-0 left-0 top-0 w-0.5 bg-accent"
            />
          ) : null}
          <span className="text-mono-small text-text-muted tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </td>
        <td className="px-gp-md py-gp-md">
          <p className="text-body-small text-text">{input}</p>
          <p className="mt-gp-2xs text-mono-small text-text-muted">
            Pass if: {passRule}
          </p>
          <button
            type="button"
            className="mt-gp-sm text-mono-small text-accent hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
          >
            {expanded ? "Hide notes" : "Notes"}
          </button>
        </td>
        <td className="px-gp-md py-gp-md text-mono text-text">{outputA}</td>
        <td className="px-gp-md py-gp-md">
          <GradeTag grade={gradeA} />
          <div className="mt-gp-2xs flex gap-gp-2xs">
            <button
              type="button"
              className="text-mono-small text-text-muted hover:text-pass"
              onClick={(e) => {
                e.stopPropagation();
                onGradeA("pass");
              }}
            >
              1
            </button>
            <button
              type="button"
              className="text-mono-small text-text-muted hover:text-fail"
              onClick={(e) => {
                e.stopPropagation();
                onGradeA("fail");
              }}
            >
              2
            </button>
          </div>
        </td>
        <td className="px-gp-md py-gp-md text-mono text-text">{outputB}</td>
        <td className="px-gp-md py-gp-md">
          <GradeTag grade={gradeB} />
          <div className="mt-gp-2xs flex gap-gp-2xs">
            <button
              type="button"
              className="text-mono-small text-text-muted hover:text-pass"
              onClick={(e) => {
                e.stopPropagation();
                onGradeB("pass");
              }}
            >
              3
            </button>
            <button
              type="button"
              className="text-mono-small text-text-muted hover:text-fail"
              onClick={(e) => {
                e.stopPropagation();
                onGradeB("fail");
              }}
            >
              4
            </button>
          </div>
        </td>
        <td className="px-gp-md py-gp-md">
          {flag === "improved" ? (
            <ChangeFlag kind="improved" />
          ) : flag === "regressed" ? (
            <ChangeFlag kind="regressed" />
          ) : (
            <span className="text-mono-small text-text-muted">—</span>
          )}
        </td>
      </tr>
      <AnimatePresence initial={false}>
        {expanded ? (
          <tr className="border-b border-border bg-surface-recessed">
            <td colSpan={7} className="px-gp-2xl py-gp-md">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.14 }}
                className="grid gap-gp-md lg:grid-cols-2"
              >
                <label className="block text-label text-text-muted">
                  Note A
                  <input
                    className={cn(fieldClass, "mt-gp-2xs")}
                    value={noteA}
                    onChange={(e) => onNoteA(e.target.value)}
                  />
                </label>
                <label className="block text-label text-text-muted">
                  Note B
                  <input
                    className={cn(fieldClass, "mt-gp-2xs")}
                    value={noteB}
                    onChange={(e) => onNoteB(e.target.value)}
                  />
                </label>
              </motion.div>
            </td>
          </tr>
        ) : null}
      </AnimatePresence>
    </>
  );
}