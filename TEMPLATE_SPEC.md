# UI 模板开发规范（独立执行版）

> 这份文档可以单独复制到另一个模板项目，作为 `AGENTS.md`、任务提示词或人工验收清单使用。
> 目标是让其他 AI 先独立完成一个可运行、可预览、可迁移的模板，之后再迁入 UIDevTpl。

| 项目 | 内容 |
| --- | --- |
| 规范版本 | v1.0 |
| 适用范围 | UIDevTpl 视觉家族、Web 模板及后续平台实现 |
| 当前 V1 基线 | Web / React / TypeScript strict / shadcn/ui |
| 核心原则 | 源码优先、视觉可复用、版本固定、迁移可追溯 |

本文面向独立开发，准入依据是当前仓库的代码、`packages/schema` 和实际构建门禁。仓库内的 `docs/模板规范-v1.md` 还包含部分面向平台未来能力的设计字段；迁回 UIDevTpl 时，以当前 Schema 校验结果和对应模块文档为准。

## 1. AI 执行规则

把本文件当作模板项目的交付合同。开发前先完成现状检查和实现方案，之后再编码；遇到会改变技术栈、视觉方向、组件库、授权边界或交付范围的取舍时暂停并请求决策。

AI 必须遵守以下规则：

1. 先读目标项目已有的 `AGENTS.md`、`docs/`、`package.json`、设计系统和未提交状态。
2. 保留用户已有的未提交修改，不使用 `git reset --hard`、`git checkout --` 或其他破坏性恢复命令。
3. 使用项目已有的框架、组件库、构建方式和测试方式；没有设计系统时，先建立 Token 和基础组件，再开发业务页面。
4. 开启语言或编译器的严格模式。TypeScript 必须使用 `strict: true`。
5. 业务逻辑按职责拆分到多个文件，禁止把大量数据、状态、页面和样式堆进一个文件。
6. 不自行启动开发服务器，除非用户明确授权；可以执行构建、类型检查、单元测试和已有的浏览器验收脚本。
7. 不用截图或静态拼贴代替真实组件源码。截图只用于对照和验收。
8. 不引入秘密、真实个人数据、内部 URL、未授权图片或不可离线阅读的外部依赖。
9. 完成后必须报告实际执行过的检查、未完成项和已知限制，不能把计划写成已完成。

## 2. 规范目标

一个合格的模板要同时满足四件事：

- AI 能快速读懂目录、组件边界和迁移方法。
- 用户替换业务内容后，页面仍保持原来的视觉性格。
- 同一个视觉家族可以由不同框架独立实现，不靠未经验收的自动翻译代码。
- 预览、参考图、下载包、Registry 产物和迁移说明都指向同一个固定版本。

## 3. 三层模型

### 3.1 视觉家族

视觉家族是审美和体验规则的权威来源，不包含某个框架的运行时代码。至少定义：

- 颜色角色、主题和对比度。
- 字体、字阶、行高、字重和文本宽度。
- 间距、密度、圆角、边框、分割线和阴影。
- 动效时长、缓动、减少动效时的降级方式。
- 图片、图标、内容长度和内容层级规则。
- 网格、断点、触控尺寸、窗口布局和安全区规则。
- 组件能力、状态、键盘操作和无障碍验收要求。
- 组件实验室、Showcase 和参考图使用的固定 fixture。

视觉家族示例：`blackline-saas@1.0.0`。

### 3.2 模板实现

模板实现是视觉家族在某个平台、框架和组件库上的真实代码。它负责：

- 组件源码、公开导出和框架 API。
- 组件库主题适配和底层 primitive 选择。
- Provider、插件、路由和状态逻辑。
- Layout、Page Skeleton、业务 Block 和 Showcase。
- 组件实验室、示例数据和纯函数测试。
- 目标框架的迁移说明、依赖说明和兼容范围。
- 模板 Manifest、构建产物和发布检查。

### 3.3 允许共享与必须隔离的内容

允许跨实现共享：

- JSON、Schema、CSS 自定义属性和视觉 Token 数据。
- 纯数据、fixture 和与框架无关的纯转换函数。
- 规范文档、许可证说明、参考图和校验工具。

必须隔离：

- React、Vue 等框架的运行时代码。
- 不同模板之间持续变化的 UI 运行时包。
- 官网组件源码与模板组件源码。
- 不同组件库或不同底层 primitive 的运行时实现。

