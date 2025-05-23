import { Link } from "react-router-dom";

function TopNavbar() {

  return (
    <section className="flex flex-row bg-gray-800 border border-b-gray-200/20 h-16 w-full shadow-lg fixed top-0 z-50">
      <nav className="flex flex-row gap-4 text-white/80 w-full justify-between items-center px-12 text-lg ">
        <div className="flex flex-row items-center gap-2">
          <img src="/assets/icon_01.png" alt="pomello icon" className="h-8 w-auto" />
          <Link to="/project/user" className="font-bold text-white/80 text-2xl">POMELLO</Link>
        </div>
        <div className="flex flex-row items-center gap-4">
          <img src="/assets/rodaja-de-tomate.png" alt="pomello icon" className="h-8 w-auto" />
          <Link to="/pomellodoro/start"> chrono</Link>
          <p>Browser</p>
          <div className="flex flex-row items-center gap-2">
          <svg viewBox="0 0 448 512" width="18px" height="18px" fill="white">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
          <Link to="/logout">Log Out</Link>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default TopNavbar;
