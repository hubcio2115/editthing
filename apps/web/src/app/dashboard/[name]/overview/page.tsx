import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProjectGrid from "~/components/dashboard/project-grid";

import { getOwnOrganizations } from "~/server/actions/organization";

type DashboardOverviewProps = {
  params: {
    name: string;
  };
};

export default async function DashboardOverviewPage({
  params,
}: DashboardOverviewProps) {
  const [organizations, err] = await getOwnOrganizations();

  if (err !== null) {
    throw err;
  }

  const organization = organizations.find((org) => params.name === org.name);

  return organization ? (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectGrid organization={organization} />
    </Suspense>
  ) : (
    redirect("/404")
  );
}
