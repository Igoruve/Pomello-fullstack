import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

import { createProject, removeProject } from "../utils/project.js";

function ProjectList() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(loaderData);
  const [setError] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  if (!loaderData) return <div>Loading...</div>;

  if (!Array.isArray(loaderData)) {
    console.log("loaderData", loaderData);
    return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
  }

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    e.target.reset(); // Limpia el formulario

    setTitleInput("");
    setDescriptionInput("");

    setExpanded(false); // Cierra el formulario

    const newProject = await createProject({ title, description });
    console.log("newProject", newProject);
    setProjects((prev) => [...prev, newProject[0]]);
    navigate(`/project/${newProject[0]._id}`, { replace: true });
  };

  const handleRemoveProject = async (projectId) => {
    try {
      const result = await removeProject(projectId);
      if (result.error) {
        setError(`Error removing project: ${result.error}`);
      } else {
        setProjects(projects.filter((project) => project._id !== projectId));
        if (selectedProject && projectId === selectedProject._id) {
          setSelectedProject(null);
        }
        navigate("/project/user", { replace: true });
      }
    } catch (error) {
      setError(`Error removing project: ${error.message}`);
    }
  };

  return (
    <section className="py-4 px-4 h-full w-full bg-gray-800">
      <h2 className="text-xl font-bold mb-4 mx-4 text-slate-100 opacity-80">
        Projects
      </h2>
      <section className="gap-6 px-4 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        <div
          onClick={() => setExpanded(!expanded)}
          className="flex flex-row text-white gap-4 text-lg mb-2 bg-gray-500 h-42 rounded-xl w-80 p-4 cursor-pointer hover:bg-gray-400 transition-colors duration-300 ease-in-out shadow-lg hover:scale-105"
        >
          <svg viewBox="0 0 448 512" fill="white" height="24px" width="24px">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
          New project
        </div>

        {projects.map((project) => (
          <div
            className="flex flex-col justify-between h-42 mb-2 bg-gray-600 rounded-xl w-80 p-4 cursor-pointer text-2xl shadow-lg hover:scale-105 text-white/80 transition-transform duration-200 ease-in-out"
            key={project._id}
          >
            <Link
              to={`/project/${project._id}`}
              key={project._id}
              className=" h-full "
            >
              <div className="max-w-full overflow-hidden">
                <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  {project.title}
                </p>
              </div>
            </Link>
            <svg
              viewBox="0 0 448 512"
              fill="white"
              height="18px"
              width="18px"
              className="self-end cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveProject(project._id);
              }}
            >
              {" "}
              <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </div>
        ))}
      </section>
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          className="fixed inset-0 bg-black/30 flex items-center justify-center"
        >
          <form
            onSubmit={handleCreateProject}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-4 bg-gray-700 rounded-xl h-3/4 w-80 p-6 font-bold text-white/80 justify-between"
          >
            <article className="flex flex-col">
              <div className="gap-2 flex flex-col mb-6">
                <label htmlFor="title" className="text-lg">
                  Title
                </label>
                <input
                  className="bg-gray-800 border border-white/50 rounded-sm text-lg px-2 py-1"
                  type="text"
                  name="title"
                  id="title"
                  required
                  maxLength={40}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                />
                <p className="text-base text-white/50 self-end">
                  {titleInput.length}/40
                </p>
              </div>
              <div className="gap-4 flex flex-col ">
                <label htmlFor="description" className="text-lg">
                  Description
                </label>
                <textarea
                  className="bg-gray-800 border border-white/50 rounded-sm h-48 overflow-y-auto resize-none text-lg px-2 py-1"
                  type="text"
                  name="description"
                  id="description"
                  maxLength={200}
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                />
                <p className="text-base text-white/50 self-end">
                  {descriptionInput.length}/40
                </p>
              </div>
            </article>
            <button
              className="bg-[#f56b79] py-3 px-1.5 rounded-xl"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default ProjectList;
