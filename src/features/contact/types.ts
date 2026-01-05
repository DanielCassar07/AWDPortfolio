export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactStatus = "idle" | "loading" | "succeeded" | "failed";