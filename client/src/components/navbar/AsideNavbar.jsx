import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

function AsideNavbar() {
  const loaderData = useLoaderData();

  if (!loaderData) return <div>Loading...</div>;
  console.log(loaderData);

  if (!Array.isArray(loaderData)) {
    return <div>Error: {loaderData?.message || "Unexpected error"}</div>;
  }

  return (
    <section className="my-4">
        <nav>
            <p>Home</p>
            <p>Stats</p>
            
            <p>NavbarPRojects</p>
        </nav>
    </section>
  );
}

export default AsideNavbar;
