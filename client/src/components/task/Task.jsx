import { useLoaderData } from "react-router-dom";

function Task() {
  const task = useLoaderData();

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}
export default Task;