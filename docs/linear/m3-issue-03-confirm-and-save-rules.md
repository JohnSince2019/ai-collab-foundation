# M3-03 · 候选规则确认保存到 AI-OS

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户在保存前逐条确认，确保系统是在辅助沉淀，而不是擅自改写共享规则。
- English: Require explicit confirmation before saving so the system assists rule capture rather than rewriting shared rules on its own.

## Technical / 技术定位

- 中文：实现候选规则的确认与选择保存，并按分类写入 `AI-OS/rules.md`、`AI-OS/workflows.md`、`AI-OS/memory/decisions.md`。
- English: Implement candidate confirmation and selective save into `AI-OS/rules.md`, `AI-OS/workflows.md`, and `AI-OS/memory/decisions.md`.

## Acceptance Criteria / 验收标准

- [x] 中文：用户可以逐条确认候选规则是否保存。
- [x] English: The user can confirm whether each candidate should be saved.
- [x] 中文：保存目标与分类结果一致，不混写到错误文件。
- [x] English: Saved output matches the intended category and target file.
- [x] 中文：未确认项不会被自动写入共享规则文件。
- [x] English: Unconfirmed items are not automatically written into shared rule files.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 当前阶段先由 Codex 基于交互闭环、分类写入准确性和导出文件抽查完成首轮验收
- [x] Codex completed the first-pass acceptance based on interaction flow, category-accurate writeback, and exported-file verification

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/app/ai-os/page.tsx` `/app/ai-os/actions.ts` `/lib/retrospective.ts` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增候选勾选确认与“确认保存规则”区块；写出后页面会反馈本次确认保存的候选；导出文件抽查已验证 `rules.md`、`workflows.md`、`memory/decisions.md` 仅按分类写入对应候选内容
- 关联本地 docs/linear 文件：`m3-linear-seeding-pack.md` `current-execution-status.md`
