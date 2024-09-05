import { redirect } from "next/navigation";
import { getProjectById } from "~/server/actions/project";

type ProjectPageProps = {
  params: {
    name: string;
    id: string;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const [project, err] = await getProjectById(+params.id);

  if (err !== null) {
    throw new Error(err);
  }

  if (project === null) {
    return redirect("/404");
  }

  return (
    <div>
      <p>
        {project.id}: {project.title}
      </p>
    </div>
  );
}
