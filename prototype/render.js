(function initUIDevTplRender(root, factory) {
  "use strict";

  root.UIDevTplRender = factory(root.UIDevTplLib);
})(typeof globalThis !== "undefined" ? globalThis : this, function createRender(lib) {
  "use strict";

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function quietGridThumbnail(template) {
    return `
      <div class="template-thumbnail quiet-thumbnail" aria-hidden="true">
        <aside class="quiet-thumb-sidebar">
          <div class="quiet-thumb-logo"><span></span><span></span><span></span><span></span></div>
          <div class="quiet-thumb-nav is-active"></div>
          <div class="quiet-thumb-nav"></div>
          <div class="quiet-thumb-nav short"></div>
          <div class="quiet-thumb-avatar"></div>
        </aside>
        <div class="quiet-thumb-main">
          <div class="quiet-thumb-topbar">
            <span>ATELIER / AI</span>
            <div><span></span><span></span></div>
          </div>
          <div class="quiet-thumb-heading">
            <div><small>TUESDAY, AUG 10</small><strong>Ship the work that matters.</strong></div>
            <span class="quiet-thumb-button">New task</span>
          </div>
          <div class="quiet-thumb-grid">
            <div class="quiet-thumb-list">
              <div class="quiet-thumb-listhead"><span>Today</span><span>4 tasks</span></div>
              <div class="quiet-thumb-row"><span class="quiet-thumb-check"></span><span><b>Design migration flow</b><small>UIDevTpl / Product</small></span><em>High</em></div>
              <div class="quiet-thumb-row"><span class="quiet-thumb-check checked"></span><span><b>Review fixed package</b><small>Release / 1.0.0</small></span><em>Done</em></div>
              <div class="quiet-thumb-row"><span class="quiet-thumb-check"></span><span><b>Validate mobile states</b><small>Quality / Browser</small></span><em>Next</em></div>
            </div>
            <div class="quiet-thumb-photo">
              <img src="${escapeHtml(template.image)}" alt="" />
              <span>Workspace notes / 08</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  function signalCanvasThumbnail(template) {
    return `
      <div class="template-thumbnail signal-thumbnail" aria-hidden="true">
        <div class="signal-thumb-header">
          <strong>FORM / 02</strong>
          <span>PRODUCT SIGNALS</span>
          <span>MENU</span>
        </div>
        <div class="signal-thumb-body">
          <div class="signal-thumb-copy">
            <small>OBJECT STUDY 024</small>
            <strong>MAKE EVERY<br />SIGNAL COUNT.</strong>
            <span>Build with clarity. Launch with character.</span>
          </div>
          <div class="signal-thumb-image">
            <img src="${escapeHtml(template.image)}" alt="" />
            <span class="signal-block signal-block-red"></span>
            <span class="signal-block signal-block-blue"></span>
            <span class="signal-index">01 / 04</span>
          </div>
        </div>
        <div class="signal-thumb-footer">
          <span>DISCOVER THE SYSTEM</span>
          <span>SCROLL  ↓</span>
        </div>
      </div>`;
  }

  function renderTemplateCard(template) {
    const thumbnail = template.slug === "quiet-grid"
      ? quietGridThumbnail(template)
      : signalCanvasThumbnail(template);

    return `
      <article class="template-card" data-template-slug="${escapeHtml(template.slug)}">
        <button
          class="template-preview-button"
          type="button"
          data-open-template="${escapeHtml(template.slug)}"
          aria-label="查看 ${escapeHtml(template.name)} 模板"
        >
          ${thumbnail}
        </button>
        <div class="template-card-body">
          <div class="template-card-heading">
            <div>
              <p>${escapeHtml(template.englishName)} / ${escapeHtml(template.version)}</p>
              <h2>${escapeHtml(template.name)}</h2>
            </div>
            <span class="theme-chip"><span></span>${escapeHtml(template.theme)}</span>
          </div>
          <p class="template-card-summary">${escapeHtml(template.summary)}</p>
          <div class="template-tags">
            ${template.tags.slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="template-card-footer">
            <div class="tech-stack" aria-label="技术栈">
              <span>${escapeHtml(template.framework.label)}</span>
              <span aria-hidden="true">/</span>
              <span>${escapeHtml(template.library.label)}</span>
            </div>
            <button class="card-action" type="button" data-open-template="${escapeHtml(template.slug)}">
              查看模板
              <i data-lucide="arrow-up-right"></i>
            </button>
          </div>
        </div>
      </article>`;
  }

  function renderCompatibility(template) {
    const items = [
      ["平台", `${template.platform} / ${template.runtime}`],
      ["框架", `${template.framework.label} ${template.framework.range}`],
      ["组件库", `${template.library.label} ${template.library.range}`],
      ["构建", template.buildTools.join(" + ")],
      ["包管理器", template.packageManagers.join(" / ")]
    ];

    return items
      .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join("");
  }

  function renderShowcaseControl(template, selectedId) {
    return template.showcases
      .map((showcase) => `
        <button
          type="button"
          class="${showcase.id === selectedId ? "is-active" : ""}"
          data-showcase="${escapeHtml(showcase.id)}"
          aria-pressed="${showcase.id === selectedId}"
        >${escapeHtml(showcase.shortLabel)}</button>`)
      .join("");
  }

  function renderComponentGroups(template) {
    return template.componentGroups
      .map((group) => `
        <div class="component-group">
          <div class="component-group-heading">
            <span>${escapeHtml(group.label)}</span>
            <span>${group.items.length}</span>
          </div>
          <div class="component-tags">
            ${group.items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>`)
      .join("");
  }

  function renderSkeletons(template) {
    return template.skeletons
      .map((skeleton) => `
        <div class="skeleton-row">
          <span class="skeleton-icon"><i data-lucide="${escapeHtml(skeleton.icon)}"></i></span>
          <div><strong>${escapeHtml(skeleton.label)}</strong><p>${escapeHtml(skeleton.description)}</p></div>
          <i data-lucide="arrow-right" aria-hidden="true"></i>
        </div>`)
      .join("");
  }

  function renderPackageFacts(template) {
    const facts = [
      ["文件", template.artifact.file],
      ["大小", lib.formatBytes(template.artifact.sizeBytes)],
      ["家族版本", template.familyVersion],
      ["语言", template.language],
      ["SHA-256", `${template.artifact.sha256.slice(0, 12)}...${template.artifact.sha256.slice(-8)}`]
    ];

    return facts
      .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join("");
  }

  function labActions(template) {
    return `
      <div class="lab-section lab-theme-${escapeHtml(template.mood)}">
        <div class="lab-section-heading"><strong>Button</strong><span>Default / Hover / Disabled / Loading</span></div>
        <div class="lab-demo-row">
          <button class="lab-primary" type="button">主要操作</button>
          <button class="lab-secondary" type="button">次要操作</button>
          <button class="lab-quiet" type="button">轻量操作</button>
          <button class="lab-primary" type="button" disabled>不可用</button>
          <button class="lab-primary is-loading" type="button"><span></span>处理中</button>
        </div>
      </div>
      <div class="lab-section lab-theme-${escapeHtml(template.mood)}">
        <div class="lab-section-heading"><strong>Badge & status</strong><span>Semantic roles</span></div>
        <div class="lab-demo-row">
          <span class="lab-badge">Neutral</span>
          <span class="lab-badge is-success">Success</span>
          <span class="lab-badge is-warning">Warning</span>
          <span class="lab-badge is-danger">Error</span>
        </div>
      </div>`;
  }

  function labForms(template) {
    return `
      <div class="lab-form-grid lab-theme-${escapeHtml(template.mood)}">
        <label class="lab-field"><span>项目名称</span><input value="Knowledge Atlas" /></label>
        <label class="lab-field"><span>运行环境</span><select><option>Browser</option><option>Electron</option></select></label>
        <label class="lab-field is-invalid"><span>模板版本</span><input value="latest" aria-invalid="true" /><small>请输入固定语义版本</small></label>
        <label class="lab-switch"><input type="checkbox" checked /><span></span><b>迁移后运行门禁</b></label>
      </div>`;
  }

  function labStates(template) {
    return `
      <div class="lab-state-grid lab-theme-${escapeHtml(template.mood)}">
        <div class="lab-state"><i data-lucide="inbox"></i><strong>暂无任务</strong><p>创建第一项迁移任务后会显示在这里。</p><button class="lab-secondary" type="button">创建任务</button></div>
        <div class="lab-state is-error"><i data-lucide="triangle-alert"></i><strong>校验失败</strong><p>模板包的 SHA-256 与发布记录不一致。</p><button class="lab-secondary" type="button">查看详情</button></div>
        <div class="lab-state is-loading"><span class="lab-skeleton"></span><span class="lab-skeleton short"></span><span class="lab-skeleton"></span></div>
      </div>`;
  }

  function renderComponentLab(template, tab) {
    if (tab === "forms") return labForms(template);
    if (tab === "states") return labStates(template);
    return labActions(template);
  }

  return Object.freeze({
    renderCompatibility,
    renderComponentGroups,
    renderComponentLab,
    renderPackageFacts,
    renderShowcaseControl,
    renderSkeletons,
    renderTemplateCard
  });
});
