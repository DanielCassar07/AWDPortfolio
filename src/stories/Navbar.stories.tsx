import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../components/Navbar";
import { store } from "../app/store";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};