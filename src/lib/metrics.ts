import type { CaseChangeFlag, CaseGrade, EvalCase } from "@/lib/types";

export function caseChangeFlag(
  gradeA: CaseGrade | null,
  gradeB: CaseGrade | null,
): CaseChangeFlag {
  if (!gradeA || !gradeB) return "pending";
  if (gradeA === "pass" && gradeB === "fail") return "regressed";
  if (gradeA === "fail" && gradeB === "pass") return "improved";
  return "unchanged";
}

export function passCount(cases: EvalCase[], side: "A" | "B"): number {
  return cases.filter((c) => (side === "A" ? c.gradeA : c.gradeB) === "pass")
    .length;
}

export function gradedCount(cases: EvalCase[], side: "A" | "B"): number {
  return cases.filter((c) => (side === "A" ? c.gradeA : c.gradeB) !== null)
    .length;
}

export function summarizeCases(cases: EvalCase[]) {
  let improved = 0;
  let regressed = 0;
  let unchanged = 0;
  let pending = 0;
  for (const c of cases) {
    const flag = caseChangeFlag(c.gradeA, c.gradeB);
    if (flag === "improved") improved += 1;
    else if (flag === "regressed") regressed += 1;
    else if (flag === "unchanged") unchanged += 1;
    else pending += 1;
  }
  return { improved, regressed, unchanged, pending };
}