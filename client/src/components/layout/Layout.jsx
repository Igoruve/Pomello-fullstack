import TopNavbar from "../navbar/TopNavbar";
import AsideNavbar from "../navbar/AsideNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <TopNavbar />
            <div className="flex">
                <AsideNavbar />
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Layout;