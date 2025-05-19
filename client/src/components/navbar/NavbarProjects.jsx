import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

import { createProject } from "../../utils/project.js";

function NavbarProjects() {
    const loaderData = useLoaderData();
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    if (!loaderData) return <div>Loading...</div>;

    if (!Array.isArray(loaderData)) {
        return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
    }

    const handleCreateProject = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const newProject = await createProject({title, description});
        navigate(`/project/${newProject._id}`);
    };


    return (
        <section className="my-4">
            <p>Projects</p>
            <button onClick={() => setExpanded(!expanded)} className="text-white">
                +
            </button>

            {expanded && (
                <form onSubmit={handleCreateProject} className="flex flex-col gap-2 my-4 bg-pink-200">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" />
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" />
                    <button type="submit">Create</button>
                </form>
            )}

            <div>
                {loaderData.map((project) => (
                    <Link to={`/project/${project._id}`} key={project._id}>
                        <div className="mb-2 bg-amber-200 h-24 rounded-2xl p-4 cursor-pointer hover:bg-amber-300">
                            <p className="font-bold">{project.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default NavbarProjects;
