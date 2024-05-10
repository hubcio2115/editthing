"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { type PropsWithChildren, use, useEffect, useState } from "react";
import {
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

import { AlertModal } from "~/components/modals/alertModal";
import DialogModal from "~/components/modals/dialogModal";
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
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { type Invite, inviteSchema } from "~/lib/validators/invite";
import { roleEnum } from "~/lib/validators/organization";
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
  };
};

type RoleInfo = {
  memberId: string;
  organizationId: number;
  role: "user" | "owner" | "admin";
};

function SettingsMembersView({ params }: SettingsMembersViewProps) {
  const session = useSession();
  const formMethods = useForm();
  const router = useRouter();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [newRole, setNewRole] = useState<RoleInfo | null>(null);

  const {
    data: organization,
    refetch: refetchOrg,
    isFetched,
  } = useQuery({
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

  useEffect(() => {
    refetchOrg();
  }, [organization]);

  const handleRoleChange = async (
    newValue: "user" | "owner" | "admin",
    userId: string,
  ) => {
    if (newValue === "owner") {
      setIsAlertOpen(true);
      setNewRole({
        memberId: userId,
        organizationId: organization!.id,
        role: newValue,
      });
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
        title: "Success",
        description: "User role was updated successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: `${error.message} !`,
        });
      }
    }
  };

  const handleAlertAccepted = async () => {
    setIsAlertOpen(false);
    if (newRole) {
      await updateMemberRole(newRole);
      refetchUsers();
      setNewRole(null);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      await removeMemberFromOrganization({
        memberId: userId,
        organizationId: organization!.id,
      });
      toast({
        title: "Success",
        description: "User was removed successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: `${error.message} !`,
        });
      }
    }
  };

  const handleLeave = async () => {
    try {
      await removeMemberFromOrganization({
        memberId: session.data!.user.id,
        organizationId: organization!.id,
      });
      toast({
        title: "Success",
        description: "You have left the organization",
      });
      router.push("/dashboard");
      refetchUsers();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: `${error.message} !`,
        });
      }
    }
  };

  const form = useForm<Invite>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Invite> = async (data) => {
    await addMemberToOrganizationByUserEmail({
      email: data.email,
      organizationId: organization!.id,
      role: "user",
    })
      .then(() => {
        refetchUsers();
        toast({
          title: "Success",
          description: `User ${data.email} was added successfully`,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: ` ${error.message}!`,
        });
      });

    setIsModalOpen(false);
  };

  const onError: SubmitErrorHandler<Invite> = (error) => {
    console.log(error);
    toast({
      title: "Error",
      description: `Failed to send and invitation: ${error.email!.message} !`,
    });
  };

  return (
    <>
      {usersLoaded && (
        <>
          <div className="flex w-full flex-col gap-10">
            <div className="flex justify-between">
              <div>
                <h2 className="font-selibold text-xl">Members</h2>
                <p className="text-gray-600">
                  All members and administrators with access to the{" "}
                  <span className="font-semibold">{params.name}</span>{" "}
                  organization.
                </p>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  disabled={currentUserRole === "user"}
                >
                  invite member
                </Button>
              </div>
            </div>
            {userData && (
              <div className="grid w-full grid-cols-4 sm:grid-cols-5 lg:grid-cols-8">
                <div className="col-span-full grid grid-cols-4 rounded-md border bg-gray-100 p-2 sm:grid-cols-5 lg:grid-cols-8">
                  <div className="col-span-2 sm:col-span-3 lg:col-span-6">
                    Member
                  </div>
                  <div className="col-span-2 whitespace-nowrap text-left">
                    Role
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
                        onValueChange={(newValue: "user" | "owner" | "admin") =>
                          handleRoleChange(newValue, user!.id)
                        }
                      >
                        <SelectTrigger className="w-[90px]">
                          <SelectValue
                            placeholder={usersToOrganizations.role}
                          />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              key={roleEnum.Values.owner}
                              disabled={currentUserRole === "admin"}
                              value={roleEnum.Values.owner}
                            >
                              {roleEnum.Values.owner}
                            </SelectItem>
                            <SelectItem
                              key={roleEnum.Values.admin}
                              value={roleEnum.Values.admin}
                            >
                              {roleEnum.Values.admin}
                            </SelectItem>
                            <SelectItem
                              key={roleEnum.Values.user}
                              value={roleEnum.Values.user}
                            >
                              {roleEnum.Values.user}
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
                          Leave
                        </Button>
                      ) : currentUserRole === "owner" ||
                        (currentUserRole === "admin" &&
                          usersToOrganizations.role !== "owner") ? (
                        <Button
                          variant="ghost"
                          onClick={() => handleRemoveMember(user!.id)}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FormProvider {...formMethods}>
            <DialogModal
              isOpen={isModalOpen}
              onOpenChange={(open: boolean) => setIsModalOpen(open)}
              title="Invite member"
              onSubmit={form.handleSubmit(onSubmit, onError)}
              footerText="Send invitation"
            >
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
            </DialogModal>
          </FormProvider>

          <AlertModal
            isOpen={isAlertOpen}
            onOpenChange={(open) => setIsAlertOpen(open)}
            title="Are you absolutely sure?"
            description="You will transter the ownership of the organization to the selected user. Your role will be changed to admin."
            onCancel={() => setIsAlertOpen(false)}
            onConfirm={handleAlertAccepted}
          />
        </>
      )}
    </>
  );
}

export default SettingsMembersView;
