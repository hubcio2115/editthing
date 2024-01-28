"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut } from "lucide-react";
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

  const router = useRouter();
  const session = useSession();
  const { data: organizations } =
    api.organization.getOwnOrganizations.useQuery();

  const { mutate: createOrganization } =
    api.organization.createOrganization.useMutation({
      onSuccess: (data) => {
        if (!!data) router.push(`/dashboard/${data.id}`);
      },
    });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit } = useForm<OrganizationForm>({
    resolver: zodResolver(insertOrganizationSchema.omit({ owner: true })),
  });

  const onSubmit: SubmitHandler<OrganizationForm> = (data) => {
    // createOrganization({ name: data.name });
    console.log(data);
  };

  const onError: SubmitErrorHandler<OrganizationForm> = (error) => {
    console.error(error);
  };

  const shouldShowOrganizationsSelect = useMemo(
    () => session.status === "authenticated" && organizations?.length !== 0,
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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {organizations?.map((org) => (
                    <SelectItem value={org.name} key={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
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
                  <DropdownMenuItem
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Create Organization
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" color="red" />
                    <SignOutButton>Log out</SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/dashboard/overview">
                <Button variant="outline" className="rounded-full">
                  Go to Dashboard
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
