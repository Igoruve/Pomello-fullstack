import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { updateProject } from "../utils/project.js";

function Project() {
  const project = useLoaderData();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);

  useEffect(() => {
    setEditedTitle(project.title);
  }, [project.title]);

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setEditedTitle(newValue);
  };

  return (
    <section>
      {isEditing ? (
        <textarea
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={() => {
            setIsEditing(false);
            updateProject(id, { title: editedTitle });
          }}
          name="title"
          id="title"
          required
          className="w-[80%] max-w-xl text-white/80 text-2xl font-bold text-center pt-16 block mx-auto bg-transparent resize-none outline-none overflow-hidden"
          autoFocus
        />
      ) : (
        <h2
          onClick={() => setIsEditing(true)}
          className="text-white/80 text-2xl font-bold text-center py-16 cursor-pointer"
        >
          {editedTitle}
        </h2>
      )}

      <section className="text-white max-w-64 bg-gray-900 rounded-xl p-4 mx-6 shadow-md">
        {project.lists &&
          project.lists.map((list) => (
            <div key={list._id}>
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
      </section>
    </section>
  );
}

export default Project;
