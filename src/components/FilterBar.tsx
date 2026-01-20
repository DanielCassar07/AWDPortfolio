export default function FilterBar({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  sort: "newest" | "az";
  onSortChange: (v: "newest" | "az") => void;
}) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
      <label>
        Search:{" "}
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search..."
        />
      </label>

      <label>
        Sort:{" "}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as "newest" | "az")}
        >
          <option value="newest">Newest</option>
          <option value="az">A → Z</option>
        </select>
      </label>
    </div>
  );
}
