import { cn } from "@/lib/cn";

export type ChangeKind = "regressed" | "improved";

export type ChangeFlagProps = {
  kind: ChangeKind;
  className?: string;
};

export function ChangeFlag({ kind, className }: ChangeFlagProps) {
  const isRegression = kind === "regressed";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-gp-2xs text-mono-small uppercase",
        isRegression ? "text-regression" : "text-improved",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-gp-xs",
          isRegression ? "bg-regression" : "bg-improved",
        )}
      />
      {isRegression ? "Regressed" : "Improved"}
    </span>
  );
}