import { createBrowserRouter } from "react-router-dom";

import { getProjectByUserId, getProjectById } from "./utils/project.js";
import { getListByProjectId } from "./utils/list.js";
import { login } from "./utils/auth.js";

import Auth from "./pages/auth/Auth.jsx"; 
import Homepage from "./pages/home/Homepage.jsx";
import Projects from "./components/Projects.jsx";
import Project from "./components/Project.jsx";
import Root from "./pages/root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Auth />,
        loader: login,
      },
      {
        path: "/project/user/:id",
        element: <Projects />,
        loader: async ({ params }) => getProjectByUserId(params.id),
      },
      {
        path: "/project/:id",
        element: <Project />,
        loader: async ({ params }) => {
          const projects = await getProjectById(params.id);
          const lists = await getListByProjectId(params.id);

          return { projects, lists };
        }
      }
    ],
  },
]);

export default router;
