import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="topbar">
      <div className="container nav">
        {/* Brand + burger row */}
        <div className="brandRow">
          <div className="brand">
            <span>Daniel Cassar</span>
            <span className="pill">React • TypeScript</span>
          </div>

          {/* Burger shows only on small screens via CSS */}
          <button
            type="button"
            className="navToggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navToggleBars" />
          </button>
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