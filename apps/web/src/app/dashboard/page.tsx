import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  getOwnOrganizations,
} from "~/server/actions/organization";

export default async function Dashboard() {
  const [organizations, err] = await getOwnOrganizations();

  if (err !== null) {
    throw err;
  } else if (organizations.length !== 0) {
    const orgNames = organizations.map((org) => org.name);
    redirect(`/dashboard/${orgNames[0]}/overview`);
  }

  return (
    <div className="flex flex-col items-center  justify-center min-h-[calc(100vh-73px)] w-full">
      <div className="flex flex-col items-center w-[280px]  sm:w-[500px] gap-4 p-10 bg-slate-50 border rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900"><span className="text-fuchsia-900">Edit</span>thing</h1>
        <h2 className="text-center font-semibold">Create an organization to get started</h2>
        <p className="text-center">An organization is where you create projects and add team members. You can add multiple organiations in your account for different collaboration projects. </p>

      </div>
    </div >
  )
}
