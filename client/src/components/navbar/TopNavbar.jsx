import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

function TopNavbar() {

  return (
    <section className="flex flex-row bg-gray-800 border border-b-gray-200/20 h-12 w-screen">
        <nav className="flex flex-row gap-4 text-white/80 w-full justify-between items-center px-12 text-lg ">
            <p>logo</p>
            <p>Browser</p>
            <p>User</p>
        </nav>
    </section>
  );
}

export default TopNavbar;
