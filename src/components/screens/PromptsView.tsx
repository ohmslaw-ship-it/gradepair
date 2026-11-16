"use client";

import Link from "next/link";
import { PageHeader } from "@/components/project/PageHeader";
import { Button } from "@/components/ui/Button";
import { textareaClass } from "@/lib/form-styles";
import type { Project } from "@/lib/types";
import { useGradepairStore } from "@/store/gradepair-store";

function PromptCard({
  label,
  version,
  body,
  onChange,
  id,
}: {
  label: string;
  version: string;
  body: string;
  onChange: (value: string) => void;
  id: string;
}) {
  return (
    <article className="flex h-full min-h-[20rem] flex-col rounded-gp-sm border border-border bg-surface">
      <header className="flex items-center justify-between border-b border-border px-gp-lg py-gp-md">
        <h2 className="text-h2">{label}</h2>
        <span className="text-label text-text-muted">{version}</span>
      </header>
      <label className="sr-only" htmlFor={id}>
        {label} body
      </label>
      <textarea
        id={id}
        className={`${textareaClass} min-h-0 flex-1 rounded-none border-0 bg-surface-recessed`}
        value={body}
        onChange={(e) => onChange(e.target.value)}
      />
    </article>
  );
}

export function PromptsView({ project }: { project: Project }) {
  const updateProject = useGradepairStore((s) => s.updateProject);

  return (
    <div className="min-h-full bg-bg">
      <PageHeader
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${project.id}/compare` },
          { label: "Prompts" },
        ]}
        title={project.name}
        meta={`${project.model} · current vs candidate`}
        actions={
          <Link href={`/projects/${project.id}/compare`}>
            <Button variant="secondary">Go to compare</Button>
          </Link>
        }
      />
      <div className="grid gap-gp-lg p-gp-2xl lg:grid-cols-2 lg:items-stretch">
        <PromptCard
          id="prompt-a"
          label="Prompt A · current"
          version={project.promptA.version}
          body={project.promptA.body}
          onChange={(body) =>
            updateProject(project.id, { promptA: { ...project.promptA, body } })
          }
        />
        <PromptCard
          id="prompt-b"
          label="Prompt B · candidate"
          version={project.promptB.version}
          body={project.promptB.body}
          onChange={(body) =>
            updateProject(project.id, { promptB: { ...project.promptB, body } })
          }
        />
      </div>
    </div>
  );
}