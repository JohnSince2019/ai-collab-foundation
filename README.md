# ai-collab-foundation

最后更新：2026-06-28

`ai-collab-foundation` 是一个上游 AI 协作配置系统。

它的目标不是替代 `ContentOps`、`video-ops` 或 `llm-gateway-provider`，而是先为用户生成一套统一的 AI 协作基础层：

- 用户上下文
- 客户端推荐
- MCP 推荐
- 权限与风险边界
- AI-OS 目录
- 工作流模板
- 规则沉淀与复利机制

## 当前阶段

当前项目已进入实施阶段。

已完成：

- 项目总 SOP
- AI 协作底座 PRD + Roadmap
- 输入输出与渐进增强方案
- UI 高保真实现路线
- Next.js 产品骨架已初始化
- 首页、onboarding、configuration 首版页面已落地
- onboarding -> diagnosis -> configuration 首版流程已打通
- AI-OS 结构化输出页已落地
- AI-OS 文件级内容预览已支持
- AI-OS 首版 `.md` 文件已支持真实写出
- 多客户端适配文件已纳入 AI-OS 输出
- 客户端接入安装说明已纳入导出包
- 目标放置位置与接入验证清单已纳入导出包
- 更贴近真实接入的客户端模板文件已纳入导出包
- 候选最终文件与接入检查页已纳入当前产品流
- 本地类型检查与生产构建已通过

下一步优先级：

1. 建立 Linear 项目与 milestones / issues
2. 将首版 UI 与真实输入表单、结果页、AI-OS 文件生成继续增强
3. 启动 `M1` 深化实现：
   - AI 工作流诊断结果页增强
   - 推荐客户端组合逻辑增强
   - GPT Token 入口
   - MCP 推荐与选择
   - 权限配置
   - AI-OS 生成

## 权威规则

本项目默认遵守 Solutions 根目录下的全局交付规则：

- [AI 项目交付标准手册](/Users/john/Desktop/AI/Solutions/AI-Project-Delivery-Manual.md)
- [Project Delivery Operating System](/Users/john/Desktop/AI/Solutions/project-delivery-operating-system.md)

本项目产品总纲：

- [PROJECT-SOP.md](/Users/john/Desktop/AI/Solutions/ai-collab-foundation/PROJECT-SOP.md)

产品规格来源：

- [07-AI协作底座-PRD-Roadmap.md](/Users/john/Desktop/AI/Solutions/ContentOps/docs/strategy-2026-06/07-AI协作底座-PRD-Roadmap.md)
- [08-AI协作底座-用户输入输出与渐进增强方案.md](/Users/john/Desktop/AI/Solutions/ContentOps/docs/strategy-2026-06/08-AI协作底座-用户输入输出与渐进增强方案.md)
