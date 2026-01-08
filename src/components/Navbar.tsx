import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { toggleTheme } from "../features/theme/themeSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((s: RootState) => s.theme.mode);

  const closeMenu = () => setOpen(false);

  return (
    <header className="topbar">
      <div className="container nav">
        {/* Brand + actions row */}
        <div className="brandRow">
          <div className="brand">
            <span>Daniel Cassar</span>
            <span className="pill">React • TypeScript</span>
          </div>

          {/* Actions (theme always visible, burger only on small screens via CSS) */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="button"
              className="navToggle themeToggle"
              aria-label="Toggle theme"
              title="Toggle theme"
              onClick={() => dispatch(toggleTheme())}
            >
              {mode === "dark" ? "🌙" : "☀️"}
            </button>

            <button
              type="button"
              className="burgerToggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="navToggleBars" />
            </button>
          </div>
        </div>

        {/* Links (desktop normal, mobile collapses) */}
        <nav className={`links ${open ? "open" : ""}`} aria-label="Primary">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}
          >
            About
          </NavLink>

          <NavLink
            to="/projects"
            onClick={closeMenu}
            className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}
          >
            Projects
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}