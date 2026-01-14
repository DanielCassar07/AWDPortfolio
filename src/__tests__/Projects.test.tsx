import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../features/projects/projectsSlice";
import type { Project } from "../features/projects/types";

// ✅ infer the slice state type from the reducer itself
type ProjectsState = ReturnType<typeof projectsReducer>;

const items: Project[] = [
  {
    id: "1",
    title: "Alpha",
    description: "Test",
    tags: ["React"],
    year: 2025,
    liveUrl: "https://budget-ct1ax11rb-daniels-projects-2b93c5dc.vercel.app/",
  },
];

const projectsPreloaded: ProjectsState = {
  items,              
  sort: "newest",      
  status: "succeeded",
  error: null,
};

export const makeStore = () =>
  configureStore({
    reducer: { projects: projectsReducer },
    preloadedState: { projects: projectsPreloaded },
  });