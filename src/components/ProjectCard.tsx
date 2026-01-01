import type { Project } from "../features/projects/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article style={{ border: "1px solid #d1d5db", borderRadius: 12, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h3 style={{ margin: 0 }}>{project.title}</h3>
        {project.year ? <span style={{ opacity: 0.7 }}>{project.year}</span> : null}
      </div>

      <p style={{ opacity: 0.8 }}>{project.description}</p>

      <div style={{ fontSize: 12, opacity: 0.8 }}>
        {project.tags.join(" • ")}
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          Live
        </a>
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            Repo
          </a>
        ) : null}
      </div>
    </article>
  );
}