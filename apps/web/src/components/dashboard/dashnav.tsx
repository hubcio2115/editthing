"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

import organizationsMock from "~/lib/mock/organizations";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function Dashnav() {
  const { data: _organizations } =
    api.organization.getOwnOrganizations.useQuery();

  const pathname = usePathname();
  const session = useSession();
  const orgName = pathname.split("/").at(2);

  if (session.status === "unauthenticated") {
    redirect("/");
  }

  const links = [
    {
      path: `/dashboard/${orgName}/overview`,
      label: "overview",
    },
    {
      path: `/dashboard/${orgName}/settings/general`,
      label: "settings",
    },
  ];

  return _organizations?.find((org) => org.name === orgName) ? (
    <nav className="flex justify-center  bg-slate-100 ">
      {links.map((link) => (
        <div
          key={link.path}
          className={cn(
            "text-l border-slate-300 px-2 pb-2 capitalize last:border-r-0 hover:border-b",
            pathname.startsWith(link.path.replace("/general", ""))
              ? "border-b border-b-fuchsia-900 text-fuchsia-900"
              : "",
          )}
        >
          <Link href={link.path}>{link.label}</Link>
        </div>
      ))}
    </nav>
  ) : null;
}
