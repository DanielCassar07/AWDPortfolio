import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ContactFormValues } from "./types";

// Mock API submit
async function submitContact(values: ContactFormValues): Promise<{ ok: true }> {
  console.log("Contact form submitted:", values); // 👈 now it's used
  await new Promise((r) => setTimeout(r, 900));
  return { ok: true };
}

export const sendContactForm = createAsyncThunk<
  { ok: true },
  ContactFormValues,
  { rejectValue: string }
>("contact/sendContactForm", async (values, { rejectWithValue }) => {
  try {
    const res = await submitContact(values);
    return res;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Something went wrong";
    return rejectWithValue(msg);
  }
});