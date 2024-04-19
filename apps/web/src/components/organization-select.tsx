"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";

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

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type OrganizationForm = Omit<InsertOrganization, "owner">;

export default function OrganizationSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const [organizationFromPathname, setOrganizationFromPathname] =
    useState<string>(pathname.split("/").at(2)!);

  useEffect(() => {
    setOrganizationFromPathname(pathname.split("/").at(2)!);
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: organizations, isLoading } =
    api.organization.getOwnOrganizations.useQuery();

  function selectOrganization(orgId: string) {
    router.push(`/dashboard/${orgId}/`);
  }

  const form = useForm<OrganizationForm>({
    resolver: zodResolver(insertOrganizationSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createOrganization } =
    api.organization.createOrganization.useMutation({
      onSuccess: (data) => {
        if (!!data) {
          router.push(`/dashboard/${data.name}/overview`);
        }
      },
    });

  const onSubmit: SubmitHandler<OrganizationForm> = (data) => {
    createOrganization({ name: data.name });
    setIsModalOpen(false);
  };

  const onError: SubmitErrorHandler<OrganizationForm> = (error) => {
    console.error(error);
  };

  return (
    <>
      {!isLoading && (
        <>
          <Select
            value={organizationFromPathname}
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
                    <DialogTitle>New Organization</DialogTitle>
                  </DialogHeader>

                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mt-4 flex flex-col gap-2">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your new orgnization name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
