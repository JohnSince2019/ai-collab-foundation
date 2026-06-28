import { recommendedClients, recommendedMcp, type ClientOption, type McpOption } from "@/lib/data";

export type IntakeInput = {
  role: string;
  goal: string;
  clients: string;
  tasks: string;
  concerns: string;
};

export type DiagnosisProfile = {
  roleLabel: string;
  maturityLabel: string;
  maturityScore: number;
  bottleneck: string;
  summary: string;
  defaultStackReason: string;
  permissionMode: string;
  aiOsFocus: string[];
  workflowTemplates: string[];
  recommendedClients: ClientOption[];
  recommendedMcp: McpOption[];
};

function includesAny(source: string, terms: string[]) {
  return terms.some((term) => source.includes(term));
}

export function buildDiagnosis(input: IntakeInput): DiagnosisProfile {
  const corpus = [input.role, input.goal, input.clients, input.tasks, input.concerns].join(" ").toLowerCase();

  const usesManyClients = input.clients.split(/[、,，/]/).filter(Boolean).length >= 3;
  const mentionsVerificationRisk = includesAny(corpus, ["验证", "风险", "误删", "乱改", "权限", "发布"]);
  const mentionsContent = includesAny(corpus, ["内容", "写作", "选题", "视频", "脚本", "创作"]);
  const mentionsCode = includesAny(corpus, ["代码", "开发", "prd", "需求", "产品", "编程", "项目"]);

  let maturityScore = 62;
  let maturityLabel = "形成中";
  let bottleneck = "规则、权限与客户端切换还没有统一起来。";

  if (usesManyClients) {
    maturityScore += 8;
  }
  if (mentionsVerificationRisk) {
    maturityScore += 5;
  }
  if (input.tasks.length > 24 && input.concerns.length > 16) {
    maturityScore += 5;
  }

  if (maturityScore >= 75) {
    maturityLabel = "进阶使用者";
    bottleneck = "你已经在高频使用 AI，当前更需要把经验沉淀成稳定规则和默认执行链路。";
  }

  const roleLabel = mentionsCode && mentionsContent ? "复合型创作者 / Builder" : mentionsCode ? "Builder / 开发型用户" : mentionsContent ? "内容型用户" : "知识工作者";

  const defaultStackReason = mentionsCode
    ? "你的任务里有明显的文档驱动和交付需求，Codex + GPT-5 系列更适合作为主力执行组合。"
    : "你的任务偏信息整理与工作流配置，先用推荐主力组合建立统一规则，再按场景补其他客户端。";

  const permissionMode = mentionsVerificationRisk
    ? "建议从“可读 + 限制写入 + 高风险动作人工确认”启动。"
    : "建议从“可读 + 可写本地文件 + 真实世界动作人工确认”启动。";

  const aiOsFocus = [
    "统一你的目标、角色、任务边界和表达偏好",
    "把常用任务沉淀成可复用工作流模板",
    "为不同客户端输出同一套基础协作说明",
  ];

  if (mentionsContent) {
    aiOsFocus.push("沉淀内容风格、栏目边界和素材处理规范");
  }
  if (mentionsCode) {
    aiOsFocus.push("沉淀 PRD -> issue -> 实现 -> 验证 -> 证据 的默认交付链路");
  }

  const workflowTemplates = [
    "任务诊断与拆解模板",
    "推荐客户端选择模板",
    "规则沉淀与复盘模板",
  ];

  if (mentionsContent) {
    workflowTemplates.push("内容生产与复用模板");
  }
  if (mentionsCode) {
    workflowTemplates.push("需求到实现的交付模板");
  }

  const clientRanking = [...recommendedClients];
  const mcpRanking = [...recommendedMcp];

  return {
    roleLabel,
    maturityLabel,
    maturityScore: Math.min(maturityScore, 92),
    bottleneck,
    summary: `你当前最适合先建立一个统一 AI 协作底座，把 ${input.clients || "多个客户端"} 和高频任务串到同一套规则里。`,
    defaultStackReason,
    permissionMode,
    aiOsFocus,
    workflowTemplates,
    recommendedClients: clientRanking,
    recommendedMcp: mcpRanking,
  };
}
