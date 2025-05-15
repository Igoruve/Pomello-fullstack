import { createBrowserRouter } from "react-router-dom";

import { getProjectByUserId, getProjectById } from "./utils/project.js";
import Projects from "./components/Projects.jsx";

import Project from "./components/Project.jsx";

import { getListByProjectId } from "./utils/list.js";


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
