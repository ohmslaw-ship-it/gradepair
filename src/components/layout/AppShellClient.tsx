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
    <div className="flex min-h-0 min-w-0 flex-1 gap-4 bg-bg p-4">
      <aside className="shadow-card flex w-56 shrink-0 flex-col rounded-[28px] bg-surface">
        <Link
          href="/projects"
          className="px-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <span className="text-h2 text-text">gradepair</span>
        </Link>

        <nav aria-label="Workspace" className="flex flex-col py-2">
          <p className="px-4 py-1 text-label text-[#6B5BD6]">Workspace</p>
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
                  "mx-2 px-4 py-2 text-[15px]",
                  isActive
                    ? "rounded-full bg-[#F1F3FF] font-semibold text-[#050545]"
                    : "rounded-full text-text-muted hover:bg-surface-hover hover:text-text",
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
          className="flex min-h-0 flex-1 flex-col overflow-y-auto py-2"
        >
          <p className="px-4 py-1 text-label text-[#6B5BD6]">Projects</p>
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
                  "mx-2 rounded-full px-4 py-2",
                  selected && "bg-[#F1F3FF]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                )}
              >
                <span className="block truncate text-[15px] text-text">
                  {p.name}
                </span>
                {stats ? (
                  <span className="block text-[12px] text-text-muted tabular-nums">
                    {stats} pass · {summarizeCases(p.cases).regressed} reg
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="motion-route shadow-panel min-h-0 min-w-0 flex-1 overflow-auto rounded-[28px] bg-surface">
        {children}
      </main>
    </div>
  );
}