import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatReadoutProps = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  className?: string;
  large?: boolean;
};

export function StatReadout({
  label,
  value,
  detail,
  className,
  large = true,
}: StatReadoutProps) {
  return (
    <div
      className={cn(
        "min-w-0 flex-1 rounded-[20px] bg-[#F6F7FE] p-6",
        className,
      )}
    >
      <p className="text-label text-text-muted">{label}</p>
      <p
        className={cn(
          large
            ? "text-score tabular-nums text-text"
            : "text-[22px] font-bold leading-none tabular-nums text-text",
          "mt-gp-2xs",
        )}
      >
        {value}
      </p>
      {detail ? (
        <p className="mt-gp-2xs text-[14px] text-text-muted tabular-nums">
          {detail}
        </p>
      ) : null}
    </div>
  );
}