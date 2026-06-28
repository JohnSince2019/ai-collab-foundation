# M1-02 · AI-OS 输出、预览与真实写出

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户在完成诊断和配置后，拿到第一版 AI-OS 资产，而不是只看到建议页面。
- English: After diagnosis and configuration, give the user a first AI-OS asset package rather than only a recommendation screen.

## Technical / 技术定位

- 中文：实现 `ai-os` 页面、文件内容预览，以及将 AI-OS `.md` 文件真实写入本地 `generated-ai-os/` 目录。
- English: Implement the `ai-os` page, file-content previews, and real file export into the local `generated-ai-os/` directory.

## Acceptance Criteria / 验收标准

- [x] 中文：AI-OS 页面可展示文件列表和文件内容预览。
- [x] English: The AI-OS page shows a file list and file-content previews.
- [x] 中文：点击写出动作后，系统能把 AI-OS 文件写到本地目录。
- [x] English: After export is triggered, the system writes AI-OS files to a local directory.
- [x] 中文：导出成功后，页面可显示导出路径。
- [x] English: The page shows the export path after successful generation.

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
- 输出路径：`/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/`
- 截图 / 视频 / 日志摘要：已生成 identity/rules/workflows/clients/memory/install/templates
- 关联本地 docs/linear 文件：`current-execution-status.md`
