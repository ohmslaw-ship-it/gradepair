import { cn } from "@/lib/cn";

export type Grade = "pass" | "fail";

export type GradeTagProps = {
  grade: Grade;
  className?: string;
};

function PassIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3 8.5L6.2 11.5 13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GradeTag({ grade, className }: GradeTagProps) {
  const isPass = grade === "pass";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2xs rounded-full border px-sm py-3xs",
        isPass ? "border-pass text-pass" : "border-fail text-fail",
        className,
      )}
    >
      {isPass ? <PassIcon /> : <FailIcon />}
      <span className="text-grade">{isPass ? "Pass" : "Fail"}</span>
    </span>
  );
}