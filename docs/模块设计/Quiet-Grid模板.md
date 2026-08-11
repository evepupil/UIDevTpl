# Quiet Grid 模板

| 项目 | 内容 |
| --- | --- |
| 模块定位 | UIDevTpl 首个视觉家族及目标 `web/react/shadcn/quiet-grid` 模板实现 |
| 对应代码 | `packages/design-families/src/index.ts`、当前 `packages/templates/web/react/heroui/quiet-grid/src/`、计划中的 `packages/templates/web/react/shadcn/quiet-grid/`、`apps/preview/src/`、`apps/preview/public/assets/` |
| 所属 M 里程碑 | [M2](../roadmap.md#m2) |
| 当前状态 | 进行中 |
| 最近更新时间 | 2026-08-11 |

## 职责与边界

- 定义 Quiet Grid 的 tokens、字体、密度、构图、图片和交互规则。
- 提供 V1 最低组件能力、应用工作台 Showcase 和组件状态矩阵。
- 预留三类页面骨架与第二个内容 Showcase 的契约边界，按 M2 退出标准逐步补齐。
- 提供 Web / React / shadcn/ui 独立源码、版本化 Registry Item 和 Vite 固定预览入口；迁移说明、许可证和正式模板包仍由后续发布模块负责。
- V1 只声明 Light 和 Browser，Dark 与其他平台不在本里程碑内。

## 结构与数据流

```text
Quiet Grid 家族契约与 tokens
  -> 独立 shadcn/ui 组件源码与 Quiet Grid 组合组件
  -> AppShell 与 AI 项目工作台 Showcase
  -> Vite MPA 预览与组件实验室
  -> 固定模板包、迁移验证与发布门禁
```

## 关键决策

- 目标实现 ID 为 `web/react/shadcn/quiet-grid`，初始公开版本仍从 `1.0.0` 开始。
- 旧 `web/react/heroui/quiet-grid` 仅为 `draft` 开发身份，从未形成公开固定版本；后续完整删除，不复用组件源码、不继承验收证据，也不维护公开兼容别名。
- 首次实现以 Node.js `24.x`、React `19.x`、TypeScript `7.x`、Vite `8.x`、Tailwind CSS `4.x` 和 shadcn/ui 开放源码为基线。
- shadcn CLI、Registry Schema、style、图标库和底层组件依赖在首次编写实现时精确固定；单个实现只选择一种底层组件基础。
- 当前以 Vite React MPA 作为可运行验收入口，Next.js App Router 作为后续迁移兼容基线。
- 组件实验室和 AI 项目工作台使用 Vite MPA 生成独立预览入口。
- shadcn/ui 组件源码归 Quiet Grid 实现所有，禁止运行时导入官网 UI 包或可变共享 UI workspace。
- 固定 ZIP 和 Manifest 是版本权威；Registry Item 从相同源码生成并校验。
- 组件实验室不计入 Showcase 数量；第二个 Showcase 和三类页面骨架仍未实现。

## 当前实现

仓库当前仍保留一套 React / HeroUI 草稿，包含组件、应用工作台、组件实验室、Vite MPA 预览和 `web/react/heroui/quiet-grid@1.0.0` Manifest 占位。该内容只用于说明待删除范围：源码、Manifest、Catalog、预览数据和对应依赖都会移除，不作为 shadcn/ui 重写的代码、视觉、版本或验收输入。`@uidevtpl/design-families` 中仍适用的家族规则需要在重写启动时重新评估后再决定是否保留。

## 验证方式

- 运行仓库级 `pnpm verify`，确认原型、workspace 类型检查、测试和构建全部通过。
- 重写后验证 `components.json`、底层组件依赖、固定 ZIP 与 Registry Item 一致，并在干净 Vite React 与 Next.js App Router 项目完成 npm、pnpm 安装和构建。
- 在 390px 和 1440px 检查布局、图片加载、无横向溢出和组件实验室密度；后续补齐 360px、768px、1024px 和 Next.js 迁移验证。
- 通过浏览器检查任务 Tabs、完成按钮、Modal、Toast、移动端导航、实验室 Tabs、Switch 和 Checkbox。
- 在正式发布前补充键盘焦点、WCAG 2.2 AA、固定产物 SHA-256、三类页面迁移和受控 AI 迁移任务验证。

## 待扩展项

- 评估用户选定的 shadcn/ui 套件许可证、源码再分发、底层组件基础、React 19、Tailwind CSS 4、RSC、键盘和无障碍能力。
- 删除现有 HeroUI 源码、Manifest、Catalog、预览数据和相关依赖，从空目录编写 `web/react/shadcn/quiet-grid`。
- 生成与固定源码一致的 `components.json`、Registry Item 和校验记录。
- 实现第二个内容 Showcase，以及 marketing / content 页面骨架。
- 将家族规则整理为固定版本 JSON、资产授权清单和正式模板压缩包。
- 补充 Next.js App Router 迁移验证、键盘焦点和 WCAG 2.2 AA 验证。
- 在组件实验室、Vite MPA 和迁移验证通过后再将 Manifest 推进到 `review`。
- 在首次发布门禁后把具体 minor、patch 和验证通过的兼容范围写入 Manifest 与锁文件。
- V1 后评估 Dark、Vue 和桌面端实现。

## 改动历史

| 日期 | 变更 |
| --- | --- |
| 2026-08-11 | 将目标实现切换为 `web/react/shadcn/quiet-grid`，锁定独立源码、单一底层组件基础和 Registry 派生产物；现有 HeroUI 草稿后续完整删除并从零重写 |
| 2026-08-11 | 将新版应用工作台部署到 `preview.chaosyn.com`，完成桌面、390px 手机和任务完成交互线上验收 |
| 2026-08-11 | 重做应用工作台 Showcase 的视觉层级、导航对比、指标趋势、任务队列与项目脉搏区，补齐移动端两列指标节奏 |
| 2026-08-10 | 创建 Quiet Grid 视觉家族契约、tokens、Manifest 占位和 React / HeroUI 模板包边界 |
| 2026-08-10 | 锁定首个模板的主版本基线与 Vite MPA 固定预览方式 |
| 2026-08-10 | 完成 Quiet Grid 两个高保真 Showcase 原型和响应式浏览器验证 |
| 2026-08-10 | 创建 M2 模块归档，锁定首个模板范围 |
| 2026-08-10 | 完成 React / HeroUI 原子组件、应用工作台、组件实验室和浏览器交互验收 |
| 2026-08-10 | 为预览应用接入 Tailwind v4 PostCSS，修正 HeroUI Modal、Toast、Tabs 和状态控件的 Quiet Grid 样式映射 |
