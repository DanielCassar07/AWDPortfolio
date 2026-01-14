import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import ErrorBoundary from "../components/ErrorBoundary";
import PageLoader from "../components/PageLoader";

// Eager-load Home (fast first paint)
import Home from "../pages/Home";

// Lazy-load the rest (2+ required)
const About = lazy(() => import("../pages/About"));
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail"));
const Contact = lazy(() => import("../pages/Contact"));

function withGuards(element: React.ReactNode) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>{element}</Suspense>
    </ErrorBoundary>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      { path: "about", element: withGuards(<About />) },

      // ✅ Nested routing: /projects + /projects/:projectId
      {
        path: "projects",
        element: withGuards(<Projects />),
        children: [
          { path: ":projectId", element: withGuards(<ProjectDetail />) },
        ],
      },

      { path: "contact", element: withGuards(<Contact />) },

      { path: "*", element: <NotFound /> },
    ],
  },
]);