import {
  Bricolage_Grotesque,
  Caveat,
  Geist_Mono,
  Hanken_Grotesk,
} from "next/font/google";

export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
});

export const fontBody = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontGrade = Caveat({
  subsets: ["latin"],
  variable: "--font-grade",
  weight: ["700"],
});

export const fontClassNames = [
  fontDisplay.variable,
  fontBody.variable,
  fontMono.variable,
  fontGrade.variable,
].join(" ");