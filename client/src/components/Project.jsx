import { useLoaderData } from "react-router-dom";

function Project() {
  const loaderData = useLoaderData(); 

  if (!loaderData) return <div className="text-white">Loading...</div>;
  console.log(loaderData)

  return (
    <section>
      <h1 className="text-white">{loaderData.title}</h1>
    </section>
  );
}

export default Project;
