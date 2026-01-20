import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { router } from "./routes/router";
import { store } from "./app/store";
import "./styles/globals.css";

const savedTheme = localStorage.getItem("theme");
document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
