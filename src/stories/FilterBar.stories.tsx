import type { Meta, StoryObj } from "@storybook/react";
import FilterBar from "../components/FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
};
export default meta;

type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  args: {
    query: "",
    onQueryChange: () => {},
    sort: "newest",
    onSortChange: () => {},
  },
};