(function initUIDevTplLib(root, factory) {
  "use strict";

  const value = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = value;
    return;
  }

  root.UIDevTplLib = value;
})(typeof globalThis !== "undefined" ? globalThis : this, function createLibrary() {
  "use strict";

  const DEFAULT_FILTERS = Object.freeze({
    query: "",
    framework: "all",
    mood: "all",
    sort: "recommended"
  });

  function normalizeSearch(value) {
    return String(value ?? "").trim().toLocaleLowerCase("zh-CN");
  }

  function searchableText(template) {
    return normalizeSearch(
      [
        template.id,
        template.name,
        template.englishName,
        template.summary,
        template.platform,
        template.framework.label,
        template.library.label,
        template.moodLabel,
        template.density,
        template.shape,
        template.contrast,
        ...template.tags
      ].join(" ")
    );
  }

  function filterTemplates(templates, filters) {
    const selected = { ...DEFAULT_FILTERS, ...filters };
    const query = normalizeSearch(selected.query);

    return templates.filter((template) => {
      const matchesQuery = query.length === 0 || searchableText(template).includes(query);
      const matchesFramework =
        selected.framework === "all" || template.framework.id === selected.framework;
      const matchesMood = selected.mood === "all" || template.mood === selected.mood;

      return matchesQuery && matchesFramework && matchesMood;
    });
  }

  function sortTemplates(templates, sort) {
    const sorted = [...templates];

    if (sort === "updated") {
      return sorted.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    }

    if (sort === "name") {
      return sorted.sort((left, right) => left.name.localeCompare(right.name, "zh-CN"));
    }

    return sorted.sort((left, right) => left.rank - right.rank);
  }

  function selectTemplates(templates, filters) {
    return sortTemplates(filterTemplates(templates, filters), filters.sort);
  }

  function getTemplateBySlug(templates, slug) {
    return templates.find((template) => template.slug === slug) ?? null;
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) {
      throw new TypeError("bytes must be a non-negative finite number");
    }

    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function buildMigrationInstruction(template, userRequest = "{{USER_REQUEST}}") {
    const normalizedRequest = String(userRequest).trim() || "{{USER_REQUEST}}";
    const expectedPath = `.uidevtpl/${template.id}/`;

    return [
      "UIDEVTPL_TEMPLATE_MIGRATION",
      "prototype_notice: 此任务来自交互原型，固定包地址尚未投入生产",
      "",
      `template: ${template.id}`,
      `version: ${template.version}`,
      `family: ${template.familyVersion}`,
      `artifact_url: ${template.artifact.url}`,
      `sha256: ${template.artifact.sha256}`,
      `expected_path: ${expectedPath}`,
      "",
      "请在当前用户项目中执行以下任务：",
      "",
      "1. 确认当前目录、项目规则、技术栈、包管理器和现有改动。",
      "2. 检查模板声明与当前项目是否兼容；不兼容时停止并报告。",
      "3. 下载固定模板包并验证 SHA-256；下载或校验失败时停止。",
      `4. 安全解压到 ${expectedPath}，保留完整参考源码。`,
      "5. 阅读 manifest.json、MIGRATION.md、源码、状态规则和参考图。",
      "6. 将所需 tokens、字体、组件、布局和页面骨架迁入项目现有源码目录。",
      "7. 运行时代码不要直接依赖 .uidevtpl，不要静默覆盖已有文件。",
      "8. 记录 migration.json、依赖变更、配置变更和源目标文件映射。",
      "9. 运行项目已有的格式化、静态分析、类型检查、测试和构建。",
      "10. 报告模板版本、迁移文件、验证结果、回退方式和剩余风险。",
      "",
      "业务需求：",
      normalizedRequest
    ].join("\n");
  }

  function filtersFromSearch(search) {
    const params = new URLSearchParams(search);
    return {
      query: params.get("q") ?? "",
      framework: params.get("framework") ?? DEFAULT_FILTERS.framework,
      mood: params.get("mood") ?? DEFAULT_FILTERS.mood,
      sort: params.get("sort") ?? DEFAULT_FILTERS.sort
    };
  }

  function filtersToSearch(filters) {
    const params = new URLSearchParams();
    if (filters.query) params.set("q", filters.query);
    if (filters.framework !== DEFAULT_FILTERS.framework) params.set("framework", filters.framework);
    if (filters.mood !== DEFAULT_FILTERS.mood) params.set("mood", filters.mood);
    if (filters.sort !== DEFAULT_FILTERS.sort) params.set("sort", filters.sort);
    return params.toString();
  }

  return Object.freeze({
    DEFAULT_FILTERS,
    buildMigrationInstruction,
    filterTemplates,
    filtersFromSearch,
    filtersToSearch,
    formatBytes,
    getTemplateBySlug,
    normalizeSearch,
    selectTemplates,
    sortTemplates
  });
});
