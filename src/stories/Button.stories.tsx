import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ViewProjects: Story = {
  args: { children: "View Projects", variant: "primary" },
};

export const Contact: Story = {
  args: { children: "Contact", variant: "secondary" },
};

export const Disabled: Story = {
  args: { children: "View Projects", variant: "primary", disabled: true },
};
