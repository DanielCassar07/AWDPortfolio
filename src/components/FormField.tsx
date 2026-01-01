import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, ...rest }: Props) {
  return (
    <label style={{ display: "grid", gap: 6, marginBottom: 12 }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <input
        {...rest}
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          border: `1px solid ${error ? "crimson" : "#d1d5db"}`,
        }}
      />
      {error ? <small style={{ color: "crimson" }}>{error}</small> : null}
    </label>
  );
}