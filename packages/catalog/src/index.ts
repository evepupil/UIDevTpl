import type { TemplateManifest } from "@uidevtpl/schema";

export type CatalogLocale = "zh" | "en";
export type CatalogSort = "popular" | "newest" | "name";

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface CatalogCategory {
  id: string;
  icon: string;
  name: LocalizedText;
  description: LocalizedText;
  representative: string[];
}

export interface CatalogPublisher {
  id: string;
  name: LocalizedText;
  initials: string;
  kind: "official" | "partner" | "community";
  tone: "plain" | "jade" | "coral";
}

export interface CatalogShowcase {
  id: string;
  label: LocalizedText;
  shortLabel: LocalizedText;
}

export interface CatalogComponentGroup {
  label: LocalizedText;
  items: string[];
}

export interface CatalogSkeleton {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  icon: string;
}

export interface CatalogEntry {
  id: string;
  templateId: string;
  slug: string;
  name: LocalizedText;
  englishName: string;
  version: string;
  family: string;
  familyVersion: string;
  summary: LocalizedText;
  platform: "web";
  runtime: "browser";
  framework: { id: string; label: string; range: string };
  library: { id: string; label: string; range: string };
  buildTools: string[];
  packageManagers: string[];
  language: string;
  theme: "Light";
  mood: string;
  moodLabel: LocalizedText;
  density: LocalizedText;
  shape: LocalizedText;
  contrast: LocalizedText;
  updatedAt: string;
  image: string;
  editorialImage: string;
  tags: LocalizedText[];
  categories: string[];
  publisher: CatalogPublisher;
  metrics: { views: number; likes: number };
  featured: boolean;
  showcases: CatalogShowcase[];
  componentGroups: CatalogComponentGroup[];
  skeletons: CatalogSkeleton[];
  artifact: TemplateManifest["artifact"] & { url: string; sizeBytes: number };
  availability: TemplateManifest["availability"];
  sourceDirectory: string;
  previewPath: string;
}

export interface CatalogFilters {
  query?: string;
  category?: string;
  framework?: string;
  library?: string;
  sort?: CatalogSort;
}

export const catalogCategories: readonly CatalogCategory[] = [
  {
    id: "apps",
    icon: "blocks",
    name: { zh: "应用与游戏", en: "Apps & Games" },
    description: { zh: "工作流、创作工具与互动体验", en: "Workflows, creative tools, and interactive products" },
    representative: ["workspace", "game", "dark", "canvas"]
  },
  {
    id: "landing",
    icon: "panels-top-left",
    name: { zh: "营销与落地页", en: "Landing Pages" },
    description: { zh: "产品发布、品牌表达与转化页面", en: "Launches, brand stories, and conversion pages" },
    representative: ["launch", "editorial", "dark", "workspace"]
  },
  {
    id: "dashboards",
    icon: "chart-no-axes-combined",
    name: { zh: "数据看板", en: "Dashboards" },
    description: { zh: "运营、分析与高密度信息界面", en: "Operations, analytics, and dense information" },
    representative: ["metric", "workspace", "dark", "game"]
  },
  {
    id: "components",
    icon: "component",
    name: { zh: "组件与交互", en: "Components" },
    description: { zh: "表单、状态与可复用交互组合", en: "Forms, states, and reusable patterns" },
    representative: ["canvas", "auth", "dark", "workspace"]
  },
  {
    id: "auth",
    icon: "log-in",
    name: { zh: "登录与注册", en: "Login & Sign Up" },
    description: { zh: "登录、注册与账号恢复流程", en: "Sign in, registration, and recovery flows" },
    representative: ["auth", "auth", "auth", "launch"]
  },
  {
    id: "content",
    icon: "newspaper",
    name: { zh: "内容与作品集", en: "Content & Portfolios" },
    description: { zh: "博客、知识内容与个人作品展示", en: "Editorial content, knowledge, and portfolios" },
    representative: ["editorial", "dark", "workspace", "canvas"]
  }
];

const quietGridManifest = {
  file: "uidevtpl-web-react-heroui-quiet-grid-1.0.0.zip",
  url: "https://uidevtpl.example/artifacts/web/react/heroui/quiet-grid/1.0.0/template.zip",
  sizeBytes: 1843200,
  sha256: "7d3f50a97439237c6b7bd6245af5079b0e14eb96ce72d0e1e578e8fb8d6f3a21"
};

const signalCanvasManifest = {
  file: "uidevtpl-web-react-heroui-signal-canvas-1.0.0.zip",
  url: "https://uidevtpl.example/artifacts/web/react/heroui/signal-canvas/1.0.0/template.zip",
  sizeBytes: 2031616,
  sha256: "c5cc7b7abec5a527c1604641c238221883605470676b1014e23055a8ac7892d4"
};

