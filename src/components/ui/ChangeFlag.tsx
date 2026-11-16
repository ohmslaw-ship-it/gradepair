import { cn } from "@/lib/cn";

export type ChangeKind = "regressed" | "improved";

export type ChangeFlagProps = {
  kind: ChangeKind;
  className?: string;
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

export function ChangeFlag({ kind, className }: ChangeFlagProps) {
  const isRegression = kind === "regressed";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold",
        isRegression
          ? "bg-[#FFF7E0] text-[#A26A00]"
          : "bg-[#EAF6EA] text-[#2F6B2E]",
        className,
      )}
    >
      <StatusDot color={isRegression ? "#A26A00" : "#2F6B2E"} />
      {isRegression ? "Regressed" : "Improved"}
    </span>
  );
}