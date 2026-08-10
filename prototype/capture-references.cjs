"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const { chromium } = require("playwright-core");

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
];

const scenarios = [
  { file: "index.html", query: "", output: "library-desktop.png", width: 1440, height: 1100, selector: ".template-card" },
  { file: "index.html", query: "?template=quiet-grid&showcase=workspace&viewport=desktop", output: "quiet-grid-detail-desktop.png", width: 1440, height: 1200, selector: "#detail-view:not([hidden])" },
  { file: "index.html", query: "", output: "library-mobile.png", width: 390, height: 844, selector: ".template-card" },
  { file: "index.html", query: "?template=quiet-grid&showcase=workspace&viewport=mobile", output: "quiet-grid-detail-mobile.png", width: 390, height: 844, selector: "#detail-view:not([hidden])" },
  { file: "preview.html", query: "?template=signal-canvas&showcase=launch-room", output: "signal-canvas-preview.png", width: 1440, height: 1000, selector: ".signal-site" }
];

async function captureReferences() {
  const executablePath = edgeCandidates.find((candidate) => fs.existsSync(candidate));
  assert.ok(executablePath, "Microsoft Edge is required to capture prototype references");

  const browser = await chromium.launch({ executablePath, headless: true });
  const referencesDirectory = path.join(__dirname, "references");
  fs.mkdirSync(referencesDirectory, { recursive: true });

  try {
    for (const scenario of scenarios) {
      const page = await browser.newPage({ viewport: { width: scenario.width, height: scenario.height } });
      const url = `${pathToFileURL(path.join(__dirname, scenario.file)).href}${scenario.query}`;
      await page.goto(url);
      await page.locator(scenario.selector).first().waitFor();
      await page.screenshot({ path: path.join(referencesDirectory, scenario.output) });
      await page.close();
      process.stdout.write(`captured ${scenario.output}\n`);
    }
  } finally {
    await browser.close();
  }
}

captureReferences().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
