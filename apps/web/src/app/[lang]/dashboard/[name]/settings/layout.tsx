"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { cn } from "~/lib/utils";

type SettingsProps = {
  params: {
    name: string;
  };
} & PropsWithChildren;

export default function Settings({ params, children }: SettingsProps) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full flex-1 px-6 py-8 sm:p-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex h-full flex-col lg:flex-row">
          <nav className="mr-2 w-full shrink-0 lg:w-1/5">
            <div className="mb-4 mt-1 flex flex-row pr-2 lg:flex-col">
              <Link href={`/dashboard/${params.name}/settings`}>
                <div
                  className={cn(
                    "px-2 pb-2 capitalize border-b lg:border-b-0 lg:border-l lg:pb-0",
                    pathname.split("/").at(-1) === "settings"
                      ? "cursor-default border-fuchsia-900 text-fuchsia-900"
                      : "border-transparent hover:border-slate-300",
                  )}
                >
                  general
                </div>
              </Link>
              <Link href={`/dashboard/${params.name}/settings/members`}>
                <div
                  className={cn(
                    "px-2 pb-2 capitalize border-b lg:border-b-0 lg:border-l lg:pb-0",
                    ["members", "invitations"].includes(
                      pathname.split("/").at(-1)!,
                    )
                      ? "cursor-default border-fuchsia-900 text-fuchsia-900"
                      : "border-transparent hover:border-slate-300",
                  )}
                >
                  members
                </div>
              </Link>
            </div>
          </nav>

          {children}
        </div>
      </div>
    </div>
  );
}
