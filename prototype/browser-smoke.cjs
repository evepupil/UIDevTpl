"use strict";

// 用 Edge 对原型做桌面 + 390px 移动布局冒烟，确认布局不溢出、功能点能走通。
// 运行：node --test prototype/browser-smoke.cjs（依赖 playwright-core + 本机 Edge）。

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

test("desktop discovery → library → detail → reserved flow works in Edge", async () => {
  const browser = await chromium.launch({ executablePath: findEdge(), headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  try {
    await page.goto(prototypeUrl());
    await page.locator("#home-template-grid .template-card").first().waitFor();
    assert.equal(await page.locator("#home-template-grid .template-card").count(), 4);

    // 首页搜索 → 模板库
    await page.locator("#home-search").fill("quiet");
    await page.locator("#home-search-form").press("Enter");
    await page.locator("#library-view:not([hidden])").waitFor();
    assert.equal(await page.locator("#library-grid .template-card").count(), 2);

    // 清除筛选回到全部
    await page.locator('[data-action="clear-filters"]').first().click();
    assert.equal(await page.locator("#library-grid .template-card").count(), 4);

    // 用途筛选 landing
    await page.locator('input[name="category"][value="landing"]').check();
    assert.equal(await page.locator("#library-grid .template-card").count(), 2);

    // 打开详情（整页，不是抽屉）
    await page.locator('#library-grid [data-open-template="signal-launch"]').click();
    await page.locator("#detail-view:not([hidden])").waitFor();
    // 版本检查栏渲染了固定字段
    assert.ok((await page.locator("#detail-check-list dd").count()) >= 8);

    // 视口切换 + 预览状态切换（演示加载/错误）
    await page.locator('[data-viewport="mobile"]').click();
    assert.ok(await page.locator("#detail-preview.preview-mobile").count());
    await page.locator('[data-preview-state="error"]').click();
    assert.ok(await page.locator("#detail-preview.is-error").count());
    await page.locator('[data-preview-state="ready"]').click();

    // 迁移页签：指令块出现
    await page.locator('[data-detail-tab="migration"]').click();
    assert.match(await page.locator("#detail-tab-panel pre").textContent(), /UIDEVTPL_TEMPLATE_MIGRATION/);

    // 复制给 AI（剪贴板权限授予）
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.locator('#detail-view [data-action="copy-ai"]').first().click();
    await page.locator("#toast:not([hidden])").waitFor();

    // 主题 + 语言切换
    const initialTheme = await page.locator("html").getAttribute("data-theme");
    await page.locator('[data-action="toggle-theme"]').click();
    assert.notEqual(await page.locator("html").getAttribute("data-theme"), initialTheme);
    await page.locator('[data-action="toggle-language"]').click();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");

    // 用途目录
    await page.locator('[data-nav="categories"]').first().click();
    await page.locator("#categories-view:not([hidden])").waitFor();
    assert.equal(await page.locator("#category-directory .category-row").count(), 6);

    // 使用指南
    await page.locator('[data-nav="guide"]').first().click();
    await page.locator("#guide-view:not([hidden])").waitFor();
    assert.equal(await page.locator("#guide-grid article").count(), 4);

    // 保留入口（登录）走通
    await page.locator('[data-reserved="login"]').first().click();
    await page.locator("#reserved-view:not([hidden])").waitFor();
    assert.ok((await page.locator("#reserved-title").textContent()).length > 0);

    assert.deepEqual(runtimeErrors, []);
  } finally {
    await browser.close();
  }
});

test("prototype views fit a 390px viewport without horizontal overflow", async () => {
  const browser = await chromium.launch({ executablePath: findEdge(), headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  try {
    await page.goto(prototypeUrl());
    await page.locator("#home-template-grid .template-card").first().waitFor();
    await assertNoHorizontalOverflow(page, "home");

    // 移动端菜单进模板库
    await page.locator('[data-action="toggle-mobile"]').click();
    await page.locator('#mobile-nav [data-nav="library"]').click();
    await page.locator("#library-view:not([hidden])").waitFor();
    await assertNoHorizontalOverflow(page, "library");

    // 打开筛选 Sheet 并清除
    await page.locator('#library-view .filter-mobile-button').click();
    await page.locator("#library-view.filters-open .filter-panel").waitFor();
    await page.locator('[data-action="clear-filters"]').first().click();
    await page.locator('#library-view .filter-close').click();

    // 用途目录 + 详情在 390px 下不溢出
    await page.locator('[data-action="toggle-mobile"]').click();
    await page.locator('#mobile-nav [data-nav="categories"]').click();
    await page.locator("#categories-view:not([hidden])").waitFor();
    await assertNoHorizontalOverflow(page, "categories");

    await page.locator('#category-directory .category-row').first().click();
    await page.locator("#library-view:not([hidden])").waitFor();
    await page.locator('#library-grid [data-open-template]').first().click();
    await page.locator("#detail-view:not([hidden])").waitFor();
    await assertNoHorizontalOverflow(page, "detail");
  } finally {
    await browser.close();
  }
});
