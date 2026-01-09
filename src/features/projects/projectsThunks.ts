import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "./types";

export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async () => {
    // stays in src/data and works in dev+build
    const mod = await import("../../data/projects.json");
    return mod.default as Project[];
  }
);