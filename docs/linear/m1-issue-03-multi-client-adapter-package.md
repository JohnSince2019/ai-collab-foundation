# M1-03 · 多客户端适配包与接入检查

最后更新：2026-06-28

## Business / 业务定位

- 中文：让 AI 协作底座不只是通用文档，而是能面向 Codex、Claude Code、Cursor、Copilot 生成首版接入包。
- English: Turn the collaboration foundation from a generic document bundle into a first-pass adapter package for Codex, Claude Code, Cursor, and Copilot.

## Technical / 技术定位

- 中文：生成客户端 profile、安装说明、目标放置位置、验证清单、模板文件，以及 setup-check 页面。
- English: Generate client profiles, install guidance, target placement docs, verification checklists, template files, and a setup-check page.

## Acceptance Criteria / 验收标准

- [x] 中文：导出包包含 `clients/*.md` 多客户端适配文件。
- [x] English: The export package includes multi-client adapter files under `clients/*.md`.
- [x] 中文：导出包包含 `install/adapter-setup.md`、`target-locations.md`、`verification-checklist.md`。
- [x] English: The export package includes `install/adapter-setup.md`, `target-locations.md`, and `verification-checklist.md`.
- [x] 中文：导出包包含 `templates/AGENTS.md.template`、Cursor 规则模板、Claude 会话模板。
- [x] English: The export package includes an `AGENTS.md` template, a Cursor rules template, and a Claude session template.
- [x] 中文：应用内存在 setup-check 页面可查看接入验证内容。
- [x] English: A setup-check page exists in-app for setup verification review.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [ ] 若涉及 UI、视觉风格、内容质量、外部平台结果或主观体验，必须等待 John 明确 `passed`
- [ ] If UI, visual style, content quality, external platform result, or subjective experience is affected, wait for John to explicitly say `passed`

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/clients/` `install/` `templates/`
- 截图 / 视频 / 日志摘要：setup-check 页面可访问；多客户端文件真实导出
- 关联本地 docs/linear 文件：`current-execution-status.md`
