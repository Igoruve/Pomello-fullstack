import { useState } from "react";
import { useRevalidator, useParams } from "react-router-dom";

import { createList } from "../../utils/list.js";

function NewList({ lists, setLists }) {
  const revalidator = useRevalidator();
  const { id } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;

    const newList = await createList({ title: newListTitle, project: id });

    setLists((prev) => [...prev, newList]);
    // Limpiar formulario
    setNewListTitle("");
    setShowForm(false);
    revalidator.revalidate();
  };

  return (
    <>
      <div>
        {!showForm ? (
          <div
            onClick={() => setShowForm(true)}
            className="flex flex-row text-white gap-4 text-lg mb-2 bg-gray-500/50 h-18 rounded-xl w-64 p-4 cursor-pointer hover:bg-gray-500/60 transition-colors duration-300 ease-in-out shadow-lg hover:scale-105"
          >
            <svg viewBox="0 0 448 512" fill="white" height="24px" width="24px">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            New List
          </div>
        ) : (
          <form
            onSubmit={handleCreateList}
            className="bg-gray-500/30 rounded-xl p-4 w-64 flex flex-col gap-2 shadow-md"
          >
            <input
              type="text"
              name="title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Nombre de la lista"
              className="px-3 py-2 rounded-lg text-black outline-none"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNewListTitle("");
                }}
                className="text-sm bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-sm bg-[#f56b79] text-white px-3 py-1 rounded-lg"
              >
                Create
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default NewList;
