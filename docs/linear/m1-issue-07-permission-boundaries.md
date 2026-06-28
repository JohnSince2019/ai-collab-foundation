# M1-07 · 权限边界与风险说明增强

最后更新：2026-06-28

## Business / 业务定位

- 中文：让用户知道系统不是只会“推荐更强权限”，而是会帮助他建立长期可控的人机协作边界。
- English: Show users that the system does not merely push stronger permissions, but helps them build durable and controlled human-AI operating boundaries.

## Technical / 技术定位

- 中文：把权限模式从静态说明增强为可根据用户类型、任务风险与执行场景输出的边界策略，并写入 AI-OS。
- English: Upgrade permission guidance from static explanation to a boundary strategy derived from user type, task risk, and execution context, then persist it into AI-OS outputs.

## Acceptance Criteria / 验收标准

- [x] 中文：系统可展示至少 3 档以上权限模式，并解释适用场景。
- [x] English: The system presents at least three permission modes and explains their fit.
- [x] 中文：系统可明确区分“本地动作”“真实世界动作”“外部系统动作”的确认要求。
- [x] English: The system distinguishes confirmation requirements for local actions, real-world actions, and external-system actions.
- [x] 中文：AI-OS 输出中包含权限边界文档或规则段落。
- [x] English: AI-OS output includes permission-boundary documentation or rule sections.
- [x] 中文：配置页与导出文件中的权限表述保持一致。
- [x] English: Permission wording remains consistent between the configuration UI and exported files.

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
- 输出路径：`/app/configure` `/app/ai-os` `/lib/diagnosis.ts` `/tests/e2e/smoke.spec.ts`
- 截图 / 视频 / 日志摘要：配置页已展示 4 档权限模式、推荐起点、以及本地动作 / 真实世界动作 / 外部系统动作三类确认边界；`AI-OS/permissions/boundaries.md` 已纳入输出与预览。
- 截图证据路径：`docs/linear/evidence/joh-134/configure.png` `docs/linear/evidence/joh-134/ai-os.png`
- 2026-06-28 手动验收结论：John 已将后续手动验收委托给 Codex 代行；基于截图、导出物、页面链路与回归结果，当前判定 `JOH-134` 通过，可进入 `Done`。
- 关联本地 docs/linear 文件：`current-execution-status.md`
