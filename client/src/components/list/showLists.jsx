import { useState, useEffect, useRef } from "react";
import ShowTasks from "../task/showTasks.jsx";
import NewTask from "../task/NewTask.jsx";
import { removeList, updateList } from "../../utils/list.js";
import { useRevalidator } from "react-router-dom";
import { DragableList } from "./DragableList.jsx";

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

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = lists.findIndex((l) => l._id === active.id);
      const newIndex = lists.findIndex((l) => l._id === over.id);
      const newOrder = arrayMove(lists, oldIndex, newIndex);
      setLists(newOrder);
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={lists.map((l) => l._id)}
          strategy={verticalListSortingStrategy}
        >
          {lists.map((list) => (
            <DragableList
              key={list._id}
              list={list}
              onAddTask={onAddTask}
              setListToDelete={setListToDelete}
              editingListId={editingListId}
              setEditingListId={setEditingListId}
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
              handleTitleSave={handleTitleSave}
              textareaRef={textareaRef}
            />
          ))}
        </SortableContext>
      </DndContext>

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
