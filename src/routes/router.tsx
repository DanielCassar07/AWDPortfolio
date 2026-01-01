import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:projectId", element: <ProjectDetail /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);