import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Star = {
  id: number;
  left: number; // %
  top: number; // %
  size: number; // px
  dur: number; // s
  delay: number; // s
  opacity: number;
};

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const current = words[wordIndex % words.length];

  useEffect(() => {
    const speed = isDeleting ? 35 : 65;

    const t = setTimeout(() => {
      const next = isDeleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);

      setText(next);

      if (!isDeleting && next === current) {
        setTimeout(() => setIsDeleting(true), 900);
      }

      if (isDeleting && next === "") {
        setIsDeleting(false);
        setWordIndex((i) => i + 1);
      }
    }, speed);

    return () => clearTimeout(t);
  }, [current, text, isDeleting]);

  return text;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2.2,
    dur: 10 + Math.random() * 14,
    delay: Math.random() * 6,
    opacity: 0.18 + Math.random() * 0.55,
  }));
}

export default function Home() {
  const typed = useTypewriter([
    "Full Stack Developer",
    "React + TypeScript",
    "Clean UI • Strong Architecture",
  ]);

  // ESLint-friendly: generated once on mount
  const [stars] = useState<Star[]>(() => generateStars(110));

  // tiny parallax without randomness
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    setOffset({ x, y });
  };

  const starStyle = useMemo(
    () => ({
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    }),
    [offset.x, offset.y]
  );

  return (
    <div className="container">
      <section className="heroCard" onMouseMove={onMove}>
        <div className="heroGlow" />

        <div className="heroStars" aria-hidden="true" style={starStyle}>
          {stars.map((s) => (
            <span
              key={s.id}
              className="heroStar"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="heroInner">
          <p className="heroKicker">HELLO, I&apos;M</p>

          <h1 className="heroName">
            Daniel <span className="heroNameSoft">Cassar</span>
          </h1>

          <p className="heroRole">
            {typed}
            <span className="cursor" aria-hidden="true">
              |
            </span>
          </p>

          <div className="heroButtons">
            <Link className="btn primary" to="/projects">
              View Projects
            </Link>
            <Link className="btn" to="/contact">
              Contact
            </Link>
          </div>

          <p className="heroMini">
            Building modern web apps with React, TypeScript, Redux Toolkit, and .NET.
          </p>
        </div>
      </section>
    </div>
  );
}
