# Blackline SaaS 模板

| 项目 | 内容 |
| --- | --- |
| 模块定位 | UIDevTpl 首个 SaaS 视觉家族及 `web/react/shadcn/blackline-saas` 模板实现 |
| 对应代码 | [`packages/design-families/src/index.ts`](../../packages/design-families/src/index.ts)、[`packages/templates/web/react/shadcn/blackline-saas/`](../../packages/templates/web/react/shadcn/blackline-saas/)、[`apps/preview/src/`](../../apps/preview/src/)、[`packages/catalog/src/index.ts`](../../packages/catalog/src/index.ts) |
| 所属 M 里程碑 | [M2](../roadmap.md#m2) |
| 当前状态 | 已完成 |
| 最近更新时间 | 2026-08-12 |

## 职责与边界

- 定义 Blackline SaaS 的灰、黑、白 token、密度、圆角和数据工作台构图。
- 以官方 shadcn `sidebar-07` 为 Sidebar、折叠、导航和操作状态的源码基线。
- 提供 Overview、Deployments、Deployment detail、Models、Billing、Settings 六个可独立入口，以及组件实验室。
- 把可复用资源拆为 Shell、Patterns、Blocks 和平台数据契约；示例页面只负责组合这些资源。
- 提供 Web / React / shadcn/ui 独立源码、版本化 Manifest、迁移说明和固定 Preview 入口。
- 模板层负责页面组合和示例数据；主站目录、发布产物和 Blob 由模板平台模块负责。

## 结构与数据流

```text
shadcn sidebar-07 + base-nova tokens
  -> 官方 Sidebar / UI 源码
  -> Workspace Shell + Patterns + Blocks
  -> platform-data 资源契约与页面组合
  -> Overview / Deployments / Models / Billing / Settings + Component Lab
  -> Vite library build + Preview MPA
  -> Manifest、Catalog、迁移说明和后续固定产物
```

## 关键决策

- 模板 ID 为 `web/react/shadcn/blackline-saas`，实现版本从 `1.0.0` 开始。
- 模板名称为 `Blackline SaaS`，默认采用官方 `base-nova` 的灰黑白 token。
- 初始化来源固定为 `npx shadcn@latest add sidebar-07`；本次记录 CLI `4.16.2`、Base UI `1.7.0` 和 Lucide `1.31.0`。
- `src/components/` 与 `src/components/ui/` 中由 shadcn 生成的源码保持原样；自有页面只通过组合层扩展。
- `src/index.css` 继续作为 shadcn 主题和 CSS variable 的权威文件，自有视觉规则放在 `src/blackline-saas.css`。
- 模板库构建输出到 `dist`，独立应用演示构建输出到 `dist-app`，避免 Vite 应用构建清空供 Preview 导入的库产物。
- Preview 直接声明 Geist 依赖，并在 Vite 内存适配层移除 workspace 包中的重复字体导入；模板主题与字体源码保持原样。
- Preview 的 library build 使用模板自己的 `@/` alias，TypeScript 检查在 Preview tsconfig 中映射同一固定源码目录；主站不直接导入模板运行时。
- 模板 library build 将 `use-sync-external-store` 及其 shim 子路径作为外部 ESM 依赖，避免 Base UI 的 CommonJS shim 被带入浏览器产物并在运行时调用 `require`。
- Preview 构建启用 Tailwind v4 Vite 插件，并通过内存适配层为模板 CSS 指定源码扫描目录，保证 `sidebar-07` 生成的 utility class 进入最终 CSS，同时不修改官方主题文件。
- `BlacklineComponentLab` 是独立验收入口，不计入业务页面；业务页面通过 `BlacklineSaasShowcase` 和各页面 Showcase 复用同一套资源。

## 当前实现

- Vite React 模板由官方 shadcn CLI 初始化，`components.json` 固定为 `base-nova`、neutral、CSS variables、Lucide。
- `sidebar-07` 生成的 Sidebar、Breadcrumb、DropdownMenu、Collapsible、Avatar、Separator、Input、Skeleton、Tooltip 和 Sheet 已接入，生成源码保持原样。
- Showcase 需要的 Select、Dialog、Table、Label、Card、Progress 和 Badge 已通过 shadcn CLI 补齐，并只在页面组合层使用。
- `src/components/patterns/` 提供 WorkspaceShell、PageHeader、FilterBar、ResourceTable、StatusBadge、SummaryStrip、ActivityTimeline 和 EmptyState。
- `src/components/blocks/` 提供项目概览、部署列表、部署详情、模型列表、账单和设置六个可组合业务块。
- `platform-data.ts` 负责部署、模型、发票、活动和部署步骤等示例资源，以及按查询、环境和状态筛选的纯函数。
- `BlacklineSaasShowcase` 提供 Overview，其他 Showcase 通过同一 WorkspaceApp 进入独立页面；`resource-manifest.ts` 记录可复用资源和 primitive 依赖。
- Component Lab 覆盖按钮、状态徽标、Loading、Empty、表格和活动时间线状态；当前共有 5 项平台数据与导航纯函数单测。
- 页面画布使用 `muted` 背景，主要业务区块使用 `card` surface 和统一圆角边框；分割线收敛到表格行、列表项和时间线内部，避免用横线承担页面层级。
- Blackline 自有 CSS 作用域将 `--radius` 从官方默认的 10px 收紧为 6px，统一按钮、输入框、Select、卡片和对话框的转角；官方生成文件保持原样。
- `manifest.json` 与 `src/index.ts` 同步记录 shadcn CLI、Registry Schema、style、primitive 和 icon library。
- `vite.config.ts` 保留官方初始化结构，仅将 Node 24 下的 `__dirname` 改为等价的 `import.meta.dirname`；Sidebar、UI primitive、导航源码和 `src/index.css` 不做自定义修改。

## 验证方式

- 运行模板 `typecheck`、Vitest 和 library build。
- 运行 `pnpm --filter @uidevtpl/preview... build`，确认 Overview、Deployments、Deployment detail、Models、Billing、Settings 和 Component Lab 通过固定深链进入同一组 MPA 产物。
- 检查模板 library 与 Preview 产物不包含 `Calling \`require\``、`require("react")` 或其他浏览器不可用的 CommonJS 运行时调用。
- 2026-08-11 已完成 Vercel Production 发布，公开预览地址为 `https://preview.chaosyn.com/preview/web/react/shadcn/blackline-saas/1.0.0/overview`。
- 2026-08-12 已重新部署卡片层级改造，并在 1440px、768px、390px 验收七个固定入口；页面级横向溢出为零，表格仅在自身容器内滚动，公开预览控制台无应用错误。
- 2026-08-11 已在桌面端和 390px 移动端验收 Overview、Deployments、Deployment detail、Models、Billing、Settings 与 Component Lab；页面级横向溢出为零，表格保留局部横向滚动，Select、Dialog、保存反馈和状态筛选交互正常。
- 检查 shadcn 生成文件的 hash 未因自有页面扩展发生变化。
- 在 390px、768px 和 1440px 检查 Sidebar、表格横向滚动、指标网格和对话框焦点。
- 后续补充 Next.js App Router 迁移、键盘焦点、WCAG 2.2 AA、固定 ZIP、Registry Item 和 SHA-256 门禁。

## 待扩展项

- 补齐 marketing、content 三类页面骨架并记录迁移映射。
- 从同一源码生成 Registry Item、固定 ZIP 和参考图。
- 在干净 Vite React 与 Next.js 项目分别验证 npm、pnpm 安装和构建。
- 完成 Preview 隔离、固定版本缓存、Blob 上传和公开发布门禁。
- 评估 shadcn 生成源码的再分发许可证并写入正式资产清单。

## 改动历史

| 日期 | 变更 |
| --- | --- |
| 2026-08-12 | 收紧 Blackline 自有作用域的圆角 token，从 10px 调整为 6px，统一扁平按钮与卡片控件的视觉转角 |
| 2026-08-12 | 将主要业务区块改为卡片 surface，收敛页面级分割线，增加画布与卡片的灰白层级，并将 Deployments 筛选栏与结果数合并为一个面板 |
| 2026-08-11 | 将模板重构为 Shell、Patterns、Blocks 和 platform-data 资源层，新增 Deployments、Deployment detail、Models、Settings 页面，并让 Showcase 只负责组合资源 |
| 2026-08-11 | 删除旧 Revenue / dashboard-data 示例，迁移平台筛选和导航纯函数测试，补齐 README、PARITY 和 MIGRATION 的资源复用说明 |
| 2026-08-11 | 盘点 `sidebar-07` 组件并补齐 Showcase 所需的 Select、Dialog、Table、Label、Card、Progress 和 Badge；Overview、Billing 的交互控件统一走 shadcn 组件组合 |
| 2026-08-11 | 为 Preview 启用 Tailwind v4 utility 生成和模板源码扫描，修复组件已挂载但页面缺少官方样式的问题 |
| 2026-08-11 | 修复 Base UI 的 `use-sync-external-store` CommonJS shim 被打入 library 产物导致 Preview 白屏的问题，改为保留浏览器消费方可处理的 ESM 依赖边界 |
| 2026-08-11 | 将 Blackline SaaS Preview 部署到 Vercel Production，并验证三个固定入口 |
| 2026-08-11 | 用官方 `sidebar-07` 和 `base-nova` 初始化 Blackline SaaS，完成 Overview、Billing、Component Lab、Preview 和 Catalog 接入 |
| 2026-08-11 | 将 M2 模板目标从 Quiet Grid 调整为 Blackline SaaS，记录官方生成源码保持不变的边界 |
