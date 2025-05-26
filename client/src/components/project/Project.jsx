import { useEffect, useState, useRef } from "react";
import { useLoaderData, useParams, useRevalidator } from "react-router-dom";
import { updateProject } from "../../utils/project.js";
import NewList from "../list/NewList.jsx";
import ShowLists from "../list/showLists.jsx";

function Project() {
  const project = useLoaderData();
  const { id } = useParams();
  const revalidator = useRevalidator();
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);
  const [lists, setLists] = useState(project.lists || []);

  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editedDesc, setEditedDesc] = useState(project.description || "");

  const modalRef = useRef();

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
    await handleSaveTitle();
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        expanded &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  useEffect(() => {
    if (project?.description) {
      setEditedDesc(project.description);
    }
  }, [project?.description]);

  const handleDescChange = (e) => {
    setEditedDesc(e.target.value);
  };

  const handleSaveDesc = async () => {
    await updateProject(id, { description: editedDesc });
    setIsEditingDesc(false);
    revalidator.revalidate();
  };

  return (
    <section className="min-h-screen min-w-full bg-gradient-to-r from-[#fcab51] to-[#f56b79] px-72 py-16 overflow-x-auto scrollbar-thumb scrollbar-track scrollbar-thin">
      <div className="w-full fixed top-0 left-0 bg-white/20 backdrop-blur-md z-10 px-8 py-4 mt-16 ml-64">
        <div className="flex flex-row gap-4 items-center">
          <svg
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="black"
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer"
          >
            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
          </svg>
          <div className="flex flex-row w-full gap-2 items-center">
            {isEditing ? (
              <>
                <textarea
                  value={editedTitle}
                  onChange={handleTitleChange}
                  onBlur={handleBlur}
                  maxLength={40}
                  autoFocus
                  className="w-2/4 h-8 text-black text-2xl font-bold bg-transparent resize-none outline-none overflow-hidden border border-gray-500/20 rounded-xl leading-tight break-words"
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleSaveTitle();
                    }
                  }}
                />
                <p className="text-sm text-black h-5">
                  {editedTitle.length} / 40
                </p>
              </>
            ) : (
              <h2
                onClick={() => setIsEditing(true)}
                className="w-2/4 text-black text-2xl font-bold cursor-pointer break-words hover:bg-gray-500/20 rounded-xl leading-tight px-2 py-1"
              >
                {editedTitle}
              </h2>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="flex flex-col gap-4 bg-gray-700 rounded-xl h-fit w-96 p-6 text-white/80 text-xl justify-between border border-gray-600 shadow-lg"
          >
            <p className="font-bold">Description:</p>

            {!isEditingDesc ? (
              <p
                onClick={() => setIsEditingDesc(true)}
                className="cursor-pointer breack-words"
                title="Click to edit description"
                style={{ wordBreak: "break-all" }}
              >
                {editedDesc || "No description"}
              </p>
            ) : (
              <>
                <textarea
                  value={editedDesc}
                  onChange={handleDescChange}
                  autoFocus
                  rows={5}
                  maxLength={120}
                  className="w-full p-2 rounded-md text-white/80 resize-none bg-gray-800"
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    overflowWrap: "break-word",
                  }}
                />
                <p className="text-sm text-white h-5 self-end">
                  {editedDesc.length} / 120
                </p>
                <button
                  onClick={handleSaveDesc}
                  className="mt-2 bg-[#f56b79] rounded px-4 py-2 text-white"
                >
                  Guardar
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <section className="flex flex-row gap-8 pt-32 no-scrollbar">
        <ShowLists lists={lists} onAddTask={handleAddTask} />
        <div className="mr-16">
          <NewList lists={lists} setLists={setLists} />
        </div>
      </section>
    </section>
  );
}

export default Project;
