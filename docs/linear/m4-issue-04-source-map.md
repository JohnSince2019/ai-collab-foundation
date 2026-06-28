# M4-04 · 高频素材来源读取与结构化映射

最后更新：2026-06-28

## Business / 业务定位

- 中文：读取高频素材来源，并形成结构化来源映射。
- English: Read recurring source inputs and turn them into a structured source map.

## Technical / 技术定位

- 中文：建立素材来源读取、分类和结构化输出。
- English: Build read, classify, and structured output for recurring source inputs.

## Acceptance Criteria / 验收标准

- [x] 中文：素材来源可读取。
- [x] English: Source inputs can be read.
- [x] 中文：来源结构化输出完成。
- [x] English: Structured source output is completed.
- [x] 中文：可被内容生成上下文复用。
- [x] English: It can be reused by content-generation context.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 本 issue 先聚焦素材来源类别识别与 Source Map 结构化输出，不涉及最终内容效果判断，已由 Codex 基于页面、导出文件和回归测试完成首轮验收
- [x] This issue focuses on source-category identification and structured Source Map output rather than final content quality, and Codex completed first-pass acceptance based on the page, exported files, and regression tests

## Evidence / 执行证据

- 测试命令：`npm run build` / `npm run typecheck` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/diagnosis.ts` `/app/ai-os/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增 `Source Map` 与 `Source 字段说明` 模块；导出结果新增 `AI-OS/contentops/source-map.md` 和 `AI-OS/contentops/source-map.json`，其中包含来源分类、优先顺序、预母稿读取链路和 fallback 方案
- 2026-06-28 验收结论：已完成“读取现有任务、客户端与 MCP 线索 -> 结构化生成 Source Map -> 注入 ContentOps 上下文”的最小闭环，`JOH-192` 可进入 `Done`
- 关联本地 docs/linear 文件：`m4-linear-seeding-pack.md` `current-execution-status.md`
