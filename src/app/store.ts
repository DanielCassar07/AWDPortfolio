import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import projectsReducer from "../features/projects/projectsSlice";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
