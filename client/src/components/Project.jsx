import { useLoaderData } from "react-router-dom";

function Project() {
  const data = useLoaderData();

  return (
    <section className="text-white">
      <h2>{data.project.title}</h2>
    </section>

  );
}

export default Project;
