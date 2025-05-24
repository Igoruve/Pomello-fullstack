import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ShowTasks from "../task/showTasks.jsx";
import NewTask from "../task/NewTask.jsx";

export function DragableList({
  list,
  onAddTask,
  setListToDelete,
  editingListId,
  setEditingListId,
  editedTitle,
  setEditedTitle,
  handleTitleSave,
  textareaRef,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: list._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isDragging = transform !== null;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="text-white max-w-64 bg-gray-900 rounded-xl p-4 shadow-md h-fit min-w-[300px] flex-shrink-0 flex flex-col gap-2"
      >
        <svg
          {...attributes}
          {...listeners}
          className={
            isDragging
              ? "cursor-grabbing mb-2 self-center"
              : "cursor-grab mb-2 self-center"
          }
          viewBox="0 0 24 24"
          fill="currentColor"
          height="24px"
          width="24px"
        >
          <path d="M3 9h18v2H3V9zm0 4h18v2H3v-2z" />
        </svg>

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
            className="cursor-pointer ml-4"
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
          <ShowTasks tasks={list.tasks || []} />
          <NewTask
            className="absolute bottom-0 left-0"
            listId={list._id}
            onTaskCreated={(newTask) => onAddTask(list._id, newTask)}
          />
        </div>
      </div>
    </>
  );
}
