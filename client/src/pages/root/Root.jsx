import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
export default Root;
