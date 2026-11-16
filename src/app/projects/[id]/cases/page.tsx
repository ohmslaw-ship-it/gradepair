import { ProjectRoute } from "@/components/project/ProjectRoute";

export default async function ProjectCasesPage({
  params,
}: PageProps<"/projects/[id]/cases">) {
  const { id } = await params;
  return <ProjectRoute projectId={id} screen="cases" />;
}