import { Navigate, useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

import { createProject } from "../../utils/project.js";

function NavbarProjects() {
    const loaderData = useLoaderData();
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const revalidator = useRevalidator();

    if (!Array.isArray(loaderData)) {
        return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
    }

    const handleCreateProject = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const newProject = await createProject({ title, description });
        //recargar datos del loader
        revalidator.revalidate();
        navigate(`/project/${newProject._id}`);
    };


    return (
        <section className="my-4">
            <div className="flex flex-row justify-between items-center mb-4">
                <p>Projects</p>
                <svg onClick={() => setExpanded(!expanded)} className="text-white" viewBox="0 0 448 512" fill="white" height="18px" width="18px"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
            </div>

            <section>
                {expanded && (
                    <div onClick={() => setExpanded(false)} className="h-full w-full bg-black/30 fixed inset-0">
                        <form onSubmit={handleCreateProject} className="flex flex-col gap-2 my-4 bg-gray-700 absolute z-10 top-48 left-64 rounded-xl h-96 w-64 p-4 font-bold text-white/80 justify-between">
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

            <div>
                {loaderData.map((project) => (
                    <Link to={`/project/${project._id}`} key={project._id}>
                        <div className="mb-2 bg-gray-600 rounded-2xl p-4 cursor-pointer hover:bg-amber-500">
                            <p>{project.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section >
    );
}

export default NavbarProjects;
