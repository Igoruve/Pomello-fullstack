import { useState, useEffect } from "react";
import { useRevalidator } from "react-router-dom";
import { updateTask, updateTaskPositions } from "../../utils/task";

import SortableTask from "./SortableTask.jsx";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

/**
 * Component to show a list of tasks and handle editing, deleting, and reordering
 * of tasks.
 * @param {Object[]} tasks - The list of tasks to be displayed.
 * @param {Function} setTasks - Function to update the parent component's tasks state.
 * @returns {JSX.Element} The rendered component.
 */
function ShowTasks({ tasks = [], setTasks }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [isEditingTaskId, setIsEditingTaskId] = useState(null);
  const revalidator = useRevalidator();
  const sensors = useSensors(useSensor(PointerSensor));

  const [tasksState, setTasksState] = useState(() =>
    tasks.sort((a, b) => a.position - b.position)
  );

  const [checkedTasks, setCheckedTasks] = useState(
    tasks.reduce((acc, task) => {
      acc[task._id.$oid || task._id] = task.isCompleted;
      return acc;
    }, {})
  );
  /**
   * Toggles the completion state of a task and updates the backend.
   * @param {Object} task - The task to be toggled.
   * @returns {Promise<void>} Resolves when the task is updated.
   */
  const handleToggle = async (task) => {
    const taskId = task._id.$oid || task._id;
    const newCompleted = !checkedTasks[taskId];
    setCheckedTasks((prev) => ({ ...prev, [taskId]: newCompleted }));

    try {
      await updateTask(taskId, { ...task, isCompleted: newCompleted });
    } catch (error) {
      console.error("Error updating task:", error);
      setCheckedTasks((prev) => ({ ...prev, [taskId]: !newCompleted }));
    }
  };

  /**
   * Sets the task ID that is currently being edited and sets the edited title to the
   * task's current title.
   * @param {Object} task - The task to be edited.
   * @returns {void}
   */
  const startEditing = (task) => {
    const taskId = task._id.$oid || task._id;
    setIsEditingTaskId(taskId);
    setEditedTitle(task.title || "");
  };

  /**
   * Handles blurring the title input field.
   * Calls `updateTask` to save the new title to the server and close the input field.
   * @async
   * @param {string} taskId - The ID of the task to be updated.
   * @returns {Promise<void>} Resolves when the title is saved and the input field is closed.
   */
  const handleBlur = async (taskId) => {
    if (!editedTitle.trim()) return;

    try {
      const updatedTask = await updateTask(taskId, { title: editedTitle });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          (task._id.$oid || task._id) === taskId
            ? { ...task, title: editedTitle }
            : task
        )
      );

      setIsEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

/**
 * Handles the keydown event for task editing.
 * If the Enter key is pressed, it prevents the default behavior and calls `handleBlur`
 * to save the changes and exit the editing mode.
 * 
 * @param {KeyboardEvent} e - The keydown event object.
 * @param {string} taskId - The ID of the task being edited.
 */

  const handleKeyDown = (e, taskId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur(taskId);
    }
  };

  /**
   * Handles the drag end event for tasks.
   * Updates the state of the tasks component with the new order of tasks
   * and sends the new order to the backend using `updateTaskPositions`.
   * @param {Object} event - The drag end event object.
   * @returns {Promise<void>} Resolves when the tasks positions are updated.
   */
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = tasksState.findIndex(
        (task) => (task._id.$oid || task._id) === active.id
      );
      const newIndex = tasksState.findIndex(
        (task) => (task._id.$oid || task._id) === over.id
      );

      const newOrder = arrayMove(tasksState, oldIndex, newIndex).map(
        (task, index) => {
          return {
            ...task,
            position: index,
          };
        }
      );

      setTasks(newOrder);

      // Enviar las nuevas posiciones al backend
      // const updatedTasks = newOrder.map((task, index) => ({
      //   _id: task._id.$oid || task._id,
      //   position: index,
      // }));

      try {
        const result = await updateTaskPositions(newOrder);
        console.log("result", result);
      } catch (error) {
        console.error("Error updating task positions:", error);
      }
    }
  };

  useEffect(() => {
    // Ordenar las tareas por posición antes de establecer el estado
    const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);
    setTasksState(sortedTasks);
  }, [tasks]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((task) => task._id.$oid || task._id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => {
          const taskId = task._id.$oid || task._id;
          return (
            <SortableTask
              key={taskId}
              task={task}
              isEditing={isEditingTaskId === taskId}
              isChecked={checkedTasks[taskId]}
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
              startEditing={startEditing}
              handleBlur={handleBlur}
              handleKeyDown={handleKeyDown}
              handleToggle={handleToggle}
            />
          );
        })}
      </SortableContext>
    </DndContext>
  );
}

export default ShowTasks;
