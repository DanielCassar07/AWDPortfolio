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
    await sleep(800);

    return { message: "Message sent successfully. Thanks!" };
  } catch {
    return rejectWithValue("Failed to send message. Please try again.");
  }
});
