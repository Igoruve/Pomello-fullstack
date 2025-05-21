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
  const [lists, setLists] = useState(project.lists) || [];

  /*   const [newTaskTitle, setNewTaskTitle] = useState("");
    const [tasks, setTasks] = useState(lists.tasks); */

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
    if (project?.lists) {
      setLists(project.lists);
    }
  }, [project?.title, project?.lists, id]);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  /*   const handleCreateTask = async (e) => {
      e.preventDefault();
      if (!newTaskTitle.trim()) return;
  
      const newTask = await createTask({ title: newTaskTitle, list: id });
  
      setTasks((prev) => [...prev, newTask]);
      // Limpiar formulario
      setNewTaskTitle("");
      setShowForm(false);
  
      // Usamos revalidator para traer los datos actualizados del backend
      revalidator.revalidate();
    }; */

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
        <ShowLists lists={lists} />

        <NewList lists={lists} setLists={setLists} />
      </section>
    </section>
  );
}

export default Project;
