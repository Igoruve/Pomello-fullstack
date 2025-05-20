import { createBrowserRouter } from "react-router-dom";

import { getProjectById, getProjectsByUserId } from "./utils/project.js";
import { login, register } from "./utils/auth.js";

import Auth from "./pages/auth/Auth.jsx";
import Homepage from "./pages/home/Homepage.jsx";
import Projects from "./components/Projects.jsx";
import Project from "./components/Project.jsx";
import Root from "./pages/root/Root";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard.jsx"; // Importar el componente Dashboard

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
        element: <Auth isRegister={false} />,
      },
      {
        path: "/register",
        element: <Auth isRegister={true} />,
      },
      {
        element: <Layout />,
        loader: async ({ params }) => getProjectsByUserId(params.id),
        children: [
          {
            path: "/project/user/:id",
            element: <Projects />,
            loader: async ({ params }) => getProjectsByUserId(params.id),
          },
          {
            path: "/project/:id",
            element: <Project />,
            loader: async ({ params }) => getProjectById(params.id),
          },
          {
            path: "/dashboard", // Nueva ruta para el dashboard
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
