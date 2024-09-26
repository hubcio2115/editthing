"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { useTranslation } from "~/app/i18n/client";
import type { SupportedLanguages } from "~/app/i18n/settings";

import AlertModal from "~/components/modals/alertModal";
import DialogModal from "~/components/modals/dialogModal";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import { useToast } from "~/components/ui/toaster";
import { type Invite, inviteSchema } from "~/lib/validators/invite";
import { type OrgMemberRole, roleEnum } from "~/lib/validators/organization";
import {
  addMemberToOrganizationByUserEmail,
  getMembersOfOrganization,
  getOwnOrganizationByName,
  removeMemberFromOrganization,
  updateMemberRole,
} from "~/server/actions/organization";

type SettingsMembersViewProps = {
  params: {
    name: string;
    lang: SupportedLanguages;
  };
};

type RoleInfo = {
  memberId: string;
  organizationId: number;
  role: OrgMemberRole;
};

export default function SettingsMembersPage({ params }: SettingsMembersViewProps) {
  const session = useSession();
  const formMethods = useForm();
  const router = useRouter();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { t, i18n } = useTranslation(params.lang, "settings", {
    keyPrefix: "members",
  });

  const newRole = useRef<RoleInfo | null>(null);
  const { data: organization, isFetched } = useQuery({
    queryKey: ["organization", params.name],
    queryFn: async () => {
      const [organizations, err] = await getOwnOrganizationByName(params.name);
      if (err !== null) {
        console.error(err);
      }

      return organizations;
    },
  });

  const {
    data: userData,
    refetch: refetchUsers,
    isFetched: usersLoaded,
  } = useQuery({
    queryKey: ["members", organization?.id],
    queryFn: () => getMembersOfOrganization(organization!.id),
    enabled: !!organization?.id && isFetched,
  });

  const currentUserRole = userData?.find(
    (user) => user.user?.id === session.data?.user.id,
  )?.usersToOrganizations.role;

  const usersInOrganization = userData?.map(
    ({ usersToOrganizations }) => usersToOrganizations.memberId,
  );

  async function handleRoleChange(
    newValue: RoleInfo["role"],
    userId: RoleInfo["memberId"],
  ) {
    if (newValue === "owner") {
      setIsAlertOpen(true);
      newRole.current = {
        memberId: userId,
        organizationId: organization!.id,
        role: newValue,
      };
      return;
    }

    try {
      await updateMemberRole({
        memberId: userId,
        organizationId: organization!.id,
        role: newValue,
      });
      refetchUsers();
      toast({
        title: i18n.t("success"),
        description: t("toast.update_role.success", { role: newValue }),
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: i18n.t("error"),
          description: t("toast.update_role.error", { error: error.message }),
        });
      }
    }
  }

  async function handleAlertAccepted() {
    setIsAlertOpen(false);
    if (newRole.current) {
      await updateMemberRole(newRole.current);
      refetchUsers();
      newRole.current = null;
    }
  }

  async function handleRemoveMember(userId: string) {
    try {
      await removeMemberFromOrganization({
        memberId: userId,
        organizationId: organization!.id,
      });
      toast({
        title: i18n.t("success"),
        description: t("toast.remove_user.success"),
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: i18n.t("error"),
          description: t("toast.remove_user.error", { error: error.message }),
        });
      }
    }
  }

  async function handleLeave() {
    try {
      await removeMemberFromOrganization({
        memberId: session.data!.user.id,
        organizationId: organization!.id,
      });
      toast({
        title: i18n.t("success"),
        description: t("toast.leave_org.success"),
      });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: i18n.t("error"),
          description: t("toast.leave_org.error", { error: error.message }),
        });
      }
    }
  }

  const form = useForm<Invite>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Invite> = async (data) => {
    try {
      await addMemberToOrganizationByUserEmail({
        email: data.email,
        organizationId: organization!.id,
        role: "user",
      });

      refetchUsers();

      toast({
        title: i18n.t("success"),
        description: t("toast.invite_member.success", { email: data.email }),
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: i18n.t("error"),
          description: t("toast.invite_member.error", { email: error.message }),
        });
      }
    }

    setIsModalOpen(false);
  };

  const onError: SubmitErrorHandler<Invite> = (error) => {
    console.log(error);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-10">
        <div className="flex justify-between">
          <div>
            <h2 className="font-selibold text-xl">{t("title")}</h2>

            <p className="text-gray-600">{t("description")}</p>
          </div>

          <div className="flex items-center">
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
              disabled={currentUserRole === "user" || !usersLoaded}
            >
              {t("add_member_button")}
            </Button>
          </div>
        </div>
        {userData ? (
          <div className="grid w-full grid-cols-4 sm:grid-cols-5 lg:grid-cols-8">
            <div className="col-span-full grid grid-cols-4 rounded-md border bg-gray-100 p-2 sm:grid-cols-5 lg:grid-cols-8">
              <div className="col-span-2 sm:col-span-3 lg:col-span-6">
                {t("member_table.columns.member")}
              </div>

              <div className="col-span-2 whitespace-nowrap text-left">
                {t("member_table.columns.role")}
              </div>
            </div>

            {userData?.map(({ user, usersToOrganizations }) => (
              <div
                key={user?.id}
                className="col-span-full grid grid-cols-4 border-b py-2 last:border-none sm:grid-cols-5 lg:grid-cols-8"
              >
                <div className="col-span-2 flex items-center pl-2 sm:col-span-3 lg:col-span-6">
                  {user?.name}
                </div>

                <div className="col-span-1 flex items-center">
                  <Select
                    value={usersToOrganizations.role}
                    disabled={
                      currentUserRole === "user" ||
                      usersToOrganizations.role === "owner" ||
                      (currentUserRole === "owner" &&
                        usersInOrganization!.length < 2)
                    }
                    onValueChange={(newValue: OrgMemberRole) =>
                      handleRoleChange(newValue, user!.id)
                    }
                  >
                    <SelectTrigger className="w-[90px]">
                      <SelectValue placeholder={usersToOrganizations.role} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          key={roleEnum.Values.owner}
                          disabled={currentUserRole === "admin"}
                          value={roleEnum.Values.owner}
                        >
                          {t("member_table.roles.owner")}
                        </SelectItem>
                        <SelectItem
                          key={roleEnum.Values.admin}
                          value={roleEnum.Values.admin}
                        >
                          {t("member_table.roles.admin")}
                        </SelectItem>
                        <SelectItem
                          key={roleEnum.Values.user}
                          value={roleEnum.Values.user}
                        >
                          {t("member_table.roles.user")}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 flex justify-center">
                  {session.data?.user.id === user?.id ? (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      {t('leave_section.leave_button')}
                    </Button>
                  ) : currentUserRole === "owner" ||
                    (currentUserRole === "admin" &&
                      usersToOrganizations.role !== "owner") ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveMember(user!.id)}
                    >
                      {t('leave_section.remove_button')}
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Skeleton className="w-full h-[60vh] lg:h-[65vh] bg-slate-200" />
        )}
      </div>

      <Form {...formMethods}>
        <DialogModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={t("invite_modal.title")}
          onSubmit={form.handleSubmit(onSubmit, onError)}
          footerText={t("invite_modal.footer")}
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-col gap-2">
                <FormLabel htmlFor="name">{t("invite_modal.email_label")}</FormLabel>

                <FormControl>
                  <Input placeholder={t("invite_modal.input_placeholder")} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </DialogModal>
      </Form>

      <AlertModal
        lang={params.lang}
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title={t("leave_section.alert.title")}
        description={t("leave_section.alert.description")}
        onCancel={() => setIsAlertOpen(false)}
        onConfirm={handleAlertAccepted}
      />
    </>
  );
}
