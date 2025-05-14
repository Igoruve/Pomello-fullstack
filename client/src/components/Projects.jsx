import { useLoaderData } from "react-router-dom";

function ProjectList() {
  const loaderData = useLoaderData();

  if (!loaderData) return <div>Loading...</div>;

  return (
    <section>
      {loaderData.map((project) => (
        <div key={project._id.$oid}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </section>
  );
}

export default ProjectList;
