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

  assert.ok(
    dimensions.scrollWidth <= dimensions.clientWidth,
    `${label} overflows horizontally: ${dimensions.scrollWidth}px > ${dimensions.clientWidth}px`
  );
}

test("template discovery interactions work in Edge", async () => {
  const browser = await chromium.launch({ executablePath: findEdge(), headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const runtimeErrors = [];

  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  try {
    await page.goto(prototypeUrl());
    const libraryCards = page.locator("#template-grid .template-card");
    await libraryCards.first().waitFor();
    assert.equal(await libraryCards.count(), 4);

    await page.locator("#search-input").fill("静默");
    assert.equal(await libraryCards.count(), 1);
    await page.locator("#search-input").fill("");
    assert.equal(await libraryCards.count(), 4);

    const likeButton = page.locator('#template-grid [data-like="signal-launch"]');
    assert.equal(await likeButton.getAttribute("aria-pressed"), "false");
    await likeButton.click();
    assert.equal(await page.locator('#template-grid [data-like="signal-launch"]').getAttribute("aria-pressed"), "true");

    const initialTheme = await page.locator("html").getAttribute("data-theme");
    await page.locator("#theme-button").click();
    assert.notEqual(await page.locator("html").getAttribute("data-theme"), initialTheme);

    await page.locator("#language-button").click();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    assert.equal(await page.locator("[data-copy=login]").textContent(), "Log in");

    await page.locator("[data-placeholder=login]").click();
    await page.locator("#placeholder-dialog[open]").waitFor();
    await page.locator("#placeholder-dialog [data-close]").click();

    await page.locator("#home-categories [data-category=apps]").click();
    await page.locator("#category-view:not([hidden])").waitFor();
    assert.equal(await page.locator("#category-template-grid .template-card").count(), 2);

    await page.locator("[data-home]").first().click();
    await page.locator('#template-grid [data-open-template="quiet-workspace"]').first().click();
    await page.locator("#detail-dialog[open]").waitFor();

    assert.deepEqual(runtimeErrors, []);
  } finally {
    await browser.close();
  }
});

test("home and categories fit a 390px viewport", async () => {
  const browser = await chromium.launch({ executablePath: findEdge(), headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  try {
    await page.goto(prototypeUrl());
    await page.locator("#template-grid .template-card").first().waitFor();
    await assertNoHorizontalOverflow(page, "home");

    await page.locator("#category-section [data-all-categories]").click();
    await page.locator("#categories-view:not([hidden])").waitFor();
    await assertNoHorizontalOverflow(page, "categories");
  } finally {
    await browser.close();
  }
});