React 实现不能运行时导入 Vue 源码，Vue 实现不能运行时导入 React 源码。每个已发布模板都要能在自己的固定源码边界内独立构建。

## 4. 命名与版本

### 4.1 模板 ID

模板 ID 使用四段格式：

```text
<platform>/<framework>/<component-library>/<template>
```

例如：

```text
web/react/shadcn/blackline-saas
web/vue/reka/blackline-saas
```

命名要求：

- 全部使用小写 ASCII。
- 单词之间使用连字符。
- 发布后保持稳定。
- 平台、框架或组件库改变时创建新的模板实现 ID。
- 同一家族在不同框架下尽量保持相同的 `<template>` 名称。
- 不使用参考产品品牌、客户名称、内部项目名或容易产生授权误解的名称。
- 运行宿主变化但源码契约不变时，优先扩展兼容信息；源码或迁移方式明显分叉时创建新的实现。

### 4.2 语义化版本

视觉家族和模板实现分别版本化。

视觉家族：

- `major`：核心视觉语言、必填 Token、布局契约或强制规则不兼容变化。
- `minor`：新增主题、Token、页面骨架或可选规则。
- `patch`：修正文档、参考资产或不改变视觉结果的遗漏。

模板实现：

- `major`：公开组件 API、迁移方式或框架接入不兼容变化。
- `minor`：新增组件、页面骨架、Showcase 或兼容范围。
- `patch`：修复类型、无障碍、实现错误或不改变主要外观的问题。

发布后，模板源码、Manifest、ZIP、参考图和 Registry 产物都不可原地改写。修复已发布版本时发布新版本；旧版本继续指向原来的固定产物。

### 4.3 状态

当前模板 Manifest 使用以下 `availability` 值：

- `draft`：制作中，仅本地或内部环境可见。
- `review`：等待技术、视觉、授权和迁移评审。
- `published`：通过发布门禁，可以进入公开模板目录。
- `withdrawn`：因安全、许可证或错误产物停止分发，不能原地恢复为已发布状态。

平台未来可以用独立的 Publish Record 表示 `active`、`deprecated` 等公开分发状态。不要在未经 Schema 变更的情况下，把新字段直接塞进 `manifest.json`。

## 5. 开发前必须确定的内容

编码前先写一页设计和交付说明，至少回答：

1. 模板服务的用户、产品类型和主要任务是什么。
2. 视觉家族的气质、密度、对比度、形状和主题是什么。
3. 首批要展示哪些页面骨架和 Showcase。
4. 组件库、底层 primitive、图标库、CLI 和样式方案是什么。
5. 哪些资源来自官方生成器，哪些是模板自己的组合层。
6. 支持哪些运行宿主、Node、框架、构建工具和包管理器版本。
7. 许可证、字体、图片、图标和第三方源码能否随模板再分发。
8. 哪些交互必须真实可用，哪些功能明确不属于模板范围。

如果项目没有现成设计系统，先建立以下 Token 文件或等价的集中配置：

```text
foundations/
  tokens/
    primitive.json
    semantic.json
    light.json
    dark.json       # 只有完整支持 Dark 时才声明
  typography.json
  spacing.json
  shape.json
  elevation.json
  motion.json
  layout.json
  media.json
```

组件优先消费语义角色，例如 `surface`、`text`、`muted`、`border`、`accent`、`danger`、`focus`。业务组件中禁止散落未经登记的颜色、间距、圆角、阴影和动效值。确有例外时，要写入 Token 或规则文档并说明原因。

## 6. 推荐目录

### 6.1 独立开发项目

其他 AI 可以先使用一个独立模板项目，至少保持下面的结构：

```text
template-project/
  manifest.json
  package.json
  README.md
  components.json              # 使用 shadcn/ui 时必须有
  MIGRATION.md
  PARITY.md
  CHANGELOG.md
  LICENSE
  ASSETS-LICENSE.md
  family/
    family.json
    foundations/
    contracts/
    rules/
    fixtures/
    references/
  src/
    components/
      ui/                       # 组件库生成或基础 primitive 源码
      patterns/                 # 可复用组合模式
      blocks/                   # 业务区块
    layouts/
    page-skeletons/
    showcases/
    component-lab/
    lib/
      platform-data.ts          # 示例数据和纯函数
    styles/
    index.ts
  fixtures/
  references/
  checks/
    implementation-rules.json
    import-policy.json
    migration.schema.json
    registry-checksums.json
```

