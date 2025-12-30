import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { submitContact } from "./contactThunks";

export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactState = ContactFields & {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ContactState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  status: "idle",
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setField(
      state,
      action: PayloadAction<{ key: keyof ContactFields; value: string }>
    ) {
      // all fields are strings so this is safe + keeps TS happy
      (state[action.payload.key] as string) = action.payload.value;
    },
    resetForm(state) {
      state.name = "";
      state.email = "";
      state.subject = "";
      state.message = "";
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitContact.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(submitContact.fulfilled, (state) => {
      state.status = "succeeded";
    });

    builder.addCase(submitContact.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "Failed to submit";
    });
  },
});

export const { setField, resetForm } = contactSlice.actions;
export default contactSlice.reducer;