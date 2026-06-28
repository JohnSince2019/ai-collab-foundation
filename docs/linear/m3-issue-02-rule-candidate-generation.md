# M3-02 · 规则候选生成与分类

最后更新：2026-06-28

## Business / 业务定位

- 中文：把一次复盘中的经验自动整理成候选规则，减少用户“知道有价值但懒得整理”的流失。
- English: Turn retrospective learnings into rule candidates so valuable experience is less likely to be lost.

## Technical / 技术定位

- 中文：基于复盘输入生成规则候选，并分类到全局规则、工作流步骤、决策记录三个层级。
- English: Generate rule candidates from retrospective input and classify them into global rules, workflow steps, and decision notes.

## Acceptance Criteria / 验收标准

- [x] 中文：系统可以从结构化复盘输入中生成候选规则。
- [x] English: The system can generate candidate rules from structured retrospective input.
- [x] 中文：候选规则至少分为 `rules`、`workflows`、`decisions` 三类。
- [x] English: Candidate rules are classified into at least `rules`, `workflows`, and `decisions`.
- [x] 中文：候选结果有生成原因或来源说明，避免黑盒。
- [x] English: Candidate output includes rationale or source explanation to avoid black-box behavior.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 当前阶段先由 Codex 基于页面一致性、分类可解释性和回归结果完成首轮验收
- [x] Codex completed the first-pass acceptance based on UI consistency, explainable classification, and regression results

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/retrospective.ts` `/app/ai-os/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增“规则候选生成与分类”区块，展示 `rules / workflows / decisions` 三类候选，并附带每条候选的生成原因与来源说明
- 关联本地 docs/linear 文件：`m3-linear-seeding-pack.md` `current-execution-status.md`
