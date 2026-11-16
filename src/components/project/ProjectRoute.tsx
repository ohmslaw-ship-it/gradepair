"use client";

import { notFound } from "next/navigation";
import { CasesView } from "@/components/screens/CasesView";
import { CompareView } from "@/components/screens/CompareView";
import { PromptsView } from "@/components/screens/PromptsView";
import { ReportView } from "@/components/screens/ReportView";
import { useGradepairStore } from "@/store/gradepair-store";

export type ProjectScreen = "cases" | "prompts" | "compare" | "report";

export function ProjectRoute({
  projectId,
  screen,
}: {
  projectId: string;
  screen: ProjectScreen;
}) {
  const project = useGradepairStore((s) =>
    s.projects.find((p) => p.id === projectId),
  );

  if (!project) {
    notFound();
  }

  switch (screen) {
    case "cases":
      return <CasesView project={project} />;
    case "prompts":
      return <PromptsView project={project} />;
    case "compare":
      return <CompareView project={project} />;
    case "report":
      return <ReportView project={project} />;
    default:
      return null;
  }
}