import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import FilterBar from "../components/FilterBar";

const meta = {
  title: "Components/FilterBar",
  component: FilterBar,
} satisfies Meta<typeof FilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: "",
    sort: "newest",
    onQueryChange: () => {},
    onSortChange: () => {},
  },
  render: function Render(args) {
    const [{ query, sort }, updateArgs] = useArgs();

    return (
      <FilterBar
        {...args}
        query={query}
        sort={sort}
        onQueryChange={(v) => updateArgs({ query: v })}
        onSortChange={(v) => updateArgs({ sort: v })}
      />
    );
  },
};
