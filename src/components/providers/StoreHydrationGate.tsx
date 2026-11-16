"use client";

import type { ReactNode } from "react";
import { useGradepairStore } from "@/store/gradepair-store";

export function StoreHydrationGate({ children }: { children: ReactNode }) {
  const hydrated = useGradepairStore((s) => s.hydrated);
  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-gp-2xl text-text-muted">
        Loading workspace…
      </div>
    );
  }
  return children;
}