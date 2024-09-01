import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { Project } from "../validators/project";
import { createProject } from "~/server/actions/project";
import type { Organization } from "../validators/organization";

export type UseCreateProjectMutationResult = UseMutationResult<
  Project,
  Error,
  FormData
>;

type UseCreateProjectMutationOptions = Omit<
  UseMutationOptions<Project, Error, FormData>,
  "mutationKey" | "mutationFn"
>;

export function useCreateProjectMutation(
  organizationName: Organization["name"],
  options: UseCreateProjectMutationOptions = {},
): UseCreateProjectMutationResult {
  return useMutation({
    mutationKey: ["createProject", organizationName],
    mutationFn: async (data) => {
      data.append("organizationName", organizationName);
      const [project, err] = await createProject(data);

      if (err !== null) {
        throw new Error(err);
      }

      return project;
    },
    ...options,
  });
}
