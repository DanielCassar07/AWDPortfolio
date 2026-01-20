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
    tag: "all",
    tagOptions: ["all", "React", "TypeScript", "Redux", "CSS", "Vite"],
    sort: "newest",

    // required props (overridden in render)
    onQueryChange: () => {},
    onTagChange: () => {},
    onSortChange: () => {},
  },
  render: function Render(args) {
    const [{ query, tag, sort }, updateArgs] = useArgs();

    return (
      <section className="card section">
        <div className="sectionHead">
          <h2 className="h2" style={{ marginBottom: 6 }}>
            Projects
          </h2>
          <p className="muted" style={{ marginTop: 0 }}>
            A selection of my work. Click a project to view details.
          </p>
        </div>

        <FilterBar
          {...args}
          query={query}
          tag={tag}
          sort={sort}
          onQueryChange={(v) => updateArgs({ query: v })}
          onTagChange={(v) => updateArgs({ tag: v })}
          onSortChange={(v) => updateArgs({ sort: v })}
        />
      </section>
    );
  },
};
