import type { RootState } from "../../app/store";

export const selectProjects = (state: RootState) => state.projects;

export const selectProjectById = (state: RootState, id: string) =>
  state.projects.items.find((p) => p.id === id);
