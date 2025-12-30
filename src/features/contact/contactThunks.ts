import { createAsyncThunk } from "@reduxjs/toolkit";

export const submitContact = createAsyncThunk<
  void,
  { name: string; email: string; subject: string; message: string }
>("contact/submitContact", async () => {
  // Mock async submit
  await new Promise((r) => setTimeout(r, 700));
});
