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
        "inline-flex items-center rounded-full bg-[#F6F7FE] px-3 py-1 text-[13px] font-semibold text-[#606266]",
        className,
      )}
    >
      {children}
    </span>
  );
}