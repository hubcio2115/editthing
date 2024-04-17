import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ytUSCategories } from "~/lib/data/yt";
import { cn } from "~/lib/utils";
import type { ProjectDetails } from "~/lib/validators/project";
import { type EditProject, editProjectSchema } from "~/lib/validators/project";

interface EditProjectFormProps {
  projectDetails: ProjectDetails;
}

export default function EditProjectForm({
  projectDetails,
}: EditProjectFormProps) {
  const form = useForm<EditProject>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      id: projectDetails.id,
      projectName: projectDetails.projectName,
      projectDescription: projectDetails.projectDescription,
      title: projectDetails.title ? projectDetails.title : "",
      description: projectDetails.description ? projectDetails.description : "",
      categoryId: projectDetails.categoryId ? projectDetails.categoryId : "22",
      // defaultLanguage:
      embeddable: projectDetails.embeddable ? projectDetails.embeddable : false,
      license: projectDetails.license
        ? projectDetails.license
        : "creativeCommon",
      privacyStatus: projectDetails.privacyStatus
        ? projectDetails.privacyStatus
        : "private",
      publicStatsViewable: projectDetails.publicStatsViewable
        ? projectDetails.publicStatsViewable
        : false,
      publishAt: projectDetails.publishAt
        ? new Date(projectDetails.publishAt)
        : new Date(),
    },
  });

  const onSubmit = (values: EditProject) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {ytUSCategories.items.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.snippet.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="embeddable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Embeddable</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>License</SelectLabel>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="creativeCommon">
                      Creative Common
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacyStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Privacy status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Privacy status</SelectLabel>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publicStatsViewable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public stats viewable</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publishAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publish at</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit">Update project</Button>
      </form>
    </Form>
  );
}
