import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ContactFormValues } from "./types";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const sendContactForm = createAsyncThunk<
  { message: string },
  ContactFormValues,
  { rejectValue: string }
>("contact/sendContactForm", async (_payload, { rejectWithValue }) => {
  try {
    // Simulate request (assignment-safe). Replace with real API later if needed.
    await sleep(800);

    // You can log payload during dev if you want:
    // console.log("Contact payload:", payload);

    return { message: "Message sent successfully. Thanks!" };
  } catch {
    return rejectWithValue("Failed to send message. Please try again.");
  }
}); 