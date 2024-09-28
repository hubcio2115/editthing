import {
  keepPreviousData,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { type Project } from "../validators/project";
import type { HTTPError } from "ky";
import { type ZodError } from "zod";
import ky from "ky";
import type { Organization } from "../validators/organization";
import { env } from "~/env";
import type { GetProjectsResponse } from "~/server/actions/organization";
import { getProjectById } from "~/server/actions/project";

type UseProjectsQueryOptions = Omit<
  UseQueryOptions<
    GetProjectsResponse,
    HTTPError | ZodError<Project[]>,
    GetProjectsResponse,
    ["projects", string, number, string]
  >,
  "queryKey" | "queryFn"
>;

export function useProjectsPaginatedQuery(
  organizationName: Organization["name"],
  page: number,
  query: Project["title"],
  options: UseProjectsQueryOptions = {},
) {
  return useQuery({
    queryKey: ["projects", organizationName, +page!, query],
    queryFn: async () => {
      const searchParams = new URLSearchParams([
        [`page`, page.toString()],
        [`q`, query],
      ]);

      const res = await ky
        .get<GetProjectsResponse>(
          `${env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationName}/projects?${searchParams}`,
        )
        .json();

      return res;
    },
    placeholderData: keepPreviousData,
    ...options,
  });
}

export type UseProjectQueryOptions = Omit<
  UseQueryOptions<Project | null, Error, Project, ["project", Project["id"]]>,
  "queryKey" | "queryFn"
>;

export function useProjectQuery(
  projectId: Project["id"],
  options: UseProjectQueryOptions = {},
) {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const [project, err] = await getProjectById(projectId);

      if (err !== null) {
        throw new Error(err);
      }

      return project;
    },
    ...options,
  });
}
