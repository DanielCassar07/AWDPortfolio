import type { Meta, StoryObj } from "@storybook/react";
import FormField from "../components/FormField";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Empty: Story = {
  args: {
    label: "Name",
    placeholder: "Type here...",
    value: "",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
    value: "bad-email",
    error: "Email is invalid",
  },
};
