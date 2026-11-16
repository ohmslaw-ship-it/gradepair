"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SEED_PROJECTS } from "@/data/seed";
import type { CaseGrade, EvalCase, Project } from "@/lib/types";

type GradepairState = {
  projects: Project[];
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  resetToSeed: () => void;
  getProject: (id: string) => Project | undefined;
  updateProject: (id: string, patch: Partial<Project>) => void;
  addCase: (projectId: string, draft?: Partial<EvalCase>) => void;
  updateCase: (
    projectId: string,
    caseId: string,
    patch: Partial<EvalCase>,
  ) => void;
  deleteCase: (projectId: string, caseId: string) => void;
  setGrade: (
    projectId: string,
    caseId: string,
    side: "A" | "B",
    grade: CaseGrade | null,
  ) => void;
};

function newCaseId(): string {
  return `case-${crypto.randomUUID().slice(0, 8)}`;
}

export const useGradepairStore = create<GradepairState>()(
  persist(
    (set, get) => ({
      projects: SEED_PROJECTS,
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      resetToSeed: () => set({ projects: structuredClone(SEED_PROJECTS) }),
      getProject: (id) => get().projects.find((p) => p.id === id),
      updateProject: (id, patch) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...patch } : p,
          ),
        })),
      addCase: (projectId, draft) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const next: EvalCase = {
              id: newCaseId(),
              input: draft?.input ?? "New test case input",
              passRule: draft?.passRule ?? "Describe pass criteria in plain language.",
              tags: draft?.tags,
              outputA: draft?.outputA ?? "[Demo] Pre-generated output for Prompt A.",
              outputB: draft?.outputB ?? "[Demo] Pre-generated output for Prompt B.",
              gradeA: draft?.gradeA ?? null,
              gradeB: draft?.gradeB ?? null,
              noteA: draft?.noteA ?? "",
              noteB: draft?.noteB ?? "",
            };
            return { ...p, hideCounts: false, cases: [...p.cases, next] };
          }),
        })),
      updateCase: (projectId, caseId, patch) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  cases: p.cases.map((c) =>
                    c.id === caseId ? { ...c, ...patch } : c,
                  ),
                }
              : p,
          ),
        })),
      deleteCase: (projectId, caseId) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? { ...p, cases: p.cases.filter((c) => c.id !== caseId) }
              : p,
          ),
        })),
      setGrade: (projectId, caseId, side, grade) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  cases: p.cases.map((c) =>
                    c.id === caseId
                      ? {
                          ...c,
                          ...(side === "A" ? { gradeA: grade } : { gradeB: grade }),
                        }
                      : c,
                  ),
                }
              : p,
          ),
        })),
    }),
    {
      name: "gradepair-v1",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persisted, fromVersion) => {
        if (fromVersion < 2) {
          return {
            ...(persisted as object),
            projects: structuredClone(SEED_PROJECTS),
          };
        }
        return persisted;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);