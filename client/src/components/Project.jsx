import { useLoaderData } from "react-router-dom";

function Project() {
  const project = useLoaderData();

  return (
    <section className="text-white">
      <h2>{project.title}</h2>
      {project.lists && project.lists.map((list) => (
        <div>
          <h3>{list.title}</h3>
          <ul className="list-none text-red-500">
            {list.tasks && list.tasks.map((task) => (
              <li>{task.title}</li>
            ))}
          </ul>
        </div>
      ))} 
    </section>

  );
}

export default Project;
