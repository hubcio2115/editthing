import { redirect } from "next/navigation";
import { Suspense } from "react";
import type { SupportedLanguages } from "~/i18n/settings";
import ProjectGrid from "~/components/dashboard/project-grid";
import ProjectsSkeleton from "~/components/dashboard/project-grid-skeleton";
import ProjectPagination from "~/components/dashboard/project-pagination";
import SearchNavigation from "~/components/dashboard/search-navigation";

import { getOwnOrganizations } from "~/server/actions/organization";

type DashboardOverviewProps = {
  params: {
    name: string;
    lang: SupportedLanguages;
  };
  searchParams?: {
    page?: string;
    q?: string;
  };
};

export default async function DashboardOverviewPage({
  params,
  searchParams,
}: DashboardOverviewProps) {
  const [organizations, err] = await getOwnOrganizations();

  if (err !== null) {
    throw err;
  }

  const page = searchParams?.page;
  const q = searchParams?.q;
  console.log(page, q);
  if ((page && isNaN(parseInt(page))) || q === undefined) {
    const params = new URLSearchParams(searchParams);

    if (!page || isNaN(parseInt(page))) params.set("page", "1");
    if (q === undefined) params.set("q", "");

    return redirect("?" + params.toString());
  }

  const organization = organizations.find((org) => params.name === org.name);

  return organization ? (
    <div className="mx-auto flex flex-col flex-1 items-center md:px-2 container pb-10 gap-8">
      <SearchNavigation orgName={params.name} lang={params.lang} />

      <ProjectPagination organizationName={params.name} />

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
