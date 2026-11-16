import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-text-on-accent border-2 border-border-strong shadow-[0_2px_0_0_var(--gp-border-strong)] hover:translate-y-px hover:shadow-[0_1px_0_0_var(--gp-border-strong)] active:translate-y-0.5 active:shadow-none",
  secondary:
    "bg-surface text-text border border-border-strong hover:bg-surface-hover",
  ghost: "bg-transparent text-text hover:bg-surface-hover",
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
        "inline-flex items-center justify-center gap-gp-sm rounded-gp-md px-gp-lg py-gp-sm text-sm font-semibold transition-[transform,box-shadow,background-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        "motion-safe:transition-transform",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}