import { createBrowserRouter } from "react-router-dom";
import { getAllProjects, getProjectById } from "./utils/project.js";
import Project from "./components/Project";
import ProjectList from "./components/Projects.jsx";

import Root from "./pages/root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
/*       {
        path: "/",
        element: <HomePage />,
      }, */
      {
        path: "/projects",
        element: <ProjectList />,
        loader: async () => getAllProjects(),
      },
      {
        path: "/project/:id",
        element: <Project />,
        loader: async ({ params }) => getProjectById(params.id),
      },
    ],
  },
]);

export default router;
