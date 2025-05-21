function ShowTasks({ tasks }) {
	return (
		<ul className="flex flex-col gap-2">
			{tasks?.map((task) => (
				<li
					key={task._id}
					className="flex flex-col items-center bg-gray-700 py-2 px-4 rounded-lg shadow-sm text-sm text-white mb-2"
				>
					{task.title}
				</li>
			))}
		</ul>
	);
}

export default ShowTasks;