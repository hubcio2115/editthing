"use client";

import { LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import OrganizationSelect from "./organization-select";
import Profile from "./profile";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { SupportedLanguages } from "~/i18n/settings";
import { useTranslation } from "~/i18n/client";

interface NavbarProps {
  lang: SupportedLanguages;
}

export default function Navbar({ lang }: NavbarProps) {
  const pathname = usePathname();
  const isOnDashboard = pathname.includes("/dashboard");

  const session = useSession();

  const { t } = useTranslation(lang, "translation", { keyPrefix: "navbar" });

  const shouldShowOrganizationsSelect =
    session.status === "authenticated" && isOnDashboard;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          <span className="text-fuchsia-900">Edit</span>
          thing
        </h1>

        {shouldShowOrganizationsSelect && <OrganizationSelect lang={lang} />}
      </div>

      <div>
        {session.status === "authenticated" ? (
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Profile session={session.data} />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  <LogOut
                    className="mr-2 h-4 w-4 hover:cursor-pointer"
                    color="red"
                  />
                  <span>{t("logout_button")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!isOnDashboard && (
              <Link href={`/${lang}/dashboard/`}>
                <Button variant="outline" className="rounded-full">
                  {t("dashboard_button")}
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <Button
            variant="ghost"
            onClick={() => {
              signIn();
            }}
          >
            {t("signin_button")}
          </Button>
        )}
      </div>
    </div>
  );
}
