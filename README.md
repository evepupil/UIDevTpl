# UIDevTpl

UIDevTpl 是面向 AI 编程的可预览、可下载、可迁移 UI 模板平台。

## Workspace

- `apps/web`：Next.js App Router 主站。
- `apps/preview`：Vite MPA 固定版本预览站。
- `packages/schema`：模板 Manifest、目录与发布记录的类型和校验入口。
- `packages/design-families`：视觉家族规则和 tokens。
- `packages/templates`：各框架的真实模板源码。
- `tooling/release`：构建产物路径和发布流水线基础工具。
- `prototype`：生产迁移前保留的高保真交互原型。

## Commands

```powershell
pnpm install
pnpm verify
pnpm build
```

开发服务器需要由用户明确授权后再启动：

```powershell
pnpm dev
```

技术边界和版本基线记录在 [`docs/模块设计/技术架构与构建.md`](./docs/模块设计/技术架构与构建.md)。
