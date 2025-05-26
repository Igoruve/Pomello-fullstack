import PomellodoroChrono from "../PomellodoroChrono";

import { useState } from "react";

function DropdownMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section className="w-64 h-full bg-gray-800 border border-l-gray-100/10 shadow-lg fixed top-16 right-0 z-50 flex flex-col items-center justify-center gap-4 p-4">
      <svg
        viewBox="0 0 320 512"
        height={32}
        width={32}
        fill="#f56b79"
        className="text-white/80 cursor-pointer absolute -left-4 top-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
      </svg>
      <div>
        <p className="text-white/80 text-base mb-2">Texto explicativo.</p>
      </div>
      <PomellodoroChrono />
    </section>
  );
}

export default DropdownMenu;
