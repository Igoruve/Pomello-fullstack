import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { createTask } from "../../utils/task.js";

function NewTask({ listId, onTaskCreated }) {
  const revalidator = useRevalidator();
  const [showInput, setShowInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleBlur = async () => {
    const title = newTaskTitle.trim();
    if (!title) {
      setShowInput(false);
      setNewTaskTitle("");
      return;
    }
    setIsSaving(true);
    try {
      const newTask = await createTask({ title, list: listId });
      onTaskCreated(newTask);
      revalidator.revalidate();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSaving(false);
      setShowInput(false);
      setNewTaskTitle("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
  };

  return (
    <div>
      {!showInput ? (
        <div
          onClick={() => setShowInput(true)}
          className="flex flex-row text-white gap-4 text-md mb-2 bg-gray-900 h-10 rounded-xl w-55 p-4 cursor-pointer hover:bg-gray-700/60 transition-colors duration-300 ease-in-out shadow-lg  items-center justify-between"
        >
          New Task
          <svg viewBox="0 0 448 512" fill="white" height="16px" width="16px">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </div>
      ) : (
        <textarea
          autoFocus
          onKeyDown={handleKeyDown}
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onBlur={handleBlur}
          disabled={isSaving}
          className="px-3 py-2 rounded-lg text-white outline-none w-64 resize-none break-words overflow-hidden"
        />
      )}
    </div>
  );
}

export default NewTask;
