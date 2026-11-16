/**
 * SAMPLE DATA ONLY — fictional AdsGPT project for demo mode and UI development.
 * Not loaded by the app automatically in Stage 3; typed fixtures for later screens.
 */

export type CaseGrade = "pass" | "fail";

export type CaseChangeFlag = "improved" | "regressed" | "unchanged";

export type SampleCase = {
  id: string;
  index: number;
  input: string;
  passRule: string;
  outputA: string;
  outputB: string;
  gradeA: CaseGrade;
  gradeB: CaseGrade;
  noteA?: string;
  noteB?: string;
  flag: CaseChangeFlag;
  tags?: string[];
};

export type SampleProject = {
  id: string;
  name: string;
  description: string;
  promptAVersion: string;
  promptBVersion: string;
  model: string;
  runLabel: string;
  cases: SampleCase[];
};

/** @sample */
export const SAMPLE_ADSGPT_PROJECT: SampleProject = {
  id: "sample-adsgpt",
  name: "AdsGPT ad-copy assistant",
  description:
    "Sample project — compare prompt v3 (current) vs v4 (candidate) on ad-copy cases.",
  promptAVersion: "v3",
  promptBVersion: "v4",
  model: "gpt-4.1-mini",
  runLabel: "16 Nov, 11:42 · demo mode, saved results",
  cases: [
    {
      id: "case-01",
      index: 1,
      input:
        "Write a Diwali sale headline for a sneaker brand, under 40 characters.",
      passRule: "40 chars or fewer, mentions Diwali, names offer.",
      outputA: "Light up your Diwali with 40% off sneakers!",
      outputB: "Step into Diwali: 40% off sneakers",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "43 characters.",
      noteB: "34 characters.",
      flag: "improved",
      tags: ["edge case"],
    },
    {
      id: "case-02",
      index: 2,
      input:
        "Instagram caption for a Pune café's monsoon menu. Casual, one emoji max.",
      passRule: "Casual, local, at most one emoji.",
      outputA: "Rain outside, cutting chai and bun maska inside ☔",
      outputB: "⛈️ Monsoon vibes! ☕✨ New menu dropping now 🔥",
      gradeA: "pass",
      gradeB: "fail",
      noteA: "Local, one emoji.",
      noteB: "Five emojis.",
      flag: "regressed",
    },
    {
      id: "case-03",
      index: 3,
      input: "Google ad description for fintech app. No guaranteed returns.",
      passRule: "No guaranteed-return claims.",
      outputA: "Guaranteed 12% returns. Start investing today.",
      outputB: "Invest from ₹100 and track every rupee in one app.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Compliance risk.",
      noteB: "Safe claim.",
      flag: "improved",
    },
    {
      id: "case-04",
      index: 4,
      input: 'LinkedIn ad for B2B HR SaaS. Must mention "payroll".',
      passRule: 'Includes the word "payroll".',
      outputA: "Run payroll in minutes, not days.",
      outputB: "Simplify HR for your growing team.",
      gradeA: "pass",
      gradeB: "fail",
      noteB: "Dropped keyword.",
      flag: "regressed",
    },
    {
      id: "case-05",
      index: 5,
      input: "Hinglish push notification, under 60 chars.",
      passRule: "Under 60 chars, conversational Hinglish.",
      outputA: "Bhook lagi? Biryani 20 min mein door pe.",
      outputB: "Bhook lagi? Garma-garam biryani, 20 min mein.",
      gradeA: "pass",
      gradeB: "pass",
      flag: "unchanged",
    },
    {
      id: "case-06",
      index: 6,
      input: "Meta ad for edtech app. Avoid fear-based language.",
      passRule: "No fear / shame framing.",
      outputA: "Don't let your child fall behind this year.",
      outputB:
        "15 minutes of maths a day that your child will actually enjoy.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Fear-based.",
      flag: "improved",
    },
  ],
};