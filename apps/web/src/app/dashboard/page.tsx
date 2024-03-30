import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function Dashboard() {
  const organizations = await api.organization.getOwnOrganizations.query();
  const orgNames = organizations.map((org) => org.name!);

  redirect(`/dashboard/${orgNames[0]}/overview`);
}
