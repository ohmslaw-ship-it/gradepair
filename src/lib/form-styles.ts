import { cn } from "@/lib/cn";

export const fieldClass = cn(
  "h-11 w-full rounded-full border-0 bg-[#F6F7FE] px-4 text-[15px] text-[#050545]",
  "placeholder:text-text-muted",
  "focus:ring-2 focus:ring-[#B8A9FE]/50 focus:outline-none",
);

export const textareaClass = cn(fieldClass, "min-h-[7rem] resize-y text-mono");