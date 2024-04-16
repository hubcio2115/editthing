import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
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
        <Button type="submit">Update project</Button>
      </form>
    </Form>
  );
}
