import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

const initialMode = (localStorage.getItem("theme") as ThemeMode) ?? "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: initialMode as ThemeMode },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;