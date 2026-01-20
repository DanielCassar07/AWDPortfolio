import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/projects"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
