import { ProjectRoute } from "@/components/project/ProjectRoute";

export default async function ProjectComparePage({
  params,
}: PageProps<"/projects/[id]/compare">) {
  const { id } = await params;
  return <ProjectRoute projectId={id} screen="compare" />;
}