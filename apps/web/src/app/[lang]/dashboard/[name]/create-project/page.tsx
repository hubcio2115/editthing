"use client";

import { useRouter } from "next/navigation";
import ProjectCreateForm from "~/components/create-project/project-create-form";
import { useCreateProjectMutation } from "~/lib/mutations/useCreateProjectMutation";
import type { InsertProject } from "~/lib/validators/project";

const defaultValues: InsertProject = {
  license: "youtube",
  title: "",
  description: "",
  categoryId: null,
  defaultLanguage: "none",
  tags: "",
  embeddable: true,
  privacyStatus: "unlisted",
  publicStatsViewable: true,
  selfDeclaredMadeForKids: false,
  notifySubscribers: true,
  channelId: "",
};

interface CreateProjectPageProps {
  params: { name: string };
}

export default function CreateProjectPage({ params }: CreateProjectPageProps) {
  const router = useRouter();

  const { mutate, isPending } = useCreateProjectMutation(params.name, {
    onSuccess: (project) => {
      router.push(`/dashboard/${params.name}/project/${project.id}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="container flex max-w-[800px] flex-1 flex-col items-center pb-11">
      <ProjectCreateForm
        mutate={mutate}
        isPending={isPending}
        defaultValues={defaultValues}
      />
    </div>
  );
}
