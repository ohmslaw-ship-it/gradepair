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
    <header className="px-8 pb-6 pt-8">
      <div className="flex flex-wrap items-end gap-y-4">
        <div className="min-w-0 flex-1">
          <nav aria-label="Breadcrumb" className="text-[14px] text-text-muted">
            <ol className="flex flex-wrap items-center gap-gp-xs">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-gp-xs">
                  {i > 0 ? <span aria-hidden>/</span> : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
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
          <div className="mt-gp-md flex flex-wrap items-baseline gap-gp-md">
            <h1 className="text-h1 text-text">{title}</h1>
            {badge ? <Chip>{badge}</Chip> : null}
          </div>
          {meta ? (
            <p className="mt-gp-sm max-w-3xl text-[14px] text-text-muted">
              {meta}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap justify-start gap-gp-sm sm:justify-end">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}