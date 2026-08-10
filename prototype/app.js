(function runUIDevTplPrototype(root) {
  "use strict";

  const { templates } = root.UIDevTplData;
  const lib = root.UIDevTplLib;
  const render = root.UIDevTplRender;

  const elements = {
    libraryView: document.querySelector("#library-view"),
    detailView: document.querySelector("#detail-view"),
    templateGrid: document.querySelector("#template-grid"),
    emptyState: document.querySelector("#empty-state"),
    resultCount: document.querySelector("#result-count"),
    search: document.querySelector("#template-search"),
    sort: document.querySelector("#sort-select"),
    filterPanel: document.querySelector("#filter-panel"),
    detailTitle: document.querySelector("#detail-title"),
    detailId: document.querySelector("#detail-id"),
    detailVersion: document.querySelector("#detail-version"),
    detailSummary: document.querySelector("#detail-summary"),
    compatibilityStrip: document.querySelector("#compatibility-strip"),
    showcaseControl: document.querySelector("#showcase-control"),
    viewportControl: document.querySelector("#viewport-control"),
    previewStage: document.querySelector("#preview-stage"),
    previewFrame: document.querySelector("#preview-frame"),
    previewSizeLabel: document.querySelector("#preview-size-label"),
    componentCount: document.querySelector("#component-count"),
    componentList: document.querySelector("#component-list"),
    skeletonList: document.querySelector("#skeleton-list"),
    packageFacts: document.querySelector("#package-facts"),
    componentLabDialog: document.querySelector("#component-lab-dialog"),
    migrationDialog: document.querySelector("#migration-dialog"),
    guideDialog: document.querySelector("#guide-dialog"),
    migrationText: document.querySelector("#migration-text"),
    labCanvas: document.querySelector("#lab-canvas"),
    builderTemplateSelect: document.querySelector("#builder-template-select"),
    builderVersion: document.querySelector("#builder-version"),
    builderRequest: document.querySelector("#builder-request"),
    toast: document.querySelector("#toast"),
    toastMessage: document.querySelector("#toast-message")
  };

  const state = {
    filters: lib.filtersFromSearch(root.location.search),
    selectedTemplate: null,
    showcase: null,
    viewport: "desktop",
    labTab: "actions",
    toastTimer: null
  };

  const viewportLabels = {
    desktop: "1440 x 900",
    tablet: "768 x 1024",
    mobile: "360 x 800",
    fluid: "自适应"
  };

  function refreshIcons() {
    if (root.lucide && typeof root.lucide.createIcons === "function") {
      root.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
    }
  }

  function showToast(message) {
    root.clearTimeout(state.toastTimer);
    elements.toastMessage.textContent = message;
    elements.toast.classList.add("is-visible");
    state.toastTimer = root.setTimeout(() => elements.toast.classList.remove("is-visible"), 2600);
  }

  function syncFilterControls() {
    elements.search.value = state.filters.query;
    elements.sort.value = state.filters.sort;

    for (const name of ["framework", "mood"]) {
      const value = state.filters[name];
      const input = elements.filterPanel.querySelector(`input[name="${name}"][value="${value}"]`);
      if (input) input.checked = true;
    }
  }

  function syncLibraryUrl(replace = true) {
    const search = lib.filtersToSearch(state.filters);
    const nextUrl = `${root.location.pathname}${search ? `?${search}` : ""}`;
    root.history[replace ? "replaceState" : "pushState"]({ view: "library" }, "", nextUrl);
  }

  function renderLibrary() {
    const selected = lib.selectTemplates(templates, state.filters);
    elements.templateGrid.innerHTML = selected.map(render.renderTemplateCard).join("");
    elements.resultCount.textContent = String(selected.length);
    elements.templateGrid.hidden = selected.length === 0;
    elements.emptyState.hidden = selected.length !== 0;
    syncFilterControls();
    refreshIcons();
  }

  function updateFilters(next) {
    state.filters = { ...state.filters, ...next };
    renderLibrary();
    syncLibraryUrl(true);
  }

  function clearFilters() {
    state.filters = { ...lib.DEFAULT_FILTERS };
    renderLibrary();
    syncLibraryUrl(true);
    elements.search.focus();
  }

  function previewUrl(template, showcase) {
    const params = new URLSearchParams({
      template: template.slug,
      showcase,
      embed: "1"
    });
    return `./preview.html?${params.toString()}`;
  }

  function syncPreview() {
    if (!state.selectedTemplate || !state.showcase) return;

    const nextSource = previewUrl(state.selectedTemplate, state.showcase);
    const currentSource = elements.previewFrame.getAttribute("src");
    if (currentSource !== nextSource) {
      elements.previewFrame.setAttribute("src", nextSource);
    }

    elements.previewStage.className = `preview-stage viewport-${state.viewport}`;
    elements.previewSizeLabel.textContent = viewportLabels[state.viewport];

    elements.viewportControl.querySelectorAll("[data-viewport]").forEach((button) => {
      const active = button.dataset.viewport === state.viewport;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderDetail(template) {
    state.selectedTemplate = template;
    if (!template.showcases.some((showcase) => showcase.id === state.showcase)) {
      state.showcase = template.showcases[0].id;
    }

    elements.detailTitle.textContent = template.name;
    elements.detailId.textContent = template.id;
    elements.detailVersion.textContent = `v${template.version}`;
    elements.detailSummary.textContent = template.summary;
    elements.compatibilityStrip.innerHTML = render.renderCompatibility(template);
    elements.showcaseControl.innerHTML = render.renderShowcaseControl(template, state.showcase);
    elements.componentList.innerHTML = render.renderComponentGroups(template);
    elements.skeletonList.innerHTML = render.renderSkeletons(template);
    elements.packageFacts.innerHTML = render.renderPackageFacts(template);
    elements.componentCount.textContent = `${template.componentGroups.reduce((sum, group) => sum + group.items.length, 0)} 项能力`;
    elements.labCanvas.innerHTML = render.renderComponentLab(template, state.labTab);
    syncPreview();
    refreshIcons();
  }

  function detailUrl(template) {
    const params = new URLSearchParams({
      template: template.slug,
      showcase: state.showcase,
      viewport: state.viewport
    });
    return `${root.location.pathname}?${params.toString()}`;
  }

  function openTemplate(slug, options = {}) {
    const template = lib.getTemplateBySlug(templates, slug);
    if (!template) return;

    state.showcase = options.showcase ?? template.showcases[0].id;
    state.viewport = options.viewport ?? "desktop";
    renderDetail(template);
    elements.libraryView.hidden = true;
    elements.detailView.hidden = false;
    document.body.classList.remove("filters-open");

    if (options.updateHistory !== false) {
      root.history.pushState({ view: "detail", template: slug }, "", detailUrl(template));
    }

    root.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
    elements.detailTitle.focus({ preventScroll: true });
  }

  function showLibrary(options = {}) {
    state.selectedTemplate = null;
    elements.detailView.hidden = true;
    elements.libraryView.hidden = false;
    if (options.updateHistory !== false) syncLibraryUrl(false);
    root.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
  }

  function selectShowcase(showcase) {
    if (!state.selectedTemplate) return;
    state.showcase = showcase;
    elements.showcaseControl.innerHTML = render.renderShowcaseControl(state.selectedTemplate, showcase);
    syncPreview();
    root.history.replaceState({ view: "detail" }, "", detailUrl(state.selectedTemplate));
  }

  function selectViewport(viewport) {
    if (!viewportLabels[viewport]) return;
    state.viewport = viewport;
    syncPreview();
    if (state.selectedTemplate) {
      root.history.replaceState({ view: "detail" }, "", detailUrl(state.selectedTemplate));
    }
  }

  async function copyText(text, successMessage, fallbackToDialog = false) {
    try {
      if (!root.navigator.clipboard) throw new Error("Clipboard API unavailable");
      await root.navigator.clipboard.writeText(text);
      showToast(successMessage);
      return true;
    } catch (_error) {
      if (fallbackToDialog) {
        elements.migrationText.value = text;
        elements.migrationDialog.showModal();
        elements.migrationText.focus();
        elements.migrationText.select();
      } else {
        showToast("浏览器未开放剪贴板权限");
      }
      return false;
    }
  }

  function copyMigration() {
    if (!state.selectedTemplate) return;
    const instruction = lib.buildMigrationInstruction(state.selectedTemplate);
    void copyText(
      instruction,
      `已复制 ${state.selectedTemplate.id}@${state.selectedTemplate.version}`,
      true
    );
  }

  function selectedBuilderTemplate() {
    return lib.getTemplateBySlug(templates, elements.builderTemplateSelect.value) ?? templates[0];
  }

  function openMigrationBuilder() {
    const template = state.selectedTemplate ?? templates[0];
    elements.builderTemplateSelect.value = template.slug;
    elements.builderVersion.value = template.version;
    elements.builderRequest.value = "";
    elements.guideDialog.showModal();
  }

  function copyBuilderMigration() {
    const template = selectedBuilderTemplate();
    const instruction = lib.buildMigrationInstruction(template, elements.builderRequest.value);
    closeDialog(elements.guideDialog);
    void copyText(instruction, `已复制 ${template.id}@${template.version}`, true);
  }

  function openStandalonePreview() {
    if (!state.selectedTemplate) return;
    const url = previewUrl(state.selectedTemplate, state.showcase).replace("&embed=1", "");
    root.open(url, "_blank", "noopener,noreferrer");
  }

  function closeDialog(dialog) {
    if (dialog && dialog.open) dialog.close();
  }

  function restoreFromUrl() {
    const params = new URLSearchParams(root.location.search);
    const slug = params.get("template");
    if (slug) {
      openTemplate(slug, {
        showcase: params.get("showcase") ?? undefined,
        viewport: params.get("viewport") ?? "desktop",
        updateHistory: false,
        instant: true
      });
      return;
    }

    state.filters = lib.filtersFromSearch(root.location.search);
    renderLibrary();
    showLibrary({ updateHistory: false, instant: true });
  }

  elements.templateGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-template]");
    if (button) openTemplate(button.dataset.openTemplate);
  });

  elements.search.addEventListener("input", (event) => updateFilters({ query: event.target.value }));
  elements.sort.addEventListener("change", (event) => updateFilters({ sort: event.target.value }));
  elements.filterPanel.addEventListener("change", (event) => {
    if (event.target.name === "framework" || event.target.name === "mood") {
      updateFilters({ [event.target.name]: event.target.value });
      document.body.classList.remove("filters-open");
    }
  });

  document.querySelector("#clear-filters-button").addEventListener("click", clearFilters);
  document.querySelector("#empty-clear-button").addEventListener("click", clearFilters);
  document.querySelector("#header-search-button").addEventListener("click", () => elements.search.focus());
  document.querySelector("#back-to-library-button").addEventListener("click", () => showLibrary());
  document.querySelector("#open-filter-button").addEventListener("click", () => document.body.classList.add("filters-open"));
  document.querySelector("#close-filter-button").addEventListener("click", () => document.body.classList.remove("filters-open"));
  document.querySelector("#filter-backdrop").addEventListener("click", () => document.body.classList.remove("filters-open"));
  document.querySelector("#copy-migration-button").addEventListener("click", copyMigration);
  document.querySelector("#open-preview-button").addEventListener("click", openStandalonePreview);
  document.querySelector("#use-with-ai-button").addEventListener("click", openMigrationBuilder);
  elements.builderTemplateSelect.addEventListener("change", () => {
    elements.builderVersion.value = selectedBuilderTemplate().version;
  });
  document.querySelector("#builder-copy-button").addEventListener("click", copyBuilderMigration);
  document.querySelector("#open-component-lab-button").addEventListener("click", () => {
    if (!state.selectedTemplate) return;
    elements.labCanvas.innerHTML = render.renderComponentLab(state.selectedTemplate, state.labTab);
    elements.componentLabDialog.showModal();
    refreshIcons();
  });
  document.querySelector("#reset-preview-button").addEventListener("click", () => {
    elements.previewFrame.contentWindow?.postMessage({ type: "uidevtpl:reset" }, "*");
    showToast("演示状态已重置");
  });
  document.querySelector("#copy-checksum-button").addEventListener("click", () => {
    if (state.selectedTemplate) {
      void copyText(state.selectedTemplate.artifact.sha256, "SHA-256 已复制");
    }
  });

  elements.showcaseControl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-showcase]");
    if (button) selectShowcase(button.dataset.showcase);
  });

  elements.viewportControl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-viewport]");
    if (button) selectViewport(button.dataset.viewport);
  });

  document.querySelector(".lab-toolbar").addEventListener("click", (event) => {
    const button = event.target.closest("[data-lab-tab]");
    if (!button || !state.selectedTemplate) return;
    state.labTab = button.dataset.labTab;
    document.querySelectorAll("[data-lab-tab]").forEach((tab) => {
      tab.classList.toggle("is-active", tab === button);
    });
    elements.labCanvas.innerHTML = render.renderComponentLab(state.selectedTemplate, state.labTab);
    refreshIcons();
  });

  document.querySelector("#manual-copy-button").addEventListener("click", () => {
    elements.migrationText.focus();
    elements.migrationText.select();
    const copied = document.execCommand("copy");
    if (copied) {
      closeDialog(elements.migrationDialog);
      showToast("迁移指令已复制");
    }
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.closest("dialog")));
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "k") {
      event.preventDefault();
      if (elements.libraryView.hidden) showLibrary();
      elements.search.focus();
    }
    if (event.key === "Escape") document.body.classList.remove("filters-open");
  });

  root.addEventListener("popstate", restoreFromUrl);

  renderLibrary();
  restoreFromUrl();
  refreshIcons();
})(typeof globalThis !== "undefined" ? globalThis : window);
