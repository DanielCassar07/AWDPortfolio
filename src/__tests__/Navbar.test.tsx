import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import themeReducer from "../features/theme/themeSlice";

function makeStore() {
  return configureStore({
    reducer: { theme: themeReducer },
  });
}

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

describe("Navbar (routing behaviour)", () => {
  it("highlights active route and navigates to About on click", async () => {
    const store = makeStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Navbar />
          <Routes>
            <Route path="*" element={<LocationDisplay />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const home = screen.getByRole("link", { name: /home/i });
    expect(home.className).toContain("active");

    await user.click(screen.getByRole("link", { name: /about/i }));
    expect(screen.getByTestId("location").textContent).toBe("/about");

    const about = screen.getByRole("link", { name: /about/i });
    expect(about.className).toContain("active");
  });

  it("opens and closes the mobile menu state when burger is clicked", async () => {
    const store = makeStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const nav = screen.getByRole("navigation", { name: /primary/i });
    expect(nav.className).not.toContain("open");

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(nav.className).toContain("open");

    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(nav.className).not.toContain("open");
  });
});