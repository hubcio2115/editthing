import { redirect } from "next/navigation";

import {
  getOwnOrganizations,
} from "~/server/actions/organization";

export default async function Dashboard() {
  const [organizations, err] = await getOwnOrganizations();

  if (err !== null) {
    throw err;
  } else {
    const orgNames = organizations.map((org) => org.name);
    redirect(`/dashboard/${orgNames[0]}/overview`);
  }
}
