# M1-01 · AI 工作流诊断与首版主流程

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户以最小输入完成 onboarding，并获得第一版 AI 工作流诊断结果与默认推荐。
- English: Let the user complete onboarding with minimal input and receive a first-pass AI workflow diagnosis plus a default recommendation.

## Technical / 技术定位

- 中文：实现 `onboarding -> diagnosis -> configure` 主流程，支持基于 URL 参数的状态传递，并确保页面可验证。
- English: Implement the `onboarding -> diagnosis -> configure` primary flow with URL-based state handoff and verifiable page states.

## Acceptance Criteria / 验收标准

- [x] 中文：用户可以提交 onboarding 表单并进入 diagnosis 页。
- [x] English: The user can submit the onboarding form and reach the diagnosis page.
- [x] 中文：diagnosis 页可以展示基于输入生成的成熟度、瓶颈、推荐理由和后续建议。
- [x] English: The diagnosis page shows maturity, bottleneck, recommendation rationale, and next-step guidance derived from input.
- [x] 中文：configure 页能承接诊断上下文。
- [x] English: The configure page carries forward diagnosis context.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [ ] 若涉及 UI、视觉风格、内容质量、外部平台结果或主观体验，必须等待 John 明确 `passed`
- [ ] If UI, visual style, content quality, external platform result, or subjective experience is affected, wait for John to explicitly say `passed`

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/app/onboarding` `/app/diagnosis` `/app/configure`
- 截图 / 视频 / 日志摘要：E2E 主流程通过
- 关联本地 docs/linear 文件：`current-execution-status.md`
