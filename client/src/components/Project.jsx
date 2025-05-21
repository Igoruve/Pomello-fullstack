import { useEffect, useState } from "react";
import { useLoaderData, useParams, useRevalidator } from "react-router-dom";
import { updateProject } from "../utils/project.js";
import NewList from "./list/NewList.jsx";

function Project() {
  const project = useLoaderData();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);
  const revalidator = useRevalidator();

  const handleBlur = () => {
    setIsEditing(false);
    updateProject(id, { title: editedTitle }).then(() => {
      revalidator.revalidate();
    });
  };

  useEffect(() => {
    if (project?.title) {
      setEditedTitle(project.title);
    }
  }, [project?.title, id]);

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setEditedTitle(newValue);
  };

  return (
    <section className="py-4 px-4 h-full w-full bg-linear-65 from-[#fcab51] to-[#f56b79]">
      <div className="max-w-xl w-full mx-6 mb-6 h-[4.5rem] flex flex-col justify-center">
        {isEditing ? (
          <>
            <textarea
              value={editedTitle}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              name="title"
              id="title"
              required
              maxLength={40}
              className="w-full h-8 text-black/80 text-2xl font-bold bg-transparent resize-none outline-none overflow-hidden border border-gray-500/20 rounded-xl leading-tight"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
            <p className="text-sm text-black/60 text-right h-5">
              {editedTitle.length} / 40
            </p>
          </>
        ) : (
          <>
            <h2
              onClick={() => setIsEditing(true)}
              className="w-full text-black/80 text-2xl font-bold cursor-pointer break-words h-8 hover:bg-gray-500/20 rounded-xl leading-tight"
            >
              {editedTitle}
            </h2>
            <div className="h-5" />
          </>
        )}
      </div>

      <section className="flex flex-row gap-8">
        {project.lists &&
          project.lists.map((list) => (
            <div
              key={list._id}
              className="text-white w-64 bg-gray-900 rounded-xl p-4 shadow-md"
            >
              <h3 className="text-white/80 font-bold mb-6">{list.title}</h3>
              <ul className="list-none text-white/80 flex flex-col gap-2">
                {list.tasks &&
                  list.tasks.map((task) => (
                    <li
                      className="flex flex-row bg-gray-800 py-2 px-4 rounded-xl"
                      key={task._id}
                    >
                      {task.title}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      <div>
        <NewList />
      </div>
      </section>
    </section>
  );
}

export default Project;
