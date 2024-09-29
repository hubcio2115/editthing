import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { Project, TProjectForm } from "../validators/project";
import { createProject } from "~/server/actions/project";
import type { Organization } from "../validators/organization";

type UseCreateProjectMutationOptions = Omit<
  UseMutationOptions<Project, Error, TProjectForm>,
  "mutationKey" | "mutationFn"
>;

export type UseCreateProjectMutationResult = ReturnType<
  typeof useCreateProjectMutation
>;

export function useCreateProjectMutation(
  organizationName: Organization["name"],
  options: UseCreateProjectMutationOptions = {},
) {
  return useMutation({
    mutationKey: ["createProject", organizationName],
    mutationFn: async (data) => {
      const formData = new FormData();

      formData.append("license", data.license!);
      formData.append("title", data.title!);
      formData.append("description", data.description!);
      formData.append("categoryId", data.categoryId!);
      formData.append("defaultLanguage", data.defaultLanguage!);
      formData.append("tags", data.tags!);
      formData.append("embeddable", `${data.embeddable!}`);
      formData.append("privacyStatus", data.privacyStatus!);
      formData.append("publicStatsViewable", `${data.publicStatsViewable!}`);
      formData.append(
        "selfDeclaredMadeForKids",
        `${data.selfDeclaredMadeForKids!}`,
      );
      formData.append("notifySubscribers", `${data.notifySubscribers!}`);
      formData.append("channelId", data.channelId);
      formData.append("video", data.video!);

      formData.append("organizationName", organizationName);
      const [project, err] = await createProject(formData);

      if (err !== null) {
        console.error(err);
        throw new Error(err);
      }

      return project;
    },
    ...options,
  });
}
