import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSortMode } from "../features/projects/projectsSlice";
import { fetchProjects } from "../features/projects/projectsThunks";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const dispatch = useAppDispatch();
  const { items, sort, status, error } = useAppSelector((s) => s.projects);

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("all");

  // Load projects once (thunk)
  useEffect(() => {
    if (status === "idle") dispatch(fetchProjects());
  }, [dispatch, status]);

  // Tag dropdown options
  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => (p.tags ?? []).forEach((t) => set.add(t)));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  // ✅ Avoid “setState in effect” warning by clamping tag without effects
  const safeTag = allTags.includes(tag) ? tag : "all";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let base = [...items];

    if (safeTag !== "all") {
      base = base.filter((p) => (p.tags ?? []).includes(safeTag));
    }

    if (q) {
      base = base.filter((p) =>
        `${p.title} ${(p.tags ?? []).join(" ")}`.toLowerCase().includes(q)
      );
    }

    const sorted = [...base];
    if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

    return sorted;
  }, [items, query, safeTag, sort]);

  return (
    <section className="card section">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 className="h2" style={{ marginBottom: 6 }}>Projects</h2>
          <p className="muted" style={{ marginTop: 0 }}>
            A selection of my work. Click a project to view details.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        <div style={{ minWidth: 240, flex: "1 1 240px" }}>
          <label className="muted" style={{ fontSize: 12 }}>Search</label>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or tags..."
          />
        </div>

        <div style={{ width: 200 }}>
          <label className="muted" style={{ fontSize: 12 }}>Tag</label>
          <select
            className="select"
            value={safeTag}
            onChange={(e) => setTag(e.target.value)}
          >
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All tags" : t}
              </option>
            ))}
          </select>
        </div>

        <div style={{ width: 180 }}>
          <label className="muted" style={{ fontSize: 12 }}>Sort</label>
          <select
            className="select"
            value={sort}
            onChange={(e) => dispatch(setSortMode(e.target.value as "newest" | "az"))}
          >
            <option value="newest">Newest</option>
            <option value="az">A → Z</option>
          </select>
        </div>
      </div>

      {/* Status */}
      {status === "loading" ? (
        <p className="muted" style={{ marginTop: 10 }}>Loading projects…</p>
      ) : status === "failed" ? (
        <p className="muted" style={{ marginTop: 10 }}>
          Failed to load projects: {error ?? "Unknown error"}
        </p>
      ) : (
        <p className="muted" style={{ marginTop: 10 }}>
          Showing <b>{filtered.length}</b> project{filtered.length !== 1 ? "s" : ""}.
        </p>
      )}

      <div style={{ marginTop: 16 }}>
        {status !== "loading" && status !== "failed" && filtered.length === 0 ? (
          <p className="muted">No projects found. Check your src/data/projects.json.</p>
        ) : status === "loading" || status === "failed" ? null : (
          <div className="projectsGrid">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}