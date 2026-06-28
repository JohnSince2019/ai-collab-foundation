# M3-05 · 客户端同步提示与收尾验收

最后更新：2026-06-28

## Business / 业务定位

- 中文：新沉淀下来的规则只有真正回流到客户端里，才会变成长期受益，而不是孤立文档。
- English: New rules only create long-term value when they flow back into clients instead of remaining isolated in docs.

## Technical / 技术定位

- 中文：新增客户端同步提示，让用户知道哪些规则变化需要同步到 `AGENTS.md`、Cursor rules、Claude session 等适配层。
- English: Add client sync prompts so users know which rule changes should be propagated to `AGENTS.md`, Cursor rules, Claude sessions, and other adapters.

## Acceptance Criteria / 验收标准

- [x] 中文：系统能根据新增规则提示需要同步的客户端适配层。
- [x] English: The system can indicate which client adapter layers need syncing based on new rules.
- [x] 中文：提示信息清楚说明同步原因和目标文件。
- [x] English: Sync prompts clearly explain the reason and target file.
- [x] 中文：M3 收尾时形成可验收的复盘 -> 候选 -> 确认 -> 版本 -> 同步闭环。
- [x] English: M3 finishes with a verifiable retrospective -> candidate -> confirm -> version -> sync loop.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 当前阶段先由 Codex 基于页面链路、客户端同步提示和最终回归结果完成首轮验收
- [x] Codex completed the first-pass acceptance based on page flow, client sync prompts, and final regression results

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/app/ai-os/page.tsx` `/app/ai-os/actions.ts` `/app/setup-check/page.tsx` `/lib/retrospective.ts` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 写出后会展示客户端同步提示；`setup-check` 已新增客户端同步提示与收尾验收标准；M3 已形成“复盘 -> 候选 -> 确认 -> 版本 -> 同步”完整闭环
- 关联本地 docs/linear 文件：`m3-linear-seeding-pack.md` `current-execution-status.md`
