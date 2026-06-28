import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Cable,
  FolderKanban,
  LockKeyhole,
  MessageSquareCode,
  Sparkles,
  Workflow,
} from "lucide-react";

export type WorkflowStep = {
  id: string;
  label: string;
  caption: string;
  status: "complete" | "current" | "upcoming";
};

export type ClientOption = {
  name: string;
  description: string;
  fit: string;
  recommended?: boolean;
};

export type McpOption = {
  name: string;
  description: string;
  state: "recommended" | "optional" | "later";
};

export type OutcomeCard = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const onboardingHighlights: OutcomeCard[] = [
  {
    title: "5-10 分钟完成最小录入",
    body: "只采集能立即影响推荐与配置的上下文，不做沉重问卷。",
    icon: Sparkles,
  },
  {
    title: "生成统一 AI-OS",
    body: "沉淀目标、权限、任务模板与规则，作为各客户端共享事实源。",
    icon: Bot,
  },
  {
    title: "多客户端适配",
    body: "面向 Codex、Claude Code、Cursor、Copilot 输出可执行建议与配置路径。",
    icon: MessageSquareCode,
  },
];

export const configureSteps: WorkflowStep[] = [
  { id: "diagnosis", label: "工作流诊断", caption: "识别当前成熟度与主要瓶颈", status: "complete" },
  { id: "stack", label: "推荐组合", caption: "客户端、模型、权限、交付链路", status: "current" },
  { id: "mcp", label: "MCP 连接层", caption: "选 1-3 个最高价值接入", status: "upcoming" },
  { id: "rules", label: "规则与边界", caption: "生成 AI-OS 和复用标准", status: "upcoming" },
];

export const recommendedClients: ClientOption[] = [
  {
    name: "Codex + GPT-5 系列",
    description: "文档驱动、Full Access、Goal Mode、Linear 镜像协同最顺手。",
    fit: "推荐给代码项目、复杂交付、Vibe Coding 主场景",
    recommended: true,
  },
  {
    name: "Claude Code",
    description: "适合长文本分析、较强的代码解释与重构讨论。",
    fit: "适合偏研究、梳理、代码阅读",
  },
  {
    name: "Cursor / Copilot",
    description: "适合作为 IDE 内补强层，与主协作底座共用规则。",
    fit: "适合已有 IDE 工作流、追求局部效率",
  },
];

export const recommendedMcp: McpOption[] = [
  {
    name: "Linear MCP",
    description: "把 roadmap、issue、证据和完成条件拉到同一个任务链路里。",
    state: "recommended",
  },
  {
    name: "Knowledge Index MCP",
    description: "将个人文档、知识库、项目 SOP 变成可检索的稳定上下文。",
    state: "recommended",
  },
  {
    name: "Database MCP",
    description: "用于读取业务数据、内容资产和行为指标，支持闭环优化。",
    state: "optional",
  },
  {
    name: "Design Reference MCP",
    description: "后续可接 Mobbin / Figma 类参考源，用于 UI 高保真实现。",
    state: "later",
  },
];

export const outcomeCards: OutcomeCard[] = [
  {
    title: "AI 工作流诊断报告",
    body: "明确你现在最卡在哪：上下文、任务拆解、权限边界还是交付验证。",
    icon: Workflow,
  },
  {
    title: "推荐客户端矩阵",
    body: "告诉你默认主力组合是什么，什么场景应该切换客户端。",
    icon: FolderKanban,
  },
  {
    title: "MCP 与权限建议",
    body: "让接入是可选且可控的，而不是一上来堆技术栈。",
    icon: Cable,
  },
  {
    title: "AI-OS 规则骨架",
    body: "把沉淀下来的规则变成后续项目默认执行的起点。",
    icon: LockKeyhole,
  },
];
