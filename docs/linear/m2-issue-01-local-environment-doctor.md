# M2-01 · 本地环境检测与工作区健康检查

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户在接入 AI 协作底座前，先知道自己当前机器和工作区的基础状态，减少“生成了配置但不知道能不能落地”的不确定性。
- English: Before connecting AI Collab Foundation, help the user understand the baseline state of their machine and workspace so generated configuration feels actionable rather than blind.

## Technical / 技术定位

- 中文：新增本地环境检测能力，输出客户端可用性、工作区基础结构、AI-OS 目标目录状态，以及可直接呈现在页面上的健康检查结果。
- English: Add local environment diagnostics that report client availability, workspace baseline structure, AI-OS target directory state, and a renderable health-check result for the UI.

## Acceptance Criteria / 验收标准

- [x] 中文：系统可以检测至少 `Codex`、`Claude Code`、`Cursor` 三类客户端的本地可用性或配置状态。
- [x] English: The system can detect local availability or configuration state for at least `Codex`, `Claude Code`, and `Cursor`.
- [x] 中文：系统可以展示当前工作区是否已存在 `AI-OS/`、`AGENTS.md`、`.cursor/rules/` 等关键落位目标。
- [x] English: The system shows whether key target locations such as `AI-OS/`, `AGENTS.md`, and `.cursor/rules/` already exist in the current workspace.
- [x] 中文：检测结果能够以结构化方式展示健康状态、风险提示与下一步建议。
- [x] English: The diagnostic result is structured into health states, risk signals, and recommended next actions.
- [x] 中文：页面和导出结果中的环境检测信息保持一致。
- [x] English: Environment diagnostic information stays consistent between the page and exported output.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 该 issue 不以主观 UI 判断为完成条件，已由 Codex 基于页面与导出一致性代行验收
- [x] This issue does not require subjective visual approval as the completion gate; Codex completed acceptance based on page/export consistency

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/environment-doctor.ts` `/app/ai-os/page.tsx` `/app/ai-os/actions.ts` `/app/setup-check/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增本地环境检测区块，`setup-check` 页面新增本地环境健康检查区块，导出结果新增 `AI-OS/install/environment-check.md`
- 截图证据路径：`docs/linear/evidence/joh-176/ai-os.png` `docs/linear/evidence/joh-176/setup-check.png`
- 导出证据路径：`generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/install/environment-check.md`
- 关联本地 docs/linear 文件：`joh-176-review-pack.md` `current-execution-status.md`
