import VideUploadForm from "~/components/create-project/create-project-form";
import { createEndpointForMuxUpload } from "~/server/actions/mux";
import { getOwnOrganizationByName } from "~/server/actions/organization";

type CreateProjectPageProps = {
  params: {
    name: string;
  };
};

export default async function CreateProjectPage({
  params,
}: CreateProjectPageProps) {
  const [upload, uploadErr] = await createEndpointForMuxUpload();
  if (uploadErr !== null) {
    throw new Error(uploadErr);
  }

  const [org, err] = await getOwnOrganizationByName(params.name);
  if (err !== null) {
    throw new Error(err);
  }

  return <VideUploadForm upload={upload} org={org} />;
}
