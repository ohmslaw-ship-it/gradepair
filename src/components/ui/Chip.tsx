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
        "inline-flex items-center rounded-xs bg-surface-recessed px-sm py-3xs text-body-small text-text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}