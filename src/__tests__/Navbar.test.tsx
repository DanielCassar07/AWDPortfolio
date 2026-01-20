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
    expect(home).toHaveClass("active");

    await user.click(screen.getByRole("link", { name: /about/i }));
    expect(screen.getByTestId("location")).toHaveTextContent("/about");

    const about = screen.getByRole("link", { name: /about/i });
    expect(about).toHaveClass("active");
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

    // Re-query nav each time to avoid stale element references after re-render
    expect(screen.getByRole("navigation", { name: /primary/i })).not.toHaveClass("open");

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("navigation", { name: /primary/i })).toHaveClass("open");

    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(screen.getByRole("navigation", { name: /primary/i })).not.toHaveClass("open");
  });
});
