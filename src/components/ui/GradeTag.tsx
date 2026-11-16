import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";

export type Grade = "pass" | "fail";

export type GradeTagProps = {
  grade: Grade | null;
  className?: string;
  compact?: boolean;
};

function StatusDot({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block size-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

const passPill =
  "rounded-full bg-[#EAF6EA] px-3 py-1 text-[13px] font-semibold text-[#2F6B2E]";
const failPill =
  "rounded-full bg-[#FFF0F1] px-3 py-1 text-[13px] font-semibold text-[#D9465A]";

export function GradeTag({ grade, className, compact = true }: GradeTagProps) {
  if (grade === null) {
    return <Chip className={className}>Ungraded</Chip>;
  }
  const label = grade === "pass" ? "PASS" : "FAIL";
  const dotColor = grade === "pass" ? "#2F6B2E" : "#D9465A";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        grade === "pass" ? passPill : failPill,
        className,
      )}
    >
      <StatusDot color={dotColor} />
      {compact ? label : label.toLowerCase()}
    </span>
  );
}