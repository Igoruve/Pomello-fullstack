import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableTask({
  task,
  isEditing,
  isChecked,
  editedTitle,
  setEditedTitle,
  startEditing,
  handleBlur,
  handleKeyDown,
  handleToggle,
}) {
  const taskId = task._id.$oid || task._id;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center bg-gray-700 py-2 px-4 rounded-lg shadow-sm text-sm text-white gap-2"
    >
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-gray-300 text-[#f56b79] focus:ring-[#f56b79] accent-[#f56b79]"
        checked={isChecked}
        onChange={() => handleToggle(task)}
      />

      {isEditing ? (
        <textarea
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={() => handleBlur(taskId)}
          onKeyDown={(e) => handleKeyDown(e, taskId)}
          autoFocus
          className="bg-gray-800 text-white text-sm rounded px-2 py-1 min-w-0 w-full resize-none"
          maxLength={80}
        />
      ) : (
        <span
          onClick={() => {
            if (!isChecked) startEditing(task);
          }}
          className={`cursor-pointer transition-all break-all whitespace-pre-wrap w-full ${
            isChecked ? "line-through opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {task.title}
        </span>
      )}
      <svg
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e3e3e3"
        {...listeners}
        className="cursor-grab ml-auto"
      >
        <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
      </svg>
    </li>
  );
}
