import { useEffect, useState } from "react";
import { useLoaderData, useParams, useRevalidator } from "react-router-dom";
import { updateProject } from "../../utils/project.js";
import NewList from "../list/NewList.jsx";
import ShowLists from "../list/showLists.jsx";

function Project() {
  const project = useLoaderData();
  const { id } = useParams();
  const revalidator = useRevalidator();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);
  const [lists, setLists] = useState(project.lists || []);

  useEffect(() => {
    if (project?.title) {
      setEditedTitle(project.title);
    }
    if (project?.lists) {
      setLists(project.lists);
    }
  }, [project?.title, project?.lists, id]);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSaveTitle = async () => {
    await updateProject(id, { title: editedTitle });
    setIsEditing(false);
    revalidator.revalidate();
  };

  const handleBlur = async () => {
    await handleSaveTitle(); // Asegura que el blur también guarda
  };

  const handleAddTask = (listId, newTask) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );
  };

  return (
    <section className="min-h-screen min-w-full bg-gradient-to-r from-[#fcab51] to-[#f56b79] px-72 py-24 overflow-x-auto scrollbar-thumb scrollbar-track scrollbar-thin">
      <div className="max-w-xl w-full mx-6 mb-6 h-[4.5rem] flex flex-col justify-center">
        {isEditing ? (
          <>
            <textarea
              value={editedTitle}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              maxLength={40}
              autoFocus
              className="w-full h-8 text-black/80 text-2xl font-bold bg-transparent resize-none outline-none overflow-hidden border border-gray-500/20 rounded-xl leading-tight"
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await handleSaveTitle(); // Guardar al presionar Enter
                }
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

      <section className="flex flex-row gap-8  ">
        <ShowLists lists={lists} onAddTask={handleAddTask} />
        <div className="mr-16">
          <NewList lists={lists} setLists={setLists} />
        </div>
      </section>
    </section>
  );
}

export default Project;