export const catalogEntries: readonly CatalogEntry[] = [
  {
    id: "quiet-workspace",
    templateId: "web/react/heroui/quiet-grid",
    slug: "quiet-grid",
    name: { zh: "静默网格", en: "Quiet Grid" },
    englishName: "Quiet Grid",
    version: "1.0.0",
    family: "quiet-grid",
    familyVersion: "quiet-grid@1.0.0",
    summary: {
      zh: "安静、精确、具有编辑感的通用界面系统，适合信息密度较高的工作产品与内容页面。",
      en: "A calm, precise interface system for dense work products and editorial content."
    },
    platform: "web",
    runtime: "browser",
    framework: { id: "react", label: "React", range: "19.x" },
    library: { id: "heroui", label: "HeroUI", range: "3.x" },
    buildTools: ["Vite", "Next.js"],
    packageManagers: ["npm", "pnpm"],
    language: "TypeScript strict",
    theme: "Light",
    mood: "calm",
    moodLabel: { zh: "安静克制", en: "Calm and precise" },
    density: { zh: "舒适", en: "Comfortable" },
    shape: { zh: "轻微圆角", en: "Soft corners" },
    contrast: { zh: "平衡", en: "Balanced" },
    updatedAt: "2026-08-10",
    image: "/assets/quiet-grid-workspace.jpg",
    editorialImage: "/assets/quiet-grid-editorial.jpg",
    tags: [
      { zh: "编辑感", en: "Editorial" },
      { zh: "克制", en: "Restrained" },
      { zh: "工具界面", en: "Product UI" },
      { zh: "知识内容", en: "Knowledge" }
    ],
    categories: ["apps", "dashboards", "components", "content"],
    publisher: {
      id: "studio",
      name: { zh: "UIDevTpl 团队", en: "UIDevTpl Studio" },
      initials: "UI",
      kind: "official",
      tone: "plain"
    },
    metrics: { views: 12800, likes: 936 },
    featured: true,
    showcases: [
      { id: "workspace", label: { zh: "AI 项目工作台", en: "AI Project Workspace" }, shortLabel: { zh: "AI 工作台", en: "Workspace" } },
      { id: "publication", label: { zh: "知识出版", en: "Knowledge Publication" }, shortLabel: { zh: "知识出版", en: "Publication" } }
    ],
    componentGroups: [
      { label: { zh: "操作与展示", en: "Actions & display" }, items: ["Button", "IconButton", "Link", "Badge", "Avatar", "Divider"] },
      { label: { zh: "表单输入", en: "Form inputs" }, items: ["Input", "Textarea", "Select", "Checkbox", "Radio", "Switch"] },
      { label: { zh: "导航与浮层", en: "Navigation & overlays" }, items: ["Tabs", "Accordion", "Pagination", "Tooltip", "Dropdown", "Popover", "Modal", "Drawer", "Toast"] },
      { label: { zh: "数据与状态", en: "Data & states" }, items: ["DataList", "SearchBar", "FilterToolbar", "EmptyState", "ErrorState", "Skeleton"] }
    ],
    skeletons: [
      { id: "marketing", label: { zh: "营销页", en: "Marketing" }, description: { zh: "品牌、产品或服务的公开展示页面", en: "A public page for a product, service, or brand" }, icon: "panels-top-left" },
      { id: "application", label: { zh: "应用界面", en: "Application" }, description: { zh: "工作台、管理与高频操作页面", en: "A workspace for operations and repeated actions" }, icon: "panel-left" },
      { id: "content", label: { zh: "内容页", en: "Content" }, description: { zh: "文章、知识库与深度阅读页面", en: "A page for editorial content and deep reading" }, icon: "newspaper" }
    ],
    artifact: quietGridManifest,
    availability: "draft",
    sourceDirectory: ".uidevtpl/web/react/heroui/quiet-grid",
    previewPath: "/preview/web/react/heroui/quiet-grid/1.0.0/workspace"
  },
  {
    id: "signal-launch",
    templateId: "web/react/heroui/signal-canvas",
    slug: "signal-canvas",
    name: { zh: "信号画布", en: "Signal Canvas" },
    englishName: "Signal Canvas",
    version: "1.0.0",
    family: "signal-canvas",
    familyVersion: "signal-canvas@1.0.0",
    summary: {
      zh: "鲜明、直接、带有海报构图的界面系统，用清楚的色块和强对比层级表达产品性格。",
      en: "A direct, poster-like interface system that uses clear blocks and bold contrast."
    },
    platform: "web",
    runtime: "browser",
    framework: { id: "react", label: "React", range: "19.x" },
    library: { id: "heroui", label: "HeroUI", range: "3.x" },
    buildTools: ["Vite", "Next.js"],
    packageManagers: ["npm", "pnpm"],
    language: "TypeScript strict",
    theme: "Light",
    mood: "expressive",
    moodLabel: { zh: "鲜明表达", en: "Expressive" },
    density: { zh: "宽松", en: "Open" },
    shape: { zh: "硬朗", en: "Hard-edged" },
    contrast: { zh: "高", en: "High" },
    updatedAt: "2026-08-08",
    image: "/assets/signal-canvas-product.jpg",
    editorialImage: "/assets/signal-canvas-product.jpg",
    tags: [
      { zh: "高对比", en: "High contrast" },
      { zh: "海报感", en: "Poster-like" },
      { zh: "产品展示", en: "Product launch" },
      { zh: "品牌表达", en: "Brand voice" }
    ],
    categories: ["landing", "components", "content"],
    publisher: {
      id: "lin",
      name: { zh: "林澄", en: "Lin Chen" },
      initials: "LC",
      kind: "partner",
      tone: "jade"
    },
    metrics: { views: 20400, likes: 1900 },
    featured: true,
    showcases: [
      { id: "launch-room", label: { zh: "产品发布室", en: "Product Launch Room" }, shortLabel: { zh: "发布室", en: "Launch room" } },
      { id: "field-notes", label: { zh: "创意观察", en: "Creative Field Notes" }, shortLabel: { zh: "创意观察", en: "Field notes" } }
    ],
    componentGroups: [
      { label: { zh: "操作与展示", en: "Actions & display" }, items: ["Button", "IconButton", "Link", "Badge", "Avatar", "Divider"] },
      { label: { zh: "表单输入", en: "Form inputs" }, items: ["Input", "Textarea", "Select", "Checkbox", "Radio", "Switch"] },
      { label: { zh: "导航与浮层", en: "Navigation & overlays" }, items: ["Tabs", "Accordion", "Pagination", "Tooltip", "Dropdown", "Popover", "Modal", "Drawer", "Toast"] },
      { label: { zh: "数据与状态", en: "Data & states" }, items: ["Table", "SearchBar", "FilterToolbar", "EmptyState", "ErrorState", "Skeleton"] }
    ],
    skeletons: [
      { id: "marketing", label: { zh: "营销页", en: "Marketing" }, description: { zh: "强调产品主体与明确行动的发布页面", en: "A launch page with a clear product and action" }, icon: "panels-top-left" },
      { id: "application", label: { zh: "应用界面", en: "Application" }, description: { zh: "具有强区分度的创作和运营工作台", en: "A distinctive workspace for creation and operations" }, icon: "panel-left" },
      { id: "content", label: { zh: "内容页", en: "Content" }, description: { zh: "杂志化标题与模块化内容阅读页面", en: "A magazine-like reading page with modular content" }, icon: "newspaper" }
    ],
    artifact: signalCanvasManifest,
    availability: "draft",
    sourceDirectory: ".uidevtpl/web/react/heroui/signal-canvas",
    previewPath: "/preview/web/react/heroui/signal-canvas/1.0.0/launch-room"
  }
];

