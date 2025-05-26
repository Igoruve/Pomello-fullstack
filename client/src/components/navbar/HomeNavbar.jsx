import { Link } from "react-router-dom";

function HomeNavbar() {

  return (
    <section className="flex flex-row bg-gray-800 border border-b-gray-200/20 h-16 w-full shadow-lg fixed top-0 z-50">
      <nav className="flex flex-row gap-4 text-white/80 w-full justify-between items-center px-64 text-lg ">
        <div className="flex flex-row items-center gap-2">
          <img src="/assets/icon_01.png" alt="pomello icon" className="h-8 w-auto" />
          <Link to="/" className="font-bold text-white/80 text-2xl">POMELLO</Link>
        </div>
        <div className="flex flex-row items-center gap-4">
          <section className="flex flex-row items-center gap-6">
            <Link to="/register">
              <button className="font-bold hover:text-[#f56b79] cursor-pointer">Register</button>
            </Link>

            <Link to="/login">
              <button className="hover:text-[#f56b79] cursor-pointer">Log In</button>
            </Link>
          </section>
        </div>
      </nav>
    </section>
  );
}

export default HomeNavbar;
