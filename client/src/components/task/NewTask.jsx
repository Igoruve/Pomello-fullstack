import { useState, useEffect, useRef } from "react";
import { useRevalidator } from "react-router-dom";
import { createTask } from "../../utils/task.js";

/**
 * Component for creating a new task within a list.
 * Provides an input area that appears when clicked, allowing the
 * user to enter a task title. Submits the new task upon pressing
 * enter or losing focus from the input area.
 *
 * @param {string} listId - The ID of the list to which the new task will be added.
 * @param {Function} onTaskCreated - Callback function to handle the newly created task.
 */

function NewTask({ listId, onTaskCreated }) {
  const revalidator = useRevalidator();
  const [showInput, setShowInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const textareaRef = useRef(null);

  /**
   * Callback function to handle losing focus from the input area.
   * If the entered title is not empty, it creates the new task and calls the onTaskCreated callback.
   * If there is an error, it logs the error to the console. Finally, it resets the state.
   */
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

  /**
   * Callback function to handle pressing the Enter key.
   * Prevents the default event behavior and calls handleBlur to create the new task.
   * @param {KeyboardEvent} e - The Enter keydown event.
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset para recalcular
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [newTaskTitle]);

  return (
    <div>
      {!showInput ? (
        <div
          onClick={() => setShowInput(true)}
          className="flex flex-row text-white gap-4 text-md mb-2 bg-gray-900 h-10 rounded-xl w-full p-4 cursor-pointer hover:bg-gray-700/60 transition-colors duration-300 ease-in-out  items-center justify-between"
        >
          New Task
          <svg viewBox="0 0 448 512" fill="white" height="16px" width="16px">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          autoFocus
          onKeyDown={handleKeyDown}
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onBlur={handleBlur}
          disabled={isSaving}
          className="w-full text-white text-md bg-transparent resize-none outline-none overflow-hidden border border-gray-500/20 rounded-xl leading-tight p-2 break-all"
          style={{ height: "auto", overflow: "hidden" }}
          maxLength={200}
        />
      )}
    </div>
  );
}

export default NewTask;
