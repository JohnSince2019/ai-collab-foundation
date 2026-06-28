# M4-05 · 母稿生成上下文注入与联动验收

最后更新：2026-06-28

## Business / 业务定位

- 中文：将上游上下文注入母稿生成流程，并完成 ContentOps 联动验收。
- English: Inject upstream context into draft generation and complete ContentOps integration acceptance.

## Technical / 技术定位

- 中文：打通 Profile、边界、风格、素材来源到母稿生成链路。
- English: Connect profile, boundaries, style, and source inputs into the draft-generation path.

## Acceptance Criteria / 验收标准

- [x] 中文：上游上下文注入成功。
- [x] English: Upstream context injection succeeds.
- [x] 中文：ContentOps 能消费该上下文。
- [x] English: ContentOps can consume the context.
- [ ] 中文：联动验收完成。
- [ ] English: Integration acceptance is completed.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [ ] 该 issue 涉及跨产品联动与内容效果，需要 John 最终确认 `passed`
- [ ] This issue affects cross-product integration and content quality, so John must give final `passed`
- [x] 在等待 John 最终确认前，Codex 已完成首轮结构验收：页面预览、导出文件、联动上下文包和自动化回归均已通过
- [x] Before John's final confirmation, Codex completed first-pass structural acceptance: page preview, exported files, integrated context bundle, and automated regressions all passed

## Evidence / 执行证据

- 测试命令：`npm run build` / `npm run typecheck` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/lib/diagnosis.ts` `/app/ai-os/page.tsx` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：`AI-OS` 页面新增 `Draft Context Bundle`、`Draft Context 字段说明`、`Mother Draft Prompt`、`Prompt 字段说明`、`Mother Draft Sample` 和 `Sample 字段说明` 模块；导出结果新增 `AI-OS/contentops/draft-context.md`、`AI-OS/contentops/draft-context.json`、`AI-OS/contentops/mother-draft-prompt.md`、`AI-OS/contentops/mother-draft-prompt.json`、`AI-OS/contentops/mother-draft-sample.md` 和 `AI-OS/contentops/mother-draft-sample.json`，把 Profile / Boundaries / Style Card / Source Map 收束成母稿生成前的联动上下文包，并进一步落成可直接用于生成母稿的 prompt 包与干跑样例；`setup-check` 页面已新增 `ContentOps 联动产物检查` 区块，可显式核对 `profile -> boundaries -> style-card -> source-map -> draft-context -> mother-draft-prompt -> mother-draft-sample` 的导出与验收顺序
- 当前状态：技术实现与自动化回归已完成，待 John 对跨产品联动与内容效果做最终 `passed`
- 关联本地 docs/linear 文件：`m4-linear-seeding-pack.md` `current-execution-status.md`
