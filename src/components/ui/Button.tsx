import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#050545] text-white hover:shadow-[0_8px_24px_rgba(184,169,254,0.45)]",
  secondary:
    "border border-[#E4E7FB] bg-white text-[#050545] hover:bg-surface-hover",
  ghost:
    "border border-transparent bg-transparent text-text hover:bg-surface-hover",
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
        "inline-flex h-11 items-center justify-center gap-gp-sm rounded-full px-6 text-[15px] font-semibold",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        "motion-safe:transition-shadow disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}