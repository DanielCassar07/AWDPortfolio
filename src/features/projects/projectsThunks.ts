import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "./types";

export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async () => {
    const res = await fetch("/src/data/projects.json");
    if (!res.ok) throw new Error("Failed to load projects");
    return (await res.json()) as Project[];
  }
);
