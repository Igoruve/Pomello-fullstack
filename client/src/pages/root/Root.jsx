import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

/**
 * The Root component is the top-level component for the application.
 * It provides a common layout structure for all pages, including a header,
 * main content area, and footer. It also wraps the main content area in
 * the AuthProvider context, which provides authentication state and
 * actions to all descendant components.
 *
 * @returns {JSX.Element} The Root component with a header, main content area,
 * and footer.
 */
function Root() {
  return (
    <AuthProvider>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </AuthProvider>
  );
}

export default Root;
