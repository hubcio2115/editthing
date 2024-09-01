"use client";

import { useRouter } from "next/navigation";
import ProjectForm from "~/components/create-project/project-form";
import { useCreateProjectMutation } from "~/lib/mutations/useCreateProjectMutation";

interface CreateProjectPageProps {
  params: { name: string };
}

export default function CreateProjectPage({ params }: CreateProjectPageProps) {
  const router = useRouter();

  const mutation = useCreateProjectMutation(params.name, {
    onSuccess: (project) => {
      router.push(`/dashboard/${params.name}/project/${project.id}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="container flex max-w-[800px] flex-1 flex-col items-center pb-11">
      <ProjectForm mutation={mutation} />
    </div>
  );
}
