(function initUIDevTplData(root, factory) {
  "use strict";

  const value = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = value;
    return;
  }

  root.UIDevTplData = value;
})(typeof globalThis !== "undefined" ? globalThis : this, function createData() {
  "use strict";

  const templates = [
    {
      rank: 1,
      slug: "quiet-grid",
      id: "web/react/heroui/quiet-grid",
      name: "静默网格",
      englishName: "Quiet Grid",
      familyVersion: "quiet-grid@1.0.0",
      version: "1.0.0",
      summary: "安静、精确、具有编辑感的通用界面系统，适合信息密度较高的工作产品与内容页面。",
      platform: "Web",
      runtime: "Browser",
      framework: { id: "react", label: "React", range: "19.x" },
      library: { id: "heroui", label: "HeroUI", range: "2.x" },
      buildTools: ["Vite", "Next.js"],
      packageManagers: ["npm", "pnpm"],
      language: "TypeScript strict",
      theme: "Light",
      mood: "calm",
      moodLabel: "安静克制",
      density: "舒适",
      shape: "轻微圆角",
      contrast: "平衡",
      updatedAt: "2026-08-10",
      image: "./assets/quiet-grid-workspace.jpg",
      editorialImage: "./assets/quiet-grid-editorial.jpg",
      tags: ["编辑感", "克制", "工具界面", "知识内容"],
      showcases: [
        { id: "workspace", label: "AI 项目工作台", shortLabel: "AI 工作台" },
        { id: "publication", label: "知识出版", shortLabel: "知识出版" }
      ],
      componentGroups: [
        {
          label: "操作与展示",
          items: ["Button", "IconButton", "Link", "Badge", "Avatar", "Divider"]
        },
        {
          label: "表单输入",
          items: ["Input", "Textarea", "Select", "Checkbox", "Radio", "Switch"]
        },
        {
          label: "导航与浮层",
          items: ["Tabs", "Accordion", "Pagination", "Tooltip", "Dropdown", "Popover", "Modal", "Drawer", "Toast"]
        },
        {
          label: "数据与状态",
          items: ["DataList", "SearchBar", "FilterToolbar", "EmptyState", "ErrorState", "Skeleton"]
        }
      ],
      skeletons: [
        { id: "marketing", label: "营销页", description: "品牌、产品或服务的公开展示页面", icon: "panels-top-left" },
        { id: "application", label: "应用界面", description: "工作台、管理与高频操作页面", icon: "panel-left" },
        { id: "content", label: "内容页", description: "文章、知识库与深度阅读页面", icon: "newspaper" }
      ],
      artifact: {
        file: "uidevtpl-web-react-heroui-quiet-grid-1.0.0.zip",
        url: "https://uidevtpl.example/artifacts/web/react/heroui/quiet-grid/1.0.0/template.zip",
        sizeBytes: 1843200,
        sha256: "7d3f50a97439237c6b7bd6245af5079b0e14eb96ce72d0e1e578e8fb8d6f3a21"
      }
    },
    {
      rank: 2,
      slug: "signal-canvas",
      id: "web/react/heroui/signal-canvas",
      name: "信号画布",
      englishName: "Signal Canvas",
      familyVersion: "signal-canvas@1.0.0",
      version: "1.0.0",
      summary: "鲜明、直接、带有海报构图的界面系统，用清楚的色块和强对比层级表达产品性格。",
      platform: "Web",
      runtime: "Browser",
      framework: { id: "react", label: "React", range: "19.x" },
      library: { id: "heroui", label: "HeroUI", range: "2.x" },
      buildTools: ["Vite", "Next.js"],
      packageManagers: ["npm", "pnpm"],
      language: "TypeScript strict",
      theme: "Light",
      mood: "expressive",
      moodLabel: "鲜明表达",
      density: "宽松",
      shape: "硬朗",
      contrast: "高",
      updatedAt: "2026-08-08",
      image: "./assets/signal-canvas-product.jpg",
      editorialImage: "./assets/signal-canvas-product.jpg",
      tags: ["高对比", "海报感", "产品展示", "品牌表达"],
      showcases: [
        { id: "launch-room", label: "产品发布室", shortLabel: "发布室" },
        { id: "field-notes", label: "创意观察", shortLabel: "创意观察" }
      ],
      componentGroups: [
        {
          label: "操作与展示",
          items: ["Button", "IconButton", "Link", "Badge", "Avatar", "Divider"]
        },
        {
          label: "表单输入",
          items: ["Input", "Textarea", "Select", "Checkbox", "Radio", "Switch"]
        },
        {
          label: "导航与浮层",
          items: ["Tabs", "Accordion", "Pagination", "Tooltip", "Dropdown", "Popover", "Modal", "Drawer", "Toast"]
        },
        {
          label: "数据与状态",
          items: ["Table", "SearchBar", "FilterToolbar", "EmptyState", "ErrorState", "Skeleton"]
        }
      ],
      skeletons: [
        { id: "marketing", label: "营销页", description: "强调产品主体与明确行动的发布页面", icon: "panels-top-left" },
        { id: "application", label: "应用界面", description: "具有强区分度的创作和运营工作台", icon: "panel-left" },
        { id: "content", label: "内容页", description: "杂志化标题与模块化内容阅读页面", icon: "newspaper" }
      ],
      artifact: {
        file: "uidevtpl-web-react-heroui-signal-canvas-1.0.0.zip",
        url: "https://uidevtpl.example/artifacts/web/react/heroui/signal-canvas/1.0.0/template.zip",
        sizeBytes: 2031616,
        sha256: "c5cc7b7abec5a527c1604641c238221883605470676b1014e23055a8ac7892d4"
      }
    }
  ];

  return Object.freeze({
    templates: Object.freeze(templates)
  });
});
