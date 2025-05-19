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
  const [error, setError] = useState(null);

  if (!loaderData) return <div>Loading...</div>;

  if (!Array.isArray(loaderData)) {
    return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
  }

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const newProject = await createProject({ title, description });
    navigate(`/project/${newProject._id}`);
  };

  const handleRemoveProject = async (projectId) => {
    try {
      const result = await removeProject(projectId);
      if (result.error) {
        setError(`Error removing project: ${result.error}`);
      } else {
        setProjects(
          projects.filter((project) => project._id !== projectId)
        );
        if (selectedProject && projectId === selectedProject._id) {
          setSelectedProject(null);
        }
      }
    } catch (error) {
      setError(`Error removing project: ${error.message}`);
    }
  };


  return (

    <section className="my-4">
      <h2 className="text-xl font-bold mb-4 mx-4 text-slate-100 opacity-80">
        Projects
      </h2>
      <section className="gap-6 px-4 grid grid-cols-4 ">
        <div onClick={() => setExpanded(!expanded)} className="flex flex-row text-white gap-4 text-lg mb-2 bg-gray-100/50 h-42 rounded-xl w-80 p-4 cursor-pointer hover:bg-gray-500">
          <svg viewBox="0 0 448 512" fill="white" height="24px" width="24px"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
          New project
        </div>

        {projects.map((project) => (
          <div className="flex flex-col justify-between h-42 mb-2 bg-gray-400 rounded-xl w-80 p-4 cursor-pointer hover:bg-orange-300 text-2xl" key={project._id}>
            <Link to={`/project/${project._id}`} key={project._id} className=" h-full ">
              <p className="font-bold">{project.title}</p>
            </Link>
            <svg
              viewBox="0 0 448 512"
              fill="white"
              height="24px"
              width="24px"
              className="self-end cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveProject(project._id);
              }}
            > <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
          </div>
        ))}

      </section>
      {expanded && (
        <div onClick={() => setExpanded(false)} className="h-full w-full bg-black/30 fixed inset-0">
          <form onSubmit={handleCreateProject} className="flex flex-col gap-2 my-4 bg-gray-700 absolute z-10 top-24 left-[600px] rounded-xl h-96 w-64 p-4 font-bold text-white/80 justify-between">
            <article className="flex flex-col">
              <div className="gap-2 flex flex-col mb-6">
                <label htmlFor="title">Title</label>
                <input className="bg-gray-800 border border-white/50 rounded-sm" type="text" name="title" id="title" />
              </div>
              <div className="gap-4 flex flex-col ">
                <label htmlFor="description">Description</label>
                <textarea className="bg-gray-800 border border-white/50 rounded-sm" type="text" name="description" id="description" />
              </div>
            </article>
            <button className="bg-amber-500 py-3 px-1.5 rounded-xl" type="submit">Create</button>
          </form>
        </div>
      )}
    </section>
  );
}

export default ProjectList;
