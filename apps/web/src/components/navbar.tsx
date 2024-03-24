"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  type InsertOrganization,
  insertOrganizationSchema,
} from "~/lib/validators/organization";
import { api } from "~/trpc/react";

import { SignOutButton } from "./authButtons";
import Profile from "./profile";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type OrganizationForm = Omit<InsertOrganization, "owner">;

export default function Navbar() {
  const organizationFromPathname = usePathname().split("/").at(2);
  const isOnDashboard = usePathname().includes("/dashboard");

  const router = useRouter();
  const session = useSession();

  // FIXME: this tries to fetch the user's organizations even if the user is not authenticated
  const { data: organizations } =
    api.organization.getOwnOrganizations.useQuery();

  const { mutate: createOrganization } =
    api.organization.createOrganization.useMutation({
      onSuccess: (data) => {
        if (!!data) router.push(`/dashboard/${data.id}/overview`);
      },
    });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit } = useForm<OrganizationForm>({
    resolver: zodResolver(insertOrganizationSchema.omit({ owner: true })),
  });

  const onSubmit: SubmitHandler<OrganizationForm> = (data) => {
    createOrganization({ name: data.name });
    setIsModalOpen(false);
  };

  const onError: SubmitErrorHandler<OrganizationForm> = (error) => {
    console.error(error);
  };

  const selectOrganization = (orgId: string) => {
    router.push(`/dashboard/${orgId}/`);
  };

  const shouldShowOrganizationsSelect = useMemo(
    () =>
      session.status === "authenticated" &&
      organizations?.length !== 0 &&
      isOnDashboard,
    [session, organizations],
  );

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-fuchsia-900">Edit</span>
            thing
          </h1>

          {shouldShowOrganizationsSelect && (
            <Select
              onValueChange={(newValue) => {
                selectOrganization(newValue);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={organizationFromPathname} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {organizations?.map((org) => (
                    <SelectItem
                      value={org.name}
                      key={org.id}
                      className="hover:cursor-pointer"
                    >
                      {org.name}
                    </SelectItem>
                  ))}
                  <div
                    className="text-slate relative m-auto flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm font-light text-slate-400 outline-none hover:cursor-pointer focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Add new <Plus size={16} />
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          {session.status === "authenticated" ? (
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Profile session={session.data} />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-[200px]">
                  {isOnDashboard && (
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      Create Organization
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut
                      className="mr-2 h-4 w-4 hover:cursor-pointer"
                      color="red"
                    />
                    {/*TODO: Log Out has some issues on the dashboard page */}
                    <SignOutButton>Log out</SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {!isOnDashboard && (
                <Link
                  href={
                    organizations && organizations.length > 0
                      ? `/dashboard/${organizations[0]?.id}/overview`
                      : "/dashboard/"
                  }
                >
                  <Button variant="outline" className="rounded-full">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <DialogHeader>
              <DialogTitle>New Organization</DialogTitle>
            </DialogHeader>

            <div className="mt-4 flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>

              <Input {...register("name")} id="name" />
            </div>

            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
