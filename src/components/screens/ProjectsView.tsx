"use client";

import Link from "next/link";
import { PageHeader } from "@/components/project/PageHeader";
import { Chip } from "@/components/ui/Chip";
import { passCount, summarizeCases } from "@/lib/metrics";
import { useGradepairStore } from "@/store/gradepair-store";

export function ProjectsView() {
  const projects = useGradepairStore((s) => s.projects);

  return (
    <div className="min-h-full bg-bg">
      <PageHeader
        breadcrumbs={[{ label: "Projects" }]}
        title="Projects"
        meta="Unit tests for your AI features — pick a project to review prompt A vs B."
        badge="Sample data"
      />
      <ul className="grid gap-gp-lg p-gp-2xl lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => {
          const caseCount = p.cases.length;
          const passB = passCount(p.cases, "B");
          const { regressed, improved } = summarizeCases(p.cases);
          return (
            <li key={p.id}>
              <Link
                href={
                  caseCount === 0
                    ? `/projects/${p.id}/cases`
                    : `/projects/${p.id}/compare`
                }
                className="block h-full rounded-gp-lg border border-border bg-surface p-gp-xl transition-colors hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <h2 className="text-h2">{p.name}</h2>
                <p className="mt-gp-sm text-body-small text-text-muted line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-gp-lg flex flex-wrap gap-gp-sm">
                  {caseCount === 0 ? (
                    <Chip>No cases yet</Chip>
                  ) : p.hideCounts ? null : (
                    <>
                      <Chip>
                        {passB}/{caseCount} pass (B)
                      </Chip>
                      <Chip>
                        {improved} improved · {regressed} regressed
                      </Chip>
                    </>
                  )}
                  <Chip>{p.model}</Chip>
                </div>
                <p className="mt-gp-md text-body-small text-text-muted">
                  Prompt {p.promptA.version} vs {p.promptB.version}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}