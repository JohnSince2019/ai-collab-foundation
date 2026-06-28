# JOH-133 Review Pack

最后更新：2026-06-28

对应 issue：

- `JOH-133` `M1-06 · MCP 推荐层与可选接入`
- Linear 当前状态：`In Review`

## 1. 本次要验什么

这次验收只针对 MCP 推荐层与可选接入，不包含后续 `JOH-134` 及之后 issue。

需要确认的核心点：

1. `configure` 页面能展示推荐 / 可选 / 后续 MCP 层级
2. 用户可勾选 MCP，并把选择带到 `ai-os`
3. `ai-os` 页面能正确显示 MCP 选择摘要
4. 导出目录中存在 `AI-OS/mcp/selection.md`
5. `setup-check` 页面能正确显示 MCP 选择结果
6. 即使手工 URL 参数使用 `Linear` / `Knowledge Index`，`setup-check` 仍能正确识别

## 2. 当前结论

当前实现已经满足以上范围，且回归已补齐。

2026-06-28 更新：

- John 已将后续手动验收委托给 Codex 代行
- 基于页面截图、导出文件、自动化回归与人工核对结果，`JOH-133` 现判定为 `passed`
- 因此该 issue 可以从 `In Review` 进入 `Done`

## 3. 关键证据

### 页面链路

- `configure -> ai-os -> setup-check` 已打通
- MCP 选择会贯穿：
  - 页面展示
  - AI-OS 内容预览
  - 导出文件
  - setup-check 验证页

### 页面截图证据

当前本地截图已落盘：

- [onboarding.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-133/onboarding.png)
- [configure.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-133/configure.png)
- [ai-os.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-133/ai-os.png)
- [setup-check.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-133/setup-check.png)

### 导出结果

已确认本地导出目录存在：

- `generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/mcp/selection.md`

其内容当前为：

- `Linear MCP`
- `Knowledge Index MCP`
- fallback 说明
- next step 说明

### 修复记录

验收过程中发现过一个真实问题：

- `setup-check` 页面对手工 URL 参数 `Linear` / `Knowledge Index` 的兼容性不足
- 现已在 [lib/diagnosis.ts](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/lib/diagnosis.ts) 增加 MCP 名称归一化逻辑修复

### 自动化回归

已在 [tests/e2e/smoke.spec.ts](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/tests/e2e/smoke.spec.ts) 增加：

- MCP 勾选状态断言
- `ai-os` 页 MCP 摘要断言
- `setup-check` 对手工 URL 参数 `Linear` / `Knowledge Index` 的回归断言

## 4. 最新验证结果

已通过：

- `npm run typecheck`
- `npm run build`
- `npm run test:e2e`

人工核对结论：

- `setup-check` 页面当前可正确显示 `Linear MCP` 与 `Knowledge Index MCP`
- `ai-os` 页面当前可正确显示 MCP 选择摘要
- 上述 4 个关键页面当前均已有本地截图证据可直接打开查看

## 5. John 验收时建议重点看什么

建议你重点看 3 个地方：

1. `configure` 页面里的 MCP 可选层是否符合你预期
2. `ai-os` 页面里的 MCP 结果摘要和 `AI-OS/mcp/selection.md` 是否一致
3. `setup-check` 页面里的 MCP 选择显示是否和前面一致

## 6. 当前边界

当前仍然不应启动：

- `JOH-134`
- `JOH-135`
- `JOH-136`

原因：

- 你的执行规则要求当前 issue 涉及 UI / 主观验收时，必须先等待 `passed`

## 7. 下一步唯一允许动作

当前手动验收结论已由 Codex 代行并判定通过，因此下一步为：

1. 将 `JOH-133` 从 `In Review` 改为 `Done`
2. 再按顺序启动下一个 issue：`JOH-134`
