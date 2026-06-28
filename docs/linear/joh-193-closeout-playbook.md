# JOH-193 Closeout Playbook

最后更新：2026-06-28

这份 playbook 只回答一个问题：

如果 John 对 `JOH-193` 给出最终 `passed`，接下来必须按什么顺序收口，才能让 Linear、本地 docs、仓库状态和执行规则保持一致？

## 1. 触发条件

仅当 John 明确给出：

- `passed`

才启动这份 playbook。

如果 John 给出的是补充意见、保留意见或新的验收要求，则不要执行收口，而是回到 `JOH-193` 继续补证据或改实现。

## 2. 收口动作顺序

### Step 1: 更新本地 issue 文档

更新：

- `docs/linear/m4-issue-05-draft-context-injection.md`

需要改动：

- 将“联动验收完成”打勾
- 将人工验收中的 John 最终确认项打勾
- 在 Evidence / 执行证据中补一条最终结论，明确 John 已给出 `passed`

### Step 2: 更新 review pack

更新：

- `docs/linear/joh-193-review-pack.md`

需要改动：

- 把当前建议状态从 `awaiting John passed` 改成最终通过
- 在最后结论处明确：`JOH-193` 已完成最终联动验收

### Step 3: 更新当前执行状态

更新：

- `docs/linear/current-execution-status.md`

需要改动：

- 将 `JOH-193` 状态改为 `Done`
- 将 `M4` 从 in progress 改为 complete
- 下一步不进入 `M5`，而是先向 John 汇报 “M4 已全部完成”

### Step 4: 同步到 Linear

需要同步：

- `JOH-193` description
- `JOH-193` state -> `Done`

注意：

- 只有在本地 docs 已经先改完后，才同步到 Linear

### Step 5: 提交并推送仓库

提交应只包含：

- `JOH-193` 收口相关文档更新

不要把 `next-env.d.ts` 之类的构建副产物混进去。

### Step 6: 停下并汇报

按既定规则：

- 当当前批次所有 issues 都 `Done` 时，先通知 John
- 不自动继续进入 `M5`

因此 `JOH-193` 收口后，必须停下并汇报：

- `M4` 已全部完成
- 当前不会自动进入 `M5`

## 3. 收口完成后的目标状态

完成后应满足：

1. `JOH-193` 在 Linear 中为 `Done`
2. 本地 `docs/linear/` 中 `JOH-193` 相关文档已写明最终通过
3. `current-execution-status.md` 显示 `M4` 已完成
4. 仓库已提交并推送
5. 已明确告知 John：当前批次已完成，等待是否进入下一阶段

## 4. 为什么要有这份 playbook

因为 `JOH-193` 是一个跨产品联动验收 issue：

- 证据多
- 依赖主观最终判断
- 一旦收到 `passed`，需要同时收口本地、Linear 和仓库

这份 playbook 的目的就是避免“明明通过了，但只改了一半状态”的情况。
