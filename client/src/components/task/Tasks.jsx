import { useLoaderData } from "react-router-dom";

function Tasks() {
  const loaderData = useLoaderData();

  if (!loaderData) return <div>Loading...</div>;

  return (
    <section>
      {loaderData.map((task) => (
        <div key={task._id.$oid}>
          <h2 className="text-slate-100">{task.title}</h2>
        </div>
      ))}
    </section>
  );
}
export default Tasks;
