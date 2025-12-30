import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Portfolio</h1>
      <Navbar />
      <Outlet />
    </div>
  );
}