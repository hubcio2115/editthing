import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProjectGrid from "~/components/dashboard/project-grid";
import SearchNavigation from "~/components/dashboard/search-navigation";

import { getOwnOrganizations } from "~/server/actions/organization";

type DashboardOverviewProps = {
  params: {
    name: string;
  };
};

export default async function DashboardOverviewPage({
  params: { name },
}: DashboardOverviewProps) {
  const [organizations, err] = await getOwnOrganizations();

  if (err !== null) {
    throw err;
  }

  const organization = organizations.find((org) => name === org.name);

  return organization ? (
    <div className="mx-auto flex flex-col flex-1 items-center md:px-2">
      <SearchNavigation orgName={name} />

      <Suspense fallback={<div>Loading...</div>}>
        <ProjectGrid organization={organization} />
      </Suspense>
    </div>
  ) : (
    redirect("/404")
  );
}
