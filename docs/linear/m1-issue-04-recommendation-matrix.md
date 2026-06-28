# M1-04 · 推荐矩阵与默认组合增强

最后更新：2026-06-28

## Business / 业务定位

- 中文：让系统不只是展示静态推荐，而是根据用户角色、目标、现有客户端与任务类型，给出更可信的默认组合与替代方案。
- English: Move from static recommendations to a more credible default stack and fallback options derived from the user's role, goal, existing clients, and task patterns.

## Technical / 技术定位

- 中文：增强诊断与配置层的推荐逻辑，形成可解释的推荐矩阵，并在 UI 中输出主推荐、替代推荐与推荐理由。
- English: Strengthen the diagnosis and configuration recommendation logic with an explainable recommendation matrix that outputs a primary stack, alternatives, and rationale in the UI.

## Acceptance Criteria / 验收标准

- [x] 中文：系统可基于用户输入输出主推荐客户端组合，而不是固定文案。
- [x] English: The system outputs a primary recommended client stack derived from user input rather than static copy.
- [x] 中文：系统可展示至少 1 个替代组合及其适用场景。
- [x] English: The system shows at least one alternative stack and when it is a better fit.
- [x] 中文：推荐结果包含可解释理由，覆盖客户端、模型、权限起点与交付方式。
- [x] English: The recommendation includes explainable rationale for client, model, starting permission mode, and delivery style.
- [x] 中文：`diagnosis` 与 `configure` 页面显示的推荐结果保持一致。
- [x] English: Recommendation results remain consistent between the `diagnosis` and `configure` pages.

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
- 输出路径：`/app/diagnosis` `/app/configure` `/app/ai-os` `/lib/diagnosis.ts`
- 截图 / 视频 / 日志摘要：推荐矩阵已改为输入驱动排序；`diagnosis`、`configure`、`ai-os` 已共享同一推荐结果
- 关联本地 docs/linear 文件：`current-execution-status.md`
