import { ProjectRoute } from "@/components/project/ProjectRoute";

export default async function ProjectPromptsPage({
  params,
}: PageProps<"/projects/[id]/prompts">) {
  const { id } = await params;
  return <ProjectRoute projectId={id} screen="prompts" />;
}