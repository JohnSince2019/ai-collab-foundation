import { recommendedClients, recommendedMcp, type ClientOption, type McpOption } from "@/lib/data";

export type IntakeInput = {
  role: string;
  goal: string;
  clients: string;
  tokenStatus: string;
  mcpSelections: string[];
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
  modelRecommendation: string;
  deliveryStyle: string;
  tokenPlan: {
    status: "has-token" | "need-token" | "skip-token";
    label: string;
    guidance: string;
    valueSummary: string;
    riskBoundary: string;
  };
  mcpPlan: {
    selected: string[];
    fallbackMessage: string;
    selectionSummary: string;
  };
  permissionPlan: {
    startMode: {
      name: string;
      label: string;
      summary: string;
      fit: string;
    };
    modes: Array<{
      name: string;
      label: string;
      summary: string;
      fit: string;
    }>;
    actionBoundaries: Array<{
      type: string;
      confirmation: string;
      examples: string;
    }>;
  };
  aiOsFocus: string[];
  workflowTemplates: string[];
  recommendedClients: ClientOption[];
  recommendedMcp: McpOption[];
};

export type ContentOpsProfile = {
  profileVersion: string;
  source: {
    role: string;
    goal: string;
    tasks: string;
    concerns: string;
    diagnosisRoleLabel: string;
    diagnosisDeliveryStyle: string;
    diagnosisPermissionMode: string;
  };
  positioning: {
    role: string;
    archetype: string;
    positioningStatement: string;
    northStar: string;
    primaryOutcome: string;
  };
  audience: {
    primaryAudience: string;
    audienceNeeds: string[];
  };
  topics: {
    coreTopics: string[];
    contentPillars: string[];
  };
  execution: {
    preferredFormats: string[];
    workflowFit: string[];
    riskFocus: string[];
  };
  mappingNotes: Array<{
    targetField: string;
    derivedFrom: string[];
    rationale: string;
  }>;
};

export type ContentBoundaryProfile = {
  boundaryVersion: string;
  source: {
    concerns: string;
    permissionMode: string;
    actionBoundaries: Array<{
      type: string;
      confirmation: string;
      examples: string;
    }>;
    operatingRules: string[];
  };
  boundaries: {
    hardStops: string[];
    reviewRequired: string[];
    preferredGuardrails: string[];
    disallowedClaims: string[];
  };
  injectionTargets: Array<{
    target: string;
    purpose: string;
  }>;
  mappingNotes: Array<{
    targetField: string;
    derivedFrom: string[];
    rationale: string;
  }>;
};

export type AiOsArtifact = {
  workspaceName: string;
  northStar: string;
  contentOpsProfile: ContentOpsProfile;
  contentBoundaryProfile: ContentBoundaryProfile;
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

function normalizeMcpName(value: string) {
  return value
    .toLowerCase()
    .replace(/\s*mcp\s*/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, " ")
    .trim();
}

function normalizeText(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/[。！？!?,，；;]/g, " ")
    .trim();
}

function splitKeywords(value: string) {
  return normalizeText(value)
    .split(/[\s/、]+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 2);
}

