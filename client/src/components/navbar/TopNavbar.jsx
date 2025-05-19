import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

function TopNavbar() {

  return (
    <section className="flex flex-row bg-gray-800 border border-b-gray-200/20 h-18 w-screen">
      <nav className="flex flex-row gap-4 text-white/80 w-full justify-between items-center px-12 text-lg ">
        <img src="/assets/icon_02.png" alt="pomello icon" className="h-8 w-auto" />

        <p>Browser</p>
        <p>User</p>
      </nav>
    </section>
  );
}

export default TopNavbar;
