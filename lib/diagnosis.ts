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

export type AiOsArtifact = {
  workspaceName: string;
  northStar: string;
  operatingRules: string[];
  clientProfiles: Array<{
    name: string;
    mission: string;
    usage: string;
  }>;
  starterFiles: Array<{
    path: string;
    purpose: string;
  }>;
  memoryLoop: string[];
  firstActions: string[];
  fileContents: Array<{
    path: string;
    purpose: string;
    content: string;
  }>;
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

export function buildAiOsArtifact(input: IntakeInput, diagnosis: DiagnosisProfile): AiOsArtifact {
  const primaryClient = diagnosis.recommendedClients[0]?.name ?? "Codex + GPT-5 系列";
  const secondaryClient = diagnosis.recommendedClients[1]?.name ?? "Claude Code";
  const workspaceName = input.goal
    ? `${input.goal.replace(/[。！？!?,，]/g, "").slice(0, 24)} AI-OS`
    : "Personal AI-OS";

  const operatingRules = [
    "所有客户端共享同一套目标、角色、任务边界与输出标准。",
    "高风险动作默认人工确认，先保守授权，再逐步放开。",
    "每次关键任务结束后，把有效规则沉淀回 AI-OS，而不是留在聊天记录里。",
    "新项目与新功能默认继承这套规则，而不是重新从 prompt 开始。",
  ];

  if (input.concerns) {
    operatingRules.push(`风险优先级：重点防止 ${input.concerns}。`);
  }

  const clientProfiles = [
    {
      name: primaryClient,
      mission: "作为主力执行客户端，负责文档驱动任务、交付推进、验证与结果落地。",
      usage: "适合长任务、文件修改、工作流编排、端到端交付。",
    },
    {
      name: secondaryClient,
      mission: "作为辅助分析客户端，负责思路梳理、复杂解释、备选方案讨论。",
      usage: "适合研究、复盘、对比方案、长文本理解。",
    },
    {
      name: "ChatGPT / 通用对话层",
      mission: "作为轻量即时协作层，承接快速问答、草稿生成与碎片思考。",
      usage: "适合轻量提问、快速试探、移动端即时记录。",
    },
  ];

  const starterFiles = [
    {
      path: "AI-OS/identity.md",
      purpose: "记录你的角色、目标、工作方式和协作边界。",
    },
    {
      path: "AI-OS/rules.md",
      purpose: "记录统一规则、权限等级、验证要求和禁止事项。",
    },
    {
      path: "AI-OS/workflows.md",
      purpose: "记录高频任务模板、交付步骤、复盘结构和默认输出。",
    },
    {
      path: "AI-OS/clients/codex.md",
      purpose: "记录 Codex / 主力客户端的执行偏好和项目默认链路。",
    },
    {
      path: "AI-OS/clients/claude-code.md",
      purpose: "记录 Claude Code 的分析、重构和长文本协作模式。",
    },
    {
      path: "AI-OS/clients/cursor.md",
      purpose: "记录 Cursor 在 IDE 内补强和局部实现中的使用方式。",
    },
    {
      path: "AI-OS/clients/copilot.md",
      purpose: "记录 Copilot 在代码补全与局部建议中的协作边界。",
    },
    {
      path: "AI-OS/memory/decisions.md",
      purpose: "沉淀关键决策、例外情况和后续沿用规则。",
    },
  ];

  const identityContent = `# Identity

## Role
${input.role || diagnosis.roleLabel}

## North Star
${input.goal || "建立统一 AI 协作系统"}

## Primary Work
${input.tasks || "待补充高频任务"}

## Main Concerns
${input.concerns || "待补充风险边界"}

## Collaboration Style
- Prefer reusable workflows over one-off prompts
- Keep one shared source of truth across AI clients
- Review high-risk actions before execution
`;

  const rulesContent = `# Rules

## Global Rules
${operatingRules.map((item) => `- ${item}`).join("\n")}

## Permission Start Point
- ${diagnosis.permissionMode}

## Verification Standard
- Important tasks should include result checking, not just "no local error"
- New projects inherit these rules by default
`;

  const workflowsContent = `# Workflows

## Priority Templates
${diagnosis.workflowTemplates.map((item) => `- ${item}`).join("\n")}

## Suggested Execution Chain
1. Read identity + rules
2. Clarify task goal and output
3. Select the best client for the task
4. Execute and verify
5. Write reusable learnings back to memory
`;

  const codexClientContent = `# Codex Client Profile

## Mission
${clientProfiles[0].mission}

## Best Use Cases
${clientProfiles[0].usage}

## Default Mode
- Prefer long-running execution for document-driven implementation
- Use local docs and issue mirrors as working evidence
- Keep human confirmation for high-risk real-world actions
`;

  const claudeCodeClientContent = `# Claude Code Client Profile

## Mission
作为长文本分析与方案讨论客户端，帮助拆解复杂问题、比较方案、阅读大段文档与代码。

## Best Use Cases
- 复杂需求澄清
- 代码阅读与重构讨论
- 长文档分析与总结
- 备选实现路径评估

## Working Rules
- 共享同一套 AI-OS identity / rules / workflows
- 重点输出思路、解释、风险和替代方案
- 最终执行标准仍要回到统一验证链路
`;

  const cursorClientContent = `# Cursor Client Profile

## Mission
作为 IDE 内高频补强客户端，负责局部编辑、快速导航、短链路生成与即时修补。

## Best Use Cases
- 局部代码补全
- 小范围重构
- 快速插入样板代码
- 配合主力客户端执行细部实现

## Working Rules
- 遵循 AI-OS 统一规则，不单独漂移
- 更适合局部效率，不承担全链路完成声明
- 关键改动仍需要回到统一验证与证据要求
`;

  const copilotClientContent = `# Copilot Client Profile

## Mission
作为代码补全层，提升局部编码速度，但不承担项目规则源和任务完成判断。

## Best Use Cases
- 代码补全
- 小片段生成
- 重复代码加速
- 简单注释与接口样板

## Working Rules
- 使用 AI-OS 中的统一命名、风格与边界
- 不把 Copilot 生成内容视为已验证结果
- 重要逻辑、发布级改动与任务闭环交给主力客户端处理
`;

  const memoryLoop = [
    "任务前：读取 AI-OS 规则与相关工作流模板。",
    "任务中：记录新的约束、例外和有效做法。",
    "任务后：将可复用经验写回 decisions / workflows / rules。",
    "新项目启动时：默认加载上一轮沉淀后的 AI-OS。",
  ];

  const firstActions = [
    `确认主力客户端：${primaryClient}`,
    `确认默认目标：${input.goal || "建立统一 AI 协作系统"}`,
    "创建 AI-OS 目录骨架并写入 identity / rules / workflows",
    "接入 1-2 个最高价值 MCP，而不是一次接满",
    "选择一个高频任务做首轮闭环验证",
  ];

  const decisionsContent = `# Decisions Memory

## Active Goal
${input.goal || "建立统一 AI 协作系统"}

## Current Bottleneck
${diagnosis.bottleneck}

## Current Preferred Stack
- ${primaryClient}
- ${secondaryClient}

## Next Updates
${firstActions.map((item) => `- ${item}`).join("\n")}
`;

  const fileContents = [
    {
      path: "AI-OS/identity.md",
      purpose: "记录你的角色、目标、工作方式和协作边界。",
      content: identityContent,
    },
    {
      path: "AI-OS/rules.md",
      purpose: "记录统一规则、权限等级、验证要求和禁止事项。",
      content: rulesContent,
    },
    {
      path: "AI-OS/workflows.md",
      purpose: "记录高频任务模板、交付步骤、复盘结构和默认输出。",
      content: workflowsContent,
    },
    {
      path: "AI-OS/clients/codex.md",
      purpose: "记录 Codex / 主力客户端的执行偏好和项目默认链路。",
      content: codexClientContent,
    },
    {
      path: "AI-OS/clients/claude-code.md",
      purpose: "记录 Claude Code 的分析、重构和长文本协作模式。",
      content: claudeCodeClientContent,
    },
    {
      path: "AI-OS/clients/cursor.md",
      purpose: "记录 Cursor 在 IDE 内补强和局部实现中的使用方式。",
      content: cursorClientContent,
    },
    {
      path: "AI-OS/clients/copilot.md",
      purpose: "记录 Copilot 在代码补全与局部建议中的协作边界。",
      content: copilotClientContent,
    },
    {
      path: "AI-OS/memory/decisions.md",
      purpose: "沉淀关键决策、例外情况和后续沿用规则。",
      content: decisionsContent,
    },
  ];

  return {
    workspaceName,
    northStar: `让 AI 按统一规则稳定协作，围绕“${input.goal || "高质量完成关键任务"}”持续复利。`,
    operatingRules,
    clientProfiles,
    starterFiles,
    memoryLoop,
    firstActions,
    fileContents,
  };
}
