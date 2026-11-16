import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function StatReadoutStrip({
  children,
  className,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-stretch border-y border-border bg-surface",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-wrap divide-x divide-border">
        {children}
      </div>
      {aside ? (
        <aside className="w-full border-t border-border px-gp-lg py-gp-md lg:w-auto lg:max-w-xs lg:border-t-0 lg:border-l">
          {aside}
        </aside>
      ) : null}
    </div>
  );
}