"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { pathToFileURL } = require("node:url");

const { chromium } = require("playwright-core");

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
];

function findEdge() {
  const executablePath = edgeCandidates.find((candidate) => fs.existsSync(candidate));
  assert.ok(executablePath, "Microsoft Edge is required for prototype browser checks");
  return executablePath;
}

function prototypeUrl(query = "") {
  const filePath = path.join(__dirname, "index.html");
  return `${pathToFileURL(filePath).href}${query}`;
}

async function assertNoHorizontalOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));

  assert.ok(
    dimensions.scrollWidth <= dimensions.clientWidth,
    `${label} overflows horizontally: ${dimensions.scrollWidth}px > ${dimensions.clientWidth}px`
  );
}

test("primary template selection flow works in Edge", async () => {
  const browser = await chromium.launch({ executablePath: findEdge(), headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const runtimeErrors = [];

  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  try {
    await page.goto(prototypeUrl());
    await page.locator(".template-card").first().waitFor();
    assert.equal(await page.locator(".template-card").count(), 2);

    await page.locator("#template-search").fill("海报");
    assert.equal(await page.locator(".template-card").count(), 1);
    await page.locator("#template-search").fill("");
    assert.equal(await page.locator(".template-card").count(), 2);

    await page.locator('[data-open-template="quiet-grid"]').first().click();
    await page.locator("#detail-view:not([hidden])").waitFor();
    await page.locator("#preview-frame").waitFor();
    assert.match(page.url(), /template=quiet-grid/);

    const workspaceFrame = page.frameLocator("#preview-frame");
    await workspaceFrame.locator(".qg-app-shell").waitFor();

    await page.locator('[data-viewport="mobile"]').click();
    await page.locator("#preview-stage.viewport-mobile").waitFor();
    assert.equal(await page.locator("#preview-size-label").textContent(), "360 x 800");

    await page.locator('[data-showcase="publication"]').click();
    await page.frameLocator("#preview-frame").locator(".qg-publication").waitFor();

    await page.locator("#open-component-lab-button").click();
    await page.locator("#component-lab-dialog[open]").waitFor();
    await page.locator("#component-lab-dialog [data-close-dialog]").click();

    await page.locator("#use-with-ai-button").click();
    await page.locator("#guide-dialog[open]").waitFor();
    await page.locator("#builder-template-select").selectOption("signal-canvas");
    await page.locator("#builder-request").fill("制作产品发布页");
    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText(text) {
            window.__prototypeClipboard = text;
            return Promise.resolve();
          }
        }
      });
    });
    await page.locator("#builder-copy-button").click();
    const copiedMigration = await page.evaluate(() => window.__prototypeClipboard);
    assert.match(copiedMigration, /template: web\/react\/heroui\/signal-canvas/);
    assert.ok(copiedMigration.endsWith("制作产品发布页"));

    assert.deepEqual(runtimeErrors, []);
  } finally {
    await browser.close();
  }
});

test("library and detail fit a 390px viewport", async () => {
  const browser = await chromium.launch({ executablePath: findEdge(), headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  try {
    await page.goto(prototypeUrl());
    await page.locator(".template-card").first().waitFor();
    await assertNoHorizontalOverflow(page, "library");

    await page.locator('[data-open-template="quiet-grid"]').first().click();
    await page.locator("#detail-view:not([hidden])").waitFor();
    await assertNoHorizontalOverflow(page, "detail");

    const actionsBox = await page.locator(".detail-actions").boundingBox();
    assert.ok(actionsBox);
    assert.ok(actionsBox.x >= 0 && actionsBox.x + actionsBox.width <= 390);
  } finally {
    await browser.close();
  }
});
