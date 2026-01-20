import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../features/projects/projectsSlice";
import Projects from "../pages/Projects";

describe("Projects (Redux state)", () => {
  it("renders projects from preloaded redux state", () => {
    const store = configureStore({
      reducer: { projects: projectsReducer },
      preloadedState: {
        projects: {
          items: [
            {
              id: "1",
              title: "Alpha",
              description: "Test",
              tags: ["React"],
              year: 2025,
              liveUrl: "https://budget-ct1ax11rb-daniels-projects-2b93c5dc.vercel.app/",
            },
          ],
          sort: "newest" as const,
          status: "succeeded" as const,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Projects />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Alpha")).toBeInTheDocument();
  });
});
