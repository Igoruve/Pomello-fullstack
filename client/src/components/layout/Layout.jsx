import TopNavbar from "../navbar/TopNavbar";
import AsideNavbar from "../navbar/AsideNavbar";
import { Outlet } from "react-router-dom";
import DropdownMenu from "../navbar/Dropdownmenu";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AsideNavbar />
        <DropdownMenu />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
