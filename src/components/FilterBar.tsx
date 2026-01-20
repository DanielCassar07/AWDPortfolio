type SortMode = "newest" | "az";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;

  tag: string;
  tagOptions: string[];
  onTagChange: (v: string) => void;

  sort: SortMode;
  onSortChange: (v: SortMode) => void;
};

export default function FilterBar({
  query,
  onQueryChange,
  tag,
  tagOptions,
  onTagChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
      <div style={{ minWidth: 240, flex: "1 1 240px" }}>
        <label className="muted" style={{ fontSize: 12 }}>
          Search
        </label>
        <input
          className="input"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search title or tags..."
        />
      </div>

      <div style={{ width: 200 }}>
        <label className="muted" style={{ fontSize: 12 }}>
          Tag
        </label>
        <select
          className="select"
          value={tag}
          onChange={(e) => onTagChange(e.target.value)}
        >
          {tagOptions.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All tags" : t}
            </option>
          ))}
        </select>
      </div>

      <div style={{ width: 180 }}>
        <label className="muted" style={{ fontSize: 12 }}>
          Sort
        </label>
        <select
          className="select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortMode)}
        >
          <option value="newest">Newest</option>
          <option value="az">A → Z</option>
        </select>
      </div>
    </div>
  );
}
