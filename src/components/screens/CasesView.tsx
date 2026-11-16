"use client";

import { useCallback } from "react";
import { PageHeader } from "@/components/project/PageHeader";
import { EmptyCasesPanel } from "@/components/project/EmptyCasesPanel";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { fieldClass, textareaClass } from "@/lib/form-styles";
import type { Project } from "@/lib/types";
import { useGradepairStore } from "@/store/gradepair-store";

function CaseRow({
  projectId,
  index,
  caseId,
  input,
  passRule,
  tags,
}: {
  projectId: string;
  index: number;
  caseId: string;
  input: string;
  passRule: string;
  tags?: string[];
}) {
  const updateCase = useGradepairStore((s) => s.updateCase);
  const deleteCase = useGradepairStore((s) => s.deleteCase);

  return (
    <tr className="border-b border-border align-top">
      <th
        scope="row"
        className="w-12 px-gp-md py-gp-md text-left text-mono-small font-normal text-text-muted"
      >
        {String(index + 1).padStart(2, "0")}
      </th>
      <td className="min-w-[14rem] px-gp-md py-gp-md">
        <label className="sr-only" htmlFor={`input-${caseId}`}>
          Case {index + 1} input
        </label>
        <textarea
          id={`input-${caseId}`}
          className={textareaClass}
          rows={3}
          value={input}
          onChange={(e) =>
            updateCase(projectId, caseId, { input: e.target.value })
          }
        />
      </td>
      <td className="min-w-[14rem] px-gp-md py-gp-md">
        <label className="sr-only" htmlFor={`rule-${caseId}`}>
          Pass rule
        </label>
        <textarea
          id={`rule-${caseId}`}
          className={textareaClass}
          rows={3}
          value={passRule}
          onChange={(e) =>
            updateCase(projectId, caseId, { passRule: e.target.value })
          }
        />
      </td>
      <td className="px-gp-md py-gp-md">
        <div className="flex flex-wrap gap-gp-2xs">
          {tags?.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <label className="mt-gp-sm block text-body-small text-text-muted">
          Tags (comma-separated)
        </label>
        <input
          className={fieldClass}
          aria-label={`Tags for case ${index + 1}`}
          value={tags?.join(", ") ?? ""}
          onChange={(e) =>
            updateCase(projectId, caseId, {
              tags: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
        />
      </td>
      <td className="px-gp-md py-gp-md">
        <Button
          type="button"
          variant="ghost"
          className="text-fail"
          onClick={() => deleteCase(projectId, caseId)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export function CasesView({ project }: { project: Project }) {
  const addCase = useGradepairStore((s) => s.addCase);

  const onAdd = useCallback(() => {
    addCase(project.id);
  }, [addCase, project.id]);

  if (project.cases.length === 0) {
    return (
      <div className="min-h-full bg-bg">
        <PageHeader
          breadcrumbs={[
            { label: "Projects", href: "/projects" },
            { label: project.name },
            { label: "Test cases" },
          ]}
          title={project.name}
          meta={`${project.model} · Prompt ${project.promptA.version} vs ${project.promptB.version}`}
        />
        <EmptyCasesPanel projectId={project.id} onLoadSamples={onAdd} />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-bg">
      <PageHeader
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${project.id}/compare` },
          { label: "Test cases" },
        ]}
        title={project.name}
        meta={`${project.cases.length} cases · edit inputs and pass rules`}
        actions={
          <Button type="button" onClick={onAdd}>
            Add case
          </Button>
        }
      />
      <div className="overflow-x-auto p-gp-2xl">
        <table className="w-full min-w-[56rem] border-collapse text-left text-body-small">
          <caption className="sr-only">Test cases</caption>
          <thead>
            <tr className="border-b border-border text-label text-text-muted">
              <th scope="col" className="px-gp-md py-gp-sm">
                #
              </th>
              <th scope="col" className="px-gp-md py-gp-sm">
                User input
              </th>
              <th scope="col" className="px-gp-md py-gp-sm">
                Pass if
              </th>
              <th scope="col" className="px-gp-md py-gp-sm">
                Tags
              </th>
              <th scope="col" className="px-gp-md py-gp-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {project.cases.map((c, index) => (
              <CaseRow
                key={c.id}
                projectId={project.id}
                index={index}
                caseId={c.id}
                input={c.input}
                passRule={c.passRule}
                tags={c.tags}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}