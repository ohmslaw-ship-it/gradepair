import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = "http://localhost:3000";
const outDir = "/opt/cursor/artifacts/round2";
await mkdir(outDir, { recursive: true });

const routes = [
  { path: "/projects", name: "projects" },
  { path: "/projects/sample-adsgpt/cases", name: "cases" },
  { path: "/projects/sample-adsgpt/prompts", name: "prompts" },
  { path: "/projects/sample-adsgpt/compare", name: "compare" },
  { path: "/projects/sample-adsgpt/report", name: "report" },
  { path: "/projects/hinglish-notifications/cases", name: "empty-state" },
  { path: "/dev/kitchen-sink", name: "kitchen-sink" },
];

const viewports = [
  { w: 1440, h: 900, suffix: "1440" },
  { w: 1024, h: 768, suffix: "1024" },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  for (const route of routes) {
    await page.goto(`${base}${route.path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(350);
    const file = `${outDir}/${route.name}-${vp.suffix}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
  }
  await page.close();
}
await browser.close();