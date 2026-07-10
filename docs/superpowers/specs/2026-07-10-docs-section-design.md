# 官网文档区(/docs)— 设计

> 状态:已批准
> 日期:2026-07-10

## 1. 背景与目标

官网 `/docs` 目前是 Placeholder(一句"建设中" + 邮件 CTA)。3Studio 仓库(`3studio-b`)已产出首批面向用户的中文使用文档(`docs/user/`:快速上手、8 篇功能指南、FAQ,共 10 页 + `nav.json` 导航结构)。本项目把这批文档以快照形式搬进官网,替换 Placeholder,成为真实的在线文档区。

依据 3studio-b 的一致性设计稿(`2026-07-08-user-docs-consistency-design.md`):官网只展示发布版快照,目前人工搬运、自动化为后续项。3studio-b 尚无 release tag,首版快照取自当前 dev。

## 2. 已锁定决策

| 决策点 | 结论 |
|---|---|
| 快照方式 | 手动复制进官网仓库 `content/docs/`,来源 commit 写进 git commit message;后续 release 时人工/脚本刷新 |
| 英文站 | `/en/docs` 与 `/zh/docs` 渲染同一份中文内容,页面外壳跟随 locale |
| 功能范围 | 最小版:侧边栏 + 正文。不做搜索、页内 TOC、上一页/下一页 |
| 渲染方案 | react-markdown + remark-gfm(新依赖;理由:文档使用 GFM 表格,且需要用 React 组件覆写链接渲染) |

## 3. 内容快照

- 复制 `3studio-b/docs/user/` 下 10 个 md(**不含 README.md**,那是写作约定)+ `nav.json` 到官网仓库 `content/docs/`,目录结构原样保留(`guides/` 子目录)。
- frontmatter(`title` / `description` / `last_verified_commit`)原样保留;`title`/`description` 供页面 metadata,`last_verified_commit` 首版不在页面展示。

## 4. 路由与渲染

- `app/[locale]/docs/[...slug]/page.tsx`:渲染具体文档页。slug 与文件路径一一对应(`getting-started`、`guides/chat` … `faq`),由 `nav.json` 驱动 `generateStaticParams`,全部静态生成;未知 slug → `notFound()`。
- 现有 `app/[locale]/docs/page.tsx`:从 Placeholder 改为 redirect 到 `/{locale}/docs/getting-started`。`components/Placeholder.tsx` 与 `messages/*.json` 中 `docs` placeholder 文案随之删除(导航 `nav.docs` 标签保留)。
- 服务端读取 md 文件;frontmatter 用自写的极简解析(固定三字段,不引入 gray-matter)。
- react-markdown 渲染正文,`remark-gfm` 支持表格;不启用 raw HTML(文档中的 `<时间>` 等尖括号文本非合法 HTML 标签,react-markdown 会按字面保留)。
- 覆写 `a` 组件:`./xxx.md`、`../faq.md` 等相对 md 链接改写为 `/{locale}/docs/<对应 slug>` 站内 Link;外链(http 开头)照常渲染并 `target="_blank"`。链接改写逻辑抽成纯函数以便测试。
- `generateMetadata` 用 frontmatter 的 `title` / `description`;`sitemap.ts` 补文档路由。

## 5. 布局与样式

- 页面外壳沿用 `<Nav />` + `<Footer />`。
- 桌面端:左侧 sticky 侧边栏(按 `nav.json` 分组,mono 小字组标题,当前页高亮),右侧正文 `max-w-[720px]`。
- 移动端:侧边栏折叠为正文上方的 `<details>` 目录。
- 正文排版:`globals.css` 手写一段 `.docs-prose`(标题、段落、列表、表格、blockquote、inline code,约 40 行),对齐现有暗色 + mono 视觉,不引入 typography 插件。

## 6. 测试与验收

- vitest:
  1. 链接改写纯函数(相对 md 链接 → 路由;外链不动;锚点保留)。
  2. 内容一致性:`nav.json` 每个 `path` 都有对应 md 文件,且 frontmatter 带 `title` / `description`。
- 验收:`pnpm build` 全静态生成通过;`/zh/docs/*` 与 `/en/docs/*` 共 10 页可访问;侧边栏高亮正确;页间链接可点;表格 / blockquote 渲染正常。

## 7. 后续项(本期不做)

- release tag 快照自动化脚本
- 页内 TOC、上一页/下一页、搜索
- 文档英文化
- `last_verified_commit` 新鲜度对读者可见化
