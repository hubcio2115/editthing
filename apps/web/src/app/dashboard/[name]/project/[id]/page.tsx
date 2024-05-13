type ProjectPageProps = {
  params: {
    name: string;
    id: string;
  };
};

export default function ProjectPage({
  params: { name, id },
}: ProjectPageProps) {
  return (
    <div>
      <p>
        {id}: {name}
      </p>
    </div>
  );
}
