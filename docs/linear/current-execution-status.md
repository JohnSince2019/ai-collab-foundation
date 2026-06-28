# ai-collab-foundation 当前执行状态

最后更新：2026-06-28

## 1. 当前阶段

- 项目状态：`M4 in progress`
- 当前 milestone：`M4 · ContentOps 联动`
- 当前目标：继续推进 `M4 · ContentOps 联动`，当前下一项为 `JOH-192` 高频素材来源读取与结构化映射

## 1.1 Linear 真实项目结构

Linear 项目：`AI Collab Foundation`

已创建 milestones：

- `M0 · 文档与产品定义冻结`
- `M1 · 本地配置生成器 MVP`
- `M2 · 环境诊断与安全合并`
- `M3 · 规则沉淀与复盘`
- `M4 · ContentOps 联动`
- `M5 · 多产品上下文中心`
- `M6 · 团队与商业化验证`

## 2. 当前已完成

- 项目目录已创建：`/Users/john/Desktop/AI/Solutions/ai-collab-foundation`
- 项目总纲已沉淀为 [PROJECT-SOP.md](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/PROJECT-SOP.md)
- PRD / Roadmap 已明确
- 输入输出方案已明确
- UI 高保真实现路线已明确
- 默认产品路径、MCP 选项层、客户端推荐矩阵已明确
- Next.js 技术骨架已初始化
- 首页、`/onboarding`、`/configure` 首版页面已实现
- `onboarding -> diagnosis -> configure` MVP 主链路已实现
- `AI-OS` 结构化输出页已实现
- `AI-OS` 文件级内容预览已实现
- `AI-OS` 首版 `.md` 文件真实写出已实现
- `Codex / Claude Code / Cursor / Copilot` 适配文件已纳入输出
- 客户端接入安装说明已纳入输出
- 客户端目标放置位置与验证清单已纳入输出
- `AGENTS.md / Cursor rules / Claude session` 模板已纳入输出
- 候选最终文件与 setup-check 页面已实现
- 输入驱动的推荐矩阵首版已实现
- `diagnosis` / `configure` / `ai-os` 已共享同一推荐逻辑
- GPT Token 三态入口已实现，并已贯穿 onboarding -> diagnosis -> configure -> ai-os -> export
- MCP 推荐与可选接入首版已实现，并已贯穿 configure -> ai-os -> export -> setup-check
- `setup-check` 对 MCP 选择结果的显示一致性问题已修复
- onboarding / configure / AI-OS / setup-check 四个关键页面的 UI 语言已完成一轮高保真统一
- `JOH-140` 所需截图证据与手动验收结论已补齐
- M2 第一项 `JOH-176` 已完成首版本地环境检测闭环
- M0 / M1 / M2 对应 Linear issues 已全部创建并完成
- `npm run typecheck` 已通过
- `npm run build` 已通过
- `npm run test:e2e` 已通过

## 3. 当前 Linear issue 状态

- `JOH-181` `M0-01 · PRD 与 Roadmap 冻结` -> `Done`
- `JOH-182` `M0-02 · 输入输出与客户端适配定义` -> `Done`
- `JOH-183` `M0-03 · UI/UX 参考与高保真实现流程冻结` -> `Done`
- `JOH-128` `M1-01 · AI 工作流诊断与首版主流程` -> `Done`
- `JOH-129` `M1-02 · AI-OS 输出、预览与真实写出` -> `Done`
- `JOH-130` `M1-03 · 多客户端适配包与接入检查` -> `Done`
- `JOH-131` `M1-04 · 推荐矩阵与默认组合增强` -> `Done`
- `JOH-132` `M1-05 · GPT Token 入口与商业化承接` -> `Done`
- `JOH-133` `M1-06 · MCP 推荐层与可选接入` -> `Done`
- `JOH-134` `M1-07 · 权限边界与风险说明增强` -> `Done`
- `JOH-135` `M1-08 · AI-OS 内容质量与可复用规则增强` -> `Done`
- `JOH-136` `M1-09 · Setup Check 引导与最终落位优化` -> `Done`
- `JOH-140` `M1-00 · UI/UX 高保真落地与截图验收` -> `Done`
- `JOH-176` `M2-01 · 本地环境检测与工作区健康检查` -> `Done`
- `JOH-177` `M2-02 · 已有规则文件识别与冲突扫描` -> `Done`
- `JOH-178` `M2-03 · 配置 diff 预览与合并建议` -> `Done`
- `JOH-179` `M2-04 · 敏感信息检查与风险提示` -> `Done`
- `JOH-180` `M2-05 · MCP 连接状态检测与失败兜底` -> `Done`
- `JOH-184` `M3-01 · 任务后复盘入口与复盘表单` -> `Done`
- `JOH-185` `M3-02 · 规则候选生成与分类` -> `Done`
- `JOH-186` `M3-03 · 候选规则确认保存到 AI-OS` -> `Done`
- `JOH-187` `M3-04 · 规则轻量版本与变更摘要` -> `Done`
- `JOH-188` `M3-05 · 客户端同步提示与收尾验收` -> `Done`
- `JOH-189` `M4-01 · 用户定位读取与 Profile 映射` -> `Done`
- `JOH-190` `M4-02 · 内容边界读取与规则注入` -> `Done`
- `JOH-191` `M4-03 · 表达风格读取与风格卡生成` -> `Done`
- `JOH-192` `M4-04 · 高频素材来源读取与结构化映射` -> `Todo`
- `JOH-193` `M4-05 · 母稿生成上下文注入与联动验收` -> `Todo`
- `JOH-194` `M5-01 · 产品级上下文 API 定义` -> `Todo`
- `JOH-195` `M5-02 · SyncTarget 管理模型` -> `Todo`
- `JOH-196` `M5-03 · LLM Gateway 路由准备` -> `Todo`
- `JOH-197` `M5-04 · video-ops CreatorProfile 对接` -> `Todo`
- `JOH-198` `M6-01 · 团队规则模板` -> `Todo`
- `JOH-199` `M6-02 · 成员权限模型` -> `Todo`
- `JOH-200` `M6-03 · 团队 AI 协作规范` -> `Todo`
- `JOH-201` `M6-04 · 使用成熟度报告与试用验证` -> `Todo`

## 4. 当前结论

- M0、M1、M2、M3 已按串行规则执行完成
- 当前下一执行项为 `JOH-192`，对应 `M4-04 · 高频素材来源读取与结构化映射`
- M4 的执行顺序为：用户定位 -> 内容边界 -> 表达风格 -> 素材来源 -> 母稿注入与联动验收

## 5. 启动前检查

- [x] 项目目标已文字化
- [x] Roadmap 已存在
- [x] PRD 已存在
- [x] 项目目录已建立
- [x] 本地 `docs/linear/` 已建立
- [x] Linear 项目已创建
- [x] Milestones 已创建
- [x] 第一批 issues 已创建
- [x] issue 双语描述与 checklist 已补齐
- [x] 技术骨架已初始化
- [x] 首版诊断表单已接入真实状态
- [x] 首版结果页已接入真实生成逻辑
- [x] AI-OS 结构化输出页已实现

## 6. 下一步建议

下一步重点是继续按 M4 顺序推进：

1. 将 `JOH-192` 设为 `In Progress` 后开始实现 M4-04
2. 每完成一个 M4 issue，都同步更新 Linear 与本地 `docs/linear/`
3. M4 全部 issues 完成后，先向 John 汇报，再等待是否继续进入 M5