const visibleAvailabilities = new Set(["draft", "review", "published"]);

function text(value: LocalizedText, locale: CatalogLocale): string {
  return value[locale];
}

function normalize(value: string | undefined): string {
  return value?.trim().toLocaleLowerCase() ?? "";
}

export function selectCatalogEntries(entries: readonly CatalogEntry[], filters: CatalogFilters = {}): CatalogEntry[] {
  const query = normalize(filters.query);
  const category = normalize(filters.category);
  const framework = normalize(filters.framework);
  const library = normalize(filters.library);
  const sort = filters.sort ?? "popular";

  return entries
    .filter((entry) => visibleAvailabilities.has(entry.availability))
    .filter((entry) => !category || entry.categories.includes(category))
    .filter((entry) => !framework || entry.framework.id === framework)
    .filter((entry) => !library || entry.library.id === library)
    .filter((entry) => {
      if (!query) return true;
      const searchable = [
        entry.name.zh,
        entry.name.en,
        entry.englishName,
        entry.summary.zh,
        entry.summary.en,
        entry.family,
        entry.framework.label,
        entry.library.label,
        ...entry.categories,
        ...entry.tags.flatMap((tag) => [tag.zh, tag.en])
      ].join(" ").toLocaleLowerCase();
      return searchable.includes(query);
    })
    .sort((left, right) => {
      if (sort === "newest") return right.updatedAt.localeCompare(left.updatedAt);
      if (sort === "name") return left.englishName.localeCompare(right.englishName);
      return right.metrics.likes - left.metrics.likes;
    });
}

