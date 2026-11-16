/**
 * SAMPLE DATA ONLY — seed projects for demo mode (pre-generated outputs).
 */

import { ADSGPT_PROJECT } from "@/data/projects/adsgpt";
import { EMPTY_PROJECT } from "@/data/projects/empty";
import { SUMMARIZER_PROJECT } from "@/data/projects/summarizer";
import { SUPPORT_PROJECT } from "@/data/projects/support";
import type { Project } from "@/lib/types";

export const SEED_PROJECTS: Project[] = [
  ADSGPT_PROJECT,
  SUPPORT_PROJECT,
  SUMMARIZER_PROJECT,
  EMPTY_PROJECT,
];

export function getSeedProject(id: string): Project | undefined {
  return SEED_PROJECTS.find((p) => p.id === id);
}