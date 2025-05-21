import { useEffect, useState } from "react";
import { useLoaderData, useParams, useRevalidator } from "react-router-dom";
import { updateProject } from "../utils/project.js";
import NewList from "./list/NewList.jsx";
import { createList } from "../utils/list.js";

function Project() {
  const project = useLoaderData();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);
  const [lists, setLists] = useState(project.lists);
  const [showForm, setShowForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
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
    setEditedTitle(e.target.value);
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
  
    await createList({ title: newListTitle, project: id });
  
    // Limpiar formulario
    setNewListTitle("");
    setShowForm(false);
  
    // Usamos revalidator para traer los datos actualizados del backend
    revalidator.revalidate();
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
        {lists &&
          lists.map((list) => (
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
          {!showForm ? (
            <NewList onClick={() => setShowForm(true)} />
          ) : (
            <form
              onSubmit={handleCreateList}
              className="bg-gray-500/30 rounded-xl p-4 w-64 flex flex-col gap-2 shadow-md"
            >
              <input
                type="text"
                name="title"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="Nombre de la lista"
                className="px-3 py-2 rounded-lg text-black outline-none"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setNewListTitle("");
                  }}
                  className="text-sm bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-sm bg-[#f56b79] text-white px-3 py-1 rounded-lg"
                >
                  Crear
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </section>
  );
}

export default Project;
