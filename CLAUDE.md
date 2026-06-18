# CLAUDE.md

7dawn 官网，Next.js，生产部署在 Vercel。

## Vercel 部署

- **项目**：`7dawn-website-release`（team `tristan074073-6051s-projects`，Hobby 计划），生产域名 `7dawn.ai` / `www.7dawn.ai`。
- **Git 源 = 发布库 `7dawnai/7dawn-website-release` 的 `main` 分支**，与开发库 `7dawnai/7dawn-website` 分离。本地两个 remote：`origin` = 开发库，`release` = 发布库。
- **触发生产部署：`git push release main`**（push 到 `origin` 不会部署）。
- 发布库是 **public**：Vercel Hobby 不支持连接「组织拥有的私有仓库」；若要改回私有，需先把 Vercel 升级到 **Pro**。
- Vercel MCP 已配在 `.mcp.json`（搜文档 / 管项目、部署、日志）；CLI 重连用 `vercel git connect <repo-url> --yes`。
- 确认某次部署来自组织：REST `GET /v6/deployments`，检查 `meta.githubCommitOrg` 应为 `7dawnai`。
