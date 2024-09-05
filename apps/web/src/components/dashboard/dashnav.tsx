"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

interface DashnavProps {
  orgName: string;
}

export default function Dashnav({ orgName }: DashnavProps) {
  const pathname = usePathname();

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

  return (
    <nav className="flex justify-center bg-slate-100">
      {links.map((link) => (
        <div
          key={link.path}
          className={cn(
            "border-transparent px-2 pb-2 capitalize border-b",
            pathname.startsWith(link.path)
              ? "border-b border-b-fuchsia-900 text-fuchsia-900"
              : "hover:border-slate-300 ",
          )}
        >
          <Link href={link.path}>{link.label}</Link>
        </div>
      ))}
    </nav>
  );
}
