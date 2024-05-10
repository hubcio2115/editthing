"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { cn } from "~/lib/utils";

export default function Settings({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full flex-1 px-6 py-8 sm:p-12">
      <div className=" mx-auto w-full max-w-6xl">
        <div className="flex h-full flex-col lg:flex-row">
          <nav className="mr-2 w-full shrink-0 lg:w-1/5">
            <div className="mb-4 mt-1 flex flex-row pr-2 lg:flex-col">
              <Link
                href={`/dashboard/${pathname
                  .split("/")
                  .at(2)}/settings/general`}
              >
                <div
                  className={cn(
                    "text-l border-transparent px-2 pb-2 capitalize last:border-r-0 lg:pb-0",
                    pathname.split("/").at(-1) === "general"
                      ? "cursor-default border-b border-b-fuchsia-900 text-fuchsia-900 lg:border-b-0 lg:border-l lg:border-l-fuchsia-900"
                      : "border-slate-300 hover:border-b lg:hover:border-b-0 lg:hover:border-l",
                  )}
                >
                  general
                </div>
              </Link>
              <Link
                href={`/dashboard/${pathname
                  .split("/")
                  .at(2)}/settings/members`}
              >
                <div
                  className={cn(
                    "text-l border-transparent px-2 pb-2 capitalize last:border-r-0 lg:pb-0",
                    ["members", "invitations"].includes(
                      pathname.split("/").at(-1)!,
                    )
                      ? "cursor-default border-b border-b-fuchsia-900 text-fuchsia-900 lg:border-b-0 lg:border-l lg:border-l-fuchsia-900"
                      : "border-slate-300 hover:border-b lg:hover:border-b-0 lg:hover:border-l",
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
