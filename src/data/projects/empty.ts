import type { Project } from "@/lib/types";

/** SAMPLE DATA — intentional empty project for first-run UI */
export const EMPTY_PROJECT: Project = {
  id: "hinglish-notifications",
  name: "Hinglish notifications",
  description: "Draft push and SMS in Hinglish for a food-delivery app.",
  hideCounts: true,
  promptA: {
    version: "v1",
    body: `Write short Hinglish notifications for a food-delivery app.\nKeep under 60 characters when asked.`,
  },
  promptB: {
    version: "v2",
    body: `Write short Hinglish notifications for a food-delivery app.\nConversational, one clear offer. Respect character limits.`,
  },
  model: "gpt-4.1-mini",
  lastRunLabel: "Not run yet",
  cases: [],
};