import {
  Navigate,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

import { createProject } from "../../utils/project.js";

function NavbarProjects() {
  const loaderData = useLoaderData();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [projects, setProjects] = useState(loaderData);

  if (!Array.isArray(loaderData)) {
    return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
  }
  

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    e.target.reset(); // Limpia el formulario

    setExpanded(false); // Cierra el formulario

    const newProject = await createProject({ title, description });
    console.log("newProject", newProject);
    setProjects((prev) => [...prev, newProject[0]]);
    navigate(`/project/${newProject[0]._id}`, { replace: true });
  };

  return (
    <section className="my-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row gap-2 items-center">
          <svg
            height="16px"
            viewBox="0 -960 960 960"
            width="16px"
            fill="white"
          >
            <path d="M168-144q-29.7 0-50.85-21.15Q96-186.3 96-216v-432q0-29.7 21.15-50.85Q138.3-720 168-720h168v-72.21Q336-822 357.18-843q21.17-21 50.91-21h144.17Q582-864 603-842.85q21 21.15 21 50.85v72h168q29.7 0 50.85 21.15Q864-677.7 864-648v432q0 29.7-21.15 50.85Q821.7-144 792-144H168Zm0-72h624v-432H168v432Zm240-504h144v-72H408v72ZM168-216v-432 432Z" />
          </svg>
          <p>Projects</p>
        </div>
        <svg
          onClick={() => setExpanded(!expanded)}
          className="text-white"
          viewBox="0 0 448 512"
          fill="#f56b79"
          height="18px"
          width="18px"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
      </div>

      <section>
        {expanded && (
          <div
            onClick={() => setExpanded(false)}
            className="h-full w-full bg-black/30 fixed inset-0"
          >
            <form
              onSubmit={handleCreateProject}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 z-30 absolute top-48 left-64 rounded-xl h-96 w-64 p-4 flex flex-col justify-between text-white font-bold"
            >
              <article className="flex flex-col">
                <div className="gap-2 flex flex-col mb-6">
                  <label htmlFor="title">Title</label>
                  <input
                    className="bg-gray-800 border border-white/50 rounded-sm"
                    type="text"
                    name="title"
                    id="title"
                  />
                </div>
                <div className="gap-4 flex flex-col ">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="bg-gray-800 border border-white/50 rounded-sm"
                    type="text"
                    name="description"
                    id="description"
                  />
                </div>
              </article>
              <button
                className="bg-[#e84860] py-3 px-1.5 rounded-xl"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        )}
      </section>

      <div>
        {loaderData.map((project) => (
          <Link to={`/project/${project._id}`} key={project._id}>
            <div className="mb-2 bg-gray-600 rounded-2xl p-4 cursor-pointer hover:bg-[#e84860]">
              <p className="truncate max-w-full whitespace-nowrap overflow-hidden">{project.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default NavbarProjects;
