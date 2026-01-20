import { useId, useMemo } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectContactErrors,
  selectContactServerError,
  selectContactStatus,
  selectContactSuccessMessage,
  selectContactValues,
} from "../features/contact/selectors";
import {
  setErrors,
  setField,
  clearStatusMessages,
} from "../features/contact/contactSlice";
import { sendContactForm } from "../features/contact/contactThunks";
import type { ContactErrors, ContactFormValues } from "../features/contact/types";

/**
 * Name rule:
 * - letters (including accents), spaces, hyphens, apostrophes
 * - at least 2 chars
 */
const NAME_REGEX = /^[a-zA-ZÀ-ÿ' -]{2,}$/;

/**
 * Email rule:
 * - basic format check (fast + reliable)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function hasMxRecord(domain: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
      { method: "GET" }
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { Answer?: unknown[] };
    return Array.isArray(data.Answer) && data.Answer.length > 0;
  } catch {
    // If DNS check fails (offline / blocked), don't hard fail.
    // fallback to format validation only.
    return true;
  }
}

function validate(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};

  //  Name validation
  const name = values.name.trim();
  if (!name) errors.name = "Name is required.";
  else if (!NAME_REGEX.test(name)) {
    errors.name = "Name can only contain letters, spaces, hyphens, and apostrophes.";
  }

  //  Email validation (format only here — MX check is async in submit)
  const email = values.email.trim();
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.subject.trim()) errors.subject = "Subject is required.";

  const msg = values.message.trim();
  if (!msg) errors.message = "Message is required.";
  else if (msg.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

export default function Contact() {
  const dispatch = useAppDispatch();

  const values = useAppSelector(selectContactValues);
  const errors = useAppSelector(selectContactErrors);
  const status = useAppSelector(selectContactStatus);
  const serverError = useAppSelector(selectContactServerError);
  const success = useAppSelector(selectContactSuccessMessage);

  const busy = status === "loading";

  // IDs for aria-describedby wiring
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  const hasAnyError = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function onChange(field: keyof ContactFormValues) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;

      dispatch(setField({ field, value }));

      if (errors[field]) {
        dispatch(
          setErrors({
            ...errors,
            [field]: undefined,
          })
        );
      }
    };
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    dispatch(clearStatusMessages());

    // 1) sync validation
    const nextErrors = validate(values);

    // 2) async email MX check (only if email format passed)
    const email = values.email.trim();
    if (!nextErrors.email && email) {
      const domain = email.split("@")[1]?.toLowerCase();
      if (domain) {
        const ok = await hasMxRecord(domain);
        if (!ok) {
          nextErrors.email =
            "This email domain cannot receive emails. Please check your email.";
        }
      }
    }

    dispatch(setErrors(nextErrors));
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await dispatch(sendContactForm(values)).unwrap();

      // Clear form after success
      dispatch(setField({ field: "name", value: "" }));
      dispatch(setField({ field: "email", value: "" }));
      dispatch(setField({ field: "subject", value: "" }));
      dispatch(setField({ field: "message", value: "" }));
      dispatch(setErrors({}));
    } catch {
      // serverError handled by slice/state
    }
  }

  return (
    <section className="card section">
      <div className="sectionHead">
        <h1 className="h1">Contact</h1>
        <p className="muted">Send me a message — I usually reply within 24–48 hours.</p>
      </div>

      {/* status banners */}
      {success && (
        <div className="alert success" role="status" aria-live="polite">
          {success}
        </div>
      )}
      {serverError && (
        <div className="alert error" role="alert">
          {serverError}
        </div>
      )}
      {hasAnyError && (
        <div className="alert warn" role="alert">
          Please fix the highlighted fields.
        </div>
      )}

      <form className="formGrid" onSubmit={onSubmit} noValidate aria-busy={busy}>
        <div className="field">
          <label htmlFor={nameId} className="label">
            Name <span className="req">*</span>
          </label>
          <input
            id={nameId}
            className={`input ${errors.name ? "invalid" : ""}`}
            value={values.name}
            onChange={onChange("name")}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${nameId}-err` : undefined}
            disabled={busy}
          />
          {errors.name && (
            <p id={`${nameId}-err`} className="fieldError">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor={emailId} className="label">
            Email <span className="req">*</span>
          </label>
          <input
            id={emailId}
            className={`input ${errors.email ? "invalid" : ""}`}
            value={values.email}
            onChange={onChange("email")}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${emailId}-err` : undefined}
            disabled={busy}
          />
          {errors.email && (
            <p id={`${emailId}-err`} className="fieldError">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field colFull">
          <label htmlFor={subjectId} className="label">
            Subject <span className="req">*</span>
          </label>
          <input
            id={subjectId}
            className={`input ${errors.subject ? "invalid" : ""}`}
            value={values.subject}
            onChange={onChange("subject")}
            placeholder="What’s this about?"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? `${subjectId}-err` : undefined}
            disabled={busy}
          />
          {errors.subject && (
            <p id={`${subjectId}-err`} className="fieldError">
              {errors.subject}
            </p>
          )}
        </div>

        <div className="field colFull">
          <label htmlFor={messageId} className="label">
            Message <span className="req">*</span>
          </label>
          <textarea
            id={messageId}
            className={`textarea ${errors.message ? "invalid" : ""}`}
            value={values.message}
            onChange={onChange("message")}
            placeholder="Write your message..."
            rows={6}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${messageId}-err` : undefined}
            disabled={busy}
          />
          {errors.message && (
            <p id={`${messageId}-err`} className="fieldError">
              {errors.message}
            </p>
          )}
        </div>

        <div className="formActions colFull">
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? "Sending..." : "Send message"}
          </button>
          <p className="muted tiny">
            Fields marked <span className="req">*</span> are required.
          </p>
        </div>
      </form>
    </section>
  );
}
