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

function prototypeUrl() {
  return pathToFileURL(path.join(__dirname, "index.html")).href;
}

async function assertNoHorizontalOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  assert.ok(dimensions.scrollWidth <= dimensions.clientWidth, `${label} overflows horizontally: ${dimensions.scrollWidth}px > ${dimensions.clientWidth}px`);
}

test("new prototype discovery flow works in Edge", async () => {
  const browser = await chromium.launch({ executablePath: findEdge(), headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  try {
    await page.goto(prototypeUrl());
    await page.locator("#home-template-grid .template-card").first().waitFor();
    assert.equal(await page.locator("#home-template-grid .template-card").count(), 4);

    await page.locator("#home-search").fill("quiet");
    await page.locator("#home-search-form").press("Enter");
    await page.locator("#library-view:not([hidden])").waitFor();
    assert.equal(await page.locator("#library-grid .template-card").count(), 2);

    await page.locator('[data-action="clear-filters"]').first().click();
    assert.equal(await page.locator("#library-grid .template-card").count(), 4);

    await page.locator('input[name="category"][value="landing"]').check();
    assert.equal(await page.locator("#library-grid .template-card").count(), 2);
    await page.locator('#library-grid [data-open-template="signal-launch"]').click();
    await page.locator("#detail-drawer:not([hidden])").waitFor();
    await page.locator('[data-drawer-tab="migration"]').click();
    assert.match(await page.locator("#drawer-tab-panel pre").textContent(), /UIDEVTPL_TEMPLATE_MIGRATION/);
    await page.locator('[data-action="close-drawer"]').first().click();

    const initialTheme = await page.locator("html").getAttribute("data-theme");
    await page.locator('[data-action="toggle-theme"]').click();
    assert.notEqual(await page.locator("html").getAttribute("data-theme"), initialTheme);
    await page.locator('[data-action="toggle-language"]').click();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");

    await page.locator('[data-nav="categories"]').first().click();
    await page.locator("#categories-view:not([hidden])").waitFor();
    assert.equal(await page.locator("#category-directory .category-row").count(), 6);
    await page.locator('[data-nav="guide"]').first().click();
    await page.locator("#guide-view:not([hidden])").waitFor();
    assert.equal(await page.locator(".guide-grid article").count(), 4);
    assert.deepEqual(runtimeErrors, []);
  } finally {
    await browser.close();
  }
});

test("prototype views fit a 390px viewport", async () => {
  const browser = await chromium.launch({ executablePath: findEdge(), headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  try {
    await page.goto(prototypeUrl());
    await page.locator("#home-template-grid .template-card").first().waitFor();
    await assertNoHorizontalOverflow(page, "home");

    await page.locator('[data-action="toggle-mobile"]').click();
    await page.locator('#mobile-nav [data-nav="library"]').click();
    await page.locator("#library-view:not([hidden])").waitFor();
    await assertNoHorizontalOverflow(page, "library");

    await page.locator('#library-view .filter-mobile-button').click();
    await page.locator("#library-view.filters-open .filter-panel").waitFor();
    await page.locator('[data-action="clear-filters"]').first().click();
    await page.locator('#library-view .filter-close').click();
    await page.locator('[data-action="toggle-mobile"]').click();
    await page.locator('#mobile-nav [data-nav="categories"]').click();
    await page.locator("#categories-view:not([hidden])").waitFor();
    await assertNoHorizontalOverflow(page, "categories");
  } finally {
    await browser.close();
  }
});
