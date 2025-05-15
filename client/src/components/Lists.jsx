import { useLoaderData } from "react-router-dom";

function Lists() {
  const loaderData = useLoaderData();

  if (!loaderData) return <div>Loading...</div>;

  return (
    <section>
      {loaderData.map((list) => (
        <div
          key={list._id.$oid}
          className="w-72 bg-slate-800 rounded-2xl p-3 "
        >
          <h3 className="font-bold text-slate-100">{list.title}</h3>
          {list.tasks.map((task) => (
            <div className="bg-slate-700 rounded-2xl p-2 my-2">
              <li key={task._id$oid} className="text-slate-100 list-none">{task.title}</li>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
export default Lists;
