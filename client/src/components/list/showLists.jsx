function ShowLists({ lists }) {
    return (
        <>
            {lists &&

                lists.map((list) => (
                    <div
                        key={list._id}
                        className="text-white min-w-64 bg-gray-900 rounded-xl p-4 shadow-md">
                        <h3 className="text-white/80 font-bold mb-6">{list.title}</h3>
                        <ul className="list-none text-white/80 flex flex-col gap-2">
                            {list.tasks &&
                                list.tasks.map((task) => (
                                    <div
                                        key={task._id}
                                        className="text-white min-w-64 bg-gray-800 rounded-xl p-4 shadow-md"
                                    >
                                        <li
                                            className="flex flex-row bg-gray-700 py-2 px-4 rounded-xl"
                                            key={task._id}
                                        >
                                            {task.title}
                                        </li>
                                    </div>
                                ))}
                        </ul>
                    </div>
                ))}
        </>
    )
}

export default ShowLists;