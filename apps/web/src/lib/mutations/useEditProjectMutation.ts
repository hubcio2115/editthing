import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { Project, TProjectForm } from "../validators/project";
import { editProject } from "~/server/actions/project";

export type UseEditProjectMutationOptions = Omit<
  UseMutationOptions<Project, Error, TProjectForm>,
  "mutationKey" | "mutationFn"
>;

export type UseEditProjectMutationResult = ReturnType<
  typeof useEditProjectMutation
>;

export function useEditProjectMutation(
  projectId: Project["id"],
  options: UseEditProjectMutationOptions = {},
) {
  return useMutation({
    mutationKey: ["createProject", projectId],
    mutationFn: async (data) => {
      const [project, err] = await editProject(projectId, data);

      if (err !== null) {
        throw new Error(err);
      }

      return project!;
    },
    ...options,
  });
}