目录名称可以按目标框架习惯调整，但职责不能混淆。

### 6.2 迁入 UIDevTpl 后

在 UIDevTpl 中，视觉家族和模板实现分开：

```text
packages/
  design-families/<family>/
  templates/<platform>/<framework>/<component-library>/<template>/
```

家族目录保存审美、Token、状态矩阵、页面骨架契约、fixture 和参考资产；模板目录保存框架源码、Manifest、组件配置、迁移说明、构建和实现检查。

## 7. 代码分层

### 7.1 基础组件 `ui`

- 只处理基础交互和可组合 API。
- 负责键盘操作、焦点、ARIA、禁用、加载和错误状态。
- 不写具体业务名称、产品数据或某个页面的布局。
- 使用组件库时保留官方生成源码、配置和上游版本记录。

### 7.2 Patterns / Composites

- 组合多个基础组件形成稳定的通用模式，例如 `PageHeader`、`FilterBar`、`ResourceTable`、`StatusBadge`、`EmptyState`。
- 只处理可复用的结构、交互和视觉语义。
- 通过 props、slots 或框架惯用 API 注入数据，不把某个 Showcase 的数据写死在组件里。

### 7.3 Blocks

- 组合 Patterns 完成一个可独立迁移的业务区块，例如部署列表、账单表单、设置表单。
- 可以包含该区块的状态计算和数据映射，但不承担全局路由和应用启动。
- 复杂区块继续拆文件，单文件只保留清晰的职责。

### 7.4 Layouts / Page Skeletons

- `Layout` 负责页面框架、导航、内容区和响应式容器。
- `Page Skeleton` 负责页面结构，不绑定某个客户的真实业务数据。
- 通用模板至少考虑营销页、应用工作台、内容页三类骨架；若模板定位更窄，必须在 README 和 Manifest 中说明范围。

### 7.5 Showcase

- Showcase 是可运行的完整示例，负责组合资源和展示真实交互。
- 页面层不重复实现基础组件，不复制另一份相似的表格、弹窗或状态徽标。
- 发布基线至少提供两个完整 Showcase；组件实验室不计入 Showcase 数量。
- Showcase 使用固定 fixture，保证不同实现和不同尺寸下可以比较。

### 7.6 数据与纯逻辑

- 示例数据、筛选、排序、导航解析、格式化和状态计算放在 `lib/` 或独立数据层。
- 核心纯逻辑必须有单元测试。
- 展示层主题、配色和布局不写无意义的单元测试，使用浏览器和人工验收。

## 8. 视觉和交互要求

### 8.1 页面构图

- 页面首先表达主要对象、任务和下一步操作。
- 使用开放式页面区块；卡片只用于真正需要边界的重复条目、弹窗和工具面板。
- 禁止卡片套卡片制造层级。
- 不使用无意义的渐变光球、装饰性 bokeh 或占据主要空间的抽象背景。
- 不让页面退化成标题、描述、按钮和几块伪 UI 的机械拼贴。
- 视觉层次依靠 Token、留白、密度、字体和真实内容形成。

### 8.2 控件和图标

- 已有图标库时优先使用库内图标，不手绘重复 SVG。
- 工具按钮使用图标，并为不熟悉的图标提供可访问名称和悬停提示。
- 二元设置使用开关或复选框；模式使用分段控件；选项集合使用菜单或 Select；数值使用输入、步进器或滑块。
- 如果一个熟悉图标足以表达命令，不使用一块带文字的圆角矩形代替它。
- 按钮、输入、表格、Select、Dialog、Tooltip、导航和 Toast 使用统一的基础组件来源。

### 8.3 内容

- 文案只保留完成任务所需的信息。
- 不在用户界面展示开发备注、版本规划、机械的“标题 + 描述”组合或无意义状态句。
- 不能用“即将支持”“V1 暂不支持”等占位文案掩盖未实现功能；未实现内容从 Showcase 中移除，或清楚标记为开发状态。
- 示例内容要像真实产品，长度、层级和数据量足以暴露布局问题，但不能包含真实个人信息。

### 8.4 响应式

- 设计桌面、平板和手机三种明确结果，不能只让桌面缩小。
- 固定格式元素使用 `aspect-ratio`、稳定网格、最小宽度或容器约束，避免内容改变时布局跳动。
- 长标题、长标签、表格、按钮和错误文案必须有溢出策略。
- 页面在 390px 左右宽度不得出现页面级横向滚动；表格等确需宽度的内容只允许在自身容器内滚动。
- 检查空状态、加载状态、错误状态和数据量变化后的容器高度。

