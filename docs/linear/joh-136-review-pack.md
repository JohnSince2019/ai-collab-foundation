# JOH-136 Review Pack

最后更新：2026-06-28

对应 issue：

- `JOH-136` `M1-09 · Setup Check 引导与最终落位优化`
- Linear 当前状态：`In Progress`

## 1. 本次要验什么

这次验收只针对 setup-check 的引导与最终落位优化。

需要确认的核心点：

1. `setup-check` 页面可清晰展示不同客户端的目标放置位置与验证动作
2. 页面可区分“已导出但未放置”“已放置待验证”“已接入可使用”等状态
3. 至少为 Codex、Claude Code、Cursor 提供具体放置建议
4. 导出文档与页面中的放置说明保持一致

## 2. 当前结论

当前实现已经满足以上范围，且验证证据已补齐。

2026-06-28 更新：

- John 已将后续手动验收委托给 Codex 代行
- 基于页面截图、导出文档、自动化回归与人工核对结果，`JOH-136` 现判定为 `passed`
- 因此该 issue 可以从 `In Progress` 进入 `Done`

## 3. 关键证据

### 页面增强结果

当前 `setup-check` 已新增：

- 当前接入阶段
- 三段状态：
  - 已导出但未放置
  - 已放置待验证
  - 已接入可使用
- 针对 Codex / Claude Code / Cursor 的放置与验证卡片
- 返回配置与返回 AI-OS 的动作入口

### 页面截图证据

当前本地截图已落盘：

- [setup-check.png](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/docs/linear/evidence/joh-136/setup-check.png)

### 与导出文档的一致性

页面仍然保留并展示：

- `AI-OS/install/target-locations.md`
- `AI-OS/install/verification-checklist.md`

因此：

- 页面上的放置建议与验证动作是对导出文档的可视化承接
- 导出文档与页面中的放置说明保持一致

### 自动化回归

已在 [tests/e2e/smoke.spec.ts](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/tests/e2e/smoke.spec.ts) 增加：

- `当前接入阶段` 断言
- 3 段状态断言
- `Codex / Claude Code / Cursor 放置与验证` 断言

## 4. 最新验证结果

已通过：

- `npm run typecheck`
- `npm run build`
- `npm run test:e2e`

人工核对结论：

- `setup-check` 页面已不再只是文档展示，而具备状态引导和下一步动作感
- 用户现在可以从“已导出”一路理解到“已放置待验证”和“已接入可使用”
- Codex、Claude Code、Cursor 三个客户端都已有明确放置建议与验证动作

## 5. Codex 代行验收时重点核对了什么

重点核对了 3 个地方：

1. 页面是否真的引导用户从“生成文件”走到“接入工作流”
2. 状态划分是否清晰可读，而不是只剩一页静态说明
3. 页面与导出文档之间是否仍保持同一套放置与验证口径

## 6. 当前边界

当前剩余未完成的仅是：

- `JOH-140` `M1-00 · UI/UX 高保真落地与截图验收`

## 7. 下一步唯一允许动作

当前手动验收结论已由 Codex 代行并判定通过，因此下一步为：

1. 将 `JOH-136` 更新为 `Done`
2. 再检查当前批次是否已全部完成，并按你的规则先通知 John，不自动继续扩展范围
