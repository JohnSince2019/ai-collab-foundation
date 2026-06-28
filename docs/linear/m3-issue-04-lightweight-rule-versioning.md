# M3-04 · 规则轻量版本与变更摘要

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户知道规则体系怎么变了、为什么变，避免规则越积越多却没人敢用。
- English: Track how the rule system changes and why so accumulated rules stay understandable and trustworthy.

## Technical / 技术定位

- 中文：为规则沉淀引入轻量版本记录，输出版本号、时间和变更摘要。
- English: Add lightweight version history for rule capture with version number, timestamp, and change summary.

## Acceptance Criteria / 验收标准

- [x] 中文：每次规则保存后都能记录版本号、时间和变更摘要。
- [x] English: Each save records a version number, timestamp, and change summary.
- [x] 中文：版本记录结构清晰，可用于后续回看和比较。
- [x] English: Version history is structured clearly enough for later review and comparison.
- [x] 中文：版本策略保持轻量，不引入过早的复杂配置管理。
- [x] English: The versioning approach stays lightweight and avoids premature complexity.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 当前阶段先由 Codex 基于页面反馈、导出文件抽查和回归结果完成首轮验收
- [x] Codex completed the first-pass acceptance based on UI feedback, exported-file verification, and regression results

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/app/ai-os/actions.ts` `/app/ai-os/page.tsx` `/lib/retrospective.ts` `/lib/diagnosis.ts` `/generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/memory/rule-versions.md`
- 截图 / 视频 / 日志摘要：写出 AI-OS 后，页面新增“规则轻量版本记录”反馈；导出的 `AI-OS/memory/rule-versions.md` 已包含版本号、保存时间和逐条变更摘要
- 关联本地 docs/linear 文件：`m3-linear-seeding-pack.md` `current-execution-status.md`