### 8.5 完整状态

适用的组件和页面必须覆盖：

- 默认、悬停、聚焦、按下、选中、禁用。
- 加载、空数据、错误、成功和保存反馈。
- 表单校验、弹窗关闭、键盘导航和焦点回收。
- 浅色 / 深色主题，只有实际完成验收的主题才能写入 Manifest。
- 断网、失败重试或权限不足等会改变页面结构的状态。

## 9. shadcn/ui 基线

当前 UIDevTpl V1 的公开 React 模板统一以 shadcn/ui 为源码和分发基线。其他 AI 制作 React 模板时必须：

1. 保留 `components.json`，固定 style、base color、CSS variables、图标库、alias 和 RSC 配置。
2. 记录 shadcn CLI 精确版本、Registry Schema、底层 primitive、图标库和锁文件版本。
3. 在单个模板实现内固定一条底层组件路线，例如 Base UI 或 Radix，禁止混用未验证的路线。
4. 将官方生成的 `src/components/ui/*` 视为源码基线；产品视觉和页面组合放在独立的 CSS、Patterns、Blocks 和 Showcase 文件中。
5. 不让官网或另一个模板通过共享运行时 UI 包影响当前模板的发布结果。
6. Registry Item 必须从当前固定源码生成。禁止手工维护一份与源码不同的第二套 Registry 组件。
7. 上游 shadcn 更新通过新模板版本吸收，已发布版本继续使用自己的固定源码。

如果目标框架不是 React，仍然要保留相同的源码所有权、版本固定、授权和验证原则；组件库名称、生成方式和 API 按目标生态独立实现。

## 10. Manifest 规范

当前 UIDevTpl V1 的 `packages/schema` 对 Manifest 使用严格 Schema，并拒绝未知字段。独立开发时先保持下面的字段形状；迁入仓库后必须通过仓库的 Manifest 校验。

```json
{
  "schemaVersion": 1,
  "id": "web/react/shadcn/aurora-workspace",
  "version": "1.0.0",
  "family": {
    "id": "aurora-workspace",
    "version": "1.0.0"
  },
  "platform": "web",
  "framework": {
    "id": "react",
    "range": "19.x"
  },
  "componentLibrary": {
    "id": "shadcn",
    "range": "4.x"
  },
  "runtime": "browser",
  "compatibility": {
    "node": "24.x",
    "react": "19.x",
    "typescript": "7.x",
    "buildTools": ["Vite 8.x"]
  },
  "target": {
    "library": {
      "delivery": "source",
      "cliVersion": "4.16.2",
      "registrySchema": "new-york-v4"
    },
    "style": "base-nova",
    "primitive": "base-ui",
    "iconLibrary": "lucide"
  },
  "sourceDirectory": ".uidevtpl/web/react/shadcn/aurora-workspace",
  "artifact": {
    "file": "uidevtpl-web-react-shadcn-aurora-workspace-1.0.0.zip",
    "sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  },
  "availability": "draft"
}
```

字段要求：

- `id` 的四段必须和目录、包名、预览路径一致。
- `family.id` 和 `family.version` 必须指向已有的固定视觉家族版本。
- `platform`、`framework`、`componentLibrary` 和 `runtime` 只写已经实际验证的值。
- `compatibility` 只声明通过构建和迁移验证的版本范围。
- `target` 记录组件库的交付方式和可追溯来源；shadcn 模板必须记录 CLI、Registry Schema、style、primitive 和 icon library。
- `sourceDirectory` 是迁移时保存原始模板的目录，默认使用 `.uidevtpl/<template-id>`。
- `artifact.sha256` 必须是最终 ZIP 的真实 SHA-256，不能使用占位值进入 `published`。
- 当前 Schema 没有 `status`、`name`、`summary`、`entrypoints` 等字段。需要这些信息时，先扩展并版本化 Schema，再同步类型、校验、文档和测试，不能直接添加未知字段。

## 11. 必备文档和资产

### `README.md`

说明模板定位、技术栈、安装和构建命令、入口、组件层次、支持主题、已知限制和许可证。

### `MIGRATION.md`

说明如何把模板迁移进已有项目，至少包含：

