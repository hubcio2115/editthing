import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProjectGrid from "~/components/dashboard/project-grid";
import ProjectsSkeleton from "~/components/dashboard/project-grid-skeleton";
import ProjectPagination from "~/components/dashboard/project-pagination";
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
    <div className="mx-auto flex flex-col flex-1 items-center md:px-2 container pb-10 gap-8">
      <SearchNavigation orgName={name} />

      <ProjectPagination organizationName={name} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:grid-rows-6 2xl:w-[1300px] 2xl:grid-cols-3 2xl:grid-rows-4 flex-1">
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectGrid organization={organization} />
        </Suspense>
      </div>
    </div>
  ) : (
    redirect("/404")
  );
}
