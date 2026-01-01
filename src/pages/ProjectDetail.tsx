import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type { Project } from "../features/projects/types";

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();

  const project = useAppSelector((s) =>
    s.projects.items.find((p: Project) => p.id === projectId)
  );

  if (!projectId) {
    return (
      <section>
        <p>Missing project id.</p>
        <Link to="/projects">← Back to Projects</Link>
      </section>
    );
  }

  if (!project) {
    return (
      <section>
        <p>Project not found.</p>
        <Link to="/projects">← Back to Projects</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/projects">← Back to Projects</Link>

      <h2 style={{ marginTop: 12 }}>{project.title}</h2>
      <p>{project.description}</p>

      <p style={{ fontSize: 12, opacity: 0.8 }}>
        {project.tags.join(" • ")}
        {project.year ? ` • ${project.year}` : ""}
      </p>

      <p>
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          Live
        </a>
        {project.repoUrl ? (
          <>
            {" · "}
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              Repo
            </a>
          </>
        ) : null}
      </p>
    </section>
  );
}