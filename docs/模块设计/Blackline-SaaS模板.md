# Blackline SaaS 模板

| 项目 | 内容 |
| --- | --- |
| 模块定位 | UIDevTpl 首个 SaaS 视觉家族及 `web/react/shadcn/blackline-saas` 模板实现 |
| 对应代码 | [`packages/design-families/src/index.ts`](../../packages/design-families/src/index.ts)、[`packages/templates/web/react/shadcn/blackline-saas/`](../../packages/templates/web/react/shadcn/blackline-saas/)、[`apps/preview/src/`](../../apps/preview/src/)、[`packages/catalog/src/index.ts`](../../packages/catalog/src/index.ts) |
| 所属 M 里程碑 | [M2](../roadmap.md#m2) |
| 当前状态 | 进行中 |
| 最近更新时间 | 2026-08-11 |

## 职责与边界

- 定义 Blackline SaaS 的灰、黑、白 token、密度、圆角和数据工作台构图。
- 以官方 shadcn `sidebar-07` 为 Sidebar、折叠、导航和操作状态的源码基线。
- 提供 Overview、Billing 两个完整 Showcase 和独立组件实验室。
- 提供 Web / React / shadcn/ui 独立源码、版本化 Manifest、迁移说明和固定 Preview 入口。
- 模板层负责页面组合和示例数据；主站目录、发布产物和 Blob 由模板平台模块负责。

## 结构与数据流

```text
shadcn sidebar-07 + base-nova tokens
  -> 官方 Sidebar / UI 源码
  -> Blackline SaaS 页面组合与数据纯函数
  -> Overview / Billing Showcase 与 Component Lab
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
- `BlacklineComponentLab` 不计入两个 Showcase；三个页面骨架和正式发布产物仍未完成。

## 当前实现

- Vite React 模板由官方 shadcn CLI 初始化，`components.json` 固定为 `base-nova`、neutral、CSS variables、Lucide。
- `sidebar-07` 生成的 Sidebar、Breadcrumb、DropdownMenu、Collapsible、Avatar、Separator、Input、Skeleton、Tooltip 和 Sheet 已接入，生成源码保持原样。
- Showcase 需要的 Select、Dialog、Table、Label、Card、Progress 和 Badge 已通过 shadcn CLI 补齐，并只在页面组合层使用。
- Overview 提供指标、Revenue 范围切换、Plan mix、活动搜索、CSV 导出和新建项目对话框。
- Billing 提供套餐信息、发票表格和 CSV 导出。
- Component Lab 覆盖按钮、输入、Loading、Empty 和操作状态。
- `dashboard-data.ts` 负责活动过滤、汇总和金额格式化，并有 3 项 Vitest 单测。
- `manifest.json` 与 `src/index.ts` 同步记录 shadcn CLI、Registry Schema、style、primitive 和 icon library。
- `vite.config.ts` 保留官方初始化结构，仅将 Node 24 下的 `__dirname` 改为等价的 `import.meta.dirname`；Sidebar、UI primitive、导航源码和 `src/index.css` 不做自定义修改。

## 验证方式

- 运行模板 `typecheck`、Vitest 和 library build。
- 运行 `pnpm --filter @uidevtpl/preview... build`，确认 Overview、Billing 和 Component Lab 进入同一组 MPA 产物。
- 检查模板 library 与 Preview 产物不包含 `Calling \`require\``、`require("react")` 或其他浏览器不可用的 CommonJS 运行时调用。
- 2026-08-11 发布 Vercel Production 部署 `dpl_5zZy7Ts47EzEYxZ2yZ91bAiaRx5F`；`preview.chaosyn.com` 的 Overview、Billing 和 `/component-lab` 均有可见内容，控制台无错误，Overview 与 Component Lab 的截图确认 Sidebar、按钮、指标卡和输入框样式已加载。
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
| 2026-08-11 | 盘点 `sidebar-07` 组件并补齐 Showcase 所需的 Select、Dialog、Table、Label、Card、Progress 和 Badge；Overview、Billing 的交互控件统一走 shadcn 组件组合 |
| 2026-08-11 | 为 Preview 启用 Tailwind v4 utility 生成和模板源码扫描，修复组件已挂载但页面缺少官方样式的问题 |
| 2026-08-11 | 修复 Base UI 的 `use-sync-external-store` CommonJS shim 被打入 library 产物导致 Preview 白屏的问题，改为保留浏览器消费方可处理的 ESM 依赖边界 |
| 2026-08-11 | 将 Blackline SaaS Preview 部署到 Vercel Production，并验证三个固定入口 |
| 2026-08-11 | 用官方 `sidebar-07` 和 `base-nova` 初始化 Blackline SaaS，完成 Overview、Billing、Component Lab、Preview 和 Catalog 接入 |
| 2026-08-11 | 将 M2 模板目标从 Quiet Grid 调整为 Blackline SaaS，记录官方生成源码保持不变的边界 |
