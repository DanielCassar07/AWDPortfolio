import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ContactErrors, ContactFormValues, ContactState } from "./types";
import { sendContactForm } from "./contactThunks";

const initialState: ContactState = {
  values: {
    name: "",
    email: "",
    subject: "",
    message: "",
  },
  errors: {},
  status: "idle",
  successMessage: null,
  serverError: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ field: keyof ContactFormValues; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.values[field] = value;

      // nice UX: clear error when user edits field
      if (state.errors[field]) delete state.errors[field];
    },

    setErrors: (state, action: PayloadAction<ContactErrors>) => {
      state.errors = action.payload;
    },

    clearStatusMessages: (state) => {
      state.successMessage = null;
      state.serverError = null;
    },

    resetForm: (state) => {
      state.values = initialState.values;
      state.errors = {};
      state.status = "idle";
      state.successMessage = null;
      state.serverError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.status = "loading";
        state.successMessage = null;
        state.serverError = null;
      })
      .addCase(sendContactForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage = action.payload.message;
        state.serverError = null;

        // clear fields after success
        state.values = initialState.values;
        state.errors = {};
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.status = "failed";
        state.serverError =
          action.payload ?? "Failed to send message. Please try again.";
      });
  },
});

export const { setField, setErrors, clearStatusMessages, resetForm } =
  contactSlice.actions;

export default contactSlice.reducer;