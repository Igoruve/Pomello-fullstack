import { useLoaderData } from "react-router-dom";

function Project() {
  const loaderData = useLoaderData();

  if (!loaderData) return <div className="text-white">Loading...</div>;

  if (loaderData.error) {
    return <div>Error: {loaderData.message || "Unexpected error"}</div>;
  }

  return (
    <section>
      <h1 className="text-white">{loaderData.title}</h1>
    </section>
  );
}

export default Project;
