# M1-00 · UI/UX 高保真落地与截图验收

最后更新：2026-06-28

## Business / 业务定位

- 中文：确保 AI 协作底座的关键页面不只是功能可用，而是在 onboarding、配置、输出、接入检查四个环节形成统一且可信的产品体验。
- English: Ensure the key screens of AI Collab Foundation are not only functional, but also present a coherent and trustworthy experience across onboarding, configuration, output, and setup verification.

## Technical / 技术定位

- 中文：围绕 `onboarding`、`configure`、`ai-os`、`setup-check` 四个页面完成视觉语言统一，并补齐截图证据与手动验收记录。
- English: Align the visual language across the `onboarding`, `configure`, `ai-os`, and `setup-check` screens, then attach screenshot evidence and manual acceptance records.

## Acceptance Criteria / 验收标准

- [x] 中文：配置流程页面具备左侧 stepper 和中间卡片式配置结构。
- [x] English: The configuration flow uses a left stepper and a central card-based configuration layout.
- [x] 中文：onboarding 页的字体颜色、字号、字重、标题层级与配置流程页视觉语言一致。
- [x] English: The onboarding page matches the configuration flow in font color, size, weight, and heading hierarchy.
- [x] 中文：`onboarding`、`configure`、`ai-os`、`setup-check` 均已补齐截图证据。
- [x] English: Screenshot evidence is captured for `onboarding`, `configure`, `ai-os`, and `setup-check`.
- [x] 中文：UI 主观验收已完成并形成结论。
- [x] English: Subjective UI review has been completed and documented.

## Test Plan / 测试计划

- [ ] Unit:
- [x] Smoke:
- [x] E2E:
- [x] Regression:

## Manual Validation / 人工验收

- [x] 该 issue 涉及 UI、视觉风格与主观体验，已由 John 委托 Codex 代行手动验收
- [x] This issue affects UI, visual style, and subjective experience; manual acceptance was delegated by John to Codex

## Evidence / 执行证据

- 测试命令：`npm run build` / `npm run test:e2e`
- 测试结果：passed
- 输出路径：`/app/onboarding/page.tsx` `/app/configure/page.tsx` `/components/ui.tsx`
- 截图证据路径：
  - `docs/linear/evidence/joh-140/onboarding.png`
  - `docs/linear/evidence/joh-140/configure.png`
  - `docs/linear/evidence/joh-140/ai-os.png`
  - `docs/linear/evidence/joh-140/setup-check.png`
- 2026-06-28 手动验收结论：onboarding 与 configure 的字体颜色、字号、字重、标题层级和卡片气质已对齐到同一视觉语言；AI-OS 与 setup-check 也保持了同一套页面系统，因此 `JOH-140` 判定通过，可进入 `Done`。
- 关联本地 docs/linear 文件：`joh-140-review-pack.md` `current-execution-status.md`