function uniqueStrings(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function inferAudience(role: string, goal: string, tasks: string) {
  const corpus = `${role} ${goal} ${tasks}`.toLowerCase();
  if (includesAny(corpus, ["内容", "创作", "写作", "视频", "脚本", "选题"])) {
    return {
      primaryAudience: "希望持续输出内容并建立个人影响力的受众",
      audienceNeeds: [
        "需要高质量、可持续复用的内容框架",
        "需要明确定位、边界与表达方式",
        "需要稳定的内容生产与复盘机制",
      ],
    };
  }
  if (includesAny(corpus, ["开发", "代码", "产品", "需求", "项目", "技术"])) {
    return {
      primaryAudience: "需要把复杂工作流结构化的开发者与产品型用户",
      audienceNeeds: [
        "需要更稳定的任务拆解与执行链路",
        "需要统一规则、验证与证据标准",
        "需要多客户端协作但不想重复解释上下文",
      ],
    };
  }
  return {
    primaryAudience: "需要统一 AI 协作方式的知识工作者",
    audienceNeeds: [
      "需要减少重复说明成本",
      "需要更可控的 AI 权限和边界",
      "需要把经验沉淀成可复用流程",
    ],
  };
}

function inferFormats(goal: string, tasks: string) {
  const corpus = `${goal} ${tasks}`.toLowerCase();
  const formats = ["结构化母稿", "清单式提纲"];

  if (includesAny(corpus, ["写作", "长文", "文章", "公众号"])) {
    formats.push("长文内容稿");
  }
  if (includesAny(corpus, ["视频", "脚本"])) {
    formats.push("视频脚本");
  }
  if (includesAny(corpus, ["复盘", "研究", "分析", "报告"])) {
    formats.push("分析复盘稿");
  }

  return uniqueStrings(formats);
}

export function buildContentOpsProfile(input: IntakeInput, diagnosis: DiagnosisProfile): ContentOpsProfile {
  const goal = input.goal || diagnosis.summary;
  const tasks = input.tasks || diagnosis.workflowTemplates.join("、");
  const concerns = input.concerns || diagnosis.bottleneck;
  const role = input.role || diagnosis.roleLabel;
  const roleKeywords = splitKeywords(role);
  const goalKeywords = splitKeywords(goal);
  const taskKeywords = splitKeywords(tasks);
  const audience = inferAudience(role, goal, tasks);

  const archetype = includesAny(`${role} ${goal} ${tasks}`.toLowerCase(), ["内容", "创作", "写作", "视频"])
    ? "内容驱动型创作者"
    : includesAny(`${role} ${goal} ${tasks}`.toLowerCase(), ["开发", "代码", "产品", "项目"])
      ? "产品与交付驱动型 Builder"
      : "复合型知识工作者";

  const coreTopics = uniqueStrings(
    [...goalKeywords, ...taskKeywords]
      .filter((item) => item.length >= 2)
      .slice(0, 6),
  );

  const contentPillars = uniqueStrings([
    goal || diagnosis.summary,
    tasks.split(/[，,、]/).map((item) => item.trim()).find(Boolean) ?? tasks,
    diagnosis.deliveryStyle,
  ]).slice(0, 3);

  const riskFocus = uniqueStrings(
    concerns
      .split(/[，,、]/)
      .map((item) => item.trim())
      .filter(Boolean),
  );

  return {
    profileVersion: "v0.1.0",
    source: {
      role: input.role,
      goal: input.goal,
      tasks: input.tasks,
      concerns: input.concerns,
      diagnosisRoleLabel: diagnosis.roleLabel,
      diagnosisDeliveryStyle: diagnosis.deliveryStyle,
      diagnosisPermissionMode: diagnosis.permissionMode,
    },
    positioning: {
      role,
      archetype,
      positioningStatement: `${role}，当前核心目标是 ${goal}，并希望通过统一 AI 协作流程把 ${tasks} 变成稳定可复用的内容或交付资产。`,
      northStar: goal,
      primaryOutcome: `围绕“${goal}”持续输出可复用、可验证、可沉淀的内容资产。`,
    },
    audience,
    topics: {
      coreTopics,
      contentPillars,
    },
    execution: {
      preferredFormats: inferFormats(goal, tasks),
      workflowFit: uniqueStrings([
        diagnosis.deliveryStyle,
        "先读 Profile，再生成内容",
        "重要内容先约束边界，再进入母稿生成",
      ]),
      riskFocus,
    },
    mappingNotes: [
      {
        targetField: "positioning.positioningStatement",
        derivedFrom: ["role", "goal", "tasks"],
        rationale: "把用户身份、当前目标和高频任务组合成 ContentOps 可直接理解的定位陈述。",
      },
      {
        targetField: "audience.*",
        derivedFrom: ["role", "goal", "tasks", "diagnosis.roleLabel"],
        rationale: "依据用户类型与任务语义推断首版目标受众和核心需求，方便下游先生成更贴近场景的内容。",
      },
      {
        targetField: "topics.coreTopics / topics.contentPillars",
        derivedFrom: ["goal", "tasks", "diagnosis.deliveryStyle"],
        rationale: "先从目标、任务和交付方式里提取最稳定的话题主轴，作为内容母稿输入。",
      },
      {
        targetField: "execution.riskFocus",
        derivedFrom: ["concerns", "diagnosis.permissionMode"],
        rationale: "把用户最担心的错误前置成内容生产风险提示，避免下游生成阶段忽略边界。",
      },
    ],
  };
}

function scoreClient(option: ClientOption, corpus: string) {
  let score = 0;

  if (option.name.includes("Codex")) {
    if (includesAny(corpus, ["代码", "开发", "prd", "需求", "产品", "编程", "项目"])) score += 4;
    if (includesAny(corpus, ["linear", "交付", "验收", "验证", "roadmap"])) score += 3;
  }

  if (option.name.includes("Claude")) {
    if (includesAny(corpus, ["研究", "分析", "阅读", "长文", "总结", "方案"])) score += 4;
    if (includesAny(corpus, ["重构", "解释", "梳理"])) score += 2;
  }

  if (option.name.includes("Cursor") || option.name.includes("Copilot")) {
    if (includesAny(corpus, ["ide", "编辑器", "局部", "补全", "修复"])) score += 4;
    if (includesAny(corpus, ["效率", "快速", "日常开发"])) score += 2;
  }

  if (includesAny(corpus, ["内容", "写作", "选题", "视频", "脚本", "创作"])) {
    if (option.name.includes("Claude")) score += 2;
    if (option.name.includes("Codex")) score += 1;
  }

  return score;
}

function scoreMcp(option: McpOption, corpus: string) {
  let score = 0;

  if (option.name.includes("Linear") && includesAny(corpus, ["linear", "项目", "交付", "roadmap", "issue", "需求"])) {
    score += 4;
  }
  if (option.name.includes("Knowledge") && includesAny(corpus, ["知识", "文档", "sop", "规范", "内容", "资料"])) {
    score += 4;
  }
  if (option.name.includes("Database") && includesAny(corpus, ["数据", "数据库", "指标", "行为", "资产"])) {
    score += 4;
  }
  if (option.name.includes("Design") && includesAny(corpus, ["ui", "ux", "figma", "mobbin", "设计", "高保真"])) {
    score += 4;
  }

  return score;
}

export function buildDiagnosis(input: IntakeInput): DiagnosisProfile {
  const corpus = [input.role, input.goal, input.clients, input.tokenStatus, input.mcpSelections.join(" "), input.tasks, input.concerns].join(" ").toLowerCase();
  const normalizedSelections = new Set(input.mcpSelections.map(normalizeMcpName));

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

  const permissionMode = mentionsVerificationRisk
    ? "建议从“可读 + 限制写入 + 高风险动作人工确认”启动。"
    : "建议从“可读 + 可写本地文件 + 真实世界动作人工确认”启动。";
  const permissionModes = [
    {
      name: "advisory",
      label: "只建议",
      summary: "只做分析、规划和建议，不直接触发文件修改或命令执行。",
      fit: "适合高风险决策、陌生领域探索、需要先确认方向的任务。",
    },
    {
      name: "read",
      label: "可读",
      summary: "允许读取代码、文档、知识库和任务系统，但不直接改动。",
      fit: "适合诊断、审阅、信息汇总、需求理解与方案比较。",
    },
    {
      name: "write",
      label: "可写",
      summary: "允许修改本地文件，但重要变更需要提交门和结果验证。",
      fit: "适合 PRD 落地、代码改动、文档整理和结构化交付。",
    },
    {
      name: "execute",
      label: "可执行",
      summary: "允许运行本地命令，但高风险动作仍需人工确认。",
      fit: "适合需要测试、构建、脚本执行和端到端验证的项目任务。",
    },
  ] as const;
  const startModeName = mentionsVerificationRisk ? "read" : mentionsCode ? "write" : "read";
  const startMode = permissionModes.find((item) => item.name === startModeName) ?? permissionModes[1];
  const actionBoundaries = [
    {
      type: "本地动作",
      confirmation: "可在当前权限范围内默认执行，但关键改动后必须验证结果。",
      examples: "读取文件、修改本地代码、生成文档、运行 lint / test / build。",
    },
    {
      type: "真实世界动作",
      confirmation: "必须人工确认后再执行，不因本地无报错而自动视为完成。",
      examples: "发布、付款、删除重要数据、发送消息、提交最终生产变更。",
    },
    {
      type: "外部系统动作",
      confirmation: "默认保守处理；只有明确授权和目标系统上下文完整时才允许推进。",
      examples: "写入数据库、改动第三方项目管理系统、调用生产 API、修改线上配置。",
    },
  ];

  const modelRecommendation = mentionsCode
    ? "GPT-5 系列高推理模型"
    : mentionsContent
      ? "GPT-5 系列通用高质量模型"
      : "GPT-5 系列通用模型";

  const deliveryStyle = mentionsCode
    ? "PRD -> issue -> 实现 -> 验证 -> 证据"
    : mentionsContent
      ? "选题 -> 产出 -> 复核 -> 沉淀"
      : "目标 -> 任务 -> 执行 -> 复盘";

  const tokenStatus = (input.tokenStatus || "need-token") as DiagnosisProfile["tokenPlan"]["status"];
  const tokenPlan =
    tokenStatus === "has-token"
      ? {
          status: tokenStatus,
          label: "已有 Token",
          guidance: "你已经具备稳定接入条件，配置重点应转向默认模型、成本预算和高频工作流绑定。",
          valueSummary: "适合直接把 GPT 质量优势接入日常协作，减少额外切换成本。",
          riskBoundary: "仍需明确额度、稳定性和供应责任边界，不把外部 Token 视为平台官方 SLA。",
        }
      : tokenStatus === "skip-token"
        ? {
            status: tokenStatus,
            label: "暂不接入 Token",
            guidance: "先完成主流程搭建和 AI-OS 生成，后续再补 Token 层，不影响当前协作底座建立。",
            valueSummary: "适合先验证工作流价值，再决定是否接入更高质量模型能力。",
            riskBoundary: "当前不承诺 GPT Token 路径，避免在未准备好时引入新的成本和依赖。",
          }
        : {
            status: tokenStatus,
            label: "需要接入 Token",
            guidance: "建议保留 GPT Token 入口，作为默认高质量模型方案的接入通道，但不阻塞当前主流程。",
            valueSummary: "适合希望获得更高质量与更好性价比的人群，后续可承接商业化转化。",
            riskBoundary: "需要提前说明费用、稳定性和责任边界，避免把通道能力误解为零风险基础设施。",
          };

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

  const clientRanking = [...recommendedClients]
    .map((option) => {
      const score = scoreClient(option, corpus);
      let rationale = "适合作为辅助层，补足主力客户端覆盖不到的场景。";

      if (option.name.includes("Codex")) {
        rationale = mentionsCode
          ? "你当前任务明显带有项目交付、文档驱动或代码执行特征，它更适合作为主力推进端到端工作。"
          : "即使不以代码为主，它也适合承接结构化执行、文件落地和可验证交付。";
      } else if (option.name.includes("Claude")) {
        rationale = mentionsContent || includesAny(corpus, ["研究", "分析", "阅读", "总结"])
          ? "你当前需要较强的长文本理解、研究和方案梳理能力，它适合作为分析与解释层。"
          : "它适合作为第二客户端，承接复杂解释、备选方案和长文档处理。";
      } else if (option.name.includes("Cursor") || option.name.includes("Copilot")) {
        rationale = "适合作为 IDE 内局部加速层，用于补全、修复和小范围实现，而不是全链路完成判断。";
      }

      return {
        ...option,
        recommended: false,
        model: option.name.includes("Codex") ? modelRecommendation : option.name.includes("Claude") ? "高质量长文本模型" : "IDE 内默认模型",
        permissionMode: option.name.includes("Codex")
          ? permissionMode
          : option.name.includes("Claude")
            ? "建议从“可读 + 方案讨论”为主启动。"
            : "建议从“局部辅助 + 人工确认合并”启动。",
        deliveryStyle: option.name.includes("Codex")
          ? deliveryStyle
          : option.name.includes("Claude")
            ? "问题理解 -> 方案比较 -> 输出建议"
            : "局部编辑 -> 人工复核 -> 合并到主流程",
        rationale,
        _score: score,
      };
    })
    .sort((a, b) => b._score - a._score || Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)) || a.name.localeCompare(b.name))
    .map((option, index) => {
      const { _score, ...rest } = option as ClientOption & { _score: number };
      return { ...rest, recommended: index === 0 };
    });

  const defaultStackReason = `默认推荐 ${clientRanking[0]?.name ?? "主力组合"}，因为${clientRanking[0]?.rationale ?? "它最适合当前任务"}。`;

  const mcpRanking = [...recommendedMcp]
    .map((option) => {
      const score = scoreMcp(option, corpus);
      let state: McpOption["state"] = option.state;
      let rationale = option.description;

      if (option.name.includes("Linear")) {
        rationale = "适合把 roadmap、issue、证据和完成条件拉进同一执行链路，减少聊天驱动漂移。";
      } else if (option.name.includes("Knowledge")) {
        rationale = "适合把个人文档、SOP 和长期知识沉淀成可检索的共享上下文。";
      } else if (option.name.includes("Database")) {
        rationale = "适合把业务数据、资产和指标接进来，支持更强的闭环优化。";
      } else if (option.name.includes("Design")) {
        rationale = "适合在 UI 高保真阶段接设计参考源，而不是一开始就增加复杂度。";
      }

      if (score >= 4) {
        state = "recommended";
      } else if (score >= 2 && state === "later") {
        state = "optional";
      }

      const selected = normalizedSelections.has(normalizeMcpName(option.name));
      return { ...option, state, rationale, selected, _score: score };
    })
    .sort((a, b) => b._score - a._score || a.name.localeCompare(b.name))
    .map((option) => {
      const { _score, ...rest } = option as McpOption & { _score: number };
      return rest;
    });

  const selectedMcp = mcpRanking.filter((item) => item.selected).map((item) => item.name);
  const mcpPlan = selectedMcp.length > 0
    ? {
        selected: selectedMcp,
        fallbackMessage: "即使后续关闭这些 MCP，AI-OS 仍可继续作为本地规则层使用。",
        selectionSummary: `已选择 ${selectedMcp.join("、")} 作为当前接入层。`,
      }
    : {
        selected: [],
        fallbackMessage: "当前未接入任何 MCP，也可以继续使用 AI-OS、客户端适配文件和本地规则沉淀。",
        selectionSummary: "当前选择先不接入 MCP，后续可按真实需求逐步补上。",
      };

  return {
    roleLabel,
    maturityLabel,
    maturityScore: Math.min(maturityScore, 92),
    bottleneck,
    summary: `你当前最适合先建立一个统一 AI 协作底座，把 ${input.clients || "多个客户端"} 和高频任务串到同一套规则里。`,
    defaultStackReason,
    permissionMode,
    modelRecommendation,
    deliveryStyle,
    tokenPlan,
    mcpPlan,
    permissionPlan: {
      startMode,
      modes: permissionModes.map((item) => ({ ...item })),
      actionBoundaries,
    },
    aiOsFocus,
    workflowTemplates,
    recommendedClients: clientRanking,
    recommendedMcp: mcpRanking,
  };
}

