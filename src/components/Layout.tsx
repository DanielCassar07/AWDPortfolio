import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Portfolio</h1>
      <Outlet />
    </div>
  );
}