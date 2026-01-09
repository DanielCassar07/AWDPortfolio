// src/features/projects/projectsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "./types";
import { fetchProjects } from "./projectsThunks";

type SortMode = "newest" | "az";
type LoadStatus = "idle" | "loading" | "succeeded" | "failed";

type ProjectsState = {
  items: Project[];
  sort: SortMode;
  status: LoadStatus;
  error: string | null;
};

const initialState: ProjectsState = {
  items: [],
  sort: "newest",
  status: "idle",
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSortMode(state, action: PayloadAction<SortMode>) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load projects";
      });
  },
});

export const { setSortMode } = projectsSlice.actions;
export default projectsSlice.reducer;