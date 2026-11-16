"use client";

import Link from "next/link";
import { PageHeader } from "@/components/project/PageHeader";
import { passCount, summarizeCases } from "@/lib/metrics";
import { useGradepairStore } from "@/store/gradepair-store";

function PassRateBar({ pass, total }: { pass: number; total: number }) {
  const pct = total > 0 ? pass / total : 0;
  return (
    <div className="mt-gp-2xs h-0.5 w-full max-w-[8rem] bg-border">
      <div
        className="h-full bg-accent"
        style={{ width: `${Math.round(pct * 100)}%` }}
        role="progressbar"
        aria-valuenow={Math.round(pct * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Prompt B pass rate ${Math.round(pct * 100)} percent`}
      />
    </div>
  );
}

export function ProjectsView() {
  const projects = useGradepairStore((s) => s.projects);

  return (
    <div className="min-h-full bg-bg">
      <PageHeader
        breadcrumbs={[{ label: "Projects" }]}
        title="Projects"
        meta="Measurement sets for prompt A vs B — sample data in demo mode."
        badge="Sample"
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[56rem] border-collapse text-left">
          <caption className="sr-only">Projects</caption>
          <thead>
            <tr className="border-b border-border text-label text-text-muted">
              <th scope="col" className="px-gp-2xl py-gp-sm text-left">
                Project
              </th>
              <th scope="col" className="px-gp-md py-gp-sm">
                Cases
              </th>
              <th scope="col" className="px-gp-md py-gp-sm">
                Last run
              </th>
              <th scope="col" className="min-w-[10rem] px-gp-md py-gp-sm">
                Pass B
              </th>
              <th scope="col" className="px-gp-md py-gp-sm">
                Δ
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => {
              const total = p.cases.length;
              const passB = passCount(p.cases, "B");
              const passA = passCount(p.cases, "A");
              const { regressed, improved } = summarizeCases(p.cases);
              const href =
                total === 0
                  ? `/projects/${p.id}/cases`
                  : `/projects/${p.id}/compare`;
              return (
                <tr key={p.id} className="border-b border-border">
                  <td className="px-gp-2xl py-gp-md">
                    <Link
                      href={href}
                      className="font-medium text-text hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {p.name}
                    </Link>
                    <p className="mt-gp-2xs max-w-md text-body-small text-text-muted">
                      {p.description}
                    </p>
                  </td>
                  <td className="px-gp-md py-gp-md text-mono tabular-nums">
                    {p.hideCounts && total === 0 ? "—" : total}
                  </td>
                  <td className="px-gp-md py-gp-md text-mono-small text-text-muted">
                    {p.lastRunLabel}
                  </td>
                  <td className="px-gp-md py-gp-md">
                    {total > 0 && !p.hideCounts ? (
                      <>
                        <span className="text-mono tabular-nums">
                          {passB}/{total}
                        </span>
                        <PassRateBar pass={passB} total={total} />
                      </>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-gp-md py-gp-md text-mono-small text-text-muted tabular-nums">
                    {total > 0 && !p.hideCounts
                      ? `${improved}↑ ${regressed}↓ · A ${passA}/${total}`
                      : "—"}
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