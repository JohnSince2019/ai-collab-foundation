# M1 Linear Seeding Pack

最后更新：2026-06-28

这个文件用于把当前本地实施状态快速转录到 Linear，并说明 `M1` 在整个 roadmap 中的位置。

## Roadmap Milestones

当前 PRD 对应的 Linear milestones 已全部创建：

- `M0 · 文档与产品定义冻结`
- `M1 · 本地配置生成器 MVP`
- `M2 · 环境诊断与安全合并`
- `M3 · 规则沉淀与复盘`
- `M4 · ContentOps 联动`
- `M5 · 多产品上下文中心`
- `M6 · 团队与商业化验证`

## 建议先创建的 Milestone

`M1 · 本地配置生成器 MVP`

## 建议先创建的 Issues

1. `M1-01 AI 工作流诊断与首版主流程`
2. `M1-02 AI-OS 输出、预览与真实写出`
3. `M1-03 多客户端适配包与接入检查`

## 建议状态

- `M1-01`: Done
- `M1-02`: Done
- `M1-03`: Done

## 建议在 Linear 中的处理方式

这 3 个 issue 现在不再适合作为 future backlog。

更合适的做法是：

1. 先建立 milestone：`M1 · 本地配置生成器 MVP`
2. 将这 3 个 issue 作为已完成能力录入
3. 在 issue 描述中附上本地证据文档路径
4. 创建下一批真正待开发的 issues，接管后续实现

## 建议下一批新建 Issues

1. `M1-04 推荐矩阵与默认组合增强`
2. `M1-05 GPT Token 入口与商业化承接`
3. `M1-06 MCP 推荐层与可选接入`
4. `M1-07 权限边界与风险说明增强`
5. `M1-08 AI-OS 内容质量与可复用规则增强`
6. `M1-09 Setup Check 引导与最终落位优化`

对应本地文档：

- `m1-issue-04-recommendation-matrix.md`
- `m1-issue-05-gpt-token-entry.md`
- `m1-issue-06-mcp-layer.md`
- `m1-issue-07-permission-boundaries.md`
- `m1-issue-08-ai-os-quality.md`
- `m1-issue-09-setup-check-optimization.md`

## 为什么现在就该建 Linear

- 现在继续开发已经不再是“探索 UI 骨架”，而是在累积多模块可交付功能
- 如果不建 Linear，后续 issue 粒度、完成条件和证据链会再次散落到聊天和 commit 里
- 当前已经有足够清晰的 issue 切分，可以无痛录入

## 建议录入顺序

1. 先建 Milestone
2. 再建 3 个 issue
3. 将本地 `docs/linear/` 文件路径贴到对应 issue 描述里
4. 后续新功能一律先建 issue，再继续实现

## 已同步到真实 Linear

- Project: `AI Collab Foundation`
- Milestone: `M1 · 本地配置生成器 MVP`
- UI issue:
  - `JOH-140` `M1-00 · UI/UX 高保真落地与截图验收` -> `Todo`
- Done:
  - `JOH-128` `M1-01 · AI 工作流诊断与首版主流程`
  - `JOH-129` `M1-02 · AI-OS 输出、预览与真实写出`
  - `JOH-130` `M1-03 · 多客户端适配包与接入检查`
  - `JOH-131` `M1-04 · 推荐矩阵与默认组合增强`
  - `JOH-132` `M1-05 · GPT Token 入口与商业化承接`
- In Review:
  - `JOH-133` `M1-06 · MCP 推荐层与可选接入`
- Todo:
  - `JOH-134` `M1-07 · 权限边界与风险说明增强`
  - `JOH-135` `M1-08 · AI-OS 内容质量与可复用规则增强`
  - `JOH-136` `M1-09 · Setup Check 引导与最终落位优化`

## UI 落地归属

PRD 中已经明确存在 UI/UX 高保真要求，但为了避免“文档里有、Linear 中无 owner”，已单独建 issue：

- `JOH-140` `M1-00 · UI/UX 高保真落地与截图验收`

该 issue 用于承接：

- onboarding 参考图落地
- configure stepper 参考图落地
- 字体颜色、字号、字重与节奏对齐
- Playwright 截图验收证据
