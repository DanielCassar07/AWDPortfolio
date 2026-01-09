import type { RootState } from "../../app/store";

export const selectContactValues = (s: RootState) => s.contact.values;
export const selectContactErrors = (s: RootState) => s.contact.errors;
export const selectContactStatus = (s: RootState) => s.contact.status;
export const selectContactSuccessMessage = (s: RootState) =>
  s.contact.successMessage;
export const selectContactServerError = (s: RootState) => s.contact.serverError;