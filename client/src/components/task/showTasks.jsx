import { useState, useEffect } from "react";
import { useRevalidator } from "react-router-dom";
import { updateTask } from "../../utils/task";

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

function ShowTasks({ tasks = [], setTasks }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [isEditingTaskId, setIsEditingTaskId] = useState(null);
  const revalidator = useRevalidator();
  const [tasksState, setTasksState] = useState(tasks);
  const sensors = useSensors(useSensor(PointerSensor));

  const [checkedTasks, setCheckedTasks] = useState(() => {
    if (!Array.isArray(tasks)) return {};
    return tasks.reduce((acc, task) => {
      acc[task._id?.$oid || task._id] = task.isCompleted;
      return acc;
    }, {});
  });

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

  const startEditing = (task) => {
    const taskId = task._id.$oid || task._id;
    setIsEditingTaskId(taskId);
    setEditedTitle(task.title || "");
  };

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

  const handleKeyDown = (e, taskId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur(taskId);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = tasksState.findIndex(
        (task) => (task._id.$oid || task._id) === active.id
      );
      const newIndex = tasksState.findIndex(
        (task) => (task._id.$oid || task._id) === over.id
      );

      setTasks((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  useEffect(() => {
    setTasksState(tasks);
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
