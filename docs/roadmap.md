# UIDevTpl Roadmap

| 项目 | 内容 |
| --- | --- |
| 项目目标 | 建立可预览、可下载、可迁移，并能让 AI 稳定延续视觉风格的精选 UI 模板平台 |
| 当前阶段 | M1 主站全量重构准备；M2 模板实现已完成 |
| 最近更新 | 2026-08-15 |

| 里程碑 | 目标 | 状态 | 依赖 | 模块文档 | 退出标准 |
| --- | --- | --- | --- | --- | --- |
| <span id="m0">M0</span> | 锁定 V1 产品范围、模板规范和验收口径 | 已完成 | 无 | [需求与规范](./模块设计/需求与规范.md) | 产品需求与模板规范完成一致性检查，并形成 Git commit |
| <span id="m1">M1</span> | 完成模板库、固定版本、预览、分发和迁移指令闭环 | 进行中 | M0 | [模板平台](./模块设计/模板平台.md)、[主站体验重设计](./模块设计/主站体验重设计.md)、[技术架构与构建](./模块设计/技术架构与构建.md) | 网站 P0 功能、Schema、构建和 Vercel 部署门禁通过 |
| <span id="m2">M2</span> | 完成 `blackline-saas` 家族及 Web / React / shadcn/ui 实现 | 已完成 | M0 | [Blackline SaaS 模板](./模块设计/Blackline-SaaS模板.md) | shadcn/ui 源码基线、组件实验室、两个 Showcase、三类页面骨架和模板包门禁通过 |
| <span id="m3">M3</span> | 完成第二个明显不同的视觉家族及 Web 实现 | 未开始 | M1、M2 | [第二视觉家族](./模块设计/第二视觉家族.md) | 第二家族独立通过与首个模板相同的发布门禁 |
| <span id="m4">M4</span> | 完成公开 V1 的迁移、视觉、运营和发布验收 | 未开始 | M1、M2、M3 | [发布与验收](./模块设计/发布与验收.md) | 10 个迁移任务至少成功 9 个，无发布阻断问题，生产环境可访问 |

M0 已通过基线提交 `5b9dd48` 完成，后续需求补充继续归档到同一基准。当前聚焦 M1 的平台闭环和主站全量 UI 重构；根目录 [`PRODUCT.md`](../PRODUCT.md) 已记录首要用户、匿名主路径、固定版本迁移定位和暂不支持用户上传的 V1 边界。[`prototype/index.html`](../prototype/index.html) 与现有 `apps/web` UI 已退出视觉基线，只保留用于行为盘点和回退；新界面将在 [主站体验重设计](./模块设计/主站体验重设计.md) 的 Impeccable `shape` / `new-work` 讨论完成后开始。[V1 技术架构](./模块设计/技术架构与构建.md) 已锁定 pnpm/Turborepo monorepo、Next.js 主站、Vite MPA 预览、Vercel 双 Project 与 Vercel Blob。当前首个模板为 `Blackline SaaS`：以官方 `sidebar-07`、`base-nova`、Base UI 和 Lucide 为源码基线，已经接入 Shell、Patterns、Blocks、平台数据契约、Overview、Deployments、Deployment detail、Models、Billing、Settings、组件实验室、Preview 深链、Catalog 条目和 shadcn Manifest 元数据。M2 已通过模板门禁、公开预览构建和桌面 / 移动端浏览器验收；公开预览地址为 `https://preview.chaosyn.com/preview/web/react/shadcn/blackline-saas/1.0.0/overview`，M1 保持“进行中”。
