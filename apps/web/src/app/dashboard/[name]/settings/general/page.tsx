"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

import { AlertModal } from "~/components/modals/alertModal";
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
import { useToast } from "~/components/ui/use-toast";
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
  };
};

function SettingsGeneral({ params }: SettingsMembersViewProps) {
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    data: organization,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["organization", params.name],
    queryFn: async () => {
      const [organization, err] = await getOwnOrganizationByName(params.name);

      console.log(organization, err);

      if (err !== null) {
        console.error(err);
      }

      if (organization == undefined) {
        router.push("/dashboard");
        return null;
      }

      return organization;
    },
  });

  const {
    data: userData,
    refetch: refetchUsers,
    isFetched: usersLoaded,
  } = useQuery({
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
        title: "Error",
        description: `Failed to update organization name: ${error.message}`,
      });
    },
    onSuccess: (_, { name }) => {
      toast({
        title: "Success",
        description: `Organization name updated to ${name}`,
      });
      router.push(`/dashboard/${name}/settings/general`);
    },
  });

  const { mutate: deleteOrganizationMutation } = useMutation({
    mutationFn: deleteOrganization,
    onError: (error) => {
      toast({
        title: "Error",
        description: `${error.message}`,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Organization deleted successfully`,
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

  const onSubmit: SubmitHandler<UpdateOrganizationName> = (data) => {
    updateOrganizationNameMutation(data);
  };

  const onError: SubmitErrorHandler<UpdateOrganizationName> = (error) => {
    console.error(error);
  };

  return organization && !isLoading ? (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-selibold text-xl">General</h2>
        <p className="text-gray-600">
          Settings and options for the{" "}
          <span className="font-semibold">{organization?.name}</span>{" "}
          organization.
        </p>
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
                  Organization name
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-fit"
                    placeholder={params.name}
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
            Save changes
          </Button>
        </form>
      </Form>

      {!organization?.defaultOrg ? (
        <div className="flex flex-col gap-2 rounded-md border border-gray-600 p-4">
          <p className="font-semibold text-red-600">Delete organization</p>
          <p>
            Please note that deleting the{" "}
            <span className="font-semibold text-red-600">
              {organization?.name}{" "}
            </span>
            organization is{" "}
            <span className="font-semibold text-red-600">permanent</span> and{" "}
            <span className="font-semibold text-red-600">cannot be undone</span>
            .
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
          <p className="font-semibold text-gray-600">Default organization</p>
          <p>
            The default{" "}
            <span className="font-semibold text-gray-600">
              {organization?.name}{" "}
            </span>
            organization{" "}
            <span className="font-semibold text-gray-600">cannot</span> be
            deleted.
          </p>
        </div>
      )}
      <AlertModal
        isOpen={isAlertOpen}
        onOpenChange={(open) => setIsAlertOpen(open)}
        title="Are you absolutely sure?"
        description={`This will permanently delete the organization and all its data. \n Enter the name of the organization "${organization.name}" to confirm.`}
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
      <Loader2Icon size={"64px"} className="animate-spin" />
    </div>
  );
}

export default SettingsGeneral;
