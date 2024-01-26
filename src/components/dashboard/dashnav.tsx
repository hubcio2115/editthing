"use client";

import { Home, LogOut, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

import useWindowDimensions from "~/hooks/useWindowDimensions";
import { cn } from "~/lib/utils";

import { SignOutButton } from "../authButtons";
import Profile from "../profile";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
  const { sm: isDisplaySmall } = useWindowDimensions();

  if (session.status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div>
      <div className="p- flex items-center justify-between bg-slate-100 p-2">
        <div className="flex pl-1">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-fuchsia-900">Edit</span>
            thing
          </h2>
        </div>
        <div>
          {session.status === "authenticated" ? (
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Profile session={session.data} />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" color="red" />
                    <SignOutButton>Log out</SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/">
                <Button variant="outline" className="rounded-full">
                  Back to homepage
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
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
    </div>
  );
}
