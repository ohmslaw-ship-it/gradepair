import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-text-on-accent border border-accent hover:opacity-90",
  secondary:
    "bg-surface text-text border border-border-strong hover:bg-surface-hover",
  ghost:
    "bg-transparent text-text border border-transparent hover:bg-surface-hover",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-gp-sm rounded-gp-xs px-gp-md py-gp-xs text-body-small font-medium transition-opacity duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        "motion-safe:transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}