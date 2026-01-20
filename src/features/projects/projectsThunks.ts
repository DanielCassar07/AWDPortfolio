import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "./types";

export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async () => {
    const mod = await import("../../data/projects.json");
    return mod.default as Project[];
  }
);