export function getCategoryBySlug(slug: string | undefined): CatalogCategory | undefined {
  return catalogCategories.find((category) => category.id === slug);
}

export function getCatalogEntryBySlug(slug: string | undefined): CatalogEntry | undefined {
  return catalogEntries.find((entry) => entry.slug === slug && visibleAvailabilities.has(entry.availability));
}

export function getCatalogEntryByRoute(route: {
  platform?: string;
  framework?: string;
  library?: string;
  slug?: string;
  version?: string;
}): CatalogEntry | undefined {
  return catalogEntries.find((entry) =>
    entry.platform === route.platform &&
    entry.framework.id === route.framework &&
    entry.library.id === route.library &&
    entry.slug === route.slug &&
    (!route.version || entry.version === route.version)
  );
}

export function buildTemplatePath(entry: Pick<CatalogEntry, "platform" | "framework" | "library" | "slug" | "version">, fixedVersion = false): string {
  const base = `/templates/${entry.platform}/${entry.framework.id}/${entry.library.id}/${entry.slug}`;
  return fixedVersion ? `${base}/${entry.version}` : base;
}

export function buildPreviewPath(entry: Pick<CatalogEntry, "platform" | "framework" | "library" | "slug" | "version" | "showcases">, showcaseId = entry.showcases[0]?.id): string {
  return `/preview/${entry.platform}/${entry.framework.id}/${entry.library.id}/${entry.slug}/${entry.version}/${showcaseId}`;
}

export function formatMetric(value: number, locale: CatalogLocale): string {
  if (value < 1000) return String(value);
  const formatted = (value / 1000).toFixed(value < 10000 ? 1 : 0).replace(".0", "");
  return locale === "zh" ? `${formatted}K` : `${formatted}K`;
}

export function formatBytes(value: number): string {
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export function buildMigrationInstruction(entry: CatalogEntry, locale: CatalogLocale = "zh", userRequest = "{{USER_REQUEST}}"): string {
  const target = entry.sourceDirectory;
  if (locale === "en") {
    return [
      "You are migrating a fixed UIDevTpl template into the current user project.",
      "",
      `Template ID: ${entry.templateId}`,
      `Implementation version: ${entry.version}`,
      `Family version: ${entry.familyVersion}`,
      `Artifact URL: ${entry.artifact.url}`,
      `SHA-256: ${entry.artifact.sha256}`,
      `Reference directory: ${target}`,
      `Compatibility: ${entry.framework.label} ${entry.framework.range}, ${entry.library.label} ${entry.library.range}, Node 24.x`,
      "",
      "Run these steps in order:",
      "1. Confirm the current project directory, its rules, package manager, and uncommitted changes.",
      "2. Download the fixed artifact and verify its SHA-256. Stop if verification fails.",
      `3. Extract the original template into ${target} without overwriting existing user files.`,
      "4. Read manifest.json, MIGRATION.md, the source, state matrix, and reference assets.",
      "5. Migrate only the required tokens, fonts, components, layouts, and page skeleton into the existing project.",
      "6. Record source files, target files, dependency changes, and configuration changes in migration.json.",
      "7. Run the target project's formatting, typecheck, tests, and build.",
      "",
      `Business request: ${userRequest}`
    ].join("\n");
  }

  return [
    "你正在把一个固定版本的 UIDevTpl 模板迁移到当前用户项目。",
    "",
    `模板 ID：${entry.templateId}`,
    `实现版本：${entry.version}`,
    `家族版本：${entry.familyVersion}`,
    `模板包地址：${entry.artifact.url}`,
    `SHA-256：${entry.artifact.sha256}`,
    `参考目录：${target}`,
    `兼容范围：${entry.framework.label} ${entry.framework.range}、${entry.library.label} ${entry.library.range}、Node 24.x`,
    "",
    "请严格按以下顺序执行：",
    "1. 确认当前项目目录、开发规则、包管理器和未提交改动。",
    "2. 下载固定版本模板包并校验 SHA-256，校验失败时停止。",
    `3. 将原始模板安全解压到 ${target}，不得覆盖用户已有文件。`,
    "4. 阅读 manifest.json、MIGRATION.md、模板源码、状态矩阵和参考资产。",
    "5. 只把需要的 tokens、字体、组件、布局和页面骨架迁移到现有项目。",
    "6. 在 migration.json 中记录源文件、目标文件、依赖变更和配置变更。",
    "7. 运行目标项目已有的格式化、类型检查、测试和构建。",
    "",
    `业务需求：${userRequest}`
  ].join("\n");
}

export function localized(value: LocalizedText, locale: CatalogLocale): string {
  return text(value, locale);
}
