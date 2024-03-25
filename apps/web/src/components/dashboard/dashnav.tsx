"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

import organizationsMock from "~/lib/mock/organizations";
import { cn } from "~/lib/utils";

export default function Dashnav() {
  const organizations = organizationsMock;

  const pathname = usePathname();
  const session = useSession();
  const orgId = pathname.split("/").at(2);

  if (session.status === "unauthenticated") {
    redirect("/");
  }

  const links = [
    {
      path: `/dashboard/${orgId}/overview`,
      label: "overview",
    },
    {
      path: `/dashboard/${orgId}/settings`,
      label: "settings",
    },
  ];

  return organizations.find((org) => org.id === orgId) ? (
    <nav className="flex justify-center bg-slate-100 ">
      {links.map((link) => (
        <div
          key={link.path}
          className={cn(
            "border-slate-300 px-2 pb-2 text-xl capitalize last:border-r-0 hover:border-b",
            pathname === link.path
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
