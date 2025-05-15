import { createBrowserRouter } from "react-router-dom";

import { getProjectsByUserId, getProjectById } from "./utils/project.js";
import Projects from "./components/Projects.jsx";

import Project from "./components/Project.jsx";

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
        path: "/projects/user/:id",
        element: <Projects />,
        loader: async ({ params }) => getProjectsByUserId(params.id),
      },
      {
        path: "/project/:id",
        element: <Project/>,
        loader: async ({params}) => getProjectById(params.id),
      }
    ],
  },
]);

export default router;
