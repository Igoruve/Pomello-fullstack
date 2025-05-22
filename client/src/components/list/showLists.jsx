import { useState, useEffect, useRef } from "react";
import ShowTasks from "../task/showTasks.jsx";
import NewTask from "../task/NewTask.jsx";
import { removeList, updateList } from "../../utils/list.js";
import { useRevalidator } from "react-router-dom";

function ShowLists({ lists: initialLists, onAddTask }) {
  const [setError] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [lists, setLists] = useState(initialLists);
  const [listToDelete, setListToDelete] = useState(null);
  const revalidator = useRevalidator();

  const [editingListId, setEditingListId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const textareaRef = useRef(null);

  useEffect(() => {
    setLists(initialLists);
  }, [initialLists]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [editedTitle, editingListId]);

  const handleRemoveList = async (listId) => {
    try {
      const result = await removeList(listId);
      if (result.error) {
        setError(`Error removing list: ${result.error}`);
      } else {
        setLists((prevLists) =>
          prevLists.filter((list) => list._id !== listId)
        );
        if (selectedList && listId === selectedList._id) {
          setSelectedList(null);
        }
        revalidator.revalidate();
      }
    } catch (error) {
      setError(`Error removing list: ${error.message}`);
    }
    setListToDelete(null);
  };

  const handleTitleSave = async (listId) => {
    await updateList(listId, { title: editedTitle });
    setEditingListId(null);
    revalidator.revalidate();
  };

  return (
    <>
      {lists.map((list) => (
        <div
          key={list._id}
          className="text-white max-w-64 bg-gray-900 rounded-xl p-4 shadow-md h-fit"
        >
          <div className="flex flex-row justify-between items-center mb-6">
            {editingListId === list._id ? (
              <textarea
                ref={textareaRef}
                value={editedTitle}
                onChange={(e) => {
                  setEditedTitle(e.target.value);
                  if (textareaRef.current) {
                    textareaRef.current.style.height = "auto";
                    textareaRef.current.style.height =
                      textareaRef.current.scrollHeight + "px";
                  }
                }}
                onBlur={() => handleTitleSave(list._id)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    await handleTitleSave(list._id);
                  }
                }}
                autoFocus
                className="w-full text-white/80 text-xl font-bold bg-transparent resize-none outline-none overflow-hidden border border-gray-500/20 rounded-xl leading-tight"
                maxLength={40}
                rows={1}
              />
            ) : (
              <h3
                className="w-full text-white/80 text-xl font-bold bg-transparent leading-tight line-clamp-2"
                onClick={() => {
                  setEditingListId(list._id);
                  setEditedTitle(list.title);
                }}
              >
                {list.title}
              </h3>
            )}

            <svg
              viewBox="0 0 448 512"
              fill="white"
              height="12px"
              width="12px"
              className="cursor-pointer ml-4" // Añadido gap entre texto y svg
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setListToDelete(list);
              }}
            >
              <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </div>

          <div className="flex flex-col gap-2 relative">
            <ShowTasks tasks={list.tasks} />
            <NewTask
              className="absolute bottom-0 left-0"
              listId={list._id}
              onTaskCreated={(newTask) => onAddTask(list._id, newTask)}
            />
          </div>
        </div>
      ))}

      {listToDelete && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setListToDelete(null)}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete the list{" "}
              <strong>{listToDelete.title}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setListToDelete(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveList(listToDelete._id)}
                className="bg-[#f56b79] text-white px-4 py-2 rounded-lg hover:brightness-90 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowLists;
