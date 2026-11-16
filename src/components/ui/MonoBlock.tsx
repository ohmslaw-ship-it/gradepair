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
        "overflow-hidden rounded-sm border border-border bg-surface-recessed",
        className,
      )}
    >
      {header ? (
        <div className="border-b border-border px-md py-sm text-body-small text-text-muted">
          {header}
        </div>
      ) : null}
      <div className="text-mono whitespace-pre-wrap p-md text-text">{children}</div>
    </div>
  );
}