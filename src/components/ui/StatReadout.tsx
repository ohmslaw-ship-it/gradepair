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
    <div className={cn("min-w-0 flex-1 px-gp-lg py-gp-md", className)}>
      <p className="text-label text-text-muted">{label}</p>
      <p
        className={cn(
          large ? "text-score tabular-nums text-text" : "text-h2 tabular-nums",
          "mt-gp-2xs",
        )}
      >
        {value}
      </p>
      {detail ? (
        <p className="mt-gp-2xs text-mono-small text-text-muted tabular-nums">
          {detail}
        </p>
      ) : null}
    </div>
  );
}