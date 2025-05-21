import { useState } from "react";
import ShowTasks from "../task/showTasks.jsx";
import NewTask from "../task/NewTask.jsx";

function ShowLists({ lists }) {
	const [allLists, setAllLists] = useState(lists);

	const handleAddTask = (listId, newTask) => {
		setAllLists(prevLists =>
			prevLists.map(list =>
				list._id === listId
					? { ...list, tasks: [...list.tasks, newTask] }
					: list
			)
		);
	};

	return (
		<>
			{allLists.map((list) => (
				<div
					key={list._id}
					className="text-white min-w-64 bg-gray-900 rounded-xl p-4 shadow-md"
				>
					<h3 className="text-white/80 font-bold mb-6">{list.title}</h3>
					<div className="flex flex-col gap-2">
						<ShowTasks tasks={list.tasks} />
						<NewTask
							listId={list._id}
							onTaskCreated={(newTask) => handleAddTask(list._id, newTask)}
						/>
					</div>
				</div>
			))}
		</>
	);
}

export default ShowLists;
