# M2-05 · MCP 连接状态检测与失败兜底

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户知道选了 MCP 并不等于已经可用，系统需要解释当前连接状态、权限边界和失败时怎么继续。
- English: Choosing an MCP does not mean it is ready; the system should explain connection status, permission boundaries, and how to proceed when connection fails.

## Technical / 技术定位

- 中文：对已选 MCP 增加状态检测、失败原因摘要和 fallback 说明，使 MCP 层从“选项”升级为“可验证接入层”。
- English: Add status detection, failure summaries, and fallback guidance for selected MCPs so the MCP layer becomes verifiable rather than just selectable.

## Acceptance Criteria / 验收标准

- [x] 中文：系统可以展示已选 MCP 的连接状态或未检测状态。
- [x] English: The system shows either a detected connection state or an undetected state for selected MCPs.
- [x] 中文：系统能提示常见失败原因与下一步处理建议。
- [x] English: The system surfaces common failure reasons and next-step guidance.
- [x] 中文：即使 MCP 不可用，系统也能解释如何继续使用核心 AI-OS 能力。
- [x] English: Even when MCP is unavailable, the system explains how to proceed with core AI-OS capabilities.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 该 issue 以 MCP 状态、失败原因、fallback 与页面/导出一致性为完成依据，已由 Codex 代行验收
- [x] This issue is accepted based on MCP state, failure reasons, fallback, and page/export consistency, with Codex acting as reviewer

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/mcp-health.ts` `/app/ai-os/page.tsx` `/app/ai-os/actions.ts` `/app/setup-check/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 与 `setup-check` 页面均已新增“MCP 连接状态检测与失败兜底”；导出结果已新增 `AI-OS/install/mcp-health.md`
- 截图证据路径：`docs/linear/evidence/joh-180/ai-os.png` `docs/linear/evidence/joh-180/setup-check.png`
- 导出证据路径：`generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/install/mcp-health.md`
- 关联本地 docs/linear 文件：`joh-180-review-pack.md` `current-execution-status.md`
