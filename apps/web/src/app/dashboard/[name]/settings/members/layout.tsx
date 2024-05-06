"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type PropsWithChildren, useState } from "react";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { cn } from "~/lib/utils";
import { type Invite, inviteSchema } from "~/lib/validators/invite";

function SettingsMembers({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const organizationFromPathname = pathname.split("/").at(2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<Invite>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Invite> = (data) => {
    // TODO: Handle invitation sending
    toast({
      title: "Success",
      description: `Invitation sent to ${data.email}`,
    });
    setIsModalOpen(false);
  };

  const onError: SubmitErrorHandler<Invite> = (error) => {
    toast({
      title: "Error",
      description: `Failed to send and invitation: ${error}`,
    });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-10">
        <div className="flex justify-between">
          <div>
            <h2 className="font-selibold text-xl">Members</h2>
            <p className="text-gray-600">
              All members and administrators with access to the{" "}
              <span className="font-semibold">{organizationFromPathname}</span>{" "}
              organization.
            </p>
          </div>
          <div className="flex items-center">
            {/* TODO: Handle form submit */}
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              invite member
            </Button>
          </div>
        </div>
        <div className="flex">
          <Link href="/dashboard/stasiu/settings/members">
            <div
              className={cn(
                "text-l border-b  border-transparent px-2 pl-2 capitalize last:border-r-0",
                pathname.split("/").at(-1) === "members"
                  ? "cursor-default border-b border-b-fuchsia-900 text-fuchsia-900"
                  : "hover:border-b hover:border-slate-300",
              )}
            >
              members
            </div>
          </Link>
          <Link href="/dashboard/stasiu/settings/members/invitations">
            <div
              className={cn(
                "text-l border-b  border-transparent px-2 pl-2 capitalize last:border-r-0",
                pathname.split("/").at(-1) === "invitations"
                  ? "cursor-default border-b border-b-fuchsia-900 text-fuchsia-900"
                  : "hover:border-b hover:border-slate-300",
              )}
            >
              invitations
            </div>
          </Link>
        </div>
        {children}
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit, onError)}
            >
              <DialogHeader>
                <DialogTitle>Invite member</DialogTitle>
              </DialogHeader>

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4 flex flex-col gap-2">
                    <FormLabel htmlFor="name">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Invite</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SettingsMembers;