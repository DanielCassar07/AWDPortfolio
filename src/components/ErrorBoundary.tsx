import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // keep this minimal; you can log to a service later
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="container" style={{ paddingTop: 24 }}>
            <div className="card section">
              <h2 className="h2">Something went wrong.</h2>
              <p className="muted">
                A page crashed while loading. Please refresh, or try again.
              </p>

              <details style={{ marginTop: 12, opacity: 0.9 }}>
                <summary style={{ cursor: "pointer" }}>Technical details</summary>
                <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.message}</pre>
              </details>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
