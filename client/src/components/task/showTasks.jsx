import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { updateTask } from "../../utils/task";

function ShowTasks({ tasks }) {
	const [editedTitle, setEditedTitle] = useState("");
	const [isEditingTaskId, setIsEditingTaskId] = useState(null);
	const revalidator = useRevalidator();

	const [checkedTasks, setCheckedTasks] = useState(
		tasks.reduce((acc, task) => {
			acc[task._id] = task.isCompleted;
			return acc;
		}, {})
	);

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
		if (!editedTitle.trim()) return; // evitar títulos vacíos
		await updateTask(taskId, { title: editedTitle });
		setIsEditingTaskId(null);
		revalidator.revalidate();
	};

	const handleKeyDown = (e, taskId) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleBlur(taskId);
		}
	};

	return (
		<section>
			<ul className="flex flex-col gap-2">
				{tasks?.map((task) => {
					const taskId = task._id.$oid || task._id;
					const isChecked = checkedTasks[taskId];
					const isEditing = isEditingTaskId === taskId;

					return (
						<li
							key={taskId}
							className="flex items-center bg-gray-700 py-2 px-4 rounded-lg shadow-sm text-sm text-white gap-2">
							<input
								type="checkbox"
								className="w-4 h-4 rounded border-gray-300 text-[#f56b79] focus:ring-[#f56b79] accent-[#f56b79]"
								checked={isChecked}
								onChange={() => handleToggle(task)}/>

							{isEditing ? (
								<textarea
									value={editedTitle}
									onChange={(e) => setEditedTitle(e.target.value)}
									onBlur={() => handleBlur(taskId)}
									onKeyDown={(e) => handleKeyDown(e, taskId)}
									autoFocus
									className="bg-gray-800 text-white text-sm rounded px-2 py-1 w-full"
									maxLength={80}/>
							) : (
								<span
									onClick={() => startEditing(task)}
									className={`transition-all cursor-pointer ${
										isChecked ? "line-through opacity-60" : ""
									}`}>
									{task.title}
								</span>
							)}
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default ShowTasks;
