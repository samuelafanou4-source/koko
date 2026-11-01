import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "tertiary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container shadow-xs",
  secondary:
    "bg-surface-container text-on-surface border border-outline-variant/30 hover:bg-surface-container-high",
  ghost: "bg-transparent text-on-surface-variant hover:underline",
  tertiary:
    "bg-tertiary text-on-tertiary hover:bg-tertiary-container shadow-xs",
  danger: "bg-error text-on-error hover:bg-error/90",
};

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-label text-label-lg font-semibold transition-all disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
