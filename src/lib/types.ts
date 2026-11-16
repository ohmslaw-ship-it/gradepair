export type CaseGrade = "pass" | "fail";

export type CaseChangeFlag = "improved" | "regressed" | "unchanged" | "pending";

export type EvalCase = {
  id: string;
  input: string;
  passRule: string;
  tags?: string[];
  outputA: string;
  outputB: string;
  gradeA: CaseGrade | null;
  gradeB: CaseGrade | null;
  noteA: string;
  noteB: string;
};

export type PromptVersion = {
  version: string;
  body: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  promptA: PromptVersion;
  promptB: PromptVersion;
  model: string;
  lastRunLabel: string;
  /** When true, sidebar omits case/run counts (empty-state project). */
  hideCounts?: boolean;
  cases: EvalCase[];
};