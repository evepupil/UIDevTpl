# Quiet Grid 模板

| 项目 | 内容 |
| --- | --- |
| 模块定位 | UIDevTpl 首个视觉家族及 `web/react/heroui/quiet-grid` 模板实现 |
| 对应代码 | 计划中的 `packages/design-families/quiet-grid/`、`packages/templates/web/react/heroui/quiet-grid/` |
| 所属 M 里程碑 | [M2](../roadmap.md#m2) |
| 当前状态 | 未开始 |
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
- 同一源码验证 Vite React SPA 和 Next.js App Router。
- npm 与 pnpm 分别完成干净项目验证。
- 组件实验室不计入两个 Showcase 数量。

## 当前实现

尚无代码和视觉稿。首个模板范围、组件基线、Showcase 题材和门禁已经写入需求与模板规范。

## 验证方式

- 验证 TypeScript strict、构建、依赖方向、状态矩阵和模板包 Schema。
- 在 360px、768px、1024px 和 1440px 检查布局与交互。
- 验证键盘、焦点、浮层、表单和 WCAG 2.2 AA 基线。
- 通过受控 AI 迁移任务和至少两名评审者的风格评分。

## 待扩展项

- 锁定正式展示名称和完整视觉方案。
- 在实现开始时填写 React、HeroUI、Node.js 和样式系统版本范围。
- V1 后评估 Dark、Vue 和桌面端实现。

## 改动历史

| 日期 | 变更 |
| --- | --- |
| 2026-08-10 | 创建 M2 模块归档，锁定首个模板范围 |
