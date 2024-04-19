"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

import { cn } from "~/lib/utils";

export default function Settings({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full flex-1 px-6 py-8 sm:p-12">
      <div className=" mx-auto w-full max-w-6xl">
        <div className="flex h-full flex-col lg:flex-row">
          <nav className="mr-2 w-full shrink-0 lg:w-1/5">
            <div className="mt-1 hidden flex-col pr-2 lg:flex">
              <Link href="/dashboard/stasiu/settings/general">
                <div
                  className={cn(
                    "text-l border-l  border-transparent px-2 pl-2 capitalize last:border-r-0",
                    pathname.split("/").at(-1) === "general"
                      ? "cursor-default border-l border-l-fuchsia-900 text-fuchsia-900"
                      : "hover:border-l hover:border-slate-300",
                  )}
                >
                  general
                </div>
              </Link>
              <Link href="/dashboard/stasiu/settings/members">
                <div
                  className={cn(
                    "text-l border-l  border-transparent px-2 pl-2 capitalize last:border-r-0",
                    ["members", "invitations"].includes(
                      pathname.split("/").at(-1)!,
                    )
                      ? "cursor-default border-l border-l-fuchsia-900 text-fuchsia-900"
                      : "hover:border-l hover:border-slate-300",
                  )}
                >
                  members
                </div>
              </Link>
            </div>
          </nav>
          <div className="flex-1 lg:w-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
