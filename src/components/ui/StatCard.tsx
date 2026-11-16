import type { ReactNode } from "react";
import { StatReadout } from "@/components/ui/StatReadout";

/** @deprecated Use StatReadout inside StatReadoutStrip */
export type StatCardProps = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  className?: string;
};

export function StatCard(props: StatCardProps) {
  return <StatReadout {...props} large={false} />;
}