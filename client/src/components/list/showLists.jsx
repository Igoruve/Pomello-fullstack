import { useState } from "react";
import ShowTasks from "../task/showTasks.jsx";
import NewTask from "../task/NewTask.jsx";

function ShowLists({ lists, onAddTask }) {
	return (
		<>
			{lists.map((list) => (
				<div
					key={list._id}
					className="text-white max-w-64 bg-gray-900 rounded-xl p-4 shadow-md h-fit"
				>
					<h3 className="text-white/80 font-bold mb-6">{list.title}</h3>
					<div className="flex flex-col gap-2 relative">
						<ShowTasks tasks={list.tasks} />
						<NewTask
						className="absolute bottom-0 left-0"
							listId={list._id}
							onTaskCreated={(newTask) => onAddTask(list._id, newTask)}
						/>
					</div>
				</div>
			))}
		</>
	);
}

export default ShowLists;
