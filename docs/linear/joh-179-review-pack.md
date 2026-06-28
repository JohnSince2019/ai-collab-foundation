# JOH-179 Review Pack

最后更新：2026-06-28

对应 issue：

- `JOH-179` `M2-04 · 敏感信息检查与风险提示`
- Linear 当前状态：`In Progress`

## 1. 本次要验什么

这次验收只针对敏感信息检查与风险提示，不包含后续 `JOH-180` 的 MCP 健康检查。

需要确认的核心点：

1. 系统能提示常见敏感路径或密钥风险
2. 系统能解释为什么这是风险，而不只是红字告警
3. 风险提示能反向影响默认权限建议
4. 页面展示与导出文件 `sensitive-risk-guard.md` 保持一致

## 2. 当前结论

当前实现已经满足以上范围，且验证证据已补齐。

2026-06-28 更新：

- `AI-OS` 页面已新增“敏感信息检查与风险提示”区块
- `setup-check` 页面已新增同名区块
- 导出结果已新增 `AI-OS/install/sensitive-risk-guard.md`
- 基于页面截图、导出文件与自动化回归结果，`JOH-179` 现判定为 `passed`
- 因此该 issue 可以从 `In Progress` 进入 `Done`

## 3. 关键证据

### 风险发现结构

当前系统已输出：

- `severity`
- `status`
- `path`
- `summary`
- `rationale`
- `permissionImpact`

### 权限联动

风险扫描结果当前会输出：

- `recommendedModeOverride`

并在页面上提示是否应下调默认权限起点。

### 页面截图证据

当前本地截图已落盘：

- [ai-os.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-179/ai-os.png)
- [setup-check.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-179/setup-check.png)

### 导出结果

导出目录中已包含：

- `generated-ai-os/建立统一-ai-协作底座-ai-os/AI-OS/install/sensitive-risk-guard.md`

### 自动化回归

已通过：

- `npm run typecheck`
- `npm run build`
- `npm run test:e2e`

## 4. 最新验证结果

人工核对结论：

- 即使当前仓库没有命中真实高危文件，系统也能输出可解释的 watch 级风险与权限影响
- 风险扫描已不只是“有没有敏感文件”，而是已经能参与权限建议
- 页面展示与导出文件保持一致，没有出现“只在 UI 有、写盘没有”的分裂

## 5. Codex 代行验收时重点核对了什么

重点核对了 3 个地方：

1. 风险提示是否解释了“为什么危险”
2. 风险结果是否真的会影响权限建议，而不是只做旁观信息
3. 当前无高危命中时，系统是否仍能给出合理的 watch 级提醒

## 6. 当前边界

当前下一顺位应为：

- `JOH-180`

## 7. 下一步唯一允许动作

当前 `JOH-179` 已判定通过，因此下一步为：

1. 将 `JOH-179` 更新为 `Done`
2. 再按顺序启动下一个 issue：`JOH-180`
