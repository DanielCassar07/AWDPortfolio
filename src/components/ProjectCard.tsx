import { memo } from "react";
import type { Project } from "../features/projects/types";

type Props = {
  project: Project;
};

function ProjectCard({ project: p }: Props) {
  return (
    <article className="card section" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
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

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
        <a className="btn primary" href={`/projects/${p.id}`}>
          Details
        </a>

        {p.liveUrl ? (
          <a className="btn" href={p.liveUrl} target="_blank" rel="noreferrer">
            Live
          </a>
        ) : null}

        {p.repoUrl ? (
          <a className="btn" href={p.repoUrl} target="_blank" rel="noreferrer">
            Repo
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default memo(ProjectCard);