export function buildContentBoundaryProfile(
  input: IntakeInput,
  diagnosis: DiagnosisProfile,
  operatingRules: string[],
): ContentBoundaryProfile {
  const concernItems = uniqueStrings(
    (input.concerns || diagnosis.bottleneck)
      .split(/[，,、]/)
      .map((item) => item.trim())
      .filter(Boolean),
  );

  const hardStops = uniqueStrings([
    "不要在未确认前执行真实世界动作、发布、删除、付款或外部写入。",
    "不要把未验证内容声明为已完成、已正确或可直接发布。",
    ...concernItems.map((item) => `重点避免：${item}`),
  ]);

  const reviewRequired = uniqueStrings([
    "涉及高风险动作、跨系统写入、公开发布或不可逆操作时，必须人工复核。",
    "当内容可能偏离角色定位、目标受众或任务目标时，先回到 Profile 重新对齐。",
    "当输出引用事实、结论或建议时，需要做来源与边界检查。",
  ]);

  const preferredGuardrails = uniqueStrings([
    diagnosis.permissionMode,
    "先读 ContentOps Profile，再生成内容母稿。",
    "先明确内容边界，再展开标题、提纲和正文。",
    "把风险顾虑前置成生成约束，而不是在产出后补救。",
  ]);

  const disallowedClaims = [
    "禁止跳过验证直接宣称内容可发布。",
    "禁止擅自扩展到用户没有授权的立场、承诺或事实判断。",
    "禁止忽略用户已经明确表达的风险顾虑和权限边界。",
  ];

  return {
    boundaryVersion: "v0.1.0",
    source: {
      concerns: input.concerns,
      permissionMode: diagnosis.permissionMode,
      actionBoundaries: diagnosis.permissionPlan.actionBoundaries.map((item) => ({ ...item })),
      operatingRules,
    },
    boundaries: {
      hardStops,
      reviewRequired,
      preferredGuardrails,
      disallowedClaims,
    },
    injectionTargets: [
      {
        target: "AI-OS/rules.md",
        purpose: "把内容边界注入统一规则层，确保所有客户端共享相同约束。",
      },
      {
        target: "AI-OS/contentops/boundaries.md",
        purpose: "给 ContentOps 在母稿生成前读取内容边界与审核要求。",
      },
      {
        target: "AI-OS/contentops/boundaries.json",
        purpose: "给下游系统直接消费结构化边界对象。",
      },
      {
        target: "AI-OS/contentops/profile.json",
        purpose: "让 ContentOps Profile 与 Boundary 在同一上下文层联动使用。",
      },
    ],
    mappingNotes: [
      {
        targetField: "boundaries.hardStops",
        derivedFrom: ["concerns", "permissionMode"],
        rationale: "把用户明确担心的错误和高风险动作整理为生成阶段不能越过的硬边界。",
      },
      {
        targetField: "boundaries.reviewRequired",
        derivedFrom: ["actionBoundaries", "permissionMode"],
        rationale: "把本地动作、真实世界动作和外部系统动作的确认要求转译成内容生成前置审核条件。",
      },
      {
        targetField: "boundaries.preferredGuardrails",
        derivedFrom: ["operatingRules", "permissionMode", "concerns"],
        rationale: "把通用规则和风险偏好转成更适合 ContentOps 消费的内容约束语句。",
      },
      {
        targetField: "injectionTargets",
        derivedFrom: ["rules.md", "contentops/*"],
        rationale: "明确哪些文件承担全局共享约束，哪些文件承担下游内容生成的直接输入。",
      },
    ],
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
  operatingRules.push(`GPT Token 状态：${diagnosis.tokenPlan.label}。${diagnosis.tokenPlan.riskBoundary}`);
  operatingRules.push(`MCP 策略：${diagnosis.mcpPlan.selectionSummary}`);
  operatingRules.push(`权限起点：${diagnosis.permissionPlan.startMode.label}。${diagnosis.permissionPlan.startMode.summary}`);
  const contentOpsProfile = buildContentOpsProfile(input, diagnosis);
  const contentBoundaryProfile = buildContentBoundaryProfile(input, diagnosis, operatingRules);

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
      path: "AI-OS/contentops/profile.md",
      purpose: "给 ContentOps 读取的首版用户定位与 Profile 映射结果。",
    },
    {
      path: "AI-OS/contentops/profile.json",
      purpose: "给 ContentOps 或其他下游系统直接消费的结构化 Profile 数据。",
    },
    {
      path: "AI-OS/contentops/boundaries.md",
      purpose: "给 ContentOps 读取的结构化内容边界与审核约束。",
    },
    {
      path: "AI-OS/contentops/boundaries.json",
      purpose: "给 ContentOps 或其他下游系统直接消费的结构化内容边界数据。",
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
    {
      path: "AI-OS/install/adapter-setup.md",
      purpose: "说明如何把这套 AI-OS 与不同客户端接起来。",
    },
    {
      path: "AI-OS/install/target-locations.md",
      purpose: "说明不同客户端建议放置这些规则文件的位置。",
    },
    {
      path: "AI-OS/install/verification-checklist.md",
      purpose: "说明接入后如何验证客户端真的读到了这套规则。",
    },
    {
      path: "AI-OS/install/environment-check.md",
      purpose: "记录当前本地环境、客户端入口和关键落位目标的健康检查结果。",
    },
    {
      path: "AI-OS/install/existing-rules-scan.md",
      purpose: "记录当前工作区已有规则文件、兼容状态与潜在冲突点。",
    },
    {
      path: "AI-OS/install/diff-merge-plan.md",
      purpose: "记录目标文件的结构化 diff 预览与合并建议。",
    },
    {
      path: "AI-OS/install/sensitive-risk-guard.md",
      purpose: "记录敏感信息检查结果、风险原因与权限影响。",
    },
    {
      path: "AI-OS/install/mcp-health.md",
      purpose: "记录已选 MCP 的连接状态、失败原因与 fallback 说明。",
    },
    {
      path: "AI-OS/mcp/selection.md",
      purpose: "记录当前选择接入的 MCP、原因与 fallback 说明。",
    },
    {
      path: "AI-OS/permissions/boundaries.md",
      purpose: "记录权限模式、动作边界与确认要求。",
    },
    {
      path: "AI-OS/templates/AGENTS.md.template",
      purpose: "给 Codex 或类似代理式客户端使用的项目级说明模板。",
    },
    {
      path: "AI-OS/templates/cursor-project-rules.template.md",
      purpose: "给 Cursor 项目规则使用的首版模板。",
    },
    {
      path: "AI-OS/templates/claude-code-session-template.md",
      purpose: "给 Claude Code 开场输入使用的首版模板。",
    },
    {
      path: "AI-OS/candidates/AGENTS.md",
      purpose: "可直接作为项目根目录候选文件的 AGENTS.md。",
    },
    {
      path: "AI-OS/candidates/cursor-rules.md",
      purpose: "可直接作为 Cursor 项目规则候选文件的内容。",
    },
    {
      path: "AI-OS/candidates/project-root/AGENTS.md",
      purpose: "模拟真实项目根目录放置位点的 AGENTS.md 候选文件。",
    },
    {
      path: "AI-OS/candidates/.cursor/rules/ai-collab-foundation.mdc",
      purpose: "模拟 Cursor 规则目录放置位点的候选文件。",
    },
    {
      path: "AI-OS/candidates/claude-code/session-start.md",
      purpose: "模拟 Claude Code 会话开场输入文件的候选版本。",
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

## GPT Token
${diagnosis.tokenPlan.label}

## MCP Selection
${diagnosis.mcpPlan.selectionSummary}

## Working Style
- Prefer document-driven execution over chat-only improvisation
- Keep one shared source of truth across clients and projects
- Escalate when real-world actions, deletion, payment, or external writes are involved

## Success Criteria
- Output is reusable in the next project, not only correct for the current chat
- Important work includes verification evidence, not just “seems done”
- New rules, exceptions, and learnings are written back into AI-OS

## Decision Boundaries
- Low-risk drafting and local organization can proceed inside agreed permission scope
- Major behavior changes, external writes, and irreversible actions require confirmation
- If context is missing, prefer clarifying the boundary before continuing

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

## Permission Modes
${diagnosis.permissionPlan.modes.map((item) => `- ${item.label}：${item.summary}`).join("\n")}

## Confirmation Boundaries
${diagnosis.permissionPlan.actionBoundaries.map((item) => `- ${item.type}：${item.confirmation}`).join("\n")}

## Content Boundaries
${contentBoundaryProfile.boundaries.hardStops.map((item) => `- Hard Stop：${item}`).join("\n")}
${contentBoundaryProfile.boundaries.reviewRequired.map((item) => `- Review Required：${item}`).join("\n")}
${contentBoundaryProfile.boundaries.preferredGuardrails.map((item) => `- Guardrail：${item}`).join("\n")}

## Verification Standard
- Important tasks should include result checking, not just "no local error"
- New projects inherit these rules by default
`;

  const contentOpsProfileContent = `# ContentOps Profile

## Profile Version
${contentOpsProfile.profileVersion}

## Positioning
- Role: ${contentOpsProfile.positioning.role}
- Archetype: ${contentOpsProfile.positioning.archetype}
- Statement: ${contentOpsProfile.positioning.positioningStatement}
- North Star: ${contentOpsProfile.positioning.northStar}
- Primary Outcome: ${contentOpsProfile.positioning.primaryOutcome}

## Audience
- Primary Audience: ${contentOpsProfile.audience.primaryAudience}
${contentOpsProfile.audience.audienceNeeds.map((item) => `- Need: ${item}`).join("\n")}

## Topics
${contentOpsProfile.topics.coreTopics.map((item) => `- Core Topic: ${item}`).join("\n")}
${contentOpsProfile.topics.contentPillars.map((item) => `- Content Pillar: ${item}`).join("\n")}

## Execution
${contentOpsProfile.execution.preferredFormats.map((item) => `- Preferred Format: ${item}`).join("\n")}
${contentOpsProfile.execution.workflowFit.map((item) => `- Workflow Fit: ${item}`).join("\n")}
${contentOpsProfile.execution.riskFocus.map((item) => `- Risk Focus: ${item}`).join("\n")}

## Mapping Notes
${contentOpsProfile.mappingNotes
  .map((item) => `### ${item.targetField}\n- Derived From: ${item.derivedFrom.join(", ")}\n- Rationale: ${item.rationale}`)
  .join("\n\n")}
`;

  const contentBoundaryContent = `# Content Boundaries

## Boundary Version
${contentBoundaryProfile.boundaryVersion}

## Hard Stops
${contentBoundaryProfile.boundaries.hardStops.map((item) => `- ${item}`).join("\n")}

## Review Required
${contentBoundaryProfile.boundaries.reviewRequired.map((item) => `- ${item}`).join("\n")}

## Preferred Guardrails
${contentBoundaryProfile.boundaries.preferredGuardrails.map((item) => `- ${item}`).join("\n")}

## Disallowed Claims
${contentBoundaryProfile.boundaries.disallowedClaims.map((item) => `- ${item}`).join("\n")}

## Injection Targets
${contentBoundaryProfile.injectionTargets.map((item) => `- ${item.target}: ${item.purpose}`).join("\n")}

## Mapping Notes
${contentBoundaryProfile.mappingNotes
  .map((item) => `### ${item.targetField}\n- Derived From: ${item.derivedFrom.join(", ")}\n- Rationale: ${item.rationale}`)
  .join("\n\n")}
`;

  const workflowsContent = `# Workflows

## Priority Templates
${diagnosis.workflowTemplates.map((item) => `- ${item}`).join("\n")}

## Standard Delivery Loop
1. Read identity + rules
2. Clarify task goal and output
3. Select the best client for the task
4. Execute and verify
5. Write reusable learnings back to memory

## Rule Capture Loop
1. Notice a repeat decision, exception, or correction
2. Decide whether it belongs in identity / rules / workflows / decisions
3. Rewrite it as a reusable rule instead of a one-off note
4. Apply it in the current task
5. Reuse it again in the next project to confirm it is stable

## Retrospective Template
- What repeated friction showed up?
- Which client handled the task best, and why?
- What should become a default rule next time?
- What should stay optional rather than becoming a global rule?
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

## Model Recommendation
- ${diagnosis.modelRecommendation}

## Delivery Style
- ${diagnosis.deliveryStyle}

## GPT Token Plan
- ${diagnosis.tokenPlan.guidance}
- ${diagnosis.tokenPlan.riskBoundary}

## Rule Promotion Policy
- Move a learning into \`rules.md\` only when it should apply across multiple tasks or projects
- Keep task-specific nuance inside \`decisions.md\` until it proves reusable
- Promote a workflow step only when it improves speed, quality, or verification consistency

## Decision Log Template
- Context:
- Decision:
- Why:
- Evidence:
- Should this become a reusable rule:

## Retrospective Capture
- What worked better than expected:
- What caused avoidable rework:
- Which boundary, template, or client rule should change next:

## Next Updates
${firstActions.map((item) => `- ${item}`).join("\n")}
`;

  const installGuideContent = `# Adapter Setup Guide

## 1. Shared Base
- Keep \`AI-OS/identity.md\`, \`rules.md\`, \`workflows.md\` as the single source of truth
- Let every client read the same base files before task execution

## 2. Codex
- Put project rules in \`AGENTS.md\` or equivalent repo instructions
- Reference \`AI-OS/clients/codex.md\` for default execution style
- Prefer long-running tasks, local docs, and evidence-based completion

## 3. Claude Code
- Use \`AI-OS/clients/claude-code.md\` as the discussion and analysis profile
- Feed identity, rules, and workflows before long reasoning sessions
- Keep final execution criteria aligned with the shared AI-OS rules

## 4. Cursor
- Use \`AI-OS/clients/cursor.md\` for IDE-level assistance rules
- Treat Cursor as a local acceleration layer, not the source of truth
- Route major implementation and completion checks back to the main workflow

## 5. Copilot
- Use \`AI-OS/clients/copilot.md\` as a style and boundary reference
- Keep Copilot focused on code completion and short snippets
- Do not treat inline suggestions as verified completion

## 6. MCP / External Systems
- Connect 1-2 highest-value systems first
- Record which MCPs are enabled inside the AI-OS rules or decisions memory
- Update AI-OS when a new integration becomes part of the default workflow
`;

  const targetLocationsContent = `# Target Locations

## Codex
- Project root: \`AGENTS.md\`
- Supporting directory: keep \`AI-OS/\` in the project root
- Optional: put reusable repo-level notes next to \`PROJECT-SOP.md\`

## Claude Code
- Keep \`AI-OS/\` in the project root or workspace root
- Reference \`AI-OS/clients/claude-code.md\` at the start of long sessions
- If the repo has its own instruction file, point it back to the shared AI-OS files

## Cursor
- Keep \`AI-OS/\` in the repo root for easy IDE access
- Mirror stable rules into Cursor project rules only when needed
- Treat Cursor rules as a projection of AI-OS, not a separate source

## Copilot
- Keep \`AI-OS/\` available in the repo root
- Use the client profile as a reference for style, boundaries, and completion expectations
- Do not rely on Copilot-only state for persistent rules

## MCP Notes
- Document enabled MCPs in \`AI-OS/memory/decisions.md\`
- Keep integration rationale near the rules instead of hiding it in chat history
`;

  const verificationChecklistContent = `# Verification Checklist

## Shared Checks
- Can the client describe your role, north star, and main task types?
- Does the client follow the same output boundary as \`AI-OS/rules.md\`?
- Does it avoid claiming completion without verification?

## Codex
- Ask it to summarize the project rules before editing files
- Confirm it references evidence, validation, or repo instructions in its plan
- Confirm high-risk actions still require human confirmation

## Claude Code
- Ask it to explain your task boundary and main decision criteria
- Confirm it produces analysis consistent with \`AI-OS/clients/claude-code.md\`
- Confirm it does not drift into a conflicting workflow

## Cursor
- Check whether its suggestions match the shared naming, style, and workflow
- Confirm important changes still route back to the main validation chain

## Copilot
- Check whether completions respect local naming and style expectations
- Confirm Copilot output is treated as suggestion, not completed work

## Pass Condition
- The setup counts as successful only when multiple clients reflect the same base identity, rules, and workflow expectations
`;

  const mcpSelectionContent = `# MCP Selection

## Current Selection
${diagnosis.mcpPlan.selected.length > 0 ? diagnosis.mcpPlan.selected.map((item) => `- ${item}`).join("\n") : "- No MCP selected for now"}

## Why
${diagnosis.recommendedMcp
  .filter((item) => diagnosis.mcpPlan.selected.includes(item.name))
  .map((item) => `- ${item.name}: ${item.rationale}`)
  .join("\n") || "- Start without MCP and keep the system usable through local AI-OS files and client adapters."}

## Fallback
- ${diagnosis.mcpPlan.fallbackMessage}

## Next Step
- Enable only 1-3 high-value MCPs first
- Document new MCP defaults in decisions memory when they become stable
`;

  const permissionBoundariesContent = `# Permission Boundaries

## Starting Mode
- ${diagnosis.permissionPlan.startMode.label}
- ${diagnosis.permissionPlan.startMode.summary}
- Fit: ${diagnosis.permissionPlan.startMode.fit}

## Permission Modes
${diagnosis.permissionPlan.modes
  .map((item) => `### ${item.label}\n- Summary: ${item.summary}\n- Fit: ${item.fit}`)
  .join("\n\n")}

## Action Boundaries
${diagnosis.permissionPlan.actionBoundaries
  .map((item) => `### ${item.type}\n- Confirmation: ${item.confirmation}\n- Examples: ${item.examples}`)
  .join("\n\n")}

## Working Rule
- Prefer the lowest permission mode that can still complete the current task.
- Local success does not replace confirmation for real-world or external-system actions.
`;

  const agentsTemplateContent = `# AGENTS.md Template

## Project Identity
- Role: ${input.role || diagnosis.roleLabel}
- North Star: ${input.goal || "建立统一 AI 协作系统"}

## Shared Sources
- Read \`AI-OS/identity.md\`
- Read \`AI-OS/rules.md\`
- Read \`AI-OS/workflows.md\`
- Read \`AI-OS/memory/decisions.md\` when relevant

## Working Rules
- Follow shared AI-OS rules before starting execution
- Do not claim completion without verification
- Use evidence from files, tests, or runtime behavior
- Keep high-risk actions behind human confirmation

## Preferred Flow
1. Clarify goal
2. Inspect relevant files
3. Execute within agreed permissions
4. Verify outcome
5. Write reusable learnings back into AI-OS

## Stop Conditions
- Stop and confirm before real-world actions, deletion, payment, or external writes
- Stop when the relevant repository or product context is missing
- Stop if the task requires assumptions that could change project behavior materially

## When To Update AI-OS
- When a repeated correction becomes a stable rule
- When a workflow step proves reusable across tasks
- When an exception should be remembered instead of rediscovered
`;

  const cursorRulesTemplateContent = `# Cursor Project Rules Template

## Role
${input.role || diagnosis.roleLabel}

## Goal
${input.goal || "建立统一 AI 协作系统"}

## Cursor Scope
- Use Cursor for local acceleration, short edits, and IDE-level assistance
- Follow the same naming, style, and workflow boundaries as AI-OS
- Escalate major implementation and completion checks to the main workflow

## Must Read
- AI-OS/identity.md
- AI-OS/rules.md
- AI-OS/workflows.md
- AI-OS/clients/cursor.md
`;

  const claudeCodeSessionTemplateContent = `# Claude Code Session Template

You are helping with:
- Role: ${input.role || diagnosis.roleLabel}
- Goal: ${input.goal || "建立统一 AI 协作系统"}

Before answering:
1. Align with AI-OS/identity.md
2. Respect AI-OS/rules.md
3. Use AI-OS/workflows.md for structure
4. Follow AI-OS/clients/claude-code.md for discussion style

Focus on:
- explanation
- alternatives
- risks
- reasoning quality

Do not mark work complete without shared verification standards.
`;

  const agentsCandidateContent = `# AGENTS.md

## Identity
- Role: ${input.role || diagnosis.roleLabel}
- North Star: ${input.goal || "建立统一 AI 协作系统"}

## Read First
- AI-OS/identity.md
- AI-OS/rules.md
- AI-OS/workflows.md
- AI-OS/memory/decisions.md

## Working Contract
- Follow shared AI-OS rules before execution
- Use verification, not intuition, to claim completion
- Keep high-risk actions behind human confirmation
- Keep new reusable learnings synchronized back to AI-OS

## Execution Checklist
1. Read identity, rules, workflows, and decisions
2. Restate the concrete goal and expected deliverable
3. Inspect the current repo or document state before editing
4. Execute within permission boundaries
5. Verify with evidence and update AI-OS when a rule becomes reusable

## Stop Conditions
- Do not perform irreversible or external actions without confirmation
- Do not mark work complete without tests, runtime checks, or equivalent evidence
- Do not let client-specific habits override shared AI-OS rules
`;

  const cursorRulesCandidateContent = `# Cursor Rules

## Scope
- Use Cursor for IDE-level acceleration and short local edits
- Respect AI-OS naming, boundaries, and verification rules

## Must Read
- AI-OS/identity.md
- AI-OS/rules.md
- AI-OS/workflows.md
- AI-OS/clients/cursor.md

## Guardrails
- Cursor suggestions are not completion claims
- Major implementation still routes back to shared workflow validation
`;

  const projectRootAgentsCandidateContent = `# AGENTS.md

## Identity
- Role: ${input.role || diagnosis.roleLabel}
- North Star: ${input.goal || "建立统一 AI 协作系统"}

## Read Order
1. AI-OS/identity.md
2. AI-OS/rules.md
3. AI-OS/workflows.md
4. AI-OS/memory/decisions.md

## Default Execution Rules
- Follow shared AI-OS rules before implementation
- Prefer evidence-backed completion
- Respect human confirmation for high-risk actions

## Required Delivery Pattern
1. Clarify the request
2. Read the relevant project files
3. Implement the smallest aligned change that satisfies the real goal
4. Verify with tests, screenshots, logs, or output evidence
5. Write back reusable learnings when a new rule becomes stable

## Update Triggers
- Add to \`AI-OS/rules.md\` when a boundary should apply broadly
- Add to \`AI-OS/workflows.md\` when a sequence should repeat
- Add to \`AI-OS/memory/decisions.md\` when the decision is important but not yet global
`;

  const cursorPlacementCandidateContent = `---
description: AI Collab Foundation Cursor Rule
---

# AI Collab Foundation Cursor Rule

- Read AI-OS/identity.md before making major changes
- Follow AI-OS/rules.md for boundaries and verification
- Treat Cursor as a local acceleration layer, not the source of truth
- Route major completion claims back to the shared validation workflow
`;

  const claudeSessionCandidateContent = `# Claude Code Session Start

Use the following context before reasoning:
- AI-OS/identity.md
- AI-OS/rules.md
- AI-OS/workflows.md
- AI-OS/clients/claude-code.md

Task context:
- Role: ${input.role || diagnosis.roleLabel}
- Goal: ${input.goal || "建立统一 AI 协作系统"}

Instructions:
- Explain reasoning clearly
- Surface alternatives and risks
- Do not claim completion without shared verification
`;

  const fileContents = [
    {
      path: "AI-OS/identity.md",
      purpose: "记录你的角色、目标、工作方式和协作边界。",
      content: identityContent,
    },
    {
      path: "AI-OS/contentops/profile.md",
      purpose: "给 ContentOps 读取的首版用户定位与 Profile 映射结果。",
      content: contentOpsProfileContent,
    },
    {
      path: "AI-OS/contentops/profile.json",
      purpose: "给 ContentOps 或其他下游系统直接消费的结构化 Profile 数据。",
      content: `${JSON.stringify(contentOpsProfile, null, 2)}\n`,
    },
    {
      path: "AI-OS/contentops/boundaries.md",
      purpose: "给 ContentOps 读取的结构化内容边界与审核约束。",
      content: contentBoundaryContent,
    },
    {
      path: "AI-OS/contentops/boundaries.json",
      purpose: "给 ContentOps 或其他下游系统直接消费的结构化内容边界数据。",
      content: `${JSON.stringify(contentBoundaryProfile, null, 2)}\n`,
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
    {
      path: "AI-OS/memory/rule-versions.md",
      purpose: "记录每次规则写回的轻量版本号、时间和变更摘要。",
      content: "# Rule Versions\n\n## v0.0.0\n- Saved at: not yet generated\n- No confirmed candidate writeback yet.\n",
    },
    {
      path: "AI-OS/install/adapter-setup.md",
      purpose: "说明如何把这套 AI-OS 与不同客户端接起来。",
      content: installGuideContent,
    },
    {
      path: "AI-OS/install/target-locations.md",
      purpose: "说明不同客户端建议放置这些规则文件的位置。",
      content: targetLocationsContent,
    },
    {
      path: "AI-OS/install/verification-checklist.md",
      purpose: "说明接入后如何验证客户端真的读到了这套规则。",
      content: verificationChecklistContent,
    },
    {
      path: "AI-OS/install/environment-check.md",
      purpose: "记录当前本地环境、客户端入口和关键落位目标的健康检查结果。",
      content: "# Environment Check\n\nGenerated during export.",
    },
    {
      path: "AI-OS/install/existing-rules-scan.md",
      purpose: "记录当前工作区已有规则文件、兼容状态与潜在冲突点。",
      content: "# Existing Rules Scan\n\nGenerated during export.",
    },
    {
      path: "AI-OS/install/diff-merge-plan.md",
      purpose: "记录目标文件的结构化 diff 预览与合并建议。",
      content: "# Diff And Merge Plan\n\nGenerated during export.",
    },
    {
      path: "AI-OS/install/sensitive-risk-guard.md",
      purpose: "记录敏感信息检查结果、风险原因与权限影响。",
      content: "# Sensitive Risk Guard\n\nGenerated during export.",
    },
    {
      path: "AI-OS/install/mcp-health.md",
      purpose: "记录已选 MCP 的连接状态、失败原因与 fallback 说明。",
      content: "# MCP Health And Fallback\n\nGenerated during export.",
    },
    {
      path: "AI-OS/mcp/selection.md",
      purpose: "记录当前选择接入的 MCP、原因与 fallback 说明。",
      content: mcpSelectionContent,
    },
    {
      path: "AI-OS/permissions/boundaries.md",
      purpose: "记录权限模式、动作边界与确认要求。",
      content: permissionBoundariesContent,
    },
    {
      path: "AI-OS/templates/AGENTS.md.template",
      purpose: "给 Codex 或类似代理式客户端使用的项目级说明模板。",
      content: agentsTemplateContent,
    },
    {
      path: "AI-OS/templates/cursor-project-rules.template.md",
      purpose: "给 Cursor 项目规则使用的首版模板。",
      content: cursorRulesTemplateContent,
    },
    {
      path: "AI-OS/templates/claude-code-session-template.md",
      purpose: "给 Claude Code 开场输入使用的首版模板。",
      content: claudeCodeSessionTemplateContent,
    },
    {
      path: "AI-OS/candidates/AGENTS.md",
      purpose: "可直接作为项目根目录候选文件的 AGENTS.md。",
      content: agentsCandidateContent,
    },
    {
      path: "AI-OS/candidates/cursor-rules.md",
      purpose: "可直接作为 Cursor 项目规则候选文件的内容。",
      content: cursorRulesCandidateContent,
    },
    {
      path: "AI-OS/candidates/project-root/AGENTS.md",
      purpose: "模拟真实项目根目录放置位点的 AGENTS.md 候选文件。",
      content: projectRootAgentsCandidateContent,
    },
    {
      path: "AI-OS/candidates/.cursor/rules/ai-collab-foundation.mdc",
      purpose: "模拟 Cursor 规则目录放置位点的候选文件。",
      content: cursorPlacementCandidateContent,
    },
    {
      path: "AI-OS/candidates/claude-code/session-start.md",
      purpose: "模拟 Claude Code 会话开场输入文件的候选版本。",
      content: claudeSessionCandidateContent,
    },
  ];

  return {
    workspaceName,
    northStar: `让 AI 按统一规则稳定协作，围绕“${input.goal || "高质量完成关键任务"}”持续复利。`,
    contentOpsProfile,
    contentBoundaryProfile,
    operatingRules,
    clientProfiles,
    starterFiles,
    memoryLoop,
    firstActions,
    fileContents,
  };
}
