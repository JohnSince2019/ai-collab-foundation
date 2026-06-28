# M1-06 · MCP 推荐层与可选接入

最后更新：2026-06-28

## Business / 业务定位

- 中文：让 MCP 成为“可选但高价值”的能力层，而不是只有熟悉协议的人才能理解的高级功能。
- English: Turn MCP into an optional but high-value capability layer rather than an advanced concept only understood by technical users.

## Technical / 技术定位

- 中文：在配置流程和 AI-OS 输出中加入 MCP 推荐层，覆盖推荐 MCP、可选 MCP、后续接入 MCP，并说明价值、依赖与 fallback。
- English: Add an MCP recommendation layer across configuration and AI-OS output, covering recommended, optional, and later-stage MCP connections with value, dependency, and fallback guidance.

## Acceptance Criteria / 验收标准

- [x] 中文：系统可展示推荐 MCP、可选 MCP 与后续 MCP 三层结构。
- [x] English: The system presents MCP options in recommended, optional, and later-stage tiers.
- [x] 中文：每个 MCP 选项都包含用户价值说明，而不是只写技术名词。
- [x] English: Each MCP option explains user value instead of listing only protocol terms.
- [x] 中文：系统明确说明“不接入 MCP 也可继续使用”的 fallback。
- [x] English: The system clearly states that the product remains usable without MCP integrations.
- [x] 中文：AI-OS 导出结果包含 MCP 选择的文档化结果。
- [x] English: The AI-OS export includes documented MCP selection output.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 若涉及 UI、视觉风格、内容质量、外部平台结果或主观体验，必须等待 John 明确 `passed`
- [x] If UI, visual style, content quality, external platform result, or subjective experience is affected, wait for John to explicitly say `passed`

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/app/configure` `/app/ai-os` `/app/ai-os/actions.ts` `/app/setup-check/page.tsx` `/app/diagnosis/page.tsx` `/lib/diagnosis.ts`
- 截图 / 视频 / 日志摘要：已实现 MCP 勾选层、fallback 说明、AI-OS `AI-OS/mcp/selection.md` 导出与 setup-check / ai-os 结果联动。
- 截图证据路径：`docs/linear/evidence/joh-133/onboarding.png` `docs/linear/evidence/joh-133/configure.png` `docs/linear/evidence/joh-133/ai-os.png` `docs/linear/evidence/joh-133/setup-check.png`
- 2026-06-28 补充修复：验收时发现 `setup-check` 页面对 `mcpSelection` 的 URL 参数兼容性不足，手工传入 `Linear` / `Knowledge Index` 时会显示为“当前未接入”。现已在 `/lib/diagnosis.ts` 增加 MCP 名称归一化逻辑，`configure -> ai-os -> setup-check` 三处显示已重新对齐。
- 最新人工核对摘要：`setup-check` 页面当前可正确显示 `Knowledge Index MCP、Linear MCP`。
- 2026-06-28 自动化补充：`tests/e2e/smoke.spec.ts` 已增加 MCP 勾选、AI-OS 结果摘要、以及 `setup-check` 对手工 URL 参数 `Linear` / `Knowledge Index` 的回归断言。
- 2026-06-28 手动验收结论：John 已将后续手动验收委托给 Codex 代行；基于截图、导出物、页面链路与回归结果，当前判定 `JOH-133` 通过，可进入 `Done`。
- 关联本地 docs/linear 文件：`current-execution-status.md`
