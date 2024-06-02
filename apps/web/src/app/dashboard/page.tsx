import { redirect } from "next/navigation";

import { getOwnOrganizations } from "~/server/actions/organization";

export default async function DashboardPage() {
  const [organizations, err] = await getOwnOrganizations();

  if (err !== null) {
    throw err;
  } else if (organizations.length !== 0) {
    const orgNames = organizations.map((org) => org.name);
    redirect(`/dashboard/${orgNames[0]}/overview`);
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full  flex-col items-center justify-center">
      <div className="flex w-[280px] flex-col items-center  gap-4 rounded-lg border bg-slate-50 p-10 sm:w-[500px]">
        <h1 className="text-2xl font-bold text-gray-900">
          <span className="text-fuchsia-900">Edit</span>thing
        </h1>
        <h2 className="text-center font-semibold">
          Create an organization to get started
        </h2>
        <p className="text-center">
          An organization is where you create projects and add team members. You
          can add multiple organiations in your account for different
          collaboration projects.{" "}
        </p>
      </div>
    </div>
  );
}
