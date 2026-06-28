# M2-03 · 配置 diff 预览与合并建议

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户不是被系统直接“写入配置”，而是先看到差异、理解建议，再决定如何合并。
- English: Instead of directly writing configuration, let the user inspect differences, understand the recommendation, and then decide how to merge.

## Technical / 技术定位

- 中文：针对将要生成的目标文件与现有文件，给出可读的差异预览和合并策略建议。
- English: Provide readable diff previews and merge strategy suggestions between generated target files and existing files.

## Acceptance Criteria / 验收标准

- [x] 中文：系统可展示至少一种结构化 diff 预览。
- [x] English: The system shows at least one structured diff preview.
- [x] 中文：系统可给出“直接新建 / 追加合并 / 保持不动”的建议。
- [x] English: The system recommends create-new, append-merge, or keep-unchanged actions.
- [x] 中文：建议依据可解释，而不是黑盒输出。
- [x] English: Recommendations are explainable rather than opaque.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 该 issue 以结构化 preview、推荐动作和页面/导出一致性为完成依据，已由 Codex 代行验收
- [x] This issue is accepted based on structured preview, merge recommendation, and page/export consistency, with Codex acting as reviewer

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/diff-planner.ts` `/app/ai-os/page.tsx` `/app/ai-os/actions.ts` `/app/setup-check/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 与 `setup-check` 页面均已新增“配置 diff 预览与合并建议”；导出结果已新增 `AI-OS/install/diff-merge-plan.md`
- 截图证据路径：`docs/linear/evidence/joh-178/ai-os.png` `docs/linear/evidence/joh-178/setup-check.png`
- 导出证据路径：`generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/install/diff-merge-plan.md`
- 关联本地 docs/linear 文件：`joh-178-review-pack.md` `current-execution-status.md`
