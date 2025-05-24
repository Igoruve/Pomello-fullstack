import { Outlet } from "react-router-dom";

import TopNavbar from "../navbar/TopNavbar";
import AsideNavbar from "../navbar/AsideNavbar";
import ChronoNavbar from "../navbar/ChronoNavbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AsideNavbar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        <div>
          <ChronoNavbar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
