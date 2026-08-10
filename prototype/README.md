# UIDevTpl 高保真原型

本目录是 UIDevTpl V1 的可运行设计原型，对应 [M1 模板平台](../roadmap.md#m1) 与 [M2 Quiet Grid](../roadmap.md#m2)。原型用于验证模板发现、真实预览和 AI 迁移主流程，不作为生产网站或可发布模板包。

## 直接查看

双击打开 [`index.html`](./index.html) 即可使用。原型只读取本目录静态文件，不需要启动开发服务器。

主要路径：

1. 在模板库搜索或筛选模板。
2. 打开 Quiet Grid 或 Signal Canvas 详情。
3. 切换 Showcase、桌面、平板、手机和自适应视口。
4. 打开组件实验室检查真实状态。
5. 使用“复制给 AI”检查固定版本迁移任务。
6. 使用“独立预览”在完整浏览器视口检查 Showcase。

## 原型覆盖

- 中文优先的工具型模板库，没有营销 Hero。
- 两个差异明显的视觉家族预览。
- 固定模板身份、版本、兼容范围、模板包摘要和 SHA-256。
- 内嵌 iframe 预览与独立 `preview.html`。
- Quiet Grid 的 AI 项目工作台与知识出版 Showcase。
- Signal Canvas 候选方向的产品发布室与创意观察 Showcase。
- 搜索、组合筛选、排序、URL 恢复、空状态、重置和剪贴板回退。
- 360px、390px、768px、1024px 和桌面布局策略。

## 文件职责

| 文件 | 职责 |
| --- | --- |
| `index.html` | 模板库、详情、组件实验室和迁移 Dialog 的结构 |
| `styles.css`、`styles/` | 平台样式入口，以及基础、模板库、详情和响应式模块 |
| `data.js` | 两个模板的统一原型记录 |
| `lib.js` | 搜索、筛选、排序、URL 状态和迁移文本纯函数 |
| `render.js` | 模板卡片、详情信息与组件实验室渲染 |
| `app.js` | 页面状态、历史记录、预览控制与剪贴板交互 |
| `preview.html` | iframe 和独立预览使用的单独文档 |
| `preview.js` | 四个 Showcase 的结构与演示交互 |
| `preview.css`、`preview-styles/` | 预览样式入口，以及 Quiet Grid、Signal Canvas、公共组件和响应式模块 |
| `lib.test.cjs` | 核心纯函数单元测试 |
| `browser-smoke.cjs` | 本机 Edge 桌面主流程和 390px 布局检查 |

## 验证

```powershell
npm install
npm run verify
```

浏览器测试直接打开 `file://` 页面，需要 Windows 安装 Microsoft Edge，不会启动服务器。

参考截图：

- [`library-desktop.png`](./references/library-desktop.png)
- [`library-mobile.png`](./references/library-mobile.png)
- [`quiet-grid-detail-desktop.png`](./references/quiet-grid-detail-desktop.png)
- [`quiet-grid-detail-mobile.png`](./references/quiet-grid-detail-mobile.png)
- [`signal-canvas-preview.png`](./references/signal-canvas-preview.png)

## 生产边界

- 模板版本、固定包域名和 SHA-256 是原型假数据，迁移文本带有原型提示。
- 原型没有生产 React / HeroUI 模板源码、Manifest Schema、构建流水线、统计、SEO 和 Cloudflare 部署。
- Signal Canvas 是第二视觉家族候选，不代表 M3 已经锁定家族或技术栈。
- 摄影素材只用于内部原型，发布前需要按 [`ASSETS-LICENSE.md`](./ASSETS-LICENSE.md) 完成正式资产替换或归档。
