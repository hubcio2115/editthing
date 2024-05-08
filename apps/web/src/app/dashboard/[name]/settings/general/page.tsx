"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
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
import { deleteOrganization, getOwnOrganizationByName, updateOrganizationName } from "~/server/actions/organization";


type SettingsMembersViewProps = {
  params: {
    name: string;
  };

};

function SettingsGeneral({ params }: SettingsMembersViewProps) {
  const { toast } = useToast();
  const router = useRouter();


  const { data: organization, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const [organization, err] = await getOwnOrganizationByName(params.name)

      if (err !== null) {
        console.error(err);
      }

      return organization;
    },
  });


  const { mutate: updateOrganizationNameMutation } = useMutation({
    mutationFn: updateOrganizationName,
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update organization name: ${error.message}`

      })
    },
    onSuccess: (_, { name }) => {
      toast({
        title: "Success",
        description: `Organization name updated to ${name}`
      });
      router.push(`/dashboard/${name}/settings/general`);
    },
  });

  const { mutate: deleteOrganizationMutation } = useMutation({
    mutationFn: deleteOrganization,
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete organization: ${error.message}`
      })

    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Organization deleted successfully`
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



  return (organization ? (
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

      {!organization[0]?.defaultOrg ? (
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
              if (organization?.name) {
                // TODO: Add a proper confirmation dialog
                if (
                  confirm("Are you sure you want to delete this organization?")
                ) {
                  deleteOrganizationMutation(organization.name);
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
              {organization?.name}{" "}
            </span>
            organization{" "}
            <span className="font-semibold text-gray-600">cannot</span> be
            deleted.
          </p>
        </div>
      )}
    </div>
  ) : <div className="flex justify-center"><Loader2Icon size={"64px"} className="animate-spin" /></div>)

}

export default SettingsGeneral;
