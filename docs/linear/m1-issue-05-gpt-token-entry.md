# M1-05 · GPT Token 入口与商业化承接

最后更新：2026-06-28

## Business / 业务定位

- 中文：让默认推荐不止停留在“推荐 GPT 系列”，而是能承接用户实际接入路径，并为后续商业化转化保留入口。
- English: Extend the recommendation beyond “use GPT models” by giving the user a practical access path and preserving a conversion entry for downstream monetization.

## Technical / 技术定位

- 中文：在配置流程中加入 GPT Token 入口说明、适用对象、接入提示与风险边界，并确保不会阻断无 Token 用户的基础体验。
- English: Add GPT Token entry guidance, target-user fit, setup hints, and risk boundaries in the configuration flow without blocking the baseline product path for users without tokens.

## Acceptance Criteria / 验收标准

- [x] 中文：配置流程可展示 GPT Token 方案的价值说明与适用人群。
- [x] English: The configuration flow shows the GPT Token value proposition and target user fit.
- [x] 中文：系统可区分“已有 Token”“需要接入 Token”“暂不接入”三类状态。
- [x] English: The system distinguishes among “already has token access,” “needs token setup,” and “not using token access yet.”
- [x] 中文：Token 入口不会阻塞用户继续完成 AI-OS 生成。
- [x] English: The Token entry path does not block the user from continuing to AI-OS generation.
- [x] 中文：页面明确说明成本、稳定性和责任边界。
- [x] English: The UI clearly communicates cost, reliability, and responsibility boundaries.

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
- 输出路径：`/app/onboarding` `/app/diagnosis` `/app/configure` `/app/ai-os` `/app/ai-os/actions.ts` `/app/setup-check/page.tsx` `/lib/diagnosis.ts`
- 截图 / 视频 / 日志摘要：已实现 GPT Token 三态输入、配置说明、风险边界展示，并贯穿导出与 setup-check 主链路
- 关联本地 docs/linear 文件：`current-execution-status.md`
