import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

function TopNavbar() {
  const loaderData = useLoaderData();

  if (!Array.isArray(loaderData)) {
    return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
  }

  return (
    <section className="my-4">
        <nav>
            <p>Browser</p>
            <p>User</p>
        </nav>
    </section>
  );
}

export default TopNavbar;
