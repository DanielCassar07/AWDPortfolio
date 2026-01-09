import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSortMode } from "../features/projects/projectsSlice";
import type { Project } from "../features/projects/types";

export default function Projects() {
  const dispatch = useAppDispatch();
  const { items, sort } = useAppSelector((s) => s.projects);

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("all"); //tag filter

// build dropdown options from your tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => (p.tags ?? []).forEach((t) => set.add(t)));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1) start from all items
    let base = [...items];

    // 2) filter by tag (if selected)
    if (tag !== "all") {
      base = base.filter((p) => (p.tags ?? []).includes(tag));
    }

    // 3) filter by search query
    if (q) {
      base = base.filter((p) =>
        `${p.title} ${(p.tags ?? []).join(" ")}`.toLowerCase().includes(q)
      );
    }

    // 4) sort
    const sorted = [...base];
    if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

    return sorted;
  }, [items, query, tag, sort]);

  return (
    <section className="card section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 className="h2" style={{ marginBottom: 6 }}>
            Projects
          </h2>
          <p className="muted" style={{ marginTop: 0 }}>
            A selection of my work. Click a project to view details.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        {/* Search */}
        <div style={{ minWidth: 240, flex: "1 1 240px" }}>
          <label className="muted" style={{ fontSize: 12 }}>
            Search
          </label>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or tags..."
          />
        </div>

        {/* ✅ NEW: Tag filter */}
        <div style={{ width: 200 }}>
          <label className="muted" style={{ fontSize: 12 }}>
            Tag
          </label>
          <select
            className="select"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All tags" : t}
              </option>
            ))}
          </select>
        </div>

        {/* Sort (Redux) */}
        <div style={{ width: 180 }}>
          <label className="muted" style={{ fontSize: 12 }}>
            Sort
          </label>
          <select
            className="select"
            value={sort}
            onChange={(e) =>
              dispatch(setSortMode(e.target.value as "newest" | "az"))
            }
          >
            <option value="newest">Newest</option>
            <option value="az">A → Z</option>
          </select>
        </div>
      </div>

      {/* Count */}
      <p className="muted" style={{ marginTop: 10 }}>
        Showing <b>{filtered.length}</b> project{filtered.length !== 1 ? "s" : ""}.
      </p>

      <div style={{ marginTop: 16 }}>
        {filtered.length === 0 ? (
          <p className="muted">
            No projects found. Check your src/data/projects.json.
          </p>
        ) : (
          <div className="projectsGrid">
            {filtered.map((p: Project) => (
              <article
                key={p.id}
                className="card section"
                style={{ padding: 18 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                  {p.year ? <span className="muted">{p.year}</span> : null}
                </div>

                <p className="muted" style={{ lineHeight: 1.6 }}>
                  {p.description}
                </p>

                <div className="badges">
                  {(p.tags ?? []).map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 14,
                  }}
                >
                  <a className="btn primary" href={`/projects/${p.id}`}>
                    Details
                  </a>
                  {p.liveUrl ? (
                    <a
                      className="btn"
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>
                  ) : null}
                  {p.repoUrl ? (
                    <a
                      className="btn"
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repo
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}