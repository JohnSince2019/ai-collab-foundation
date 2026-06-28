# M1-09 · Setup Check 引导与最终落位优化

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户在生成 AI-OS 后，不会停在“看到了文件”，而是知道这些文件应该放在哪里、如何验证、如何真正接入自己的工作流。
- English: Ensure that after AI-OS generation, users know where to place files, how to verify setup, and how to actually connect the output into their real workflow.

## Technical / 技术定位

- 中文：增强 `setup-check` 页面与导出结果的最终落位说明、验证步骤和操作引导，缩短从生成到真实使用的距离。
- English: Improve the `setup-check` page and exported outputs with clearer placement guidance, verification steps, and action prompts that shorten the distance from generation to real usage.

## Acceptance Criteria / 验收标准

- [x] 中文：`setup-check` 页面可清晰展示不同客户端的目标放置位置与验证动作。
- [x] English: The `setup-check` page clearly shows target placement locations and verification actions for different clients.
- [x] 中文：页面可区分“已导出但未放置”“已放置待验证”“已接入可使用”等状态。
- [x] English: The page distinguishes among exported-but-not-placed, placed-awaiting-verification, and connected-ready states.
- [x] 中文：至少为 Codex、Claude Code、Cursor 提供具体放置建议。
- [x] English: Provide concrete placement guidance for at least Codex, Claude Code, and Cursor.
- [x] 中文：导出文档与页面中的放置说明保持一致。
- [x] English: Placement guidance remains consistent between the exported docs and the in-app setup page.

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
- 输出路径：`/app/setup-check/page.tsx` `/app/ai-os` `/generated-ai-os/` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`setup-check` 页面已新增接入阶段、Codex / Claude Code / Cursor 放置与验证卡片、以及返回配置入口。
- 截图证据路径：`docs/linear/evidence/joh-136/setup-check.png`
- 2026-06-28 手动验收结论：John 已将后续手动验收委托给 Codex 代行；基于页面截图、导出文档、放置建议与回归结果，当前判定 `JOH-136` 通过，可进入 `Done`。
- 关联本地 docs/linear 文件：`current-execution-status.md`
