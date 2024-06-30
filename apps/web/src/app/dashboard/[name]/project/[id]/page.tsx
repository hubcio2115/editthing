import { Button } from "~/components/ui/button";
import { getProjectById } from "~/server/actions/project";
import {
  getUserChannels,
  uploadAnExampleVideo,
} from "~/server/actions/yt/channels";

type ProjectPageProps = {
  params: {
    name: string;
    id: string;
  };
};

export default async function ProjectPage({
  params: { name, id },
}: ProjectPageProps) {
  const [project, err] = await getProjectById(+id);
  const [channels] = await getUserChannels();

  if (err !== null) {
    throw new Error(`Error during fetching the project: ${err}`);
  }

  const channel = channels?.at(0);

  return (
    <div>
      <p>{project.id}</p>
      <img
        className="rounded-full overflow-hidden"
        src={channel?.snippet.thumbnails.default.url}
        height={channel?.snippet.thumbnails.default.height}
        width={channel?.snippet.thumbnails.default.width}
      />

      <p>
        Name: {channel?.snippet.title} {channel?.snippet.customUrl}
      </p>
      <p>Description: {channel?.snippet.description}</p>

      <form action={uploadAnExampleVideo}>
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
}
