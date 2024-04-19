"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

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
import { api } from "~/trpc/react";

function SettingsGeneral() {
  const { toast } = useToast();
  const organizationFromPathname = usePathname().split("/").at(2)!;
  const router = useRouter();
  const { data: organization } =
    api.organization.getOwnOrganizationByName.useQuery(
      organizationFromPathname,
    );

  const { mutate: updateOrganizationName } =
    api.organization.updateOrganizationName.useMutation({
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to update organization name: ${error}`,
        });
      },
      onSuccess: (_data, { name }) => {
        toast({
          title: "Success",
          description: "Organization name updated",
        });
        router.push(`/dashboard/${name}/settings/general`);
      },
    });

  const { mutate: deleteOrganization } =
    api.organization.deleteOrganization.useMutation({
      onError: (error) => {
        console.error("Failed to delete organization", error);
      },
      onSuccess: () => {
        router.push("/dashboard");
      },
    });

  const form = useForm<UpdateOrganizationName>({
    resolver: zodResolver(updateOrganizationNameSchema),
    defaultValues: {
      name: organizationFromPathname,
      oldName: organizationFromPathname,
    },
  });

  const onSubmit: SubmitHandler<UpdateOrganizationName> = (data) => {
    updateOrganizationName(data);
  };

  const onError: SubmitErrorHandler<UpdateOrganizationName> = (error) => {
    console.error(error);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-selibold text-xl">General</h2>
        <p className="text-gray-600">
          Settings and options for the{" "}
          <span className="font-semibold">{organizationFromPathname}</span>{" "}
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
                    placeholder={organizationFromPathname}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit">
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
              {organizationFromPathname}{" "}
            </span>
            organization is{" "}
            <span className="font-semibold text-red-600">permanent</span> and{" "}
            <span className="font-semibold text-red-600">cannot be undone</span>
            .
          </p>
          <Button
            onClick={() => {
              if (organizationFromPathname) {
                // #TODO: Add a proper confirmation dialog
                if (
                  confirm("Are you sure you want to delete this organization?")
                ) {
                  deleteOrganization(organizationFromPathname);
                }
              }
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
              {organizationFromPathname}{" "}
            </span>
            organization{" "}
            <span className="font-semibold text-gray-600">cannot</span> be
            deleted.
          </p>
        </div>
      )}
    </div>
  );
}

export default SettingsGeneral;
