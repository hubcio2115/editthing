"use client";

import { useParams } from "next/navigation";

import EditProjectForm from "~/components/project/editProjectForm";
import { api } from "~/trpc/react";

export default function Project() {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: getProjectDetails } = api.project.getProjectDetails.useQuery({
    projId: parseInt(projectId),
  });

  return (
    getProjectDetails && (
      <div className="mx-aut flex flex-col items-center md:px-2">
        <h1>Project: {getProjectDetails?.projectName}</h1>
        <EditProjectForm projectDetails={getProjectDetails} />
      </div>
    )
  );
}
