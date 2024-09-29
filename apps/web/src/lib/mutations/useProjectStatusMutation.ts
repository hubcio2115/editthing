import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { Project } from "../validators/project";
import { updateProjectStatus } from "~/server/actions/project";

export type UseProjectStatusMutationOptions = Omit<
  UseMutationOptions<Project, Error, Project["status"]>,
  "mutationKey" | "mutationFn"
>;

export function useProjectStatusMutation(
  id: Project["id"],
  options: UseProjectStatusMutationOptions = {},
) {
  return useMutation({
    mutationKey: ["project", "status", id],
    mutationFn: async (status) => {
      const [project, err] = await updateProjectStatus(id, status);

      if (err !== null) {
        throw new Error(err);
      }

      return project;
    },
    ...options,
  });
}
