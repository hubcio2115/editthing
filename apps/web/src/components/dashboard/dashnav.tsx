"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";
import { getOwnOrganizations } from "~/server/actions/organization";

import { Skeleton } from "../ui/skeleton";

export default function Dashnav() {
  const { data: organizations } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const [organizations, err] = await getOwnOrganizations();

      if (err !== null) {
        console.error(err);
      }

      return organizations;
    },
  });

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
      path: `/dashboard/${orgName}/settings`,
      label: "settings",
    },
  ];

  return organizations?.find((org) => org.name === orgName) ? (
    <nav className="flex justify-center bg-slate-100">
      {links.map((link) => (
        <div
          key={link.path}
          className={cn(
            "border-slate-300 px-2 pb-2 capitalize last:border-r-0 hover:border-b",
            pathname.startsWith(link.path.replace("/general", ""))
              ? "border-b border-b-fuchsia-900 text-fuchsia-900"
              : "",
          )}
        >
          <Link href={link.path}>{link.label}</Link>
        </div>
      ))}
    </nav>
  ) : (
    <Skeleton className="h-[33px] w-[180px] bg-slate-200" />
  );
}
