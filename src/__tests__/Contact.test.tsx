import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Contact from "../pages/Contact";
import contactReducer from "../features/contact/contactSlice";

function makeStore() {
  return configureStore({
    reducer: { contact: contactReducer },
  });
}

function mockMxFetchOk() {
  // Return a real Response object so TypeScript + ESLint are happy (no `any`)
  const body = { Answer: [{ data: "10 mail.example.com" }] };

  const fetchMock: typeof fetch = vi.fn(async () => {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });

  vi.stubGlobal("fetch", fetchMock);
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Contact page (form validation)", () => {
  it("shows validation errors when submitting empty form", async () => {
    const store = makeStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Contact />
      </Provider>
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      screen.getByText(/please fix the highlighted fields/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it("rejects invalid name + invalid email format", async () => {
    const store = makeStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Contact />
      </Provider>
    );

    await user.type(screen.getByLabelText(/name/i), "1234");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/subject/i), "Hi");
    await user.type(screen.getByLabelText(/message/i), "Hello there!!!");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      screen.getByText(/name can only contain letters/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/enter a valid email address/i)
    ).toBeInTheDocument();
  });

  it("submits successfully with valid values and shows success banner", async () => {
    mockMxFetchOk();

    const store = makeStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Contact />
      </Provider>
    );

    await user.type(screen.getByLabelText(/name/i), "Daniel Cassar");
    await user.type(screen.getByLabelText(/email/i), "daniel@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Portfolio");
    await user.type(screen.getByLabelText(/message/i), "This is a valid message.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Your thunk waits ~800ms, so wait for the success message to appear.
    expect(
      await screen.findByText(/message sent successfully/i, undefined, { timeout: 3000 })
    ).toBeInTheDocument();
  });
});