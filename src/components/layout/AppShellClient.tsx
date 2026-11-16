"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { passCount, summarizeCases } from "@/lib/metrics";
import { useGradepairStore } from "@/store/gradepair-store";

const workspaceItems = [
  { segment: "projects", label: "Projects", href: () => "/projects" },
  {
    segment: "cases",
    label: "Cases",
    href: (id?: string) => (id ? `/projects/${id}/cases` : "/projects"),
  },
  {
    segment: "prompts",
    label: "Prompts",
    href: (id?: string) => (id ? `/projects/${id}/prompts` : "/projects"),
  },
  {
    segment: "compare",
    label: "Compare",
    href: (id?: string) => (id ? `/projects/${id}/compare` : "/projects"),
  },
  {
    segment: "report",
    label: "Report",
    href: (id?: string) => (id ? `/projects/${id}/report` : "/projects"),
  },
] as const;

function activeProjectId(pathname: string): string | undefined {
  const match = pathname.match(/^\/projects\/([^/]+)/);
  return match?.[1];
}

function activeSegment(pathname: string): string {
  if (pathname === "/projects") return "projects";
  if (pathname.includes("/cases")) return "cases";
  if (pathname.includes("/prompts")) return "prompts";
  if (pathname.includes("/compare")) return "compare";
  if (pathname.includes("/report")) return "report";
  if (pathname.startsWith("/dev")) return "projects";
  return "projects";
}

export function AppShellClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const projects = useGradepairStore((s) => s.projects);
  const projectId = activeProjectId(pathname);
  const segment = activeSegment(pathname);

  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      <aside className="flex w-44 shrink-0 flex-col border-r border-border bg-surface">
        <Link
          href="/projects"
          className="border-b border-border px-gp-md py-gp-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus"
        >
          <span className="text-label text-text-muted">Instrument</span>
          <span className="mt-gp-2xs block text-h2 tracking-tight">gradepair</span>
        </Link>

        <nav aria-label="Workspace" className="flex flex-col border-b border-border py-gp-sm">
          <p className="px-gp-md py-gp-2xs text-label text-text-muted">Workspace</p>
          {workspaceItems.map((item) => {
            const href = item.href(projectId);
            const isActive =
              item.segment === segment ||
              (item.segment === "projects" && pathname === "/projects");
            return (
              <Link
                key={item.label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "border-l-2 px-gp-md py-gp-xs text-body-small",
                  isActive
                    ? "border-accent bg-accent-subtle font-medium text-text"
                    : "border-transparent text-text-muted hover:bg-surface-hover hover:text-text",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <nav
          aria-label="Projects"
          className="flex min-h-0 flex-1 flex-col overflow-y-auto py-gp-sm"
        >
          <p className="px-gp-md py-gp-2xs text-label text-text-muted">Projects</p>
          {projects.map((p) => {
            const selected = p.id === projectId;
            const stats =
              p.cases.length > 0 && !p.hideCounts
                ? `${passCount(p.cases, "B")}/${p.cases.length}`
                : null;
            return (
              <Link
                key={p.id}
                href={
                  p.cases.length === 0
                    ? `/projects/${p.id}/cases`
                    : `/projects/${p.id}/compare`
                }
                className={cn(
                  "px-gp-md py-gp-xs",
                  selected && "bg-surface-recessed",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus",
                )}
              >
                <span className="block truncate text-body-small text-text">
                  {p.name}
                </span>
                {stats ? (
                  <span className="block text-mono-small text-text-muted tabular-nums">
                    {stats} pass · {summarizeCases(p.cases).regressed} reg
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="motion-route min-h-0 min-w-0 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}