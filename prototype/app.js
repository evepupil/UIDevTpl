(function runPrototype() {
  "use strict";

  const copy = {
    zh: {
      search: "搜索模板",
      submit: "分享模板",
      language: "中 / EN",
      theme: "深色",
      login: "登录",
      overview: "概览",
      library: "模板库",
      categories: "用途",
      guide: "使用指南",
      publicSystems: "公开系统",
      stackOptions: "技术组合",
      currentRelease: "当前发布",
      featuredSystem: "精选系统",
      previewStatus: "可预览",
      searchAction: "查找",
      inspect: "检查系统",
      copyAi: "复制给 AI",
      browseAll: "查看全部用途",
      openLibrary: "打开模板库",
      readGuide: "阅读迁移指南",
      openPreview: "打开独立预览",
      footerNote: "布局原型 · 功能位置可操作 · 代码待迁移到 Next.js + shadcn/ui",
      copyDone: "迁移指令已复制，可以交给 AI。",
      reserved: "这是预留入口，正式能力将在后续版本开放。",
      copiedFallback: "指令已生成，当前浏览器不支持自动写入剪贴板。",
      allSystems: "全部系统",
      previewVersions: "可预览版本",
      noMatch: "没有匹配的系统",
      noMatchBody: "换个关键词或清除筛选，继续浏览目录。",
      clearFilters: "清除筛选",
      filter: "筛选",
      sortPopular: "热度",
      sortNewest: "最新",
      sortName: "名称",
      keyword: "关键词",
      intent: "用途",
      implementation: "实现",
      allIntents: "全部用途",
      allImplementations: "全部实现",
      systemInspector: "SYSTEM INSPECTOR",
      showcase: "Showcase",
      components: "组件",
      tokens: "Tokens",
      migration: "迁移",
      inspectSummary: "检查真实页面、组件边界和固定版本信息。",
      componentSummary: "这套系统按原子、组合和页面骨架组织。",
      tokenSummary: "这些是后续迁移时需要保持一致的基础规则。",
      migrationSummary: "把固定版本源码交给 AI，保留参考目录并报告验证结果。",
      copyCommand: "复制",
      migrationNotice: "正式站会把这里接成固定版本详情页的迁移页签。",
      useProject: "确认项目上下文",
      mobile: "手机",
      tablet: "平板",
      desktop: "桌面"
    },
    en: {
      search: "Search templates",
      submit: "Share a system",
      language: "中文 / EN",
      theme: "Light",
      login: "Log in",
      overview: "Overview",
      library: "Library",
      categories: "Intents",
      guide: "Guide",
      publicSystems: "public systems",
      stackOptions: "stack options",
      currentRelease: "current release",
      featuredSystem: "Featured system",
      previewStatus: "Preview ready",
      searchAction: "Search",
      inspect: "Inspect system",
      copyAi: "Copy for AI",
      browseAll: "Browse all intents",
      openLibrary: "Open library",
      readGuide: "Read the handoff guide",
      openPreview: "Open standalone preview",
      footerNote: "Layout prototype · interactive locations · migrate to Next.js + shadcn/ui later",
      copyDone: "Migration instruction copied. Hand it to your AI tool.",
      reserved: "This is a reserved entry. The production capability will open in a later release.",
      copiedFallback: "The instruction is ready, but this browser cannot write to the clipboard automatically.",
      allSystems: "All systems",
      previewVersions: "Preview-ready versions",
      noMatch: "No matching systems",
      noMatchBody: "Try another keyword or clear the filters to keep browsing.",
      clearFilters: "Clear filters",
      filter: "Filters",
      sortPopular: "Popular",
      sortNewest: "Newest",
      sortName: "Name",
      keyword: "Keyword",
      intent: "Intent",
      implementation: "Implementation",
      allIntents: "All intents",
      allImplementations: "All implementations",
      systemInspector: "SYSTEM INSPECTOR",
      showcase: "Showcase",
      components: "Components",
      tokens: "Tokens",
      migration: "Migration",
      inspectSummary: "Inspect the real page, component boundary, and pinned version.",
      componentSummary: "This system is organized into primitives, compositions, and page skeletons.",
      tokenSummary: "These are the foundations to keep consistent during migration.",
      migrationSummary: "Hand the pinned source to AI, preserve the reference directory, and report verification.",
      copyCommand: "Copy",
      migrationNotice: "The production site will connect this to the fixed-version detail migration tab.",
      useProject: "Confirm project context",
      mobile: "Mobile",
      tablet: "Tablet",
      desktop: "Desktop"
    }
  };

  const categories = [
    { id: "apps", name: { zh: "应用与游戏", en: "Apps & Games" }, description: { zh: "工作流、创作工具与互动体验", en: "Workflows, creative tools, and interactive products" }, icon: "A" },
    { id: "landing", name: { zh: "营销与落地页", en: "Landing Pages" }, description: { zh: "产品发布、品牌表达与转化页面", en: "Launches, brand stories, and conversion pages" }, icon: "L" },
    { id: "dashboards", name: { zh: "数据看板", en: "Dashboards" }, description: { zh: "运营、分析与高密度信息界面", en: "Operations, analytics, and dense information" }, icon: "D" },
    { id: "components", name: { zh: "组件与交互", en: "Components" }, description: { zh: "表单、状态与可复用交互组合", en: "Forms, states, and reusable patterns" }, icon: "C" },
    { id: "auth", name: { zh: "登录与注册", en: "Login & Sign Up" }, description: { zh: "登录、注册与账号恢复流程", en: "Sign in, registration, and recovery flows" }, icon: "A" },
    { id: "content", name: { zh: "内容与作品集", en: "Content & Portfolios" }, description: { zh: "博客、知识内容与个人作品展示", en: "Editorial content, knowledge, and portfolios" }, icon: "N" }
  ];

  const templates = [
    {
      id: "quiet-workspace",
      name: { zh: "Quiet Grid Workspace", en: "Quiet Grid Workspace" },
      family: "Quiet Grid",
      type: "workspace",
      author: { name: { zh: "UIDevTpl 团队", en: "UIDevTpl Studio" }, initials: "UI", tone: "lime" },
      summary: { zh: "安静、精确的工作界面，适合复杂任务和高密度信息。", en: "A calm, precise workspace for complex tasks and dense information." },
      categories: ["apps", "dashboards", "components"],
      framework: "react",
      frameworkLabel: "React",
      library: "shadcn/ui",
      version: "0.1.0-preview",
      views: 12800,
      likes: 936,
      updated: 4,
      tags: ["Web", "React", "shadcn/ui", "Light"],
      components: ["Button", "Badge", "Tabs", "DataTable", "Sidebar", "Dialog"],
      tokens: [["Canvas", "neutral / 50"], ["Primary", "signal / lime"], ["Radius", "8px max"], ["Type", "Noto Sans"]]
    },
    {
      id: "signal-launch",
      name: { zh: "Signal Product Launch", en: "Signal Product Launch" },
      family: "Signal Canvas",
      type: "launch",
      author: { name: { zh: "林澄", en: "Lin Chen" }, initials: "LC", tone: "coral" },
      summary: { zh: "直接、鲜明的产品叙事，用强对比建立行动层级。", en: "A direct product story with clear action hierarchy and sharp contrast." },
      categories: ["landing", "components"],
      framework: "next",
      frameworkLabel: "Next.js",
      library: "shadcn/ui",
      version: "0.1.0-preview",
      views: 20400,
      likes: 1900,
      updated: 3,
      tags: ["Web", "Next.js", "shadcn/ui", "Light"],
      components: ["Button", "Navigation", "Card", "Accordion", "Marquee", "Dialog"],
      tokens: [["Canvas", "warm / 50"], ["Primary", "coral / 500"], ["Radius", "6px max"], ["Type", "Noto Sans"]]
    },
    {
      id: "quiet-publication",
      name: { zh: "Grid Knowledge Publication", en: "Grid Knowledge Publication" },
      family: "Quiet Grid",
      type: "publication",
      author: { name: { zh: "Noa Rivera", en: "Noa Rivera" }, initials: "NR", tone: "blue" },
      summary: { zh: "具有编辑感的知识内容与长文阅读页面。", en: "An editorial system for knowledge content and long-form reading." },
      categories: ["content", "landing"],
      framework: "react",
      frameworkLabel: "React",
      library: "shadcn/ui",
      version: "0.1.0-preview",
      views: 7400,
      likes: 618,
      updated: 2,
      tags: ["Web", "React", "shadcn/ui", "Light"],
      components: ["Typography", "Breadcrumb", "TableOfContents", "Card", "Tabs"],
      tokens: [["Canvas", "paper / 50"], ["Primary", "ink / 900"], ["Radius", "4px max"], ["Type", "Noto Sans"]]
    },
    {
      id: "signal-notes",
      name: { zh: "Signal Creative Field Notes", en: "Signal Creative Field Notes" },
      family: "Signal Canvas",
      type: "notes",
      author: { name: { zh: "UIDevTpl 团队", en: "UIDevTpl Studio" }, initials: "UI", tone: "" },
      summary: { zh: "带有海报气质的内容体验，适合作品与创意叙事。", en: "A poster-like content experience for portfolios and creative stories." },
      categories: ["apps", "dashboards", "content"],
      framework: "next",
      frameworkLabel: "Next.js",
      library: "shadcn/ui",
      version: "0.1.0-preview",
      views: 9300,
      likes: 804,
      updated: 1,
      tags: ["Web", "Next.js", "shadcn/ui", "Light"],
      components: ["Navigation", "Tabs", "AspectRatio", "Card", "HoverCard"],
      tokens: [["Canvas", "ink / 900"], ["Primary", "signal / lime"], ["Radius", "6px max"], ["Type", "Noto Sans"]]
    }
  ];

  const selectors = {
    home: document.querySelector("#home-view"),
    library: document.querySelector("#library-view"),
    categories: document.querySelector("#categories-view"),
    guide: document.querySelector("#guide-view"),
    homeIntents: document.querySelector("#home-intents"),
    homeGrid: document.querySelector("#home-template-grid"),
    libraryGrid: document.querySelector("#library-grid"),
    categoryDirectory: document.querySelector("#category-directory"),
    libraryCount: document.querySelector("#library-count"),
    resultsLabel: document.querySelector("#results-label"),
    resultsNote: document.querySelector("#results-filter-note"),
    emptyState: document.querySelector("#empty-state"),
    homeSearch: document.querySelector("#home-search"),
    librarySearch: document.querySelector("#library-search"),
    sort: document.querySelector("#sort-select"),
    commandOverlay: document.querySelector("#search-overlay"),
    commandSearch: document.querySelector("#command-search"),
    commandResults: document.querySelector("#command-results"),
    detailDrawer: document.querySelector("#detail-drawer"),
    drawerTitle: document.querySelector("#drawer-title"),
    drawerId: document.querySelector("#drawer-id"),
    drawerPreview: document.querySelector("#drawer-preview"),
    drawerShowcase: document.querySelector("#drawer-showcase-label"),
    drawerPanel: document.querySelector("#drawer-tab-panel"),
    toast: document.querySelector("#toast"),
    mobileNav: document.querySelector("#mobile-nav")
  };

  const state = {
    locale: readStorage("uidevtpl-prototype-locale") === "en" ? "en" : "zh",
    theme: readStorage("uidevtpl-prototype-theme") === "dark" ? "dark" : "light",
    view: "home",
    query: "",
    category: "all",
    framework: "all",
    sort: "popular",
    selectedTemplate: "quiet-workspace",
    drawerTab: "showcase",
    previewSize: "desktop",
    likes: new Set(readLikes())
  };

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function readLikes() {
    try {
      const value = JSON.parse(readStorage("uidevtpl-prototype-likes") || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function currentCopy() {
    return copy[state.locale];
  }

  function text(value) {
    return value[state.locale] || value.zh;
  }

  function formatMetric(value) {
    if (value < 1000) return String(value);
    return `${(value / 1000).toFixed(value < 10000 ? 1 : 0).replace(".0", "")}K`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  }

  function templateById(id) {
    return templates.find((item) => item.id === id) || templates[0];
  }

  function categoryById(id) {
    return categories.find((item) => item.id === id) || categories[0];
  }

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
    return `<span class="wireframe wireframe-workspace"><span class="wf-sidebar"><i></i><i></i><i></i><b></b></span><span class="wf-main"><i class="wf-toolbar"></i><span class="wf-heading"><i></i><b></b><em></em></span><span class="wf-columns"><i></i><i></i><i></i></span><span class="wf-table"><i></i><i></i><i></i><i></i></span></span></span>`;
  }

  function renderTemplateCard(item, featured) {
    const liked = state.likes.has(item.id);
    const tags = item.tags.slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    return `<article class="template-card${featured ? " featured-card" : ""}" data-template-id="${item.id}">
      <button class="template-preview preview-${item.type}" type="button" data-open-template="${item.id}" aria-label="${escapeHtml(text(item.name))}">
        ${previewMarkup(item.type)}
        <span class="template-preview-label"><span>${escapeHtml(item.family)} / ${escapeHtml(item.frameworkLabel)}</span><span>OPEN ↗</span></span>
      </button>
      <div class="template-meta">
        <span class="avatar ${item.author.tone}">${escapeHtml(item.author.initials)}</span>
        <div class="template-info"><p class="template-kicker">${escapeHtml(item.family)}</p><h3 class="template-title">${escapeHtml(text(item.name))}</h3><p class="template-id">${escapeHtml(item.id)} / v${escapeHtml(item.version)}</p></div>
        <div class="template-stats"><span>${formatMetric(item.views)}</span><button class="like-button${liked ? " is-liked" : ""}" type="button" data-like="${item.id}" aria-pressed="${liked}" aria-label="Like"><span class="heart">${liked ? "♥" : "♡"}</span>${formatMetric(item.likes + (liked ? 1 : 0))}</button></div>
      </div>
      <div class="card-tags">${tags}</div>
    </article>`;
  }

  function renderHome() {
    selectors.homeIntents.innerHTML = categories.slice(0, 6).map((category, index) => {
      const count = templates.filter((item) => item.categories.includes(category.id)).length;
      return `<button class="intent-item" type="button" data-category="${category.id}"><span>0${index + 1}</span><span><strong>${escapeHtml(text(category.name))}</strong><small>${escapeHtml(text(category.description))} · ${count}</small></span><span>→</span></button>`;
    }).join("");
    selectors.homeGrid.innerHTML = templates.map((item, index) => renderTemplateCard(item, index === 0)).join("");
  }

  function filteredTemplates() {
    const query = state.query.trim().toLocaleLowerCase(state.locale === "zh" ? "zh-CN" : "en");
    const selected = templates.filter((item) => {
      const categoryName = item.categories.map((id) => text(categoryById(id).name)).join(" ");
      const searchable = [item.id, text(item.name), item.family, item.frameworkLabel, item.library, text(item.summary), categoryName].join(" ").toLocaleLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesCategory = state.category === "all" || item.categories.includes(state.category);
      const matchesFramework = state.framework === "all" || item.framework === state.framework;
      return matchesQuery && matchesCategory && matchesFramework;
    });
    return selected.sort((left, right) => {
      if (state.sort === "newest") return right.updated - left.updated;
      if (state.sort === "name") return text(left.name).localeCompare(text(right.name), state.locale === "zh" ? "zh-CN" : "en");
      return (right.likes + (state.likes.has(right.id) ? 1 : 0)) - (left.likes + (state.likes.has(left.id) ? 1 : 0));
    });
  }

  function renderLibrary() {
    const items = filteredTemplates();
    const ui = currentCopy();
    selectors.libraryGrid.innerHTML = items.map((item) => renderTemplateCard(item, false)).join("");
    selectors.libraryGrid.hidden = items.length === 0;
    selectors.emptyState.hidden = items.length !== 0;
    selectors.libraryCount.textContent = `${String(items.length).padStart(2, "0")} ${state.locale === "zh" ? "个系统" : items.length === 1 ? "system" : "systems"}`;
    selectors.resultsLabel.textContent = state.category === "all" ? ui.allSystems : text(categoryById(state.category).name);
    selectors.resultsNote.textContent = state.query ? `“${state.query}” / ${items.length}` : ui.previewVersions;
    selectors.librarySearch.value = state.query;
    selectors.sort.value = state.sort;
    document.querySelectorAll('input[name="category"]').forEach((input) => { input.checked = input.value === state.category; });
    document.querySelectorAll('input[name="framework"]').forEach((input) => { input.checked = input.value === state.framework; });
  }

  function renderCategories() {
    selectors.categoryDirectory.innerHTML = categories.map((category, index) => {
      const related = templates.filter((item) => item.categories.includes(category.id));
      const latest = related.sort((left, right) => right.updated - left.updated)[0];
      return `<button class="category-row" type="button" data-category="${category.id}"><span class="category-number">0${index + 1}</span><span class="category-title"><span class="category-icon">${category.icon}</span><strong>${escapeHtml(text(category.name))}</strong></span><p>${escapeHtml(text(category.description))}</p><span class="category-count">${String(related.length).padStart(2, "0")} / ${state.locale === "zh" ? "系统" : "systems"}</span><span class="category-latest"><span>${state.locale === "zh" ? "最近更新" : "Latest"}</span><strong>${latest ? escapeHtml(text(latest.name)) : "-"}</strong></span><span class="category-arrow">→</span></button>`;
    }).join("");
  }

  function buildInstruction(item) {
    const path = `.uidevtpl/web/${item.framework}/${item.library.replace("/", "-")}/${item.id}/`;
    return [
      "UIDEVTPL_TEMPLATE_MIGRATION",
      `template: ${item.id}`,
      `version: ${item.version}`,
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

  function showView(view) {
    state.view = view;
    document.querySelectorAll("[data-view]").forEach((node) => { node.hidden = node.dataset.view !== view; });
    document.querySelectorAll("[data-nav]").forEach((node) => { node.classList.toggle("is-active", node.dataset.nav === view); });
    selectors.mobileNav.hidden = true;
    if (view === "library") renderLibrary();
    if (view === "categories") renderCategories();
    window.scrollTo(0, 0);
  }

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

  function renderCommandResults() {
    const query = selectors.commandSearch.value.trim().toLocaleLowerCase();
    const matches = templates.filter((item) => {
      const categoryName = item.categories.map((id) => text(categoryById(id).name)).join(" ");
      return !query || [item.id, text(item.name), item.family, categoryName, item.frameworkLabel].join(" ").toLocaleLowerCase().includes(query);
    });
    selectors.commandResults.innerHTML = matches.length ? matches.map((item) => `<button class="command-result" type="button" data-open-template="${item.id}"><span class="command-result-mark">${escapeHtml(item.author.initials)}</span><span class="command-result-copy"><strong>${escapeHtml(text(item.name))}</strong><small>${escapeHtml(item.id)} / ${escapeHtml(item.frameworkLabel)} / ${escapeHtml(item.library)}</small></span><span>↗</span></button>`).join("") : `<div class="command-result-copy" style="padding: 15px 8px"><strong>${escapeHtml(currentCopy().noMatch)}</strong><small>${escapeHtml(currentCopy().noMatchBody)}</small></div>`;
  }

  function openDrawer(id) {
    const item = templateById(id);
    state.selectedTemplate = item.id;
    state.drawerTab = "showcase";
    state.previewSize = "desktop";
    selectors.detailDrawer.hidden = false;
    document.body.classList.add("is-locked");
    renderDrawer();
  }

  function closeDrawer() {
    selectors.detailDrawer.hidden = true;
    document.body.classList.remove("is-locked");
  }

  function renderDrawer() {
    const item = templateById(state.selectedTemplate);
    const ui = currentCopy();
    selectors.drawerTitle.textContent = text(item.name);
    selectors.drawerId.textContent = `${item.id} / v${item.version}`;
    selectors.drawerShowcase.textContent = `SHOWCASE / ${item.type.toUpperCase()}`;
    selectors.drawerPreview.className = `drawer-preview preview-${state.previewSize}`;
    selectors.drawerPreview.innerHTML = previewMarkup(item.type);
    document.querySelectorAll("[data-preview-size]").forEach((button) => { button.classList.toggle("is-active", button.dataset.previewSize === state.previewSize); });
    document.querySelectorAll("[data-drawer-tab]").forEach((button) => { button.classList.toggle("is-active", button.dataset.drawerTab === state.drawerTab); });
    document.querySelectorAll('[data-action="copy-ai"]').forEach((button) => { button.dataset.template = item.id; });

    if (state.drawerTab === "components") {
      selectors.drawerPanel.innerHTML = `<h3>${escapeHtml(ui.components)}</h3><p>${escapeHtml(ui.componentSummary)}</p><div class="chip-list">${item.components.map((component) => `<span>${escapeHtml(component)}</span>`).join("")}</div><div class="panel-note">组件实验室会在正式详情页打开独立 Preview Project，避免模板运行时污染主站。</div>`;
      return;
    }
    if (state.drawerTab === "tokens") {
      selectors.drawerPanel.innerHTML = `<h3>${escapeHtml(ui.tokens)}</h3><p>${escapeHtml(ui.tokenSummary)}</p><dl class="detail-list">${item.tokens.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd><code>${escapeHtml(value)}</code></dd></div>`).join("")}</dl><div class="panel-note">这些 token 只描述模板实现的可迁移规则，官网主题和模板主题分别维护。</div>`;
      return;
    }
    if (state.drawerTab === "migration") {
      const instruction = buildInstruction(item);
      selectors.drawerPanel.innerHTML = `<h3>${escapeHtml(ui.migration)}</h3><p>${escapeHtml(ui.migrationSummary)}</p><div class="migration-code"><button type="button" data-action="copy-migration" data-template="${item.id}">${escapeHtml(ui.copyCommand)}</button><pre>${escapeHtml(instruction)}</pre></div><div class="panel-note">${escapeHtml(ui.migrationNotice)}</div>`;
      return;
    }
    selectors.drawerPanel.innerHTML = `<h3>${escapeHtml(text(item.name))}</h3><p>${escapeHtml(ui.inspectSummary)}</p><dl class="detail-list"><div><dt>Family</dt><dd>${escapeHtml(item.family)}</dd></div><div><dt>Framework</dt><dd>${escapeHtml(item.frameworkLabel)}</dd></div><div><dt>Library</dt><dd>${escapeHtml(item.library)}</dd></div><div><dt>Version</dt><dd><code>${escapeHtml(item.version)}</code></dd></div><div><dt>Showcases</dt><dd>Workspace / Components / Lab</dd></div></dl>`;
  }

  function applyLocale() {
    const ui = currentCopy();
    document.documentElement.lang = state.locale === "zh" ? "zh-CN" : "en";
    document.title = state.locale === "zh" ? "UIDevTpl / 主站布局原型" : "UIDevTpl / Signal Desk Prototype";
    document.querySelectorAll("[data-copy]").forEach((node) => {
      const key = node.dataset.copy;
      if (key === "theme") {
        node.textContent = state.theme === "dark" ? (state.locale === "zh" ? "浅色" : "Light") : ui.theme;
        return;
      }
      if (ui[key]) node.textContent = ui[key];
    });
    const navLabels = { overview: ui.overview, library: ui.library, categories: ui.categories, guide: ui.guide };
    document.querySelectorAll("[data-nav-label]").forEach((node) => { node.textContent = navLabels[node.dataset.navLabel]; });
    selectors.homeSearch.placeholder = state.locale === "zh" ? "搜索模板、技术栈或用途" : "Search templates, stacks, or intents";
    selectors.librarySearch.placeholder = state.locale === "zh" ? "名称或 ID" : "Name or ID";
    selectors.commandSearch.placeholder = state.locale === "zh" ? "输入名称、技术栈或用途" : "Type a name, stack, or intent";
    renderHome();
    renderLibrary();
    renderCategories();
    if (!selectors.detailDrawer.hidden) renderDrawer();
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = state.theme;
    writeStorage("uidevtpl-prototype-theme", state.theme);
    applyLocale();
  }

  function toggleLanguage() {
    state.locale = state.locale === "zh" ? "en" : "zh";
    writeStorage("uidevtpl-prototype-locale", state.locale);
    applyLocale();
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // The prototype still works when localStorage is unavailable.
    }
  }

  function toggleLike(id) {
    if (state.likes.has(id)) state.likes.delete(id);
    else state.likes.add(id);
    writeStorage("uidevtpl-prototype-likes", JSON.stringify([...state.likes]));
    renderHome();
    renderLibrary();
    if (!selectors.commandOverlay.hidden) renderCommandResults();
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
    const item = templateById(id);
    copyText(buildInstruction(item)).then((copied) => { showToast(copied ? currentCopy().copyDone : currentCopy().copiedFallback); });
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    const nav = target.dataset.nav;
    if (nav) { showView(nav); return; }
    const category = target.dataset.category;
    if (category) { state.category = category; state.query = ""; showView("library"); renderLibrary(); return; }
    const templateId = target.dataset.openTemplate;
    if (templateId) { closeSearch(); openDrawer(templateId); return; }
    const likeId = target.dataset.like;
    if (likeId) { toggleLike(likeId); return; }
    const drawerTab = target.dataset.drawerTab;
    if (drawerTab) { state.drawerTab = drawerTab; renderDrawer(); return; }
    const previewSize = target.dataset.previewSize;
    if (previewSize) { state.previewSize = previewSize; renderDrawer(); return; }
    const action = target.dataset.action;
    if (action === "open-search") { openSearch(); return; }
    if (action === "close-search") { closeSearch(); return; }
    if (action === "close-drawer") { closeDrawer(); return; }
    if (action === "toggle-theme") { toggleTheme(); return; }
    if (action === "toggle-language") { toggleLanguage(); return; }
    if (action === "toggle-mobile") { selectors.mobileNav.hidden = !selectors.mobileNav.hidden; return; }
    if (action === "reserved") { showToast(currentCopy().reserved); return; }
    if (action === "mobile-filters") { selectors.library.classList.toggle("filters-open"); return; }
    if (action === "clear-filters") { state.query = ""; state.category = "all"; state.framework = "all"; state.sort = "popular"; renderLibrary(); return; }
    if (action === "copy-ai") { copyMigration(target.dataset.template || state.selectedTemplate); return; }
    if (action === "copy-migration") { copyMigration(target.dataset.template || state.selectedTemplate); return; }
  });

  document.querySelector("#home-search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = selectors.homeSearch.value.trim();
    state.category = "all";
    showView("library");
    renderLibrary();
  });

  document.querySelector("#command-search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = selectors.commandSearch.value.trim();
    closeSearch();
    showView("library");
    renderLibrary();
  });

  selectors.commandSearch.addEventListener("input", renderCommandResults);
  selectors.librarySearch.addEventListener("input", () => { state.query = selectors.librarySearch.value; renderLibrary(); });
  selectors.sort.addEventListener("change", () => { state.sort = selectors.sort.value; renderLibrary(); });
  document.querySelectorAll('input[name="category"]').forEach((input) => input.addEventListener("change", () => { state.category = input.value; renderLibrary(); }));
  document.querySelectorAll('input[name="framework"]').forEach((input) => input.addEventListener("change", () => { state.framework = input.value; renderLibrary(); }));

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
    if (event.key === "Escape") { closeSearch(); closeDrawer(); selectors.library.classList.remove("filters-open"); }
  });

  document.documentElement.dataset.theme = state.theme;
  applyLocale();
  showView("home");
})();
