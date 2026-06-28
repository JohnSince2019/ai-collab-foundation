# M4-01 · 用户定位读取与 Profile 映射

最后更新：2026-06-28

## Business / 业务定位

- 中文：读取并映射 ContentOps 所需的用户定位信息，形成上游 Profile 输入。
- English: Read and map user positioning data needed by ContentOps into an upstream profile input.

## Technical / 技术定位

- 中文：建立 AI 协作底座到 ContentOps 的首版用户定位读取与结构化映射。
- English: Build the first structured mapping from AI Collab Foundation into ContentOps user positioning.

## Acceptance Criteria / 验收标准

- [x] 中文：用户定位信息可被读取。
- [x] English: User positioning information can be read.
- [x] 中文：Profile 字段映射清晰可解释。
- [x] English: Profile field mapping is clear and explainable.
- [x] 中文：输出可被 ContentOps 下游使用。
- [x] English: The output can be consumed by downstream ContentOps flows.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 本 issue 先聚焦上游 Profile 读取与映射结构，不涉及最终内容效果判断，已由 Codex 基于页面、导出文件与结构化映射结果完成首轮验收
- [x] This issue focuses on upstream profile read + mapping structure rather than final content quality, and Codex completed first-pass acceptance based on the page, exported files, and structured mapping output

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/diagnosis.ts` `/app/ai-os/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增 `ContentOps Profile 映射` 与 `字段映射说明` 模块；导出结果新增 `AI-OS/contentops/profile.md` 和 `AI-OS/contentops/profile.json`，其中包含用户定位、目标受众、内容支柱、执行偏好和字段来源说明
- 2026-06-28 验收结论：已完成“读取现有用户上下文 -> 结构化映射为 ContentOps Profile -> 页面预览与导出文件可下游消费”的最小闭环，`JOH-189` 可进入 `Done`
- 关联本地 docs/linear 文件：`m4-linear-seeding-pack.md` `current-execution-status.md`
