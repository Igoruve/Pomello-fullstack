import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

function TopNavbar() {

  return (
    <section className="flex flex-row bg-gray-800 border border-b-gray-200/20 h-18 w-screen">
      <nav className="flex flex-row gap-4 text-white/80 w-full justify-between items-center px-12 text-lg ">
        <div className="flex flex-row items-center gap-2">
          <img src="/assets/icon_01.png" alt="pomello icon" className="h-8 w-auto" />
          <h1 className="font-bold text-white/80 text-2xl">POMELLO</h1>
        </div>
        <div className="flex flex-row items-center gap-4">
          <p>Browser</p>
          <p>User</p>
        </div>
      </nav>
    </section>
  );
}

export default TopNavbar;
