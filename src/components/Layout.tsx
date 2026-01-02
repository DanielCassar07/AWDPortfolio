import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="container">
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