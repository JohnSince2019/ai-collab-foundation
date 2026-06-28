# M2-02 · 已有规则文件识别与冲突扫描

最后更新：2026-06-28

## Business / 业务定位

- 中文：避免系统把用户已有的规则、说明文档或客户端配置当成空白环境，降低覆盖和冲突风险。
- English: Prevent the system from treating the user's existing rules, docs, or client configs as a blank environment, reducing overwrite and conflict risk.

## Technical / 技术定位

- 中文：识别当前工作区中与 AI 协作底座相关的已有规则文件，并输出来源、状态和潜在冲突点。
- English: Detect existing AI-collaboration-related rule files in the current workspace and report their source, status, and possible conflicts.

## Acceptance Criteria / 验收标准

- [x] 中文：系统可识别 `AGENTS.md`、`.cursor/rules/`、Claude 会话模板等已有规则文件。
- [x] English: The system detects existing rule artifacts such as `AGENTS.md`, `.cursor/rules/`, and Claude session templates.
- [x] 中文：系统可区分“已存在且兼容”“已存在但可能冲突”“不存在可新建”三类状态。
- [x] English: The system distinguishes among already-exists-and-compatible, already-exists-but-may-conflict, and missing-safe-to-create states.
- [x] 中文：检测结果可作为后续 diff 与 merge 建议的输入。
- [x] English: Detection output can be used as input for later diff and merge recommendations.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 该 issue 以结构化识别结果与页面/导出一致性为完成依据，已由 Codex 代行验收
- [x] This issue is accepted based on structured scan output and page/export consistency, with Codex acting as the reviewer

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/rule-scanner.ts` `/app/ai-os/page.tsx` `/app/ai-os/actions.ts` `/app/setup-check/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 与 `setup-check` 页面均已新增“已有规则识别与冲突扫描”；导出结果已新增 `AI-OS/install/existing-rules-scan.md`
- 截图证据路径：`docs/linear/evidence/joh-177/ai-os.png` `docs/linear/evidence/joh-177/setup-check.png`
- 导出证据路径：`generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/install/existing-rules-scan.md`
- 关联本地 docs/linear 文件：`joh-177-review-pack.md` `current-execution-status.md`
