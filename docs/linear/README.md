# ai-collab-foundation · docs/linear

最后更新：2026-06-28

本目录是 `ai-collab-foundation` 的 Linear 本地执行镜像与证据层。

作用：

- 镜像当前 milestones / issues
- 记录实现状态
- 保存测试证据
- 保存人工验收说明
- 让后续 AI 可以无缝接手

最低维护内容：

- `current-execution-status.md`
- issue 级实现说明
- milestone 拆解文档
- 测试和验证证据

执行规则补充：

1. 按 Linear issue 顺序串行执行
2. 当前 issue 未完成前，不进入下一个 issue
3. 开始实现时先改 `In Progress`
4. 完成实现后先跑测试计划
5. 若涉及 UI / 主观验收，等待 John 明确确认后再改 `Done`
6. 当当前批次所有 issues 都 `Done` 时，先通知 John，不自动继续扩展到下一批范围

若与聊天记录或 git commit 冲突，以：

1. 最新 PRD / roadmap
2. Linear issue
3. 本地 `docs/linear/`
4. 代码现状

的顺序判断。
