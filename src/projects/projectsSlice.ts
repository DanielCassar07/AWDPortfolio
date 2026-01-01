import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import projectsData from "../data/projects.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl?: string;
  year?: number;
};

type SortMode = "newest" | "az";

type ProjectsState = {
  items: Project[];
  sort: SortMode;
};

const initialState: ProjectsState = {
  items: projectsData as Project[],
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
});

export const { setSortMode } = projectsSlice.actions;
export default projectsSlice.reducer;