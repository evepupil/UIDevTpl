# Quiet Grid 模板

| 项目 | 内容 |
| --- | --- |
| 模块定位 | UIDevTpl 首个视觉家族及 `web/react/heroui/quiet-grid` 模板实现 |
| 对应代码 | `packages/design-families/src/index.ts`、`packages/templates/web/react/heroui/quiet-grid/src/`、`apps/preview/src/`、`apps/preview/public/assets/` |
| 所属 M 里程碑 | [M2](../roadmap.md#m2) |
| 当前状态 | 进行中 |
| 最近更新时间 | 2026-08-10 |

## 职责与边界

- 定义 Quiet Grid 的 tokens、字体、密度、构图、图片和交互规则。
- 提供 V1 最低组件能力、应用工作台 Showcase 和组件状态矩阵。
- 预留三类页面骨架与第二个内容 Showcase 的契约边界，按 M2 退出标准逐步补齐。
- 提供 Web / React / HeroUI 源码和 Vite 固定预览入口；迁移说明、许可证和正式模板包仍由后续发布模块负责。
- V1 只声明 Light 和 Browser，Dark 与其他平台不在本里程碑内。

## 结构与数据流

```text
Quiet Grid 家族契约与 tokens
  -> HeroUI 原子组件与 Quiet Grid 组合组件
  -> AppShell 与 AI 项目工作台 Showcase
  -> Vite MPA 预览与组件实验室
  -> 固定模板包、迁移验证与发布门禁
```

## 关键决策

- 实现 ID 为 `web/react/heroui/quiet-grid`，初始版本为 `1.0.0`。
- 首次实现以 Node.js `24.x`、React `19.x`、TypeScript `7.x`、Vite `8.x`、HeroUI `3.x` 和 Tailwind CSS `4.x` 为主版本基线。
- 当前以 Vite React MPA 作为可运行验收入口，Next.js App Router 作为后续迁移兼容基线。
- 组件实验室和 AI 项目工作台使用 Vite MPA 生成独立预览入口。
- 预览应用通过 PostCSS 加载 HeroUI v3 的 Tailwind CSS v4 样式，模板包导出 `styles.css` 供消费者接入。
- 组件实验室不计入 Showcase 数量；第二个 Showcase 和三类页面骨架仍未实现。

## 当前实现

已完成首个模板的 React / HeroUI 源码切片和可运行预览：

- 原子组件包含 `QuietButton`、`QuietIconButton`、`QuietField`、`QuietBadge`、`QuietAvatar`、`QuietDivider` 和 `Kbd`。
- 组合组件包含 `SectionHeading`、`MetricStrip`、`TaskQueue`、`ActivityRail` 和 `QuietState`。
- `AppShell` 覆盖固定桌面侧栏、移动端抽屉、顶部搜索和工作区信息。
- AI 项目工作台覆盖指标、任务筛选、完成状态、任务 Modal、Toast、项目图片和活动列表。
- 组件实验室覆盖按钮状态、徽标、头像、表单校验、Switch、Checkbox、Empty、Error、Loading 和 Tabs。
- Vite MPA 提供 `/preview/`、`/component-lab/` 和基础 Catalog 三个入口；预览应用已接入 Tailwind v4 PostCSS 处理链，HeroUI 样式可正常构建。
- 桌面与 390px 手机视口已通过浏览器截图、无横向溢出检查和交互操作检查。

生产脚手架已经创建：`@uidevtpl/design-families` 提供 Quiet Grid 家族契约与 tokens，`@uidevtpl/template-quiet-grid` 提供 `web/react/heroui/quiet-grid@1.0.0` 的 Manifest 占位、源码边界和样式入口。当前 Manifest 保持 `draft`，不能作为公开下载版本。

## 验证方式

- 运行 `pnpm --filter @uidevtpl/template-quiet-grid typecheck`、`pnpm --filter @uidevtpl/preview typecheck` 和 `pnpm --filter @uidevtpl/preview build`。
- 运行仓库级 `pnpm verify`，确认原型、workspace 类型检查、测试和构建全部通过。
- 在 390px 和 1440px 检查布局、图片加载、无横向溢出和组件实验室密度；后续补齐 360px、768px、1024px 和 Next.js 迁移验证。
- 通过浏览器检查任务 Tabs、完成按钮、Modal、Toast、移动端导航、实验室 Tabs、Switch 和 Checkbox。
- 在正式发布前补充键盘焦点、WCAG 2.2 AA、固定产物 SHA-256、三类页面迁移和受控 AI 迁移任务验证。

## 待扩展项

- 实现第二个内容 Showcase，以及 marketing / content 页面骨架。
- 将家族规则整理为固定版本 JSON、资产授权清单和正式模板压缩包。
- 补充 Next.js App Router 迁移验证、键盘焦点和 WCAG 2.2 AA 验证。
- 在组件实验室、Vite MPA 和迁移验证通过后再将 Manifest 推进到 `review`。
- 在首次发布门禁后把具体 minor、patch 和验证通过的兼容范围写入 Manifest 与锁文件。
- V1 后评估 Dark、Vue 和桌面端实现。

## 改动历史

| 日期 | 变更 |
| --- | --- |
| 2026-08-10 | 创建 Quiet Grid 视觉家族契约、tokens、Manifest 占位和 React / HeroUI 模板包边界 |
| 2026-08-10 | 锁定首个模板的主版本基线与 Vite MPA 固定预览方式 |
| 2026-08-10 | 完成 Quiet Grid 两个高保真 Showcase 原型和响应式浏览器验证 |
| 2026-08-10 | 创建 M2 模块归档，锁定首个模板范围 |
| 2026-08-10 | 完成 React / HeroUI 原子组件、应用工作台、组件实验室和浏览器交互验收 |
| 2026-08-10 | 为预览应用接入 Tailwind v4 PostCSS，修正 HeroUI Modal、Toast、Tabs 和状态控件的 Quiet Grid 样式映射 |
