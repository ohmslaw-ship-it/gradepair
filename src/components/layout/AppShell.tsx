import type { ReactNode } from "react";
import Link from "next/link";

const workspaceNav = [
  { href: "#", label: "Projects" },
  { href: "#", label: "Test cases" },
  { href: "#", label: "Prompts" },
  { href: "#", label: "Compare" },
  { href: "#", label: "Report" },
  { href: "#", label: "Settings" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface px-gp-md py-gp-lg">
        <div className="mb-gp-xl flex items-center gap-gp-sm px-gp-sm">
          <span
            className="flex size-8 items-center justify-center rounded-gp-md bg-border-strong text-body-small font-semibold text-surface"
            aria-hidden
          >
            g
          </span>
          <span className="text-h2">gradepair</span>
        </div>
        <nav aria-label="Workspace" className="flex flex-col gap-gp-2xs">
          <p className="mb-gp-2xs px-gp-sm text-label text-text-muted">Workspace</p>
          {workspaceNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-gp-md px-gp-sm py-gp-xs text-body-small text-text hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-gp-md border border-border bg-accent-subtle px-gp-md py-gp-sm text-body-small text-text">
          <span className="mr-gp-2xs inline-block size-2 rounded-gp-full bg-accent" aria-hidden />{" "}
          Demo mode
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}