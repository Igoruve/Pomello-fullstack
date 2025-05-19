import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarProjects from "./navbar/NavbarProjects";

function ProjectList() {
  const loaderData = useLoaderData();

  if (!loaderData) return <div>Loading...</div>;

  if (!Array.isArray(loaderData)) {
    return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
  }

  return (
    <section className="my-4">
      <h2 className="text-xl font-bold mb-4 mx-4 text-slate-100 opacity-80">
        Projects
      </h2>
      <NavbarProjects />
      <section className="gap-4 px-4 grid grid-cols-2 ">
        {loaderData.map((project) => (
          <Link to={`/project/${project._id}`} key={project._id}>
            <div className="mb-2 bg-amber-200 h-24 rounded-2xl p-4 cursor-pointer hover:bg-amber-300">
              <p className="font-bold">{project.title}</p>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}

export default ProjectList;
