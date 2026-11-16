import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function StatReadoutStrip({
  children,
  className,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-8 py-6", className)}>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {children}
        </div>
        {aside ? (
          <aside className="min-w-0 rounded-[20px] bg-[#F6F7FE] p-6 lg:max-w-xs">
            {aside}
          </aside>
        ) : null}
      </div>
    </div>
  );
}