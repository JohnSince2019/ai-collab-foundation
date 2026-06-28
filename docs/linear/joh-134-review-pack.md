# JOH-134 Review Pack

最后更新：2026-06-28

对应 issue：

- `JOH-134` `M1-07 · 权限边界与风险说明增强`
- Linear 当前状态：`In Progress`

## 1. 本次要验什么

这次验收只针对权限边界与风险说明增强，不包含后续 `JOH-135` 及之后 issue。

需要确认的核心点：

1. 系统可展示至少 3 档以上权限模式，并解释适用场景
2. 系统可明确区分“本地动作”“真实世界动作”“外部系统动作”的确认要求
3. `AI-OS` 输出中包含权限边界文档或规则段落
4. 配置页与导出文件中的权限表述保持一致

## 2. 当前结论

当前实现已经满足以上范围，且验证证据已补齐。

2026-06-28 更新：

- John 已将后续手动验收委托给 Codex 代行
- 基于页面截图、导出文件、自动化回归与人工核对结果，`JOH-134` 现判定为 `passed`
- 因此该 issue 可以从 `In Progress` 进入 `Done`

## 3. 关键证据

### 页面链路

- `configure` 页面新增了：
  - 推荐起点
  - 4 档权限模式
  - 本地动作 / 真实世界动作 / 外部系统动作三类确认边界
- `ai-os` 页面新增了：
  - 权限边界策略摘要
  - 三类动作边界展示
  - `AI-OS/permissions/boundaries.md` 文件预览

### 页面截图证据

当前本地截图已落盘：

- [configure.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-134/configure.png)
- [ai-os.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-134/ai-os.png)

### 导出结果

已确认本地导出目录存在：

- `generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/permissions/boundaries.md`

其内容当前包括：

- Starting Mode
- Permission Modes
- Action Boundaries
- Working Rule

### 自动化回归

已在 [tests/e2e/smoke.spec.ts](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/tests/e2e/smoke.spec.ts) 增加：

- 配置页权限模式展示断言
- 本地动作 / 真实世界动作 / 外部系统动作断言
- `AI-OS/permissions/boundaries.md` 文件预览断言
- `# Permission Boundaries` 内容断言

## 4. 最新验证结果

已通过：

- `npm run typecheck`
- `npm run build`
- `npm run test:e2e`

人工核对结论：

- 配置页当前可正确显示 4 档权限模式与 3 类动作边界
- `ai-os` 页面当前可正确显示权限边界策略与 `AI-OS/permissions/boundaries.md`
- 页面文案与导出文件口径一致

## 5. Codex 代行验收时重点核对了什么

重点核对了 3 个地方：

1. 配置页权限区块是否从静态说明升级为结构化边界策略
2. `ai-os` 页面与导出文件是否共享同一套权限口径
3. 动作边界是否明确区分本地动作、真实世界动作、外部系统动作

## 6. 当前边界

当前仍然不应启动：

- `JOH-136`

当前下一顺位应为：

- `JOH-135`

## 7. 下一步唯一允许动作

当前手动验收结论已由 Codex 代行并判定通过，因此下一步为：

1. 将 `JOH-134` 更新为 `Done`
2. 再按顺序启动下一个 issue：`JOH-135`
