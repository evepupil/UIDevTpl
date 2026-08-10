(function runPrototype() {
  "use strict";

  const copy = {
    zh: {
      templates: "模板", useAi: "与 AI 使用", share: "分享模板", login: "登录", signup: "注册",
      eyebrow: "CURATED UI SYSTEMS FOR AI BUILDERS", title: "为 AI 开发找到好界面",
      subtitle: "浏览经过打磨的组件、页面与完整模板，让 AI 从真实代码延续同一套设计。",
      search: "搜索模板、分类或视觉风格", categories: "分类", browseAll: "浏览全部", featured: "精选模板",
      allTemplates: "全部模板", popular: "热门排序", newest: "最新分享", nameSort: "名称排序",
      categoryTitle: "全部模板分类", categorySubtitle: "按产品用途浏览公开模板，每个分类都用代表页面展示视觉方向。",
      emptyTitle: "没有匹配的模板", emptyBody: "换一个关键词试试。", categoryEmpty: "这个分类正在整理",
      categoryEmptyBody: "公开模板通过审核后会出现在这里。", preview: "查看预览", copyAi: "复制给 AI", gotIt: "知道了"
    },
    en: {
      templates: "Templates", useAi: "Use with AI", share: "Share template", login: "Log in", signup: "Sign up",
      eyebrow: "CURATED UI SYSTEMS FOR AI BUILDERS", title: "Find a better interface for AI development",
      subtitle: "Browse polished components, pages, and complete templates so AI can continue one coherent design from real code.",
      search: "Search templates, categories, or visual styles", categories: "Categories", browseAll: "Browse all", featured: "Featured templates",
      allTemplates: "All templates", popular: "Trending", newest: "Newest", nameSort: "Name",
      categoryTitle: "All Template Categories", categorySubtitle: "Browse public templates by product use case, with representative pages showing each visual direction.",
      emptyTitle: "No matching templates", emptyBody: "Try another keyword.", categoryEmpty: "This category is being curated",
      categoryEmptyBody: "Approved public templates will appear here.", preview: "Open preview", copyAi: "Copy for AI", gotIt: "Got it"
    }
  };

  const authors = {
    studio: { name: { zh: "UIDevTpl 团队", en: "UIDevTpl Studio" }, initials: "UI", tone: "" },
    lin: { name: { zh: "林澄", en: "Lin Chen" }, initials: "LC", tone: "jade" },
    noa: { name: { zh: "Noa Rivera", en: "Noa Rivera" }, initials: "NR", tone: "coral" }
  };

  const templates = [
    { id: "quiet-workspace", family: "quiet-grid", visual: "quiet", author: "studio", title: { zh: "静默网格工作台", en: "Quiet Grid Workspace" }, summary: { zh: "安静、精确的工作界面，适合复杂任务与高密度信息。", en: "A calm, precise workspace for complex tasks and dense information." }, categories: ["apps", "dashboards", "components"], views: 12800, likes: 936, featured: true, date: 4 },
    { id: "signal-launch", family: "signal-canvas", visual: "signal", author: "lin", title: { zh: "信号产品发布室", en: "Signal Product Launch" }, summary: { zh: "直接、鲜明的产品叙事，用强对比建立清楚的行动层级。", en: "A direct product story with bold contrast and clear action hierarchy." }, categories: ["landing", "components"], views: 20400, likes: 1900, featured: true, date: 3 },
    { id: "quiet-publication", family: "quiet-grid", visual: "publication", author: "noa", title: { zh: "网格知识出版", en: "Grid Knowledge Publication" }, summary: { zh: "具有编辑感的知识内容与长文阅读页面。", en: "An editorial system for knowledge content and long-form reading." }, categories: ["content", "landing"], views: 7400, likes: 618, featured: true, date: 2 },
    { id: "signal-notes", family: "signal-canvas", visual: "notes", author: "studio", title: { zh: "Signal 创意观察", en: "Signal Creative Field Notes" }, summary: { zh: "带有海报气质的内容体验，适合作品与创意叙事。", en: "A poster-like content experience for portfolios and creative stories." }, categories: ["apps", "dashboards", "content"], views: 9300, likes: 804, featured: false, date: 1 }
  ];

  const categories = [
    { id: "apps", icon: "blocks", name: { zh: "应用与游戏", en: "Apps & Games" }, description: { zh: "工作流、创作工具与互动体验", en: "Workflows, creative tools, and interactive products" }, tiles: ["workspace", "game", "dark", "canvas"] },
    { id: "landing", icon: "panels-top-left", name: { zh: "营销与落地页", en: "Landing Pages" }, description: { zh: "产品发布、品牌表达与转化页面", en: "Launches, brand stories, and conversion pages" }, tiles: ["launch", "editorial", "dark", "workspace"] },
    { id: "dashboards", icon: "chart-no-axes-combined", name: { zh: "数据看板", en: "Dashboards" }, description: { zh: "运营、分析与高密度信息界面", en: "Operations, analytics, and dense information" }, tiles: ["metric", "workspace", "dark", "game"] },
    { id: "components", icon: "component", name: { zh: "组件与交互", en: "Components" }, description: { zh: "表单、状态与可复用交互组合", en: "Forms, states, and reusable patterns" }, tiles: ["canvas", "auth", "dark", "workspace"] },
    { id: "auth", icon: "log-in", name: { zh: "登录与注册", en: "Login & Sign Up" }, description: { zh: "登录、注册与账号恢复流程", en: "Sign in, registration, and recovery flows" }, tiles: ["auth", "auth", "auth", "launch"] },
    { id: "content", icon: "newspaper", name: { zh: "内容与作品集", en: "Content & Portfolios" }, description: { zh: "博客、知识内容与个人作品展示", en: "Editorial content, knowledge, and portfolios" }, tiles: ["editorial", "dark", "workspace", "canvas"] }
  ];

  const elements = {
    home: document.querySelector("#home-view"), categories: document.querySelector("#categories-view"), category: document.querySelector("#category-view"),
    homeCategories: document.querySelector("#home-categories"), categoriesGrid: document.querySelector("#categories-grid"), featured: document.querySelector("#featured-grid"),
    grid: document.querySelector("#template-grid"), categoryGrid: document.querySelector("#category-template-grid"), search: document.querySelector("#search-input"),
    sort: document.querySelector("#sort-select"), count: document.querySelector("#result-count"), empty: document.querySelector("#empty-state"), categoryEmpty: document.querySelector("#category-empty"),
    menu: document.querySelector("#templates-menu"), menuButton: document.querySelector("#templates-menu-button"), detail: document.querySelector("#detail-dialog"), placeholder: document.querySelector("#placeholder-dialog"),
    toast: document.querySelector("#toast"), toastText: document.querySelector("#toast-text")
  };

  const state = {
    locale: localStorage.getItem("uidevtpl-locale") === "en" ? "en" : "zh",
    theme: localStorage.getItem("uidevtpl-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
    likes: new Set(JSON.parse(localStorage.getItem("uidevtpl-likes") || "[]")), query: "", sort: "popular", view: "home", category: null
  };

  const text = (value) => value[state.locale] || value.zh;
  const format = (value) => value < 1000 ? String(value) : `${(value / 1000).toFixed(value < 10000 ? 1 : 0).replace(".0", "")}K`;
  const refreshIcons = () => window.lucide?.createIcons({ attrs: { "stroke-width": 1.8 } });
  const avatar = (author) => `<span class="avatar ${author.tone}">${author.initials}</span>`;
  const mini = (type) => `<span class="mini ${type}"><i></i><i></i><i></i><i></i></span>`;

  function visual(type) {
    if (type === "quiet") return `<div class="template-visual visual-quiet"><aside><b><i></i><i></i><i></i><i></i></b><span></span><span></span><em></em></aside><section><header><span>ATELIER / AI</span><i></i><i></i></header><div class="quiet-title"><span><small>TUESDAY, AUG 10</small><strong>Ship the work that matters.</strong></span><b>New task</b></div><div class="quiet-board"><div class="quiet-rows"><i></i><i></i><i></i><i></i></div><img src="./assets/quiet-grid-workspace.jpg" alt="" /></div></section></div>`;
    if (type === "signal") return `<div class="template-visual visual-signal"><div class="signal-top"><b>FORM / 02</b><span>PRODUCT SIGNALS</span><span>MENU</span></div><div class="signal-main"><div class="signal-copy"><small>OBJECT STUDY 024</small><strong>MAKE EVERY<br />SIGNAL COUNT.</strong><span>BUILT FOR MOTION</span></div><div class="signal-image"><img src="./assets/signal-canvas-product.jpg" alt="" /><i></i><b></b><em>01 / 04</em></div></div><div class="signal-foot"><span>DISCOVER THE SYSTEM</span><span>SCROLL ↓</span></div></div>`;
    if (type === "publication") return `<div class="template-visual visual-publication"><div class="publication-line"><span>STUDIO NOTES / 08</span><span>INDEX</span></div><div class="publication-main"><div class="publication-copy"><small>FIELD EDITION</small><strong>Ideas need<br />room to settle.</strong><span>Systems / Process / Practice</span></div><img src="./assets/quiet-grid-editorial.jpg" alt="" /></div><div class="publication-line"><span>QUIET GRID</span><span>READ 04 MIN</span></div></div>`;
    return `<div class="template-visual visual-notes"><div class="notes-line"><b>SIGNAL / JOURNAL</b><span>VOL. 07</span></div><div class="notes-main"><div class="notes-copy"><small>FIELD NOTE 034</small><strong>THE OBJECTS<br />THAT TEACH US<br /><em>TO NOTICE.</em></strong></div><img src="./assets/signal-canvas-product.jpg" alt="" /></div><div class="notes-foot">CLARITY / MOTION / OBJECT / SYSTEM</div></div>`;
  }

  function categoryCard(category) {
    return `<article class="category-card"><button type="button" data-category="${category.id}"><span class="mosaic">${category.tiles.map(mini).join("")}</span><span class="category-copy"><span><strong>${text(category.name)}</strong><small>${text(category.description)}</small></span><i data-lucide="arrow-up-right"></i></span></button></article>`;
  }

  function templateCard(template) {
    const author = authors[template.author];
    const liked = state.likes.has(template.id);
    return `<article class="template-card" data-template-id="${template.id}"><button class="template-preview-button" type="button" data-open-template="${template.id}" aria-label="${text(template.title)}">${visual(template.visual)}</button><div class="template-meta">${avatar(author)}<div class="template-info"><button class="template-title" type="button" data-open-template="${template.id}">${text(template.title)}</button><div class="byline"><span>${text(author.name)}</span><span>·</span><span><i data-lucide="users"></i>${format(template.views)}</span><span>·</span><button class="like-button${liked ? " is-liked" : ""}" type="button" data-like="${template.id}" aria-pressed="${liked}" aria-label="Like"><i data-lucide="heart"></i><span>${format(template.likes + (liked ? 1 : 0))}</span></button></div></div></div></article>`;
  }

  function renderMenu() {
    elements.menu.innerHTML = `<button class="menu-feature" type="button" data-all-categories><span><small>${copy[state.locale].categories}</small><strong>${copy[state.locale].browseAll}</strong></span><span class="menu-art"><i></i><i></i><i></i><i></i></span></button><div class="menu-list">${categories.slice(0, 5).map((category) => `<button class="menu-item" type="button" data-category="${category.id}"><i data-lucide="${category.icon}"></i><span>${text(category.name)}</span><i data-lucide="arrow-right"></i></button>`).join("")}</div>`;
  }

  function filteredTemplates() {
    const query = state.query.trim().toLocaleLowerCase();
    const result = templates.filter((item) => !query || [item.title.zh, item.title.en, item.summary.zh, item.summary.en, ...item.categories.map((id) => text(categories.find((category) => category.id === id).name))].join(" ").toLocaleLowerCase().includes(query));
    return [...result].sort((a, b) => state.sort === "newest" ? b.date - a.date : state.sort === "name" ? text(a.title).localeCompare(text(b.title), state.locale === "zh" ? "zh-CN" : "en") : b.likes - a.likes);
  }

  function render() {
    document.documentElement.lang = state.locale === "en" ? "en" : "zh-CN";
    document.documentElement.dataset.theme = state.theme;
    document.querySelectorAll("[data-copy]").forEach((node) => { node.textContent = copy[state.locale][node.dataset.copy]; });
    elements.search.placeholder = copy[state.locale].search;
    document.querySelector("#theme-button").innerHTML = `<i data-lucide="${state.theme === "dark" ? "sun" : "moon"}"></i>`;
    renderMenu();
    elements.homeCategories.innerHTML = categories.slice(0, 4).map(categoryCard).join("");
    elements.categoriesGrid.innerHTML = categories.map(categoryCard).join("");
    elements.featured.innerHTML = templates.filter((item) => item.featured).map(templateCard).join("");
    const result = filteredTemplates();
    elements.grid.innerHTML = result.map(templateCard).join("");
    elements.count.textContent = state.locale === "zh" ? `${result.length} 个公开模板` : `${result.length} public templates`;
    elements.grid.hidden = result.length === 0;
    elements.empty.hidden = result.length !== 0;
    document.querySelector("#category-section").hidden = Boolean(state.query);
    document.querySelector("#featured-section").hidden = Boolean(state.query);
    refreshIcons();
  }

  function showView(view, categoryId, push = true) {
    state.view = view; state.category = categoryId || null;
    elements.home.hidden = view !== "home"; elements.categories.hidden = view !== "categories"; elements.category.hidden = view !== "category";
    if (view === "category") {
      const category = categories.find((item) => item.id === categoryId); if (!category) return;
      document.querySelector("#category-name").textContent = text(category.name); document.querySelector("#category-crumb").textContent = text(category.name);
      document.querySelector("#category-description").textContent = text(category.description); document.querySelector("#category-icon").innerHTML = `<i data-lucide="${category.icon}"></i>`;
      const items = templates.filter((item) => item.categories.includes(categoryId)); elements.categoryGrid.innerHTML = items.map(templateCard).join("");
      elements.categoryGrid.hidden = items.length === 0; elements.categoryEmpty.hidden = items.length !== 0;
    }
    elements.menu.hidden = true; elements.menuButton.setAttribute("aria-expanded", "false");
    if (push) history.pushState({}, "", view === "home" ? location.pathname : view === "categories" ? "?view=categories" : `?category=${categoryId}`);
    scrollTo({ top: 0, behavior: "smooth" }); refreshIcons();
  }

  function openDetail(id) {
    const item = templates.find((template) => template.id === id); if (!item) return;
    const author = authors[item.author]; document.querySelector("#detail-preview").innerHTML = visual(item.visual);
    document.querySelector("#detail-author").innerHTML = `${avatar(author)}<span>${text(author.name)}</span>`;
    document.querySelector("#detail-title").textContent = text(item.title); document.querySelector("#detail-summary").textContent = text(item.summary);
    elements.detail.showModal(); refreshIcons();
  }

  let toastTimer;
  function toast(message) { clearTimeout(toastTimer); elements.toastText.textContent = message; elements.toast.classList.add("is-visible"); toastTimer = setTimeout(() => elements.toast.classList.remove("is-visible"), 1800); }
  function placeholder(type) {
    const content = state.locale === "zh" ? {
      login: ["登录入口已保留", "账号系统后续接入，当前原型不会发送登录请求。"], signup: ["注册入口已保留", "注册、个人主页和跨设备点赞会共用账号能力。"],
      share: ["分享模板入口已保留", "后续投稿会沿用当前作者、分类和审核结构。"], ai: ["AI 使用入口已保留", "正式版本会从这里复制固定模板迁移指令。"], preview: ["完整预览后续接入", "当前卡片已经展示模板的真实视觉方向。"]
    } : {
      login: ["Login entry reserved", "Accounts will be connected later. This prototype sends no login request."], signup: ["Sign-up entry reserved", "Registration, profiles, and cross-device likes will share the account system."],
      share: ["Template sharing reserved", "Future submissions will use the current author, category, and moderation structure."], ai: ["AI workflow reserved", "The production version will copy a fixed template migration instruction here."], preview: ["Full preview coming later", "The card already shows the template's real visual direction."]
    };
    document.querySelector("#placeholder-title").textContent = content[type][0]; document.querySelector("#placeholder-body").textContent = content[type][1]; elements.placeholder.showModal();
  }

  document.addEventListener("click", (event) => {
    const like = event.target.closest("[data-like]"); if (like) { const id = like.dataset.like; state.likes.has(id) ? state.likes.delete(id) : state.likes.add(id); localStorage.setItem("uidevtpl-likes", JSON.stringify([...state.likes])); render(); if (state.view === "category") showView("category", state.category, false); toast(state.locale === "zh" ? "点赞状态已更新" : "Like updated"); return; }
    const open = event.target.closest("[data-open-template]"); if (open) { openDetail(open.dataset.openTemplate); return; }
    const category = event.target.closest("[data-category]"); if (category) { showView("category", category.dataset.category); return; }
    if (event.target.closest("[data-all-categories]")) { showView("categories"); return; }
    const home = event.target.closest("[data-home]"); if (home) { event.preventDefault(); showView("home"); return; }
    const holder = event.target.closest("[data-placeholder]"); if (holder) { placeholder(holder.dataset.placeholder); return; }
    const close = event.target.closest("[data-close]"); if (close) close.closest("dialog").close();
    if (!event.target.closest(".nav-menu-wrap")) { elements.menu.hidden = true; elements.menuButton.setAttribute("aria-expanded", "false"); }
  });

  elements.menuButton.addEventListener("click", () => { elements.menu.hidden = !elements.menu.hidden; elements.menuButton.setAttribute("aria-expanded", String(!elements.menu.hidden)); refreshIcons(); });
  elements.search.addEventListener("input", (event) => { state.query = event.target.value; render(); });
  elements.sort.addEventListener("change", (event) => { state.sort = event.target.value; render(); });
  document.querySelector("#theme-button").addEventListener("click", () => { state.theme = state.theme === "dark" ? "light" : "dark"; localStorage.setItem("uidevtpl-theme", state.theme); render(); });
  document.querySelector("#language-button").addEventListener("click", () => { state.locale = state.locale === "zh" ? "en" : "zh"; localStorage.setItem("uidevtpl-locale", state.locale); render(); showView(state.view, state.category, false); });
  document.addEventListener("keydown", (event) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); showView("home"); elements.search.focus(); } if (event.key === "Escape") elements.menu.hidden = true; });
  window.addEventListener("popstate", () => restoreRoute());
  function restoreRoute() { const params = new URLSearchParams(location.search); if (params.get("category")) showView("category", params.get("category"), false); else if (params.get("view") === "categories") showView("categories", null, false); else showView("home", null, false); }

  render(); restoreRoute();
})();
