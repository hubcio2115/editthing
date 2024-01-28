"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

const links = [
  {
    path: "/dashboard/overview",
    label: "overview",
  },
  {
    path: "/dashboard/settings",
    label: "settings",
  },
] as const;

export default function Dashnav() {
  const pathname = usePathname();
  const session = useSession();

  if (session.status === "unauthenticated") {
    redirect("/");
  }

  return (
    <>
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
    </>
  );
}
