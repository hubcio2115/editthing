"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { useTranslation } from "~/i18n/client";
import type { SupportedLanguages } from "~/i18n/settings";

import AlertModal from "~/components/modals/alertModal";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { useToast } from "~/components/ui/toaster";
import {
  type UpdateOrganizationName,
  updateOrganizationNameSchema,
} from "~/lib/validators/organization";
import {
  deleteOrganization,
  getMembersOfOrganization,
  getOwnOrganizationByName,
  updateOrganizationName,
} from "~/server/actions/organization";

type SettingsMembersViewProps = {
  params: {
    name: string;
    lang: SupportedLanguages;
  };
};

export default function SettingsGeneralPage({
  params,
}: SettingsMembersViewProps) {
  const { t, i18n } = useTranslation(params.lang, "settings", {
    keyPrefix: "general",
  });

  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    data: organization,
    isLoading,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["organization", params.name],
    queryFn: async () => {
      const [organization, err] = await getOwnOrganizationByName(params.name);

      if (err !== null) {
        router.push("/404");
      }

      return organization;
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["members", organization?.id],
    queryFn: () => getMembersOfOrganization(organization!.id),
    enabled: isFetched && !!organization?.id,
  });

  const currentUserRole = userData?.find(
    (user) => user.user?.id === session.data?.user.id,
  )?.usersToOrganizations.role;

  const { mutate: updateOrganizationNameMutation } = useMutation({
    mutationFn: updateOrganizationName,
    onError: (error) => {
      toast({
        title: i18n.t("error"),
        description: t("toast.update.error", { error: error.message }),
      });
    },
    onSuccess: (_, { name }) => {
      toast({
        title: i18n.t("success"),
        description: t("toast.update.success", { name }),
      });
      refetch();
    },
  });

  const { mutate: deleteOrganizationMutation } = useMutation({
    mutationFn: deleteOrganization,
    onError: (error) => {
      toast({
        title: i18n.t("error"),
        description: t("toast.delete.error", { error: error.message }),
      });
    },
    onSuccess: () => {
      toast({
        title: i18n.t("success"),
        description: t("toast.delete.success"),
      });
      router.push("/dashboard");
    },
  });

  const form = useForm<UpdateOrganizationName>({
    resolver: zodResolver(updateOrganizationNameSchema),
    defaultValues: {
      name: params.name,
      oldName: params.name,
    },
  });

  function onSubmit(data: UpdateOrganizationName) {
    updateOrganizationNameMutation(data);
  }

  function onError(error: FieldErrors<UpdateOrganizationName>) {
    console.error(error);
  }

  return organization && !isLoading ? (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-selibold text-xl">{t("title")}</h2>

        <Trans
          t={t}
          i18nKey="description"
          className="text-gray-600"
          values={{ name: organization.name }}
        >
          Settings and options for the
          <span className="font-semibold" />
          organization.
        </Trans>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel
                  className="font-semibold text-gray-600"
                  htmlFor="name"
                >
                  {t("name_form.label")}
                </FormLabel>

                <FormControl>
                  <Input
                    className="w-fit"
                    disabled={currentUserRole !== "owner"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={currentUserRole !== "owner"}
            type="submit"
            className="w-fit"
          >
            {t("name_form.submit_button")}
          </Button>
        </form>
      </Form>

      {!organization?.defaultOrg ? (
        <div className="flex flex-col gap-2 rounded-md border border-gray-600 p-4">
          <p className="font-semibold text-red-600">
            {t("delete_section.title")}
          </p>

          <p>
            <Trans
              t={t}
              i18nKey="delete_section.description"
              values={{ name: organization.name }}
            >
              Please note that deleting the
              <span className="font-semibold text-red-600" />
              organization is
              <span className="font-semibold text-red-600" /> and
              <span className="font-semibold text-red-600" />.
            </Trans>
          </p>

          <Button
            onClick={() => {
              setIsAlertOpen(true);
            }}
            variant="outline"
            className="w-fit border-red-600"
          >
            <Trash2 className="text-red-600" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 rounded-md border border-gray-600 p-4">
          <p className="font-semibold text-gray-600">
            {t("delete_section.default_org.title")}
          </p>

          <p>
            <Trans t={t} i18nKey="delete_section.default_org.description">
              The default organization
              <span className="font-semibold text-gray-600">cannot</span> be
              deleted.
            </Trans>
          </p>
        </div>
      )}

      <AlertModal
        lang={params.lang}
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title={t("delete_section.delete_modal.title")}
        description={t("delete_section.delete_modal.description", {
          name: organization.name,
        })}
        unlockString={organization.name}
        onCancel={() => setIsAlertOpen(false)}
        onConfirm={() => {
          deleteOrganizationMutation(organization.name);
          setIsAlertOpen(false);
        }}
      />
    </div>
  ) : (
    <div className="flex justify-center">
      <Skeleton className="w-full h-[25vw] bg-slate-100" />
    </div>
  );
}
