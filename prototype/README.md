# UIDevTpl 主站布局原型

UIDevTpl Signal Desk 的低保真 HTML / CSS / JavaScript 原型，用来确认主站的信息层级、页面布局和核心功能位置。原型不追求最终视觉细节，正式站会把这些位置替换为 Next.js + shadcn/ui 组件。

## 打开方式

直接打开 `prototype/index.html` 即可，不依赖开发服务器或外部网络资源。

## 文件结构

| 文件 | 职责 |
| --- | --- |
| `index.html` | 7 个视图骨架：首页发现工作台、模板库、用途目录、模板详情、迁移指南、保留入口（登录 / 注册 / 投稿），外加全局搜索 overlay |
| `data.js` | 分类、模板（含版本检查栏字段）和 zh / EN 文案；经典脚本，先于 `app.js` 加载 |
| `app.js` | 状态、客户端视图路由、各视图渲染、搜索 / 筛选 / 排序、点赞、主题、语言、复制迁移指令 |
| `styles.css` | Signal Desk 设计 token（浅 / 深）、布局、组件、线框预览、响应式（1080 / 760 / 480 / 390） |
| `browser-smoke.cjs` | 用 Edge 做桌面 + 390px 移动布局与功能点冒烟 |

## 覆盖的功能点

- **顶部产品栏**：品牌 + 版本、模板库 / 分类 / 使用指南导航、Command 搜索触发器（Ctrl K）、提交、语言、主题、登录；移动端导航收进面板。
- **首页发现工作台**：标题 + 模板数量 + 全局搜索、精选系统真实预览切片 + ID / 版本 / 复制给 AI、用途索引条、最新系统网格（1 横向精选 + 常规模板 + 打开模板库入口）、交接流程条。
- **模板库**：240px 筛选栏（关键词、用途、平台、框架、组件库、排序）、工具栏、模板网格、来自分类页时的面包屑、空状态、移动端筛选面板。
- **用途目录**：每行编号 / 图标 / 名称 / 说明 / 数量 / 最近更新 / 箭头；宽屏双栏，移动单列；点击进入带分类说明的模板库结果。
- **模板详情（整页）**：面包屑 + 名称 + 固定版本徽标 + 作者 / 技术栈 / 主题能力；主操作（复制给 AI、打开独立预览、组件实验室）；左侧预览工作台（Showcase 切换、桌面 / 平板 / 手机视口、就绪 / 加载 / 错误状态）；预览下方 Showcase / 组件 / Tokens / 迁移 四个页签；右侧版本检查栏（固定版本、构建工具、包管理器、产物大小、 SHA-256、许可证、兼容性、主题能力）。
- **迁移指南**：确认项目 → 下载并校验 → 保留参考源 → 迁移并运行门禁，校验失败停止条件。
- **保留入口**：登录 / 注册 / 投稿共用同一壳，显示能力状态、入口用途和返回模板库动作。
- **通用**：Light / Dark、中文 / English、点赞、复制迁移指令反馈、预留入口提示。

## 后续实现：映射到 shadcn/ui preset

正式站使用 `apps/web/components.json` 里的 `base-vega` preset（neutral 颜色、lucide 图标、Noto Sans、Base UI）。原型里的位置大致对应以下首批组件，便于直接套用：

| 原型位置 | shadcn/ui 组件 |
| --- | --- |
| 顶部产品栏、移动导航、筛选面板 | `Button`、`Input`、`Tooltip`、`Sheet`、`DropdownMenu` |
| 全局搜索 overlay | `Command`、`Dialog` |
| 筛选栏单选、排序 | `ToggleGroup`、`Select`、`RadioGroup` |
| 详情 Showcase / 视口 / 状态切换 | `ToggleGroup`、`Tabs` |
| 模板卡片、版本检查栏、保留页 | `Card`、`Badge`、`Separator`、`Skeleton`（加载态） |
| 详情 / 指南步骤 | `Tabs`、`Accordion`、`Breadcrumb`、`ScrollArea` |

预览板使用线框表达页面层级，不代表最终模板视觉；正式实现会连接真实 Preview Project 和固定版本 Catalog。

## 验证

```bash
pnpm run check:prototype     # node --check 语法校验
pnpm run test:prototype      # Edge 浏览器冒烟（桌面 + 390px）
```
