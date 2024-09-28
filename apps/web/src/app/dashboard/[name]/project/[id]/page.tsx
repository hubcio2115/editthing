import { redirect } from "next/navigation";
import ProjectView from "~/components/dashboard/project-view";
import { getProjectById } from "~/server/actions/project";
import {
  getChannel,
  getYoutubeCategories,
  getYoutubeSupportedLanguages,
} from "~/server/api/utils/project";

type ProjectPageProps = {
  params: {
    name: string;
    id: string;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const [project, err] = await getProjectById(+params.id);

  if (err !== null) {
    if (err === "UNAUTHORIZED") {
      return redirect("/404");
    }

    throw new Error(err);
  }

  if (project === null) {
    return redirect("/404");
  }

  const [channel, channelErr] = await getChannel(project.channelId);

  if (channelErr !== null) {
    return redirect("/404");
  }

  const [[languages, languagesErr], [categories, categoriesErr]] =
    await Promise.all([getYoutubeSupportedLanguages(), getYoutubeCategories()]);

  if (languagesErr !== null || categoriesErr !== null) {
    throw new Error("Something went wrong on our end");
  }

  return (
    <ProjectView
      project={project}
      channel={channel}
      languages={languages}
      categories={categories}
    />
  );
}
