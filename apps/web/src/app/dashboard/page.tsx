import { redirect } from "next/navigation";

import { getOwnOrganizations } from "~/server/actions/organization";

export default async function Dashboard() {
  const organizations = await getOwnOrganizations();
  const orgNames = organizations.map((org) => org.name!);

  redirect(`/dashboard/${orgNames[0]}/overview`);
}
