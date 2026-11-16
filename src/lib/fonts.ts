import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";

export const fontUi = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700", "800"],
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const fontClassNames = [fontUi.variable, fontMono.variable].join(" ");