import PomellodoroChrono from "../PomellodoroChrono";

import { useState } from "react";

/**
 * A dropdown menu that contains the PomellodoroChrono component.
 * The menu is hidden by default and can be toggled by clicking
 * the hamburger menu icon in the top right corner of the screen.
 * The menu is fixed to the top right corner of the screen and
 * has a width of 64 pixels. The menu is also responsive and
 * will adjust its width based on the screen size.
 */
function DropdownMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section
      className={`w-64 h-full bg-gray-800 fixed top-16 right-0 transform transition-transform duration-300 border border-l-gray-100/10 z-60 ${
        isMenuOpen ? "-translate-x-0" : "translate-x-11/12"
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full pb-18">
      <svg
        viewBox="0 0 512 512"
        height={36}
        width={36}
        fill="currentColor"
        className={`text-gray-800 absolute -left-4 top-1/12 bg-[#f56b79] p-[1px] rounded-full cursor-pointer shadow-lg ${
          isMenuOpen ? "rotate-180" : ""
        } transition-rotate duration-150`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
      </svg>
      <div>
        <p className="text-white/80 text-lg mb-6">Chrono</p>
      </div>
      <PomellodoroChrono />
      </div>
    </section>
  );
}

export default DropdownMenu;
