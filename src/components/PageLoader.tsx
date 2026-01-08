export default function PageLoader() {
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <div className="card section">
        <p className="muted" style={{ margin: 0 }}>
          Loading…
        </p>
        <div
          style={{
            height: 10,
            borderRadius: 999,
            marginTop: 12,
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.04)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "40%",
              borderRadius: 999,
              background:
                "linear-gradient(90deg, rgba(124,58,237,0.9), rgba(59,130,246,0.7))",
              animation: "loaderSlide 1.1s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}