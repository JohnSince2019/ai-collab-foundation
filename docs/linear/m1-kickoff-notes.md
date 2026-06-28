# M1 Kickoff Notes · 本地配置生成器 MVP

最后更新：2026-06-28

## Milestone Goal

交付 AI 协作底座第一版可运行 MVP，让用户能够：

- 完成 AI 工作流诊断
- 获得客户端与模型推荐
- 获得 MCP 推荐
- 配置权限边界
- 生成 AI-OS 基础输出

## M1 Scope

包含：

1. AI 工作流诊断
2. 推荐客户端组合
3. GPT Token 入口
4. MCP 推荐
5. 权限配置
6. AI-OS 生成
7. UI 高保真 MVP 骨架

不包含：

- 团队空间
- 完整规则沉淀闭环
- 多产品上下文 API
- 企业级权限治理
- 完整 MCP 自动安装和授权流

## Proposed First Build Order

1. 应用骨架初始化
2. Onboarding / AI 工作流诊断页
3. 推荐组合页
4. 权限配置页
5. MCP 推荐页
6. AI-OS 生成结果页

## Validation Rule

M1 的验证不以“页面能打开”结束，而以以下证据为准：

- 关键页面可访问
- 主流程可以从诊断走到结果页
- Playwright 截图已生成
- 关键状态明确：空、加载、错误、成功
- 文案、布局和视觉节奏符合当前 PRD 中定义的参考图策略
