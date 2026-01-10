import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ThemeSync from "./ThemeSync"; // ✅ add this

export default function Layout() {
  return (
    <div className="container">
      <ThemeSync /> 
      <Navbar />
      <main>
        <Outlet />
        <div className="footer">
          <div className="hr" />
          © {new Date().getFullYear()} Daniel Cassar — Built with React + TypeScript
        </div>
      </main>
    </div>
  );
}