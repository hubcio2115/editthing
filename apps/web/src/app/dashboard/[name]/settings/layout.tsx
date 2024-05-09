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
            <div className="mt-1 flex flex-row lg:flex-col pr-2 mb-4">
              <Link
                href={`/dashboard/${pathname
                  .split("/")
                  .at(2)}/settings/general`}
              >
                <div
                  className={cn(
                    "text-l border-transparent pb-2 lg:pb-0 px-2 capitalize last:border-r-0",
                    pathname.split("/").at(-1) === "general"
                      ? "cursor-default border-b lg:border-l lg:border-b-0 lg:border-l-fuchsia-900 border-b-fuchsia-900 text-fuchsia-900"
                      : "hover:border-b border-slate-300 lg:hover:border-b-0 lg:hover:border-l",
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
                    "text-l border-transparent pb-2 lg:pb-0 px-2 capitalize last:border-r-0",
                    ["members", "invitations"].includes(
                      pathname.split("/").at(-1)!,
                    )
                      ? "cursor-default border-b lg:border-l lg:border-b-0 lg:border-l-fuchsia-900 border-b-fuchsia-900 text-fuchsia-900"
                      : "hover:border-b border-slate-300 lg:hover:border-b-0 lg:hover:border-l",
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
