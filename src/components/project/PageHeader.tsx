import type { ReactNode } from "react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";

export type PageHeaderProps = {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  meta?: ReactNode;
  actions?: ReactNode;
  badge?: string;
};

export function PageHeader({
  breadcrumbs,
  title,
  meta,
  actions,
  badge,
}: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-bg px-gp-2xl py-gp-xl">
      <nav aria-label="Breadcrumb" className="text-body-small text-text-muted">
        <ol className="flex flex-wrap items-center gap-gp-xs">
          {breadcrumbs.map((crumb, i) => (
            <li key={crumb.label} className="flex items-center gap-gp-xs">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-gp-xs"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-text">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="mt-gp-md flex flex-wrap items-start justify-between gap-gp-lg">
        <div className="min-w-0 max-w-3xl">
          <div className="flex flex-wrap items-center gap-gp-sm">
            <h1 className="text-h1">{title}</h1>
            {badge ? <Chip>{badge}</Chip> : null}
          </div>
          {meta ? (
            <p className="mt-gp-sm text-body-small text-text-muted">{meta}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap gap-gp-md">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}