- 迁移前检查。
- 推荐的迁移顺序。
- 源文件到目标文件的映射。
- 需要新增、修改或删除的依赖。
- 需要修改的入口、CSS、Provider、字体和构建配置。
- 冲突处理原则和回滚方法。
- 迁移完成后的格式化、类型检查、测试和构建命令。

### `PARITY.md`

记录视觉家族规则到当前实现的映射，包括 Token、基础组件、Patterns、Blocks、页面骨架、状态、响应式和暂未实现的能力。若使用官方生成器，还要记录生成命令、版本和哪些文件保持原样。

### `CHANGELOG.md`

记录版本、变更原因、兼容性影响和需要迁移者注意的事项。

### `LICENSE` 与 `ASSETS-LICENSE.md`

模板自有代码和品牌 / 字体 / 图片 / 图标 / 第三方源码分开说明。没有确认再分发权的资产不得进入发布包。

### `references/` 与 `fixtures/`

参考图和 fixture 必须来自固定版本，覆盖桌面、平板、手机以及组件实验室或主要 Showcase。参考图用于验收，不能代替源码。

## 12. 预览与构建

模板必须在独立项目中完成构建，不能依赖主站运行时才能显示。

推荐命令边界：

```text
typecheck       TypeScript strict 检查
test            核心纯逻辑和数据契约单测
build            模板 library 或源码产物
build:app       Showcase / 独立演示应用产物
preview         仅在用户授权时用于人工查看
```

如果使用 Vite：

- library 产物和应用演示产物使用不同输出目录，例如 `dist` 与 `dist-app`。
- Preview 使用固定版本深链，每个 Showcase 都能通过稳定路径打开。
- 模板 CSS 的源码扫描范围必须覆盖模板 TSX，不能因为 workspace 边界导致 utility class 丢失。
- 浏览器入口不能泄漏不可用的 CommonJS `require` 调用；静态资源返回 200 不代表 React 已经正常运行。
- 预览构建层可以做内存适配，但不要修改官方生成的主题文件来掩盖构建边界问题。

主站和模板预览必须分开构建。主站不能导入模板运行时代码；模板失败时不应阻塞主站构建。预览、下载包、参考图和 Registry 都由同一个固定 Manifest 绑定。

## 13. 迁移规则

AI 迁移模板时必须按以下顺序执行：

1. 确认当前项目目录、项目规则、框架、包管理器和未提交修改。
2. 下载固定版本模板包并校验 SHA-256；校验失败立即停止。
3. 将原始模板解压到 `.uidevtpl/<template-id>`，不得覆盖用户已有文件。
4. 阅读 `manifest.json`、`MIGRATION.md`、源码、状态矩阵、fixture 和参考图。
5. 根据用户需求选择性迁移 Token、字体、基础组件、Patterns、Blocks、Layout 和 Page Skeleton。
6. 保留目标项目原有的业务逻辑、路由、数据访问和部署配置；模板只提供视觉和可复用界面资源，除非用户明确要求替换。
7. 对新增依赖、配置、入口和样式逐项说明，避免静默修改。
8. 生成 `migration.json` 或项目约定的迁移记录，记录源文件、目标文件、源文件 hash、状态、依赖变更和配置变更。
9. 运行目标项目已有的格式化、类型检查、测试和生产构建。
10. 在目标项目规定的桌面和移动尺寸检查视觉与交互，并记录未迁移项和冲突。

迁移禁止事项：

- 禁止整包覆盖用户项目。
- 禁止把模板的示例数据、假路由、演示登录和占位 API 当成用户项目的真实业务逻辑。
- 禁止为了“看起来一样”删除用户已有功能、测试、权限或部署配置。
- 禁止在未确认许可证时复制第三方源码、字体、图片和品牌资产。
- 禁止跳过 hash、类型检查、测试或构建失败继续报告“迁移完成”。

## 14. 发布门禁

### 14.1 自动检查

- Manifest 通过严格 Schema 校验，未知字段、错误 ID、版本和 hash 都失败。
- 所有 workspace 包名唯一，内部依赖显式声明，无循环依赖。
- TypeScript strict、格式化、静态分析、单元测试和生产构建通过。
- 核心纯函数、数据筛选、导航解析、状态计算和迁移映射有单测。
- 模板 library、独立 Showcase 和固定 Preview 分别构建通过。
- 生成的 JavaScript 不包含浏览器运行时无法执行的 CommonJS 调用。
- ZIP、Manifest、参考图和 Registry Item 来自同一源码版本，文件清单、依赖和校验值一致。

