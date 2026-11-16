"use client";

import Link from "next/link";
import { PageHeader } from "@/components/project/PageHeader";
import { EmptyCasesPanel } from "@/components/project/EmptyCasesPanel";
import { ChangeFlag } from "@/components/ui/ChangeFlag";
import { Chip } from "@/components/ui/Chip";
import { GradeTag } from "@/components/ui/GradeTag";
import { MonoBlock } from "@/components/ui/MonoBlock";
import { StatCard } from "@/components/ui/StatCard";
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

  const shipCall =
    stats.regressed === 0
      ? "Candidate B clears the bar on regressions."
      : `Hold B until ${stats.regressed} regression case${stats.regressed === 1 ? "" : "s"} ${stats.regressed === 1 ? "is" : "are"} addressed.`;

  return (
    <div className="min-h-full bg-bg">
      <PageHeader
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${project.id}/compare` },
          { label: "Report" },
        ]}
        title="Results & regressions"
        meta={`${project.name} · ${project.lastRunLabel}`}
        badge="Sample data"
        actions={
          <Link
            href={`/projects/${project.id}/compare`}
            className="text-body-small font-semibold text-text underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-gp-xs"
          >
            Back to compare
          </Link>
        }
      />

      <div className="grid gap-gp-lg p-gp-2xl lg:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Prompt A pass rate"
          value={`${Math.round((passA / total) * 100)}%`}
          detail={`${passA}/${total} · ${project.promptA.version}`}
        />
        <StatCard
          label="Prompt B pass rate"
          value={`${Math.round((passB / total) * 100)}%`}
          detail={`${passB}/${total} · ${project.promptB.version}`}
        />
        <StatCard
          label="Improved"
          value={String(stats.improved)}
          detail="Fail in A → pass in B"
        />
        <StatCard
          label="Regressed"
          value={String(stats.regressed)}
          detail="Pass in A → fail in B"
        />
      </div>

      <section className="border-t border-border px-gp-2xl py-gp-xl" aria-labelledby="ship-call">
        <h2 id="ship-call" className="text-h2">
          Ship call
        </h2>
        <p className="mt-gp-sm max-w-2xl text-body-small text-text">
          {shipCall} Unchanged pass: {stats.unchanged} cases. This is a demo
          suggestion — adjust grades in{" "}
          <Link
            href={`/projects/${project.id}/compare`}
            className="font-semibold underline-offset-2 hover:underline"
          >
            Compare
          </Link>{" "}
          to update.
        </p>
      </section>

      <div className="overflow-x-auto px-gp-2xl pb-gp-2xl">
        <table className="w-full min-w-[72rem] border-collapse text-left text-body-small">
          <caption className="sr-only">Per-case results</caption>
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
              <th scope="col" className="w-32 px-gp-md py-gp-sm">
                Grades
              </th>
              <th scope="col" className="w-36 px-gp-md py-gp-sm">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {project.cases.map((c, index) => {
              const flag = caseChangeFlag(c.gradeA, c.gradeB);
              return (
                <tr key={c.id} className="border-b border-border align-top">
                  <td className="px-gp-md py-gp-md text-mono-small text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-gp-md py-gp-md">
                    <p className="font-semibold text-text">{c.input}</p>
                    <p className="mt-gp-2xs text-note text-text-muted">
                      {c.passRule}
                    </p>
                  </td>
                  <td className="px-gp-md py-gp-md">
                    <MonoBlock>{c.outputA}</MonoBlock>
                    {c.noteA ? (
                      <p className="mt-gp-2xs text-body-small text-text-muted">
                        {c.noteA}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-gp-md py-gp-md">
                    <MonoBlock>{c.outputB}</MonoBlock>
                    {c.noteB ? (
                      <p className="mt-gp-2xs text-body-small text-text-muted">
                        {c.noteB}
                      </p>
                    ) : null}
                  </td>
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
                    ) : flag === "unchanged" ? (
                      <Chip>unchanged</Chip>
                    ) : (
                      <Chip>pending</Chip>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}