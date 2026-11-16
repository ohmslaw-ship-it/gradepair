import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ChipProps = {
  children: ReactNode;
  className?: string;
};

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-gp-xs border border-border bg-surface px-gp-sm py-gp-3xs text-mono-small text-text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}