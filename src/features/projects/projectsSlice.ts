import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchProjects } from "./projectsThunks";
import type { Project } from "./types";

type SortMode = "newest" | "az";

type ProjectsState = {
  items: Project[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  sort: SortMode;
};

const initialState: ProjectsState = {
  items: [],
  status: "idle",
  error: null,
  sort: "newest",
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
    builder.addCase(fetchProjects.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "Failed to load projects";
    });
  },
});

export const { setSortMode } = projectsSlice.actions;
export default projectsSlice.reducer;
