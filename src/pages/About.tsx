type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

function InfoCard({ icon, title, subtitle, children }: InfoCardProps) {
  return (
    <div className="aboutCard">
      <div className="aboutCardIcon">{icon}</div>
      <div className="aboutCardBody">
        <div className="aboutCardTitleRow">
          <h3 className="aboutCardTitle">{title}</h3>
          {subtitle ? <span className="aboutChip">{subtitle}</span> : null}
        </div>
        {children ? <div className="aboutCardText">{children}</div> : null}
      </div>
    </div>
  );
}

function IconCap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 10L5 9l7-4 7 4-7 4Zm-6 4.2V12l6 3.27L18 12v5.2c0 1.2-2.69 3.8-6 3.8s-6-2.6-6-3.8Z"
      />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 4h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-7a2 2 0 0 1 2-2h4V6a2 2 0 0 1 2-2Zm4 2h-4v2h4V6Zm7 7H3v6a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6Z"
      />
    </svg>
  );
}

function IconStack() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 2 10 6-10 6L2 8l10-6Zm0 14 10-6v4l-10 6L2 14v-4l10 6Zm0 6 10-6v4l-10 6-10-6v-4l10 6Z"
      />
    </svg>
  );
}

function IconCode() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.4 16.6 5.8 13l3.6-3.6L8 8l-5 5 5 5 1.4-1.4Zm5.2 0L18.2 13l-3.6-3.6L16 8l5 5-5 5-1.4-1.4ZM14 4 10 20h-2l4-16h2Z"
      />
    </svg>
  );
}

const skills = [
  { label: "HTML", level: "Strong" },
  { label: "CSS", level: "Strong" },
  { label: "React", level: "Strong" },
  { label: "TypeScript", level: "Strong" },
  { label: ".NET", level: "Intermediate" },
  { label: "C#", level: "Intermediate" },
];

export default function About() {
  return (
    <section className="aboutWrap">
      {/* Header */}
      <div className="aboutHeader card section">
        <p className="aboutKicker">About</p>
        <h1 className="h1">A bit about me</h1>
        <p className="aboutLead muted">
          I’m a Level 6 (Year 3) student at <strong>MCAST</strong> in{" "}
          <strong>Creative Computing</strong>. I build modern web applications and enjoy
          clean UI, solid architecture, and practical full-stack projects.
        </p>

        <div className="aboutHighlights">
          <div className="aboutHighlight">
            <span className="aboutDot" />
            <span>
              <strong>Full Stack Developer</strong>
            </span>
          </div>
          <div className="aboutHighlight">
            <span className="aboutDot" />
            <span>
              Working part-time at <strong>PTL Limited</strong>
            </span>
          </div>
          <div className="aboutHighlight">
            <span className="aboutDot" />
            <span>
              Focus: <strong>React + TypeScript</strong> and <strong>.NET</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="aboutGrid">
        <InfoCard icon={<IconCap />} title="Education" subtitle="MCAST">
          <p>
            Level 6 (Year 3) student in <strong>Creative Computing</strong>.
          </p>
          <p className="muted">
            Interested in software engineering, UI/UX, and building real-world
            applications.
          </p>
        </InfoCard>

        <InfoCard icon={<IconBriefcase />} title="Work" subtitle="PTL Limited">
          <p>
            Working part-time at <strong>PTL Limited</strong>, gaining experience in
            professional development workflows.
          </p>
          <p className="muted">
            Collaboration, clean code, and delivering features under real constraints.
          </p>
        </InfoCard>

        <InfoCard icon={<IconStack />} title="What I build" subtitle="Full-stack">
          <ul className="aboutList">
            <li>Responsive UI with modern component patterns</li>
            <li>State management (Redux Toolkit) + structured data flow</li>
            <li>API integration and backend development with .NET</li>
          </ul>
        </InfoCard>

        <InfoCard icon={<IconCode />} title="Tech stack" subtitle="Core skills">
          <div className="skillsGrid">
            {skills.map((s) => (
              <div key={s.label} className="skillPill">
                <span className="skillName">{s.label}</span>
                <span className="skillLevel">{s.level}</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Bottom */}
      <div className="aboutCTA card section">
        <h2 className="h2">Want to see what I’ve built?</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          Check out the projects section for examples of UI work, state management, and
          full-stack features.
        </p>
        <div className="aboutCTAActions">
          <a className="btn primary" href="/projects">
            View Projects
          </a>
          <a className="btn" href="/contact">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
