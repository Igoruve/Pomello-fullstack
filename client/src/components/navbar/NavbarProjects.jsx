import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

import { createProject } from "../../utils/project.js";

/**
 * NavbarProjects component displays a list of projects and provides
 * functionality to create new projects. It uses loader data to
 * initialize the list of projects and provides an expandable form
 * to create a new project. The component manages state for form
 * visibility, project list, and form inputs.
 *
 * @returns {JSX.Element} The NavbarProjects component with a list
 * of projects and a form to create new projects.
 */

function NavbarProjects() {
  const loaderData = useLoaderData();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [projects, setProjects] = useState(loaderData);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!Array.isArray(loaderData)) {
    return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
  }

  /**
   * Handles the submission of a new project form.
   * @param {Event} e Form submission event.
   * @returns {Promise<void>} Resolves when the project is created and the form is cleaned up.
   */
  const handleCreateProject = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
  
    setExpanded(false); // Cierra el formulario
    e.target.reset();   // Limpia el formulario (DOM)
    setTitle("");       // Limpia el input controlado
    setDescription(""); // Limpia el textarea controlado
  
    const newProject = await createProject({ title, description });
    console.log("newProject", newProject);
    setProjects((prev) => [...prev, newProject[0]]);
    navigate(`/project/${newProject._id}`, { replace: true });
  };
  

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-2 rounded-xl transition duration-300">
        <div className="flex flex-row gap-2 items-center ">
          <svg
            height="16px"
            viewBox="0 -960 960 960"
            width="16px"
            fill="white"
            className="cursor-pointer "
          >
            <path d="M168-144q-29.7 0-50.85-21.15Q96-186.3 96-216v-432q0-29.7 21.15-50.85Q138.3-720 168-720h168v-72.21Q336-822 357.18-843q21.17-21 50.91-21h144.17Q582-864 603-842.85q21 21.15 21 50.85v72h168q29.7 0 50.85 21.15Q864-677.7 864-648v432q0 29.7-21.15 50.85Q821.7-144 792-144H168Zm0-72h624v-432H168v432Zm240-504h144v-72H408v72ZM168-216v-432 432Z" />
          </svg>
          <p>Projects</p>
        </div>
        <div
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-md cursor-pointer hover:bg-gray-500/20 transition duration-150"
        >
          <svg viewBox="0 0 448 512" fill="#f56b79" height="18px" width="18px">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </div>
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
              className="bg-gray-700 z-50 absolute top-48 left-64 rounded-xl h-96 w-64 p-4 flex flex-col justify-between text-white font-bold"
            >
              <article className="flex flex-col">
                <div className="gap-2 flex flex-col mb-6">
                  <label htmlFor="title">Title</label>
                  <input
                    className="bg-gray-800 border border-white/50 rounded-sm"
                    type="text"
                    name="title"
                    id="title"
                    maxLength={40}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <p className="text-xs text-white/60 text-right">
                    {title.length} / 40
                  </p>
                </div>
                <div className="gap-4 flex flex-col">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="bg-gray-800 border border-white/50 rounded-sm h-24 resize-none"
                    name="description"
                    id="description"
                    maxLength={120}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-xs text-white/60 text-right">
                    {description.length} / 120
                  </p>
                </div>
              </article>
              <button
                className="cursor-pointer bg-[#f56b79] hover:brightness-90 py-3 px-1.5 rounded-xl"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        )}
      </section>

      <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar ">
        {[...loaderData]
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .map((project) => (
            <Link to={`/project/${project._id}`} key={project._id}>
              <div className="relative mb-4 rounded-2xl p-4 cursor-pointer group overflow-hidden">
                <div className="absolute inset-0 bg-gray-600 transition-opacity duration-300 group-hover:opacity-0"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#fcab51] to-[#f56b79] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <p className="relative z-10 truncate max-w-full whitespace-nowrap overflow-hidden">
                  {project.title}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default NavbarProjects;
