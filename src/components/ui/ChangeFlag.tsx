import { cn } from "@/lib/cn";

export type ChangeKind = "regressed" | "improved";

export type ChangeFlagProps = {
  kind: ChangeKind;
  className?: string;
};

function RegressionIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 4L9 8M9 4V8H5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ImprovedIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M9 8L3 4M3 8V4H7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChangeFlag({ kind, className }: ChangeFlagProps) {
  const isRegression = kind === "regressed";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2xs rounded-xs px-sm py-3xs text-label",
        isRegression
          ? "bg-regression text-regression-text"
          : "bg-improved-subtle text-improved",
        className,
      )}
    >
      {isRegression ? <RegressionIcon /> : <ImprovedIcon />}
      {isRegression ? "REGRESSED" : "IMPROVED"}
    </span>
  );
}