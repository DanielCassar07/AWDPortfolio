import type { Preview } from "@storybook/react-vite";
import React from "react";
import { Provider } from "react-redux";

import "../src/styles/globals.css";
import { store } from "../src/app/store";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      document.documentElement.dataset.theme =
        localStorage.getItem("theme") === "light" ? "light" : "dark";

      return (
        <Provider store={store}>
          <div className="container">
            <main>
              <Story />
            </main>
          </div>
        </Provider>
      );
    },
  ],
};

export default preview;
