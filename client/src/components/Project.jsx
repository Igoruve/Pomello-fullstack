import { useLoaderData } from "react-router-dom";

function Project() {
  const project = useLoaderData();

  return (
    <section>
      <h2 className="text-white/80 text-2xl font-bold text-center py-16">{project.title}</h2>
      <section className="text-white max-w-64 bg-gray-900 rounded-xl p-4 mx-6 shadow-md">
        {project.lists && project.lists.map((list) => (
          <div>
            <h3 className="text-white/80 font-bold mb-6">{list.title}</h3>
            <ul className="list-none text-white/80 flex flex-col gap-2">
              {list.tasks && list.tasks.map((task) => (
                <li className="flex flex-row bg-gray-800 py-2 px-4 rounded-xl ">{task.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </section>
  );
}

export default Project;
