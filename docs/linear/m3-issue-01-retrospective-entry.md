# M3-01 · 任务后复盘入口与复盘表单

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户在完成一轮任务后，能立刻进入结构化复盘，而不是把经验散落在聊天窗口或脑海里。
- English: Give the user a clear, structured retrospective entry right after a task so learnings do not get lost in chat history or memory.

## Technical / 技术定位

- 中文：在 `AI-OS` 页面新增复盘入口、复盘表单和首版结构化复盘草稿展示，为后续规则候选生成提供稳定输入。
- English: Add a retrospective entry, retrospective form, and first-pass structured retrospective draft to the `AI-OS` page as stable input for later rule candidate generation.

## Acceptance Criteria / 验收标准

- [x] 中文：`AI-OS` 页面出现明确的任务后复盘入口，不依赖隐藏跳转或额外页面。
- [x] English: The `AI-OS` page has a clear post-task retrospective entry without hidden navigation or an extra page requirement.
- [x] 中文：页面展示结构化复盘表单，至少覆盖任务背景、做得好的部分、问题点、建议沉淀方向。
- [x] English: The page shows a structured retrospective form covering task context, what worked, what failed, and what may deserve codification.
- [x] 中文：系统可以基于当前 AI-OS 上下文生成首版复盘草稿或引导提示。
- [x] English: The system can generate a first-pass retrospective draft or guided prompt from the current AI-OS context.
- [x] 中文：该入口与当前 UI 语言保持一致，不破坏既有高保真页面结构。
- [x] English: The entry stays consistent with the current UI language and does not break the existing high-fidelity page structure.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] UI 结构已按既有高保真语言落地，当前先由 Codex 基于页面一致性与回归结果代行首轮验收
- [x] Codex completed the first-pass acceptance based on UI consistency and regression results for this step

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/app/ai-os/page.tsx` `/lib/retrospective.ts` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增“任务后复盘”区块、结构化复盘表单和保存策略说明；E2E 已覆盖该区块可见性
- 截图证据路径：`docs/linear/evidence/joh-184/`
- 关联本地 docs/linear 文件：`m3-linear-seeding-pack.md` `current-execution-status.md`
