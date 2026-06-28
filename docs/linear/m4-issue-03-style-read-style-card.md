# M4-03 · 表达风格读取与风格卡生成

最后更新：2026-06-28

## Business / 业务定位

- 中文：读取表达风格，并生成可复用的风格卡作为内容生成输入。
- English: Read expression style and generate a reusable style card for downstream generation.

## Technical / 技术定位

- 中文：把风格信息标准化为结构化风格卡。
- English: Normalize style preferences into a structured style card.

## Acceptance Criteria / 验收标准

- [x] 中文：风格信息可被读取。
- [x] English: Style information can be read.
- [x] 中文：风格卡结构清晰。
- [x] English: The style card structure is clear.
- [x] 中文：可被 ContentOps 内容生成调用。
- [x] English: It can be consumed by ContentOps content generation.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 本 issue 先聚焦风格信号读取与 Style Card 结构化输出，不涉及最终内容效果判断，已由 Codex 基于页面、导出文件和回归测试完成首轮验收
- [x] This issue focuses on reading style signals and producing a structured Style Card rather than final content quality, and Codex completed first-pass acceptance based on the page, exported files, and regression tests

## Evidence / 执行证据

- 测试命令：`npm run build` / `npm run typecheck` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/diagnosis.ts` `/app/ai-os/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增 `Style Card` 与 `Style 字段说明` 模块；导出结果新增 `AI-OS/contentops/style-card.md` 和 `AI-OS/contentops/style-card.json`，其中包含语气、句式节奏、结构偏好、表达动作、格式约束和 ContentOps 使用提示
- 2026-06-28 验收结论：已完成“读取现有交付风格与任务语义 -> 结构化生成 Style Card -> 注入 ContentOps 上下文”的最小闭环，`JOH-191` 可进入 `Done`
- 关联本地 docs/linear 文件：`m4-linear-seeding-pack.md` `current-execution-status.md`
