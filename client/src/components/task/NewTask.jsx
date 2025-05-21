import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { createTask } from "../../utils/task.js";

function NewTask({ listId, onTaskCreated }) {
	const revalidator = useRevalidator();
	const [showForm, setShowForm] = useState(false);
	const [NewTaskTitle, setNewTaskTitle] = useState("");

	const handleCreateTask = async (e) => {
		e.preventDefault();
		if (!NewTaskTitle.trim()) return;

		const newTask = await createTask({ title: NewTaskTitle, list: listId });
		console.log("newTask", newTask);
		onTaskCreated(newTask);
		setNewTaskTitle("");
		setShowForm(false);
		revalidator.revalidate();
	};

	return (
		<div>
			{!showForm ? (
				<div
					onClick={() => setShowForm(true)}
					className="flex flex-row text-white gap-4 text-lg mb-2 bg-gray-500/50 h-18 rounded-xl w-64 p-4 cursor-pointer hover:bg-gray-500/60 transition-colors duration-300 ease-in-out shadow-lg hover:scale-105"
				>
					<svg viewBox="0 0 448 512" fill="white" height="24px" width="24px">
						<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
					</svg>
					New Task
				</div>
			) : (
				<form
					onSubmit={handleCreateTask}
					className="bg-gray-500/30 rounded-xl p-4 w-64 flex flex-col gap-2 shadow-md"
				>
					<input
						type="text"
						name="title"
						value={NewTaskTitle}
						onChange={(e) => setNewTaskTitle(e.target.value)}
						placeholder="Task name"
						className="px-3 py-2 rounded-lg text-black outline-none"
						required
					/>
					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={() => {
								setShowForm(false);
								setNewTaskTitle("");
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
	);
}

export default NewTask;
