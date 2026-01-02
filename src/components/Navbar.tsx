import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="topbar">
      <div className="nav">
        <div className="brand">
          <span>Daniel Cassar</span>
          <span className="pill">React • TypeScript</span>
        </div>

        <div className="links">
          <NavLink to="/" end className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}>
            About
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}>
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
}