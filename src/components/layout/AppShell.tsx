import type { ReactNode } from "react";
import { AppShellClient } from "@/components/layout/AppShellClient";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { StoreHydrationGate } from "@/components/providers/StoreHydrationGate";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <StoreHydrationGate>
      <div className="flex min-h-full flex-col">
        <DemoBanner />
        <AppShellClient>{children}</AppShellClient>
      </div>
    </StoreHydrationGate>
  );
}