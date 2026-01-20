import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: Props) {
  const variantClass = variant === "primary" ? "btn btnPrimary" : "btn btnSecondary";

  return (
    <button className={`${variantClass} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
