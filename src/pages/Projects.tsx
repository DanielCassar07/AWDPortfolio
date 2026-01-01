import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSortMode } from "../features/projects/projectsSlice";
import type { Project } from "../features/projects/types";

export default function Projects() {
  const dispatch = useAppDispatch();
  const { items, sort } = useAppSelector((s) => s.projects);

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = q
      ? items.filter((p) =>
          `${p.title} ${p.tags.join(" ")}`.toLowerCase().includes(q)
        )
      : items;

    const sorted = [...base];
    if (sort === "az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // newest
      sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    }

    return sorted;
  }, [items, query, sort]);

  return (
    <section>
      <h2>Projects</h2>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        <label>
          Search:{" "}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or tags..."
          />
        </label>

        <label>
          Sort:{" "}
          <select
            value={sort}
            onChange={(e) =>
              dispatch(setSortMode(e.target.value as "newest" | "az"))
            }
          >
            <option value="newest">Newest</option>
            <option value="az">A → Z</option>
          </select>
        </label>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p>No projects found. Check your src/data/projects.json.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {filtered.map((p: Project) => (
            <li key={p.id} style={{ marginBottom: 14 }}>
              <strong>{p.title}</strong>
              <div>{p.description}</div>

              <div style={{ fontSize: 12, opacity: 0.8 }}>
                {p.tags.join(" • ")}
                {p.year ? ` • ${p.year}` : ""}
              </div>

              <div style={{ marginTop: 6 }}>
                <Link to={`/projects/${p.id}`}>Details</Link>
                {" · "}
                <a href={p.liveUrl} target="_blank" rel="noreferrer">
                  Live
                </a>
                {p.repoUrl ? (
                  <>
                    {" · "}
                    <a href={p.repoUrl} target="_blank" rel="noreferrer">
                      Repo
                    </a>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}