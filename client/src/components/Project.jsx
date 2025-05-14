import { useLoaderData } from "react-router-dom";

function Project() {
  const loaderData = useLoaderData(); 

  if (!loaderData) return <div>Loading...</div>;

  return (
    <section>
      <h1>{loaderData.title}</h1>
      <p>{loaderData.description}</p>
    </section>
  );
}

export default Project;
