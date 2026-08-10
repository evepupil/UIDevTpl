(function runUIDevTplPreview(root) {
  "use strict";

  const { templates } = root.UIDevTplData;
  const previewRoot = document.querySelector("#preview-root");
  const resetButton = document.querySelector("#demo-reset");
  const toast = document.querySelector("#preview-toast");
  const dialog = document.querySelector("#preview-dialog");
  const params = new URLSearchParams(root.location.search);

  const state = {
    template: templates.find((template) => template.slug === params.get("template")) ?? templates[0],
    showcase: params.get("showcase"),
    toastTimer: null
  };

  function refreshIcons() {
    if (root.lucide && typeof root.lucide.createIcons === "function") {
      root.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
    }
  }

  function showToast(message) {
    root.clearTimeout(state.toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    state.toastTimer = root.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function quietWorkspace() {
    return `
      <div class="qg-app-shell">
        <aside class="qg-sidebar">
          <a class="qg-brand" href="#" aria-label="Atelier 首页">
            <span class="qg-brand-mark"><i data-lucide="blocks"></i></span>
            <span><strong>ATELIER</strong><small>AI PROJECTS</small></span>
          </a>
          <nav class="qg-nav" aria-label="工作台导航">
            <button class="is-active" type="button"><i data-lucide="layout-dashboard"></i><span>概览</span><kbd>G D</kbd></button>
            <button type="button" data-demo-action="项目列表已打开"><i data-lucide="folder-kanban"></i><span>项目</span><em>8</em></button>
            <button type="button" data-demo-action="运行记录已打开"><i data-lucide="activity"></i><span>运行记录</span></button>
            <button type="button" data-demo-action="知识库已打开"><i data-lucide="library"></i><span>知识库</span></button>
          </nav>
          <div class="qg-sidebar-section">
            <span>工作空间</span>
            <button type="button"><i data-lucide="circle" class="qg-project-dot is-green"></i>UIDevTpl</button>
            <button type="button"><i data-lucide="circle" class="qg-project-dot is-coral"></i>Cloud Notes</button>
          </div>
          <div class="qg-profile">
            <span class="qg-avatar">ZT</span>
            <span><strong>Zhouw Tao</strong><small>Product builder</small></span>
            <button type="button" aria-label="账户菜单"><i data-lucide="ellipsis"></i></button>
          </div>
        </aside>

        <section class="qg-app-main">
          <header class="qg-topbar">
            <div class="qg-breadcrumb"><span>项目</span><i data-lucide="chevron-right"></i><strong>UIDevTpl</strong></div>
            <label class="qg-command-search"><i data-lucide="search"></i><input type="search" placeholder="搜索任务" /><kbd>⌘ K</kbd></label>
            <div class="qg-topbar-actions">
              <button type="button" aria-label="通知" data-tooltip="通知"><i data-lucide="bell"></i><span></span></button>
              <button type="button" aria-label="帮助" data-tooltip="帮助"><i data-lucide="circle-help"></i></button>
            </div>
          </header>

          <main class="qg-page">
            <div class="qg-page-heading">
              <div><p>TUESDAY, AUGUST 10</p><h1>把重要的工作交付出去。</h1><span>3 个任务即将到期，最近一次验证全部通过。</span></div>
              <button class="qg-primary-button" type="button" data-open-task><i data-lucide="plus"></i>新建任务</button>
            </div>

            <dl class="qg-metrics">
              <div><dt>本周完成</dt><dd>24</dd><span><i data-lucide="trending-up"></i> 18%</span></div>
              <div><dt>进行中的 Agent</dt><dd>06</dd><span>4 个项目</span></div>
              <div><dt>门禁通过率</dt><dd>98.6%</dd><span>最近 30 次</span></div>
            </dl>

            <div class="qg-work-grid">
              <section class="qg-task-area">
                <div class="qg-panel-heading">
                  <div><h2>任务队列</h2><span>8 个开放任务</span></div>
                  <div class="qg-task-tabs" role="tablist">
                    <button class="is-active" type="button" data-task-filter="all">全部</button>
                    <button type="button" data-task-filter="today">今天</button>
                    <button type="button" data-task-filter="done">已完成</button>
                  </div>
                </div>
                <div class="qg-task-list">
                  <article class="qg-task-row" data-task-status="today">
                    <button class="qg-check" type="button" aria-label="标记完成"><i data-lucide="check"></i></button>
                    <div><strong>完成模板平台高保真原型</strong><span>UIDevTpl · Product design</span></div>
                    <span class="qg-owner"><b>ZT</b>Today</span>
                    <span class="qg-priority is-high">HIGH</span>
                    <button type="button" aria-label="任务菜单"><i data-lucide="ellipsis"></i></button>
                  </article>
                  <article class="qg-task-row" data-task-status="today">
                    <button class="qg-check" type="button" aria-label="标记完成"><i data-lucide="check"></i></button>
                    <div><strong>验证移动端预览和筛选</strong><span>UIDevTpl · Quality</span></div>
                    <span class="qg-owner"><b>LC</b>Today</span>
                    <span class="qg-priority">NORMAL</span>
                    <button type="button" aria-label="任务菜单"><i data-lucide="ellipsis"></i></button>
                  </article>
                  <article class="qg-task-row is-complete" data-task-status="done">
                    <button class="qg-check" type="button" aria-label="标记未完成"><i data-lucide="check"></i></button>
                    <div><strong>锁定固定版本 Manifest</strong><span>Release · Schema</span></div>
                    <span class="qg-owner"><b>AI</b>Aug 09</span>
                    <span class="qg-priority is-done">DONE</span>
                    <button type="button" aria-label="任务菜单"><i data-lucide="ellipsis"></i></button>
                  </article>
                  <article class="qg-task-row" data-task-status="all">
                    <button class="qg-check" type="button" aria-label="标记完成"><i data-lucide="check"></i></button>
                    <div><strong>整理资产许可证记录</strong><span>Quiet Grid · Content</span></div>
                    <span class="qg-owner"><b>MK</b>Aug 12</span>
                    <span class="qg-priority">NORMAL</span>
                    <button type="button" aria-label="任务菜单"><i data-lucide="ellipsis"></i></button>
                  </article>
                </div>
                <button class="qg-list-footer" type="button" data-demo-action="已显示全部任务">查看全部任务 <i data-lucide="arrow-right"></i></button>
              </section>

              <aside class="qg-activity-area">
                <div class="qg-panel-heading"><div><h2>项目脉搏</h2><span>最近 24 小时</span></div><button type="button" aria-label="项目脉搏设置"><i data-lucide="settings-2"></i></button></div>
                <div class="qg-project-image"><img src="./assets/quiet-grid-workspace.jpg" alt="现代玻璃办公空间" /><span>UIDevTpl / M1</span></div>
                <div class="qg-progress"><div><span>里程碑进度</span><strong>42%</strong></div><progress value="42" max="100">42%</progress></div>
                <ul class="qg-activity-list">
                  <li><span class="qg-activity-icon is-green"><i data-lucide="check"></i></span><div><strong>生产构建通过</strong><p>main · 5b9dd48</p></div><time>12m</time></li>
                  <li><span class="qg-activity-icon is-coral"><i data-lucide="message-square"></i></span><div><strong>新增 3 条设计批注</strong><p>模板详情页</p></div><time>48m</time></li>
                  <li><span class="qg-activity-icon"><i data-lucide="git-commit-horizontal"></i></span><div><strong>需求基线已提交</strong><p>M0 / Documentation</p></div><time>2h</time></li>
                </ul>
              </aside>
            </div>
          </main>
        </section>
      </div>`;
  }

  function quietPublication() {
    return `
      <div class="qg-publication">
        <header class="qg-publication-header">
          <a href="#" class="qg-publication-logo">FIELD<span>/</span>NOTES</a>
          <nav><a class="is-active" href="#">观察</a><a href="#">方法</a><a href="#">访谈</a></nav>
          <button type="button" data-demo-action="订阅入口已打开">订阅周刊 <i data-lucide="arrow-up-right"></i></button>
        </header>
        <main>
          <section class="qg-issue-heading">
            <div><span>ISSUE 018</span><span>AUGUST 2026</span></div>
            <h1>让数字工具<br />重新拥有秩序感。</h1>
            <p>关于专注、工作空间，以及我们如何与智能系统共同完成长期作品。</p>
          </section>
          <figure class="qg-feature-image"><img src="./assets/quiet-grid-editorial.jpg" alt="明亮窗边的现代工作台" /><figcaption><span>01</span><p>工作空间塑造注意力，也塑造最终交付的质量。</p><em>Photography / Prototype fixture</em></figcaption></figure>
          <section class="qg-story-grid">
            <article><span>DESIGN SYSTEMS · 08 MIN</span><h2>稳定的规则，让创作保留更多自由</h2><p>当颜色、间距和状态都有清楚边界，团队可以把精力放回内容与问题本身。</p><a href="#" data-demo-action="文章已打开">阅读全文 <i data-lucide="arrow-right"></i></a></article>
            <article><span>CONVERSATION · 12 MIN</span><h2>AI 之后，品味如何成为可复用的基础设施</h2><p>一次好看的输出很偶然，一套能被持续引用的真实代码才会形成长期价值。</p><a href="#" data-demo-action="访谈已打开">阅读全文 <i data-lucide="arrow-right"></i></a></article>
            <aside><span>INDEX / 018</span><ol><li><b>01</b>界面密度与注意力</li><li><b>02</b>可迁移的视觉语言</li><li><b>03</b>真实代码的证据</li><li><b>04</b>安静工具的未来</li></ol></aside>
          </section>
        </main>
      </div>`;
  }

  function signalLaunchRoom() {
    return `
      <div class="signal-site">
        <header class="signal-header"><a href="#"><span>FORM</span><b>/02</b></a><nav><a class="is-active" href="#">OBJECTS</a><a href="#">STORIES</a><a href="#">STUDIO</a></nav><button type="button" data-demo-action="菜单已打开">MENU <i data-lucide="menu"></i></button></header>
        <main class="signal-main">
          <section class="signal-hero">
            <div class="signal-copy"><span>OBJECT STUDY 024 / WEARABLES</span><h1>MAKE<br />EVERY<br /><em>SIGNAL</em><br />COUNT.</h1><p>清楚的形状，直接的反馈，为每天真正发生的行动而设计。</p><button type="button" data-demo-action="产品系列已打开">探索系列 <i data-lucide="arrow-up-right"></i></button></div>
            <div class="signal-product"><img src="./assets/signal-canvas-product.jpg" alt="白色智能腕表产品模型" /><div class="signal-product-index"><span>01</span><b>/04</b></div><div class="signal-red-block">BUILT<br />TO MOVE</div><div class="signal-blue-block"><i data-lucide="move-up-right"></i></div></div>
          </section>
          <section class="signal-spec-row"><div><span>01 / MATERIAL</span><strong>RECYCLED<br />POLYMER</strong></div><div><span>02 / WEIGHT</span><strong>38<br />GRAMS</strong></div><div><span>03 / RANGE</span><strong>48<br />HOURS</strong></div><div class="signal-yellow-cell"><span>AVAILABLE NOW</span><button type="button" data-demo-action="已加入购物袋">ADD TO BAG <i data-lucide="plus"></i></button></div></section>
        </main>
      </div>`;
  }

  function signalFieldNotes() {
    return `
      <div class="signal-notes">
        <header class="signal-notes-header"><a href="#">SIGNAL<span>JOURNAL</span></a><span>VOLUME 07 / 2026</span><button type="button" data-demo-action="索引已打开"><i data-lucide="align-right"></i>INDEX</button></header>
        <main>
          <section class="signal-notes-title"><span>FIELD NOTE 034</span><h1>THE OBJECTS<br />THAT TEACH US<br /><em>TO NOTICE.</em></h1></section>
          <section class="signal-notes-layout"><figure><img src="./assets/signal-canvas-product.jpg" alt="极简智能腕表产品模型" /><figcaption>FORM STUDY / WHITE ON WHITE</figcaption></figure><div class="signal-note-copy"><span class="signal-note-number">01</span><h2>当界面退后一步，动作会变得更清楚。</h2><p>我们从日常物件中寻找秩序：一条边界、一处反馈、一个只有在需要时才出现的信号。</p><a href="#" data-demo-action="完整观察已打开">READ THE FULL NOTE <i data-lucide="arrow-right"></i></a></div><aside><span>RELATED SIGNALS</span><p><b>02</b>颜色如何承担动作</p><p><b>03</b>形状与触觉记忆</p><p><b>04</b>留白并不等于沉默</p></aside></section>
          <div class="signal-ticker"><span>CLARITY / MOTION / OBJECT / SYSTEM / CLARITY / MOTION / OBJECT / SYSTEM</span></div>
        </main>
      </div>`;
  }

  function render() {
    const defaultShowcase = state.template.showcases[0].id;
    state.showcase = state.template.showcases.some((item) => item.id === state.showcase)
      ? state.showcase
      : defaultShowcase;

    document.body.dataset.template = state.template.slug;
    document.body.dataset.showcase = state.showcase;
    document.title = `${state.template.name} · ${state.showcase} · UIDevTpl`;

    if (state.template.slug === "quiet-grid") {
      previewRoot.innerHTML = state.showcase === "publication" ? quietPublication() : quietWorkspace();
    } else {
      previewRoot.innerHTML = state.showcase === "field-notes" ? signalFieldNotes() : signalLaunchRoom();
    }

    bindInteractions();
    refreshIcons();
  }

  function bindInteractions() {
    previewRoot.querySelectorAll("[data-demo-action]").forEach((control) => {
      control.addEventListener("click", (event) => {
        event.preventDefault();
        showToast(control.dataset.demoAction);
      });
    });

    previewRoot.querySelector("[data-open-task]")?.addEventListener("click", () => dialog.showModal());

    previewRoot.querySelectorAll(".qg-check").forEach((button) => {
      button.addEventListener("click", () => {
        const row = button.closest(".qg-task-row");
        row.classList.toggle("is-complete");
        button.setAttribute("aria-label", row.classList.contains("is-complete") ? "标记未完成" : "标记完成");
      });
    });

    previewRoot.querySelectorAll("[data-task-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.taskFilter;
        previewRoot.querySelectorAll("[data-task-filter]").forEach((tab) => tab.classList.toggle("is-active", tab === button));
        previewRoot.querySelectorAll("[data-task-status]").forEach((row) => {
          row.hidden = selected !== "all" && row.dataset.taskStatus !== selected;
        });
      });
    });

    const taskSearch = previewRoot.querySelector(".qg-command-search input");
    taskSearch?.addEventListener("input", () => {
      const query = taskSearch.value.trim().toLocaleLowerCase("zh-CN");
      previewRoot.querySelectorAll(".qg-task-row").forEach((row) => {
        row.hidden = query.length > 0 && !row.textContent.toLocaleLowerCase("zh-CN").includes(query);
      });
    });
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

  resetButton.addEventListener("click", () => {
    render();
    showToast("演示状态已重置");
  });
  document.querySelectorAll("[data-close-preview-dialog]").forEach((button) => button.addEventListener("click", closeDialog));
  document.querySelector("#create-task-confirm").addEventListener("click", () => {
    closeDialog();
    showToast("任务已创建");
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  root.addEventListener("message", (event) => {
    if (event.data?.type === "uidevtpl:reset") render();
  });

  render();
})(typeof globalThis !== "undefined" ? globalThis : window);
