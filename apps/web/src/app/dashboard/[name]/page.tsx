import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function Organization() {
  const heads = headers();
  const orgFromPath = heads.get("next-url")?.split("/").at(2)!;
  const organizations = await api.organization.getOwnOrganizations.query();
  const orgNames = organizations.map((org) => org.name!);

  if (orgNames.includes(orgFromPath)) {
    redirect(`/dashboard/${orgFromPath}/overview`);
  } else {
    redirect("/dashboard");
  }
}
