import { ProjectRoute } from "@/components/project/ProjectRoute";

export default async function ProjectReportPage({
  params,
}: PageProps<"/projects/[id]/report">) {
  const { id } = await params;
  return <ProjectRoute projectId={id} screen="report" />;
}