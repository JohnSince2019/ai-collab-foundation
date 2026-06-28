# M3-03 · 候选规则确认保存到 AI-OS

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户在保存前逐条确认，确保系统是在辅助沉淀，而不是擅自改写共享规则。
- English: Require explicit confirmation before saving so the system assists rule capture rather than rewriting shared rules on its own.

## Technical / 技术定位

- 中文：实现候选规则的确认与选择保存，并按分类写入 `AI-OS/rules.md`、`AI-OS/workflows.md`、`AI-OS/memory/decisions.md`。
- English: Implement candidate confirmation and selective save into `AI-OS/rules.md`, `AI-OS/workflows.md`, and `AI-OS/memory/decisions.md`.

## Acceptance Criteria / 验收标准

- [ ] 中文：用户可以逐条确认候选规则是否保存。
- [ ] English: The user can confirm whether each candidate should be saved.
- [ ] 中文：保存目标与分类结果一致，不混写到错误文件。
- [ ] English: Saved output matches the intended category and target file.
- [ ] 中文：未确认项不会被自动写入共享规则文件。
- [ ] English: Unconfirmed items are not automatically written into shared rule files.

## Test Plan / 测试计划

- [ ] Unit:
- [ ] Smoke:
- [ ] E2E:
- [ ] Regression:

## Manual Validation / 人工验收

- [ ] 若涉及 UI、视觉风格、内容质量、外部平台结果或主观体验，必须等待 John 明确 `passed`
- [ ] If UI, visual style, content quality, external platform result, or subjective experience is affected, wait for John to explicitly say `passed`

## Evidence / 执行证据

- 测试命令：pending
- 测试结果：pending
- 输出路径：pending
- 截图 / 视频 / 日志摘要：pending
- 关联本地 docs/linear 文件：`m3-linear-seeding-pack.md` `current-execution-status.md`
