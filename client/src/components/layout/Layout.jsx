import TopNavbar from "../navbar/TopNavbar";
import AsideNavbar from "../navbar/AsideNavbar";
import { Outlet } from "react-router-dom";
import DropdownMenu from "../navbar/Dropdownmenu";

/**
 * Component that wraps the entire app and renders the common layout elements (navbar, aside, etc.).
 * This component is used as the root component in the Router.
 *
 * @returns {React.ReactElement} The Layout component.
 */
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
