"use client";

import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

import { SignOutButton } from "./authButtons";
import Profile from "./profile";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export default function Dashnav() {
  const pathname = usePathname();
  const session = useSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <nav className="p- flex items-center justify-between bg-slate-100 p-2">
        <div className="flex pl-1">
          <h1 className="pr-3 text-3xl font-bold text-gray-900">Dashboard</h1>
          <Button
            className={cn(
              "mx-2",
              pathname === "/dashboard/overview"
                ? "border-x-2 border-slate-200 font-bold"
                : "px-4",
            )}
            variant="ghost"
          >
            <Link href={"/dashboard/overview"}>overview</Link>
          </Button>
          {/* for some reason separator does not display */}
          <Separator orientation="vertical" />
          <Button
            className={cn(
              "mx-2",
              pathname === "/dashboard/settings"
                ? "border-x-2 border-slate-200 font-bold"
                : "px-4",
            )}
            variant="ghost"
          >
            <Link href={"/dashboard/settings"}>settings</Link>
          </Button>
        </div>
        <div>
          {session ? (
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
                  Back to Homepage
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
