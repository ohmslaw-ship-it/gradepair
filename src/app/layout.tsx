import type { Metadata } from "next";
import { fontClassNames } from "@/lib/fonts";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gradepair — Unit tests for your AI feature",
  description:
    "Grade prompt A vs prompt B on plain-language test cases. Built for PMs, not engineers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontClassNames} h-full antialiased`}>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}