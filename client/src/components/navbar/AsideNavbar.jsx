import { Link } from "react-router-dom";

import NavbarProjects from "./NavbarProjects";

function AsideNavbar() {

  return (
    <section className="flex flex-col h-screen bg-gray-800 border border-r-gray-100/5  ">
      <nav className="h-full flex flex-col w-64 opacity-90 text-white/80 text-lg px-6 gap-4 pt-12">
        <section className="border-b border-gray-200/20 pb-4 flex flex-col gap-4">
          <Link to={`/project/user`} className="flex flex-row items-center gap-3">
            <svg viewBox="0 0 576 512" height="16px" width="16px" fill="white"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
            Home
          </Link>
          <Link to="/" className="flex flex-row items-center gap-3" >
            <svg viewBox="0 0 448 512" fill="white" height="16px" width="16px"><path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" /></svg>
            Stats
          </Link>
        </section>

        <NavbarProjects />
      </nav>
    </section>
  );
}

export default AsideNavbar;
