import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = "http://localhost:3000";
const outDir = "/opt/cursor/artifacts/stage4";
await mkdir(outDir, { recursive: true });

const routes = [
  { path: "/projects", name: "projects" },
  { path: "/projects/sample-adsgpt/cases", name: "cases" },
  { path: "/projects/sample-adsgpt/prompts", name: "prompts" },
  { path: "/projects/sample-adsgpt/compare", name: "compare" },
  { path: "/projects/sample-adsgpt/report", name: "report" },
  { path: "/projects/hinglish-notifications/cases", name: "empty-state" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const route of routes) {
  await page.goto(`${base}${route.path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const file = `${outDir}/${route.name}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
}

await browser.close();