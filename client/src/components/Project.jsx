import { useLoaderData, useParams } from "react-router-dom";

function Project() {
  const loaderData = useLoaderData();
  const { id: projectId } = useParams();

  return (
    <section className="text-white">
      <h2>Proyecto</h2>
    </section>
 
  );
}

export default Project;
