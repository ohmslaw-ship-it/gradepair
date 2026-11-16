import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type MonoBlockProps = {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
};

export function MonoBlock({ children, header, className }: MonoBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-gp-sm border border-border bg-surface-recessed",
        className,
      )}
    >
      {header ? (
        <div className="border-b border-border px-gp-md py-gp-sm text-body-small text-text-muted">
          {header}
        </div>
      ) : null}
      <div className="text-mono whitespace-pre-wrap p-gp-md text-text">{children}</div>
    </div>
  );
}