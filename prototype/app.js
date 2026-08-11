// UIDevTpl 主站原型交互层。
// 依赖 data.js（经典脚本，先加载）里暴露的 categories / templates / copy 三个顶层常量。
// 这里的职责：状态、客户端视图路由、各视图渲染、搜索 / 筛选 / 排序、点赞、主题、
// 语言、复制迁移指令、详情页预览工作台与版本检查栏。

(function runPrototype() {
  "use strict";

  const selectors = {
    homeIntents: document.getElementById("home-intents"),
    homeGrid: document.getElementById("home-template-grid"),
    homeSearch: document.getElementById("home-search"),
    metricPublic: document.getElementById("metric-public"),
    libraryView: document.getElementById("library-view"),
    libraryGrid: document.getElementById("library-grid"),
    libraryCount: document.getElementById("library-count"),
    librarySearch: document.getElementById("library-search"),
    libraryBreadcrumb: document.getElementById("library-breadcrumb"),
    filterIntents: document.getElementById("filter-intents"),
    filterPlatforms: document.getElementById("filter-platforms"),
    filterFrameworks: document.getElementById("filter-frameworks"),
    filterLibraries: document.getElementById("filter-libraries"),
    resultsLabel: document.getElementById("results-label"),
    resultsNote: document.getElementById("results-filter-note"),
    emptyState: document.getElementById("empty-state"),
    emptyBody: document.getElementById("empty-body"),
    sort: document.getElementById("sort-select"),
    categoriesNote: document.getElementById("categories-note"),
    categoryDirectory: document.getElementById("category-directory"),
    detailBreadcrumb: document.getElementById("detail-breadcrumb"),
    detailTitle: document.getElementById("detail-title"),
    detailPinned: document.getElementById("detail-pinned"),
    detailMeta: document.getElementById("detail-meta"),
    detailRoute: document.getElementById("detail-route"),
    detailShowcaseToggle: document.getElementById("detail-showcase-toggle"),
    detailViewportToggle: document.getElementById("detail-viewport-toggle"),
    detailStateToggle: document.getElementById("detail-state-toggle"),
    detailPreview: document.getElementById("detail-preview"),
    detailCheckList: document.getElementById("detail-check-list"),
    detailPanel: document.getElementById("detail-tab-panel"),
    guideGrid: document.getElementById("guide-grid"),
    reservedTitle: document.getElementById("reserved-title"),
    reservedBody: document.getElementById("reserved-body"),
    reservedSwap: document.getElementById("reserved-swap"),
    commandOverlay: document.getElementById("search-overlay"),
    commandSearch: document.getElementById("command-search"),
    commandResults: document.getElementById("command-results"),
    toast: document.getElementById("toast"),
    mobileNav: document.getElementById("mobile-nav")
  };

  const state = {
    locale: readStorage("uidevtpl-locale") === "en" ? "en" : "zh",
    theme: readStorage("uidevtpl-theme") === "dark" ? "dark" : "light",
    view: "home",
    previousView: "home",
    query: "",
    category: "all",
    platform: "all",
    framework: "all",
    library: "all",
    sort: "popular",
    selectedTemplate: "quiet-workspace",
    detailTab: "showcase",
    viewport: "desktop",
    previewState: "ready",
    showcaseIndex: 0,
    reservedType: "login",
    likes: new Set(readLikes())
  };

  // ---------- utils ----------
  function readStorage(key) {
    try { return window.localStorage.getItem(key); } catch (error) { return null; }
  }
  function writeStorage(key, value) {
    try { window.localStorage.setItem(key, value); } catch (error) { /* localStorage 不可用时照常运行 */ }
  }
  function readLikes() {
    try {
      const value = JSON.parse(readStorage("uidevtpl-likes") || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) { return []; }
  }
  function t() { return copy[state.locale]; }
  function text(value) { return value[state.locale] || value.zh; }
  function formatMetric(value) {
    if (value < 1000) return String(value);
    return `${(value / 1000).toFixed(value < 10000 ? 1 : 0).replace(".0", "")}K`;
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c]);
  }
  function pad2(value) { return String(value).padStart(2, "0"); }
  function templateById(id) { return templates.find((item) => item.id === id) || templates[0]; }
  function categoryById(id) { return categories.find((item) => item.id === id) || categories[0]; }
  function localized(locale) { return locale === "zh" ? "zh-CN" : "en"; }

  // ---------- wireframe markup ----------
  function previewMarkup(type) {
    if (type === "launch") {
      return `<span class="wireframe wireframe-launch"><span class="launch-top"><i>FORM / 02</i><i>PRODUCT SIGNALS</i><i>MENU</i></span><span class="launch-main"><span class="launch-copy"><i></i><b></b><em></em></span><span class="launch-image"></span></span><span class="launch-foot"><i>DISCOVER THE SYSTEM</i><i>SCROLL</i></span></span>`;
    }
    if (type === "publication") {
      return `<span class="wireframe wireframe-publication"><span class="pub-top"><i>STUDIO NOTES / 08</i><i>INDEX</i></span><span class="pub-main"><span class="pub-copy"><i></i><b></b><em></em></span><span class="pub-image"></span></span><span class="pub-foot"><i>QUIET GRID</i><i>READ 04 MIN</i></span></span>`;
    }
    if (type === "notes") {
      return `<span class="wireframe wireframe-notes"><span class="notes-top"><i>SIGNAL / JOURNAL</i><i>VOL. 07</i></span><span class="notes-main"><span class="notes-copy"><i></i><b></b><em></em></span><span class="notes-image"></span></span><span class="notes-foot"><i>CLARITY / MOTION</i><i>FIELD NOTE</i></span></span>`;
    }
    return `<span class="wireframe wireframe-workspace"><span class="wf-sidebar"><i></i><i></i><i></i><b></b></span><span class="wf-main"><i class="wf-toolbar"></i><span class="wf-heading"><i></i><b></b></span><span class="wf-columns"><i></i><i></i><i></i></span><span class="wf-table"><i></i><i></i><i></i><i></i></span></span></span>`;
  }

  // ---------- card render ----------
  function renderTemplateCard(item, featured) {
    const liked = state.likes.has(item.id);
    const tags = item.tags.slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    return `<article class="template-card${featured ? " featured-card" : ""}" data-template-id="${item.id}">
      <button class="template-preview preview-${item.type}" type="button" data-open-template="${item.id}" aria-label="${escapeHtml(text(item.name))}">
        ${previewMarkup(item.type)}
        <span class="template-preview-label"><span>${escapeHtml(item.family)} / ${escapeHtml(item.frameworkLabel)}</span><span>OPEN ↗</span></span>
      </button>
      <div class="template-meta">
        <span class="avatar ${item.accent}">${escapeHtml(item.author.initials)}</span>
        <div class="template-info">
          <p class="template-kicker">${escapeHtml(item.family)}</p>
          <h3 class="template-title">${escapeHtml(text(item.name))}</h3>
          <p class="template-id">${escapeHtml(item.route)} / v${escapeHtml(item.pinnedVersion)}</p>
        </div>
        <div class="template-stats">
          <span>${formatMetric(item.views)}</span>
          <button class="like-button${liked ? " is-liked" : ""}" type="button" data-like="${item.id}" aria-pressed="${liked}" aria-label="Like">
            <span class="heart">${liked ? "♥" : "♡"}</span>${formatMetric(item.likes + (liked ? 1 : 0))}
          </button>
        </div>
      </div>
      <div class="card-tags">${tags}<span class="status-badge">v${escapeHtml(item.pinnedVersion)}</span></div>
    </article>`;
  }

  // ---------- home ----------
  function renderHome() {
    selectors.metricPublic.textContent = pad2(templates.length);
    selectors.homeIntents.innerHTML = categories.map((category, index) => {
      const count = templates.filter((item) => item.categories.includes(category.id)).length;
      return `<button class="intent-item" type="button" data-category="${category.id}">
        <span>${escapeHtml(category.icon)}</span>
        <span class="intent-copy"><strong>${escapeHtml(text(category.name))}</strong><small>${pad2(count)} ${state.locale === "zh" ? "系统" : "systems"}</small></span>
        <span>→</span>
      </button>`;
    }).join("");

    const cards = templates.map((item, index) => renderTemplateCard(item, index === 0));
    cards.push(`<button class="link-card" type="button" data-nav="library"><strong>${escapeHtml(t().openLibraryCard)}</strong><span>${escapeHtml(t().openLibrary)}</span></button>`);
    selectors.homeGrid.innerHTML = cards.join("");
  }

  // ---------- library: filters ----------
  function filterOptions() {
    return {
      intent: categories.map((c) => ({ value: c.id, label: text(c.name) })),
      platform: uniqueValues((item) => item.platform),
      framework: uniqueValues((item) => ({ value: item.framework, label: item.frameworkLabel })),
      library: uniqueValues((item) => item.library)
    };
  }
  function uniqueValues(read) {
    const map = new Map();
    templates.forEach((item) => {
      const v = read(item);
      const key = typeof v === "string" ? v : v.value;
      const label = typeof v === "string" ? v : v.label;
      if (!map.has(key)) map.set(key, label);
    });
    return [...map.entries()].map(([value, label]) => ({ value, label }));
  }
  function countFor(dimension, value) {
    return templates.filter((item) => {
      if (dimension === "intent") return item.categories.includes(value);
      if (dimension === "platform") return item.platform === value;
      if (dimension === "framework") return item.framework === value;
      if (dimension === "library") return item.library === value;
      return false;
    }).length;
  }
  function renderFilterFieldset(container, dimension, legendKey, name) {
    const options = filterOptions()[dimension];
    const all = `<label><input type="radio" name="${name}" value="all" checked /> <span>${escapeHtml(t().all)}</span><small>${pad2(templates.length)}</small></label>`;
    const rest = options.map((opt) => {
      const count = countFor(dimension, opt.value);
      return `<label><input type="radio" name="${name}" value="${escapeHtml(opt.value)}" /> <span>${escapeHtml(opt.label)}</span><small>${pad2(count)}</small></label>`;
    }).join("");
    container.innerHTML = `<legend>${escapeHtml(t()[legendKey])}</legend>${all}${rest}`;
    container.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener("change", () => {
        state[name] = input.value;
        renderLibrary();
      });
    });
  }

  // ---------- library: list ----------
  function filteredTemplates() {
    const query = state.query.trim().toLocaleLowerCase(localized(state.locale));
    const selected = templates.filter((item) => {
      const categoryNames = item.categories.map((id) => text(categoryById(id).name)).join(" ");
      const haystack = [item.id, item.route, text(item.name), item.family, item.platform, item.frameworkLabel, item.library, text(item.summary), categoryNames].join(" ").toLocaleLowerCase(localized(state.locale));
      return (!query || haystack.includes(query))
        && (state.category === "all" || item.categories.includes(state.category))
        && (state.platform === "all" || item.platform === state.platform)
        && (state.framework === "all" || item.framework === state.framework)
        && (state.library === "all" || item.library === state.library);
    });
    return selected.sort((left, right) => {
      if (state.sort === "newest") return right.updated - left.updated;
      if (state.sort === "name") return text(left.name).localeCompare(text(right.name), localized(state.locale));
      return (right.likes + (state.likes.has(right.id) ? 1 : 0)) - (left.likes + (state.likes.has(left.id) ? 1 : 0));
    });
  }

  function renderLibrary() {
    const items = filteredTemplates();
    selectors.libraryGrid.innerHTML = items.map((item) => renderTemplateCard(item, false)).join("");
    selectors.libraryGrid.hidden = items.length === 0;
    selectors.emptyState.hidden = items.length !== 0;
    selectors.libraryCount.textContent = `${pad2(items.length)} ${state.locale === "zh" ? "个系统" : items.length === 1 ? "system" : "systems"}`;

    const activeCategory = state.category !== "all" ? categoryById(state.category) : null;
    if (activeCategory) {
      selectors.libraryBreadcrumb.hidden = false;
      selectors.libraryBreadcrumb.innerHTML = `
        <button type="button" data-action="library-all">${escapeHtml(t().crumbHome)}</button>
        <span class="sep">/</span>
        <strong>${escapeHtml(text(activeCategory.name))}</strong>
        <button type="button" data-action="back-to-categories" style="margin-left:auto">${escapeHtml(t().browseAll)}</button>
        <p class="category-desc">${escapeHtml(text(activeCategory.description))}</p>`;
    } else {
      selectors.libraryBreadcrumb.hidden = true;
    }

    selectors.resultsLabel.textContent = activeCategory ? text(activeCategory.name) : t().resultAll;
    selectors.resultsNote.textContent = state.query ? `“${state.query}” / ${items.length}` : t().previewReadyVersions;
    selectors.librarySearch.value = state.query;
    selectors.sort.value = state.sort;

    selectors.filterIntents.querySelectorAll("input").forEach((input) => { input.checked = input.value === state.category; });
    selectors.filterFrameworks.querySelectorAll("input").forEach((input) => { input.checked = input.value === state.framework; });
    selectors.filterPlatforms.querySelectorAll("input").forEach((input) => { input.checked = input.value === state.platform; });
    selectors.filterLibraries.querySelectorAll("input").forEach((input) => { input.checked = input.value === state.library; });
  }

  function renderAllFilters() {
    renderFilterFieldset(selectors.filterIntents, "intent", "fIntent", "category");
    renderFilterFieldset(selectors.filterPlatforms, "platform", "fPlatform", "platform");
    renderFilterFieldset(selectors.filterFrameworks, "framework", "fFramework", "framework");
    renderFilterFieldset(selectors.filterLibraries, "library", "fLibrary", "library");
  }

  // ---------- categories ----------
  function renderCategories() {
    const systemsWord = state.locale === "zh" ? "系统" : "systems";
    selectors.categoriesNote.textContent = `${pad2(categories.length)} intents / ${pad2(templates.length)} systems`;
    selectors.categoryDirectory.innerHTML = categories.map((category, index) => {
      const related = templates.filter((item) => item.categories.includes(category.id));
      const latest = related.slice().sort((a, b) => b.updated - a.updated)[0];
      return `<button class="category-row" type="button" data-category="${category.id}">
        <span class="category-number">0${index + 1}</span>
        <span class="category-title"><span class="category-icon">${escapeHtml(category.icon)}</span><strong>${escapeHtml(text(category.name))}</strong></span>
        <p>${escapeHtml(text(category.description))}</p>
        <span class="category-count">${pad2(related.length)} ${systemsWord}</span>
        <span class="category-latest"><span>${escapeHtml(t().categoryLatest)}</span><strong>${latest ? escapeHtml(text(latest.name)) : "-"}</strong></span>
        <span class="category-arrow">→</span>
      </button>`;
    }).join("");
  }

  // ---------- detail ----------
  function buildInstruction(item) {
    const path = `.uidevtpl/${item.route}/`;
    return [
      "UIDEVTPL_TEMPLATE_MIGRATION",
      `template: ${item.id}`,
      `version: ${item.pinnedVersion}`,
      `sha256: ${item.sha256}`,
      `expected_path: ${path}`,
      "",
      "1. Inspect the current project rules and existing changes.",
      "2. Download and verify the fixed template artifact before continuing.",
      `3. Preserve the reference source in ${path}`,
      "4. Migrate only the required tokens, components, layout, and page skeletons.",
      "5. Do not silently overwrite existing business files.",
      "6. Run the project's formatting, typecheck, tests, and build.",
      "",
      "business request: {{USER_REQUEST}}"
    ].join("\n");
  }

  function renderDetail() {
    const item = templateById(state.selectedTemplate);
    const ui = t();

    selectors.detailTitle.textContent = text(item.name);
    selectors.detailPinned.textContent = `v${item.pinnedVersion}`;
    selectors.detailRoute.textContent = item.route;

    selectors.detailBreadcrumb.innerHTML = `
      <button type="button" data-nav="library">${escapeHtml(ui.crumbHome)}</button>
      <span class="sep">/</span>
      <span>${escapeHtml(item.family)}</span>
      <span class="sep">/</span>
      <strong>${escapeHtml(text(item.name))}</strong>`;

    selectors.detailMeta.innerHTML = `
      <span class="meta-block"><span class="avatar meta-avatar ${item.accent}">${escapeHtml(item.author.initials)}</span>${escapeHtml(text(item.author.name))}</span>
      <span class="stack-pipe">·</span><span>${escapeHtml(item.platform)}</span>
      <span class="stack-pipe">·</span><span>${escapeHtml(item.frameworkLabel)}</span>
      <span class="stack-pipe">·</span><span>${escapeHtml(item.library)}</span>
      <span class="stack-pipe">·</span><span>${escapeHtml(item.themeCapability)}</span>`;

    // Showcase toggle（ToggleGroup）
    selectors.detailShowcaseToggle.innerHTML = item.showcases.map((name, index) =>
      `<button type="button" class="${index === state.showcaseIndex ? "is-active" : ""}" data-showcase="${index}">${escapeHtml(name)}</button>`
    ).join("");

    // Viewport toggle
    const vLabels = state.locale === "zh"
      ? { desktop: "桌面", tablet: "平板", mobile: "手机" }
      : { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile" };
    selectors.detailViewportToggle.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.viewport === state.viewport);
      btn.textContent = vLabels[btn.dataset.viewport];
    });

    // State toggle (演示加载 / 错误)
    selectors.detailStateToggle.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.previewState === state.previewState);
      const labels = { ready: ui.previewReady2, loading: ui.previewLoading, error: ui.previewError };
      btn.textContent = labels[btn.dataset.previewState];
    });

    // Preview board
    renderDetailPreview(item);

    // Check column
    const check = [
      [ui.checkVersion, `v${item.pinnedVersion}`, true],
      [ui.checkBuild, item.buildTool, false],
      [ui.checkPkg, item.packageManager, false],
      [ui.checkSize, item.artifactSize, false],
      [ui.checkSha, item.sha256, false],
      [ui.checkLicense, item.license, false],
      [ui.checkCompat, item.compatibility, false],
      [ui.checkTheme, item.themeCapability, false]
    ];
    selectors.detailCheckList.innerHTML = `<dl>${check.map(([label, value, signal]) =>
      `<div><dt>${escapeHtml(label)}</dt><dd${signal ? ' class="signal"' : ""}>${escapeHtml(value)}</dd></div>`
    ).join("")}</dl>`;

    document.querySelectorAll("[data-action='copy-ai']").forEach((button) => { button.dataset.template = item.id; });

    renderDetailTab(item);
  }

  function renderDetailPreview(item) {
    const statusLabels = { ready: t().previewReady2, loading: t().previewLoading, error: t().previewError };
    if (state.previewState === "loading") {
      selectors.detailPreview.className = `detail-preview preview-${state.viewport} is-loading`;
      selectors.detailPreview.innerHTML = `<div class="preview-state-note"><span class="wireframe" style="height:300px; opacity:.5"></span><br>${escapeHtml(statusLabels.loading)}…</div>`;
      return;
    }
    if (state.previewState === "error") {
      selectors.detailPreview.className = `detail-preview preview-${state.viewport} is-error`;
      selectors.detailPreview.innerHTML = `<div class="preview-state-note"><strong>${escapeHtml(statusLabels.error)}</strong><br>${escapeHtml(t().previewErrorHint)}</div>`;
      return;
    }
    selectors.detailPreview.className = `detail-preview preview-${state.viewport}`;
    const showcase = item.showcases[state.showcaseIndex] || item.showcases[0];
    selectors.detailPreview.innerHTML = `${previewMarkup(item.type)}<span class="sr-only">${escapeHtml(showcase)}</span>`;
  }

  function renderDetailTab(item) {
    document.querySelectorAll("[data-detail-tab]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.detailTab === state.detailTab);
    });
    const ui = t();
    if (state.detailTab === "components") {
      selectors.detailPanel.innerHTML = `<h3>${escapeHtml(ui.componentsTab)}</h3><p>${escapeHtml(ui.componentSummary)}</p>
        <div class="chip-list">${item.components.map((c) => `<span>${escapeHtml(c)}</span>`).join("")}</div>
        <div class="panel-note">${escapeHtml(ui.componentSummary)}</div>`;
      return;
    }
    if (state.detailTab === "tokens") {
      selectors.detailPanel.innerHTML = `<h3>${escapeHtml(ui.tokensTab)}</h3><p>${escapeHtml(ui.tokenSummary)}</p>
        <dl class="detail-list">${item.tokens.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd><code>${escapeHtml(value)}</code></dd></div>`).join("")}</dl>`;
      return;
    }
    if (state.detailTab === "migration") {
      const instruction = buildInstruction(item);
      selectors.detailPanel.innerHTML = `<h3>${escapeHtml(ui.migrationTab)}</h3><p>${escapeHtml(ui.migrationSummary)}</p>
        <div class="migration-code"><button type="button" data-action="copy-ai" data-template="${item.id}">${escapeHtml(ui.copyAi)}</button><pre>${escapeHtml(instruction)}</pre></div>
        <div class="panel-note">${escapeHtml(ui.fingerprintNote)}</div>`;
      return;
    }
    selectors.detailPanel.innerHTML = `<h3>${escapeHtml(ui.showcaseTab)}</h3><p>${escapeHtml(ui.inspectSummary)}</p>
      <dl class="detail-list">
        <div><dt>Family</dt><dd>${escapeHtml(item.family)}</dd></div>
        <div><dt>Framework</dt><dd>${escapeHtml(item.frameworkLabel)}</dd></div>
        <div><dt>Library</dt><dd>${escapeHtml(item.library)}</dd></div>
        <div><dt>Showcases</dt><dd>${item.showcases.map((s) => escapeHtml(s)).join(" · ")}</dd></div>
        <div><dt>Latest</dt><dd><code>v${escapeHtml(item.latestVersion)}</code></dd></div>
        <div><dt>Pinned</dt><dd><code>v${escapeHtml(item.pinnedVersion)}</code></dd></div>
      </dl>`;
  }

  // ---------- guide ----------
  function renderGuide() {
    const ui = t();
    const steps = [
      { n: "01", title: ui.step1Title, body: ui.step1Body, code: "inspect project context" },
      { n: "02", title: ui.step2Title, body: ui.step2Body, code: "verify sha256", fail: ui.step2Fail },
      { n: "03", title: ui.step3Title, body: ui.step3Body, code: ".uidevtpl/web/react/..." },
      { n: "04", title: ui.step4Title, body: ui.step4Body, code: "report migration result" }
    ];
    selectors.guideGrid.innerHTML = steps.map((s) =>
      `<article><span>${s.n}</span><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.body)}</p><code>${escapeHtml(s.code)}</code>${s.fail ? `<div class="fail-note">${escapeHtml(s.fail)}</div>` : ""}</article>`
    ).join("");
  }

  // ---------- reserved (login / signup / submit) ----------
  function renderReserved() {
    const ui = t();
    const map = {
      login: { title: ui.reservedLoginTitle, body: ui.reservedLoginBody },
      signup: { title: ui.reservedSignupTitle, body: ui.reservedSignupBody },
      submit: { title: ui.reservedSubmitTitle, body: ui.reservedSubmitBody }
    };
    const current = map[state.reservedType];
    selectors.reservedTitle.textContent = current.title;
    selectors.reservedBody.textContent = current.body;
    const others = Object.keys(map).filter((key) => key !== state.reservedType);
    const labels = { login: ui.reservedGotoLogin, signup: ui.reservedGotoSignup, submit: ui.reservedGotoSubmit };
    selectors.reservedSwap.innerHTML = others.map((key) =>
      `<button class="text-button" type="button" data-action="reserved" data-reserved="${key}">${escapeHtml(labels[key])}</button>`
    ).join('<span class="stack-pipe">·</span>');
  }

  // ---------- command search ----------
  function renderCommandResults() {
    const query = selectors.commandSearch.value.trim().toLocaleLowerCase(localized(state.locale));
    const matches = templates.filter((item) => {
      const categoryNames = item.categories.map((id) => text(categoryById(id).name)).join(" ");
      const haystack = [item.id, item.route, text(item.name), item.family, item.platform, item.frameworkLabel, item.library, categoryNames].join(" ").toLocaleLowerCase(localized(state.locale));
      return !query || haystack.includes(query);
    });
    selectors.commandResults.innerHTML = matches.length ? matches.map((item) =>
      `<button class="command-result" type="button" data-open-template="${item.id}">
        <span class="command-result-mark">${escapeHtml(item.author.initials)}</span>
        <span class="command-result-copy"><strong>${escapeHtml(text(item.name))}</strong><small>${escapeHtml(item.route)} / ${escapeHtml(item.frameworkLabel)}</small></span>
        <span>↗</span>
      </button>`
    ).join("") : `<div class="command-result-copy" style="padding:15px 8px"><strong>${escapeHtml(t().emptyTitle)}</strong><small>${escapeHtml(t().emptyBody)}</small></div>`;
  }

  // ---------- routing ----------
  function showView(view) {
    state.previousView = state.view;
    state.view = view;
    document.querySelectorAll("[data-view]").forEach((node) => { node.hidden = node.dataset.view !== view; });
    document.querySelectorAll("[data-nav]").forEach((node) => { node.classList.toggle("is-active", node.dataset.nav === view); });
    selectors.mobileNav.hidden = true;
    selectors.libraryView.classList.remove("filters-open");
    if (view === "home") renderHome();
    if (view === "library") { renderAllFilters(); renderLibrary(); }
    if (view === "categories") renderCategories();
    if (view === "detail") renderDetail();
    if (view === "guide") renderGuide();
    if (view === "reserved") renderReserved();
    window.scrollTo(0, 0);
  }

  function openDetail(id) {
    state.selectedTemplate = id;
    state.detailTab = "showcase";
    state.viewport = "desktop";
    state.previewState = "ready";
    state.showcaseIndex = 0;
    showView("detail");
  }

  function openCategory(categoryId) {
    state.category = categoryId;
    state.platform = "all";
    state.framework = "all";
    state.library = "all";
    state.query = "";
    showView("library");
  }

  // ---------- overlays / actions ----------
  function openSearch() {
    selectors.commandOverlay.hidden = false;
    selectors.commandSearch.value = state.query;
    renderCommandResults();
    window.setTimeout(() => selectors.commandSearch.focus(), 20);
    document.body.classList.add("is-locked");
  }
  function closeSearch() {
    selectors.commandOverlay.hidden = true;
    document.body.classList.remove("is-locked");
  }

  function showToast(message) {
    selectors.toast.textContent = message;
    selectors.toast.hidden = false;
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => { selectors.toast.hidden = true; }, 2600);
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value).then(() => true).catch(() => false);
    }
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (error) { copied = false; }
    textarea.remove();
    return Promise.resolve(copied);
  }
  function copyMigration(id) {
    const item = templateById(id || state.selectedTemplate);
    copyText(buildInstruction(item)).then((copied) => showToast(copied ? t().copyDone : t().copiedFallback));
  }

  function toggleLike(id) {
    if (state.likes.has(id)) state.likes.delete(id);
    else state.likes.add(id);
    writeStorage("uidevtpl-likes", JSON.stringify([...state.likes]));
    if (state.view === "home") renderHome();
    if (state.view === "library") renderLibrary();
    if (!selectors.commandOverlay.hidden) renderCommandResults();
  }

  function clearFilters() {
    state.query = "";
    state.category = "all";
    state.platform = "all";
    state.framework = "all";
    state.library = "all";
    state.sort = "popular";
    renderLibrary();
  }

  // ---------- i18n + theme ----------
  function applyLocale() {
    const ui = t();
    document.documentElement.lang = state.locale === "zh" ? "zh-CN" : "en";
    document.title = state.locale === "zh" ? "UIDevTpl / 主站布局原型" : "UIDevTpl / Signal Desk Prototype";
    document.querySelectorAll("[data-copy]").forEach((node) => {
      const key = node.dataset.copy;
      if (key === "themeLight") {
        node.textContent = state.theme === "dark" ? (state.locale === "zh" ? "浅色" : "Light") : ui.themeLight;
        return;
      }
      if (typeof ui[key] === "string") node.textContent = ui[key];
    });
    document.querySelectorAll("[data-nav-label]").forEach((node) => { node.textContent = ui[node.dataset.navLabel]; });
    selectors.homeSearch.placeholder = ui.homeSearchPlaceholder;
    selectors.librarySearch.placeholder = ui.keywordPlaceholder;
    selectors.commandSearch.placeholder = ui.searchHint;
    // Re-render current view so generated content picks up the new language.
    showView(state.view);
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = state.theme;
    writeStorage("uidevtpl-theme", state.theme);
    applyLocale();
  }
  function toggleLanguage() {
    state.locale = state.locale === "zh" ? "en" : "zh";
    writeStorage("uidevtpl-locale", state.locale);
    applyLocale();
  }

  // ---------- events ----------
  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;
    const nav = target.dataset.nav;
    if (nav) { showView(nav); return; }
    const category = target.dataset.category;
    if (category) { openCategory(category); return; }
    const templateId = target.dataset.openTemplate;
    if (templateId) { closeSearch(); openDetail(templateId); return; }
    const likeId = target.dataset.like;
    if (likeId) { event.stopPropagation(); toggleLike(likeId); return; }
    const detailTab = target.dataset.detailTab;
    if (detailTab) { state.detailTab = detailTab; renderDetailTab(templateById(state.selectedTemplate)); return; }
    const viewport = target.dataset.viewport;
    if (viewport) { state.viewport = viewport; renderDetailPreview(templateById(state.selectedTemplate)); syncToggles(); return; }
    const previewState = target.dataset.previewState;
    if (previewState) { state.previewState = previewState; renderDetailPreview(templateById(state.selectedTemplate)); syncToggles(); return; }
    const showcase = target.dataset.showcase;
    if (showcase !== undefined) { state.showcaseIndex = Number(showcase); renderDetail(); return; }
    const reserved = target.dataset.reserved;
    if (reserved) { state.reservedType = reserved; showView("reserved"); return; }
    const action = target.dataset.action;
    if (action === "open-search") { openSearch(); return; }
    if (action === "close-search") { closeSearch(); return; }
    if (action === "toggle-theme") { toggleTheme(); return; }
    if (action === "toggle-language") { toggleLanguage(); return; }
    if (action === "toggle-mobile") { selectors.mobileNav.hidden = !selectors.mobileNav.hidden; return; }
    if (action === "mobile-filters") { selectors.libraryView.classList.toggle("filters-open"); return; }
    if (action === "clear-filters") { clearFilters(); return; }
    if (action === "back-to-all") { clearFilters(); return; }
    if (action === "library-all") { state.category = "all"; renderLibrary(); return; }
    if (action === "back-to-categories") { showView("categories"); return; }
    if (action === "open-preview") { showToast(state.locale === "zh" ? "正式站会在独立 Preview Project 打开完整预览。" : "The production site opens the full preview in the standalone Preview Project."); return; }
    if (action === "copy-ai") { copyMigration(target.dataset.template || state.selectedTemplate); return; }
  });

  function syncToggles() {
    selectors.detailViewportToggle.querySelectorAll("button").forEach((btn) => { btn.classList.toggle("is-active", btn.dataset.viewport === state.viewport); });
    selectors.detailStateToggle.querySelectorAll("button").forEach((btn) => { btn.classList.toggle("is-active", btn.dataset.previewState === state.previewState); });
  }

  document.getElementById("home-search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = selectors.homeSearch.value.trim();
    state.category = "all";
    showView("library");
  });
  document.getElementById("command-search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = selectors.commandSearch.value.trim();
    closeSearch();
    showView("library");
  });
  selectors.commandSearch.addEventListener("input", renderCommandResults);
  selectors.librarySearch.addEventListener("input", () => { state.query = selectors.librarySearch.value; renderLibrary(); });
  selectors.sort.addEventListener("change", () => { state.sort = selectors.sort.value; renderLibrary(); });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
    if (event.key === "Escape") {
      closeSearch();
      selectors.libraryView.classList.remove("filters-open");
    }
  });

  // ---------- init ----------
  document.documentElement.dataset.theme = state.theme;
  applyLocale();
})();
