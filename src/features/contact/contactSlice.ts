import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sendContactForm } from "./contactThunks";
import type { ContactErrors, ContactFormValues, ContactStatus } from "./types";

type ContactState = {
  values: ContactFormValues;
  errors: ContactErrors;
  status: ContactStatus;
  serverError: string | null;
  successMessage: string | null;
};

const initialState: ContactState = {
  values: {
    name: "",
    email: "",
    subject: "",
    message: "",
  },
  errors: {},
  status: "idle",
  serverError: null,
  successMessage: null,
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

      // clear field error as user types
      if (state.errors[field]) delete state.errors[field];

      // clear status messages while editing
      state.successMessage = null;
      state.serverError = null;
    },

    setErrors: (state, action: PayloadAction<ContactErrors>) => {
      state.errors = action.payload;
    },

    resetForm: (state) => {
      state.values = initialState.values;
      state.errors = {};
      state.status = "idle";
      state.serverError = null;
      state.successMessage = null;
    },

    clearStatusMessages: (state) => {
      state.serverError = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.status = "loading";
        state.serverError = null;
        state.successMessage = null;
      })
      .addCase(sendContactForm.fulfilled, (state) => {
        state.status = "succeeded";
        state.successMessage = "Message sent successfully. I’ll get back to you soon!";
        state.serverError = null;

        // optional: clear fields after success
        state.values = initialState.values;
        state.errors = {};
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.status = "failed";
        state.serverError = action.payload ?? "Failed to send. Please try again.";
        state.successMessage = null;
      });
  },
});

export const { setField, setErrors, resetForm, clearStatusMessages } =
  contactSlice.actions;

export default contactSlice.reducer;