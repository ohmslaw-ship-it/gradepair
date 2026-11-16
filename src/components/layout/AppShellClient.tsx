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
    label: "Test cases",
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
  { segment: "settings", label: "Settings", href: () => "/projects" },
] as const;

function activeProjectId(pathname: string): string | undefined {
  const match = pathname.match(/^\/projects\/([^/]+)/);
  return match?.[1];
}

function activeSegment(pathname: string): string {
  if (pathname === "/projects" || pathname.startsWith("/projects?")) {
    return "projects";
  }
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
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface px-gp-md py-gp-lg">
        <Link
          href="/projects"
          className="mb-gp-xl flex items-center gap-gp-sm px-gp-sm rounded-gp-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <span
            className="flex size-8 items-center justify-center rounded-gp-md bg-border-strong text-body-small font-semibold text-surface"
            aria-hidden
          >
            g
          </span>
          <span className="text-h2">gradepair</span>
        </Link>

        <nav aria-label="Workspace" className="flex flex-col gap-gp-2xs">
          <p className="mb-gp-2xs px-gp-sm text-label text-text-muted">
            Workspace
          </p>
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
                  "rounded-gp-md px-gp-sm py-gp-xs text-body-small",
                  isActive
                    ? "bg-surface-hover font-semibold text-text"
                    : "text-text hover:bg-surface-hover",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <nav
          aria-label="Projects"
          className="mt-gp-xl flex min-h-0 flex-1 flex-col gap-gp-2xs overflow-y-auto"
        >
          <p className="mb-gp-2xs px-gp-sm text-label text-text-muted">
            Projects
          </p>
          {projects.map((p) => {
            const selected = p.id === projectId;
            const stats =
              p.cases.length > 0 && !p.hideCounts
                ? (() => {
                    const { regressed } = summarizeCases(p.cases);
                    const passes = passCount(p.cases, "B");
                    return `${passes}/${p.cases.length} pass · ${regressed} reg`;
                  })()
                : null;
            return (
              <Link
                key={p.id}
                href={`/projects/${p.id}/compare`}
                className={cn(
                  "rounded-gp-md px-gp-sm py-gp-xs",
                  selected ? "bg-accent-subtle" : "hover:bg-surface-hover",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                )}
              >
                <span className="flex items-center gap-gp-sm">
                  {selected ? (
                    <span
                      className="size-1.5 shrink-0 rounded-gp-full bg-accent"
                      aria-hidden
                    />
                  ) : (
                    <span className="size-1.5 shrink-0" aria-hidden />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-body-small text-text">
                      {p.name}
                    </span>
                    {stats ? (
                      <span className="block truncate text-body-small text-text-muted">
                        {stats}
                      </span>
                    ) : null}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="min-h-0 min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}