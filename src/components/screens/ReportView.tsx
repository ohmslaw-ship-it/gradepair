"use client";

import Link from "next/link";
import { PageHeader } from "@/components/project/PageHeader";
import { EmptyCasesPanel } from "@/components/project/EmptyCasesPanel";
import { ChangeFlag } from "@/components/ui/ChangeFlag";
import { Chip } from "@/components/ui/Chip";
import { GradeTag } from "@/components/ui/GradeTag";
import { StatReadout } from "@/components/ui/StatReadout";
import { StatReadoutStrip } from "@/components/ui/StatReadoutStrip";
import { cn } from "@/lib/cn";
import { caseChangeFlag, passCount, summarizeCases } from "@/lib/metrics";
import type { Project } from "@/lib/types";

export function ReportView({ project }: { project: Project }) {
  const total = project.cases.length;
  const stats = summarizeCases(project.cases);
  const passA = passCount(project.cases, "A");
  const passB = passCount(project.cases, "B");

  if (total === 0) {
    return (
      <div className="min-h-full bg-bg">
        <PageHeader
          breadcrumbs={[
            { label: "Projects", href: "/projects" },
            { label: project.name },
            { label: "Report" },
          ]}
          title={project.name}
        />
        <EmptyCasesPanel projectId={project.id} />
      </div>
    );
  }

  const ship =
    stats.regressed === 0
      ? { verdict: "Ship B", tone: "text-pass" }
      : passB >= passA && stats.regressed <= 2
        ? { verdict: "Ship B with fixes", tone: "text-regression" }
        : { verdict: "Hold B", tone: "text-fail" };

  return (
    <div className="min-h-full bg-bg">
      <PageHeader
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${project.id}/compare` },
          { label: "Report" },
        ]}
        title="Results"
        meta={project.lastRunLabel}
        badge="Sample"
      />

      <section className="border-b border-border px-gp-2xl py-gp-2xl">
        <p className="text-label text-text-muted">Verdict</p>
        <p className={cn("mt-gp-md text-display tracking-tight", ship.tone)}>
          {ship.verdict}
        </p>
        <p className="mt-gp-lg max-w-2xl text-body-small text-text-muted">
          {stats.regressed === 0
            ? "No regressions in the sample set. Review improved cases before promoting prompt B."
            : `${stats.regressed} case${stats.regressed === 1 ? "" : "s"} regressed (pass A → fail B). Address these before ship.`}
        </p>
      </section>

      <StatReadoutStrip>
        <StatReadout
          label="Prompt A"
          value={`${passA}/${total}`}
          detail={`${Math.round((passA / total) * 100)}%`}
        />
        <StatReadout
          label="Prompt B"
          value={`${passB}/${total}`}
          detail={`${Math.round((passB / total) * 100)}%`}
        />
        <StatReadout label="Improved" value={String(stats.improved)} />
        <StatReadout label="Regressed" value={String(stats.regressed)} />
      </StatReadoutStrip>

      <div className="overflow-x-auto px-gp-2xl py-gp-xl">
        <table className="w-full min-w-[72rem] border-collapse text-left">
          <caption className="sr-only">Per-case report</caption>
          <thead>
            <tr className="border-b border-border text-label text-text-muted">
              <th scope="col" className="w-14 px-gp-md py-gp-sm">
                #
              </th>
              <th scope="col" className="min-w-[14rem] px-gp-md py-gp-sm">
                Case
              </th>
              <th scope="col" className="min-w-[18rem] px-gp-md py-gp-sm">
                Output A
              </th>
              <th scope="col" className="min-w-[18rem] px-gp-md py-gp-sm">
                Output B
              </th>
              <th scope="col" className="w-28 px-gp-md py-gp-sm">
                Grades
              </th>
              <th scope="col" className="w-28 px-gp-md py-gp-sm">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {project.cases.map((c, index) => {
              const flag = caseChangeFlag(c.gradeA, c.gradeB);
              return (
                <tr key={c.id} className="border-b border-border align-top">
                  <td className="px-gp-md py-gp-md text-mono-small tabular-nums text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-gp-md py-gp-md">
                    <p className="text-body-small font-medium">{c.input}</p>
                    <p className="mt-gp-2xs text-mono-small text-text-muted">
                      {c.passRule}
                    </p>
                  </td>
                  <td className="px-gp-md py-gp-md text-mono">{c.outputA}</td>
                  <td className="px-gp-md py-gp-md text-mono">{c.outputB}</td>
                  <td className="px-gp-md py-gp-md">
                    <div className="flex flex-col gap-gp-2xs">
                      <GradeTag grade={c.gradeA} />
                      <GradeTag grade={c.gradeB} />
                    </div>
                  </td>
                  <td className="px-gp-md py-gp-md">
                    {flag === "improved" ? (
                      <ChangeFlag kind="improved" />
                    ) : flag === "regressed" ? (
                      <ChangeFlag kind="regressed" />
                    ) : (
                      <Chip>unchanged</Chip>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-gp-lg text-mono-small text-text-muted">
          Adjust grades in{" "}
          <Link
            href={`/projects/${project.id}/compare`}
            className="text-accent hover:underline"
          >
            Compare
          </Link>
          .
        </p>
      </div>
    </div>
  );
}