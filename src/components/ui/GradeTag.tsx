import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";

export type Grade = "pass" | "fail";

export type GradeTagProps = {
  grade: Grade | null;
  className?: string;
  compact?: boolean;
};

function StatusSquare({ tone }: { tone: "pass" | "fail" | "muted" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-2 shrink-0 rounded-gp-xs",
        tone === "pass" && "bg-pass",
        tone === "fail" && "bg-fail",
        tone === "muted" && "bg-border",
      )}
    />
  );
}

export function GradeTag({ grade, className, compact = true }: GradeTagProps) {
  if (grade === null) {
    return <Chip className={className}>Ungraded</Chip>;
  }
  const label = grade === "pass" ? "PASS" : "FAIL";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-gp-2xs font-mono text-mono-small uppercase",
        grade === "pass" ? "text-pass" : "text-fail",
        className,
      )}
    >
      <StatusSquare tone={grade} />
      {compact ? label : label.toLowerCase()}
    </span>
  );
}