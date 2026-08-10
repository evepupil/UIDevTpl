# Quiet Grid 模板

| 项目 | 内容 |
| --- | --- |
| 模块定位 | UIDevTpl 首个视觉家族及 `web/react/heroui/quiet-grid` 模板实现 |
| 对应代码 | `prototype/preview.html`、`prototype/preview.js`、`prototype/preview.css`；计划中的 `packages/design-families/quiet-grid/`、`packages/templates/web/react/heroui/quiet-grid/` |
| 所属 M 里程碑 | [M2](../roadmap.md#m2) |
| 当前状态 | 进行中 |
| 最近更新时间 | 2026-08-10 |

## 职责与边界

- 定义 Quiet Grid 的 tokens、字体、密度、构图、图片和交互规则。
- 提供 V1 最低组件能力、三类页面骨架和完整状态矩阵。
- 提供独立组件实验室，以及 AI 项目工作台和内容出版或知识杂志两个 Showcase。
- 提供 Web / React / HeroUI 源码、迁移说明、许可证和固定模板包。
- V1 只声明 Light 和 Browser，Dark 与其他平台不在本里程碑内。

## 结构与数据流

```text
Quiet Grid 家族规则
  -> HeroUI token 与组件映射
  -> 布局和页面骨架
  -> 组件实验室与两个 Showcase
  -> 固定模板包与迁移验证
```

## 关键决策

- 实现 ID 为 `web/react/heroui/quiet-grid`，初始版本为 `1.0.0`。
- 首次实现以 Node.js `24.x`、React `19.x`、TypeScript `7.x`、Vite `8.x`、HeroUI `3.x` 和 Tailwind CSS `4.x` 为主版本基线。
- 同一源码验证 Vite React SPA 和 Next.js App Router。
- 组件实验室和两个 Showcase 使用 Vite MPA 生成固定版本生产预览。
- npm 与 pnpm 分别完成干净项目验证。
- 组件实验室不计入两个 Showcase 数量。

## 当前实现

已完成 Quiet Grid 的高保真视觉与交互原型：

- AI 项目工作台覆盖侧栏、任务队列、指标、项目状态、搜索、筛选、完成状态和新建任务 Dialog。
- 知识出版覆盖完整导航、期刊标题、真实主图、文章列表与内容索引。
- 两个 Showcase 共享安静、精确、编辑感的字体、颜色、密度、边界和响应式规则。
- 桌面与 390px 手机视口已经通过本机 Edge 截图和无横向溢出检查。

当前产物用于锁定视觉方向和平台交互，尚未包含生产 React / HeroUI 组件源码、家族 JSON 契约、三类可迁移页面骨架和固定模板包。

生产脚手架已经创建：`@uidevtpl/design-families` 提供 Quiet Grid 家族契约与 tokens，`@uidevtpl/template-quiet-grid` 提供 `web/react/heroui/quiet-grid@1.0.0` 的 Manifest 占位和源码边界。当前 Manifest 保持 `draft`，不能作为公开下载版本。

## 验证方式

- 验证 TypeScript strict、构建、依赖方向、状态矩阵和模板包 Schema。
- 在 360px、768px、1024px 和 1440px 检查布局与交互。
- 验证键盘、焦点、浮层、表单和 WCAG 2.2 AA 基线。
- 通过受控 AI 迁移任务和至少两名评审者的风格评分。
- 原型阶段运行 `npm run verify`，并检查 `prototype/references/quiet-grid-detail-desktop.png` 与手机参考图。

## 待扩展项

- 实现真实 React / HeroUI 原子组件、组合组件、布局、页面骨架和两个 Showcase。
- 将家族规则整理为固定版本 JSON 和资产授权清单。
- 在组件实验室、Vite MPA 和 Next.js 迁移验证通过后再将 Manifest 推进到 `review`。
- 锁定正式展示名称和完整视觉方案。
- 在首次实现门禁后把具体 minor、patch 和验证通过的兼容范围写入 Manifest 与锁文件。
- V1 后评估 Dark、Vue 和桌面端实现。

## 改动历史

| 日期 | 变更 |
| --- | --- |
| 2026-08-10 | 创建 Quiet Grid 视觉家族契约、tokens、Manifest 占位和 React / HeroUI 模板包边界 |
| 2026-08-10 | 锁定首个模板的主版本基线与 Vite MPA 固定预览方式 |
| 2026-08-10 | 完成 Quiet Grid 两个高保真 Showcase 原型和响应式浏览器验证 |
| 2026-08-10 | 创建 M2 模块归档，锁定首个模板范围 |
