import { useLoaderData } from "react-router-dom";

function Project() {
  const loaderData = useLoaderData();

  if (!loaderData) return <div className="text-white">Loading...</div>;

  if (!Array.isArray(loaderData)) {
    return <div className="text-white">Error: {loaderData?.message || "Unexpected error"}</div>;
  }

  return (
    <section>
      <h1 className="text-white">{loaderData.title}</h1>
      <section>
        {loaderData.map((list) => (
          <div key={list._id.$oid}>
            <h2 className="text-white">{list.title}</h2>

          </div>
        ))}
      </section>
    </section>
  );
}

export default Project;
