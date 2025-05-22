import { useState } from "react";

import { updateTask } from "../../utils/task";

function ShowTasks({ tasks }) {
	const [checkedTasks, setCheckedTasks] = useState(
		tasks.reduce((acc, task) => { //reduce para que de la info de la task solo se quede con el id
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

	return (
		<ul className="flex flex-col gap-2">
			{tasks?.map((task) => {
				const taskId = task._id.$oid || task._id;
				const isChecked = checkedTasks[taskId];

				return (
					<li
						key={taskId}
						className="flex items-center bg-gray-700 py-2 px-4 rounded-lg shadow-sm text-sm text-white gap-2">
						<input
							type="checkbox"
							className="w-4 h-4 rounded border-gray-300 text-[#f56b79] focus:ring-[#f56b79] accent-[#f56b79]"
							checked={isChecked}
							onChange={() => handleToggle(task)}/>
						<span
							className={`transition-all ${isChecked ? "line-through opacity-60" : ""}`}>
							{task.title}
						</span>
					</li>
				);
			})}
		</ul>
	);
}

export default ShowTasks;
