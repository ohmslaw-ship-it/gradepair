import { cn } from "@/lib/cn";

export const fieldClass = cn(
  "w-full rounded-gp-sm border border-border bg-surface px-gp-md py-gp-sm text-text",
  "placeholder:text-text-muted",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus",
);

export const textareaClass = cn(fieldClass, "min-h-[7rem] resize-y text-mono");