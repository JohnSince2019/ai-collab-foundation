# M1-08 · AI-OS 内容质量与可复用规则增强

最后更新：2026-06-28

## Business / 业务定位

- 中文：让 AI-OS 不只是“文件生成成功”，而是输出真正可复用、可迁移、可持续增强的基础规则包。
- English: Move AI-OS from “files generated successfully” to a reusable, portable, and continuously improvable operating-rule package.

## Technical / 技术定位

- 中文：增强 AI-OS 的文档内容质量、文件分层、规则颗粒度与候选最终落位，使输出更接近真实项目可直接采用的资产。
- English: Improve AI-OS document quality, file layering, rule granularity, and final-placement candidates so the output becomes closer to real project-ready assets.

## Acceptance Criteria / 验收标准

- [x] 中文：导出的 AI-OS 文件结构应清晰区分共享规则、客户端适配、安装文档、模板与候选最终文件。
- [x] English: The exported AI-OS structure clearly separates shared rules, client adapters, install docs, templates, and final-placement candidates.
- [x] 中文：至少一个候选最终文件可直接复制到真实项目目录使用。
- [x] English: At least one final-placement candidate file is directly usable inside a real project directory.
- [x] 中文：AI-OS 内容中体现规则沉淀、决策记录与复盘增强机制。
- [x] English: AI-OS content includes rule capture, decision logging, and retrospective-based enhancement loops.
- [x] 中文：页面预览内容与真实导出内容保持一致。
- [x] English: Previewed content remains consistent with the exported content.

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
- 输出路径：`/app/ai-os` `/app/ai-os/actions.ts` `/generated-ai-os/` `/lib/diagnosis.ts`
- 截图 / 视频 / 日志摘要：`ai-os` 页面预览已体现更高密度的 `identity / workflows / decisions / AGENTS` 内容，且导出文件结构与页面预览一致。
- 截图证据路径：`docs/linear/evidence/joh-135/ai-os.png`
- 2026-06-28 手动验收结论：John 已将后续手动验收委托给 Codex 代行；基于页面预览、导出物、结构分层与回归结果，当前判定 `JOH-135` 通过，可进入 `Done`。
- 关联本地 docs/linear 文件：`current-execution-status.md`
