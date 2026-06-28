# M4-02 · 内容边界读取与规则注入

最后更新：2026-06-28

## Business / 业务定位

- 中文：读取内容边界，并把边界约束注入到 AI 协作底座和 ContentOps 上下文中。
- English: Read content boundaries and inject them into both AI Collab Foundation and ContentOps context.

## Technical / 技术定位

- 中文：形成结构化内容边界对象，并接入内容生成前置上下文。
- English: Create a structured content-boundary object and connect it into generation-time context.

## Acceptance Criteria / 验收标准

- [x] 中文：内容边界可被读取。
- [x] English: Content boundaries can be read.
- [x] 中文：边界约束可注入上下文。
- [x] English: Boundary constraints can be injected into context.
- [x] 中文：下游生成可消费该边界。
- [x] English: Downstream generation can consume the boundary.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 本 issue 先聚焦边界对象生成与上下文注入结构，不涉及最终内容效果判断，已由 Codex 基于页面、导出文件、规则注入结果和回归测试完成首轮验收
- [x] This issue focuses on boundary-object generation and context injection rather than final content quality, and Codex completed first-pass acceptance based on the page, exported files, rule-injection results, and regression coverage

## Evidence / 执行证据

- 测试命令：`npm run build` / `npm run typecheck` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/diagnosis.ts` `/app/ai-os/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增 `Content Boundaries 注入` 与 `Boundary 字段说明` 模块；导出结果新增 `AI-OS/contentops/boundaries.md` 和 `AI-OS/contentops/boundaries.json`；`AI-OS/rules.md` 已追加 Content Boundaries 段落，保证全局规则与 ContentOps 上下文共用同一套边界
- 2026-06-28 验收结论：已完成“读取现有风险顾虑与权限边界 -> 结构化生成 Content Boundary -> 注入 AI-OS 规则层与 ContentOps 上下文”的最小闭环，`JOH-190` 可进入 `Done`
- 关联本地 docs/linear 文件：`m4-linear-seeding-pack.md` `current-execution-status.md`
