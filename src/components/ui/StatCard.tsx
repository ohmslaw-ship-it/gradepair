import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatCardProps = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  className?: string;
};

export function StatCard({ label, value, detail, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-lg",
        className,
      )}
    >
      <p className="text-label text-text-muted">{label}</p>
      <p className="mt-sm text-h2">{value}</p>
      {detail ? (
        <p className="mt-2xs text-body-small text-text-muted">{detail}</p>
      ) : null}
    </div>
  );
}