"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  type Organization,
} from "~/lib/validators/organization";
import {
  createOrganization,
  getOwnOrganizations,
} from "~/server/actions/organization";

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
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/toaster/use-toast";
import { useTranslation } from "~/i18n/client";
import type { SupportedLanguages } from "~/i18n/settings";
interface OrganizationSelectProps {
  lang: SupportedLanguages;
}

export default function OrganizationSelect({ lang }: OrganizationSelectProps) {
  const pathname = usePathname();
  const organizationFromPathname = decodeURIComponent(
    // @ts-expect-error Since we are taking something from a pathname there has to be something
    pathname.split("/").at(3),
  );
  const router = useRouter();
  const { toast } = useToast();

  const { t } = useTranslation(lang, "translation", { keyPrefix: "navbar" });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [pathname]);

  const {
    data: organizations,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const [organizations, err] = await getOwnOrganizations();

      if (err !== null) {
        console.error(err);
      }

      return organizations;
    },
  });

  const form = useForm<InsertOrganization>({
    resolver: zodResolver(insertOrganizationSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createOrganizationMutation } = useMutation<
    Organization | null,
    Error,
    InsertOrganization
  >({
    mutationKey: ["create", "organization"],
    mutationFn: async (insertData) => {
      const [newOrg, err] = await createOrganization(insertData);

      if (err !== null) {
        toast({
          title: "Error",
          description: err,
        });
      } else {
        toast({
          title: "Success",
          description: "Organization created successfully",
        });

        router.push(`/dashboard/${newOrg.name}/overview`);
        setIsModalOpen(false);
        refetch();
      }

      return newOrg;
    },
  });

  const onSubmit: SubmitHandler<InsertOrganization> = (data) => {
    createOrganizationMutation({ name: data.name });
  };

  const onError: SubmitErrorHandler<InsertOrganization> = (error) => {
    console.error(error);
  };

  return isLoading ? (
    <Skeleton className="h-[40px] w-[180px] bg-slate-200" />
  ) : (
    <>
      {organizations && organizations?.length > 0 ? (
        <Select
          value={organizationFromPathname}
          onValueChange={(newValue) => {
            router.push(`/dashboard/${newValue}/overview`);
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
                {t("add_new_organization_button")} <Plus size={16} />
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <span className="mr-3">{t("create_organization_button")}</span>

          <Plus size={16} />
        </Button>
      )}

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
                <DialogTitle>{t('create_organization_modal.title')}</DialogTitle>
              </DialogHeader>

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4 flex flex-col gap-2">
                    <FormLabel htmlFor="name">{t('create_organization_modal.label')}</FormLabel>

                    <FormControl>
                      <Input
                        placeholder={t('create_organization_modal.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">{t('create_organization_modal.create_button')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