### 14.2 浏览器和人工验收

- 至少验证桌面、平板和约 390px 手机宽度。
- 页面级横向溢出为零；表格只在自己的容器内滚动。
- 验证主 Showcase、第二个完整 Showcase 和组件实验室。
- 验证导航、筛选、排序、Select、Dialog、表单保存、Toast、状态切换和移动端菜单等实际交互。
- 验证加载、空、错误、成功、禁用、聚焦和无权限等适用状态。
- 验证键盘操作、焦点可见性、ARIA 名称、对比度和减少动效降级。
- 检查长文案、长标签、大数据量、空数据和错误消息不会撑破布局。
- 预览控制台没有应用错误，固定深链刷新后仍能打开正确 Showcase。

### 14.3 发布包检查

- 不包含 `node_modules`、构建缓存、完整业务脚手架、自动启动脚本和本地密钥。
- 不包含真实个人数据、内部域名、访问令牌、Private Blob URL 或未授权资产。
- 压缩包内只有相对路径，不包含 `..`、绝对路径或符号链接逃逸。
- 解压后无需联网即可阅读源码、Token、契约、迁移说明和许可证。
- 每个发布文件进入 `checksums.json`；ZIP 的真实 SHA-256 写回发布记录。
- 固定版本一旦发布不可覆盖。失败版本不公开，上一稳定版本继续可用。

## 15. 推荐发布顺序

```text
模板源码与 Manifest
  -> 类型检查 / 单测 / 构建
  -> 固定版本 Preview
  -> ZIP / Preview 归档 / 参考图 / Registry / checksums
  -> 上传固定产物
  -> 浏览器 Smoke Test
  -> 最后写入或更新 Publish Record
```

任何一步失败，都不能把版本标记为公开可用。预览地址、模板包、迁移说明、参考图和 Registry 必须绑定同一个 `id + version`。

## 16. 交付清单

交给 UIDevTpl 迁移前，目标模板至少应满足：

- [ ] 视觉家族说明、Token、规则、契约、fixture 和参考图齐全。
- [ ] 模板 ID、家族版本和实现版本已经确定。
- [ ] `manifest.json` 能通过当前 Schema，且没有占位 hash。
- [ ] `README.md`、`MIGRATION.md`、`PARITY.md`、`CHANGELOG.md`、`LICENSE` 和 `ASSETS-LICENSE.md` 齐全。
- [ ] 基础组件、Patterns、Blocks、Layout、Page Skeleton 和 Showcase 已分层。
- [ ] 至少两个完整 Showcase，另有独立组件实验室。
- [ ] 至少覆盖营销、应用、内容三类页面骨架，或书面说明模板为何不适用。
- [ ] 适用的加载、空、错误、成功、禁用、聚焦、移动端和主题状态可运行。
- [ ] 核心纯逻辑有单测，TypeScript strict、构建和已有门禁通过。
- [ ] 桌面、平板、手机浏览器验收通过，页面无横向溢出。
- [ ] shadcn 生成源码、`components.json`、CLI、Registry、primitive 和许可证可追溯。
- [ ] ZIP、Preview、参考图和 Registry 来自同一固定版本。
- [ ] 无秘密、内部 URL、真实个人数据、未授权资产、`node_modules` 和路径逃逸。
- [ ] 已提供源文件到目标文件的迁移映射和依赖 / 配置变更说明。

## 17. 迁入 UIDevTpl 的顺序

1. 先把家族规则、Token、契约、fixture 和参考图归档到 `packages/design-families/<family>`。
2. 再把目标框架源码迁入 `packages/templates/<platform>/<framework>/<component-library>/<template>`。
3. 将 Manifest 接入 `packages/schema`，执行严格校验并补测试。
4. 将 Showcase 接入独立 Preview MPA，绑定固定版本深链。
5. 从同一源码生成 ZIP、Registry、参考图和 checksums。
6. 在 Catalog / Publish Record 中登记模板，确认页面、预览、下载和迁移指令使用同一个版本。
7. 通过仓库完整门禁后，才允许进入公开列表或提交发布。

这份规范描述的是模板交付边界。UIDevTpl 的主站产品范围、平台部署、Blob、账号、统计和运营能力仍由仓库自己的产品与模块文档负责。
