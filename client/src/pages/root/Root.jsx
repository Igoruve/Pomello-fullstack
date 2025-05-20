import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

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
