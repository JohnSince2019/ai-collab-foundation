# M2-04 · 敏感信息检查与风险提示

最后更新：2026-06-28

## Business / 业务定位

- 中文：在用户把真实工作区接入 AI 协作底座时，尽量提前识别潜在敏感信息和高风险路径，增强长期信任。
- English: When the user connects a real workspace, proactively surface potential sensitive information and high-risk paths to strengthen long-term trust.

## Technical / 技术定位

- 中文：增加对常见敏感目录、环境变量、密钥样式内容和不建议读取区域的检查与提示。
- English: Add checks and warnings for common sensitive directories, environment variables, secret-like content, and discouraged read scopes.

## Acceptance Criteria / 验收标准

- [x] 中文：系统至少能提示常见敏感路径或密钥风险。
- [x] English: The system surfaces common sensitive-path or secret-like risks.
- [x] 中文：系统能解释为什么这是风险，而不只是显示红字告警。
- [x] English: The system explains why the item is risky instead of showing only a warning label.
- [x] 中文：风险提示可以反向影响默认权限建议。
- [x] English: Risk findings can influence the default permission recommendation.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 该 issue 以风险发现结构、权限联动和页面/导出一致性为完成依据，已由 Codex 代行验收
- [x] This issue is accepted based on risk findings, permission impact, and page/export consistency, with Codex acting as reviewer

## Evidence / 执行证据

- 测试命令：`npm run typecheck` / `npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/risk-guard.ts` `/app/ai-os/page.tsx` `/app/ai-os/actions.ts` `/app/setup-check/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 与 `setup-check` 页面均已新增“敏感信息检查与风险提示”；导出结果已新增 `AI-OS/install/sensitive-risk-guard.md`
- 截图证据路径：`docs/linear/evidence/joh-179/ai-os.png` `docs/linear/evidence/joh-179/setup-check.png`
- 导出证据路径：`generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/install/sensitive-risk-guard.md`
- 关联本地 docs/linear 文件：`joh-179-review-pack.md` `current-execution-status.md`
