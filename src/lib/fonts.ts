import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";

export const fontUi = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const fontClassNames = [fontUi.variable, fontMono.variable].join(" ");