import type { AiOsArtifact, DiagnosisProfile, IntakeInput } from "@/lib/diagnosis";

export type RetrospectiveField = {
  name: string;
  label: string;
  helper: string;
  defaultValue: string;
};

export type RetrospectiveDraft = {
  summary: string;
  fields: RetrospectiveField[];
  candidateSignals: string[];
  savePolicy: string[];
};

export type RuleCandidate = {
  id: string;
  title: string;
  content: string;
  category: "rules" | "workflows" | "decisions";
  rationale: string;
  source: string;
};

export type RuleCandidateResult = {
  summary: string;
  candidates: RuleCandidate[];
};

function sentence(input: string, fallback: string) {
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function buildRetrospectiveDraft(
  input: IntakeInput,
  diagnosis: DiagnosisProfile,
  artifact: AiOsArtifact,
): RetrospectiveDraft {
  const primaryClient = diagnosis.recommendedClients[0]?.name ?? "Codex + GPT-5 系列";
  const mcpSummary = diagnosis.mcpPlan.selected.length > 0 ? diagnosis.mcpPlan.selected.join("、") : "当前未接入 MCP";
  const topRules = artifact.operatingRules.slice(0, 2).join("；");
  const topActions = artifact.firstActions.slice(0, 2).join("；");

  return {
    summary: `本次任务已经生成一版 AI-OS。建议现在立刻复盘这轮“${sentence(input.goal, "高质量完成关键任务")}”的执行过程，把有效经验沉淀成下一轮默认规则。`,
    fields: [
      {
        name: "taskContext",
        label: "这次任务是什么",
        helper: "一句话写清目标、交付物和本轮主要约束。",
        defaultValue: `目标：${sentence(input.goal, "建立更稳定的 AI 协作系统")}\n角色：${sentence(input.role, diagnosis.roleLabel)}\n主力客户端：${primaryClient}`,
      },
      {
        name: "whatWorked",
        label: "这次什么做得好",
        helper: "记录真正帮助你提效、提质或减少返工的动作。",
        defaultValue: `推荐组合：${primaryClient}\n有效链路：${diagnosis.deliveryStyle}\n当前有效规则：${topRules}`,
      },
      {
        name: "whatFailed",
        label: "这次哪里卡住了",
        helper: "记录返工点、信息缺口、权限顾虑或客户端切换成本。",
        defaultValue: `当前瓶颈：${diagnosis.bottleneck}\n风险顾虑：${sentence(input.concerns, "关注上下文一致性、权限边界和最终验证")}`,
      },
      {
        name: "codifyNext",
        label: "哪些经验值得沉淀成规则",
        helper: "优先写那些下次还会复用的边界、步骤和判断标准。",
        defaultValue: `建议优先沉淀：${topActions}\nMCP 状态：${mcpSummary}`,
      },
    ],
    candidateSignals: [
      "如果一条经验会影响大多数任务边界，后续应进入 `AI-OS/rules.md`。",
      "如果一条经验描述的是重复执行顺序，后续应进入 `AI-OS/workflows.md`。",
      "如果一条经验只适用于这类项目但值得保留，后续应进入 `AI-OS/memory/decisions.md`。",
    ],
    savePolicy: [
      "先生成候选规则，再逐条确认是否保存。",
      "没有确认的内容只保留在复盘结果里，不自动写回共享规则文件。",
      "后续保存时只做轻量版本记录：版本号、时间、变更摘要。",
    ],
  };
}

export function buildRuleCandidates(
  input: IntakeInput,
  diagnosis: DiagnosisProfile,
  artifact: AiOsArtifact,
  retrospective: RetrospectiveDraft,
): RuleCandidateResult {
  const primaryClient = diagnosis.recommendedClients[0]?.name ?? "Codex + GPT-5 系列";
  const firstRule = artifact.operatingRules[0] ?? "完成关键动作后必须验证结果。";
  const firstWorkflow = artifact.firstActions[0] ?? "先定义目标，再开始执行。";
  const firstSignal = retrospective.fields[3]?.defaultValue ?? "优先沉淀可复用经验。";

  const candidates: RuleCandidate[] = [
    {
      id: "candidate-rule-verification",
      title: "把验证前置为共享边界",
      category: "rules",
      content: `凡是涉及“${sentence(input.goal, "关键任务交付")}”的执行，默认遵守：${firstRule}`,
      rationale: "这条经验会影响大多数任务边界，属于全局约束，而不是某一次任务的小技巧。",
      source: `来源：复盘字段「这次哪里卡住了」+ 当前瓶颈「${diagnosis.bottleneck}」`,
    },
    {
      id: "candidate-workflow-retro",
      title: "把任务后复盘固定进默认流程",
      category: "workflows",
      content: `新增固定步骤：完成任务 -> 回看产出与风险 -> 提炼候选规则 -> 再决定是否写回 AI-OS。当前默认起点：${firstWorkflow}`,
      rationale: "这条经验描述的是可重复执行顺序，更适合进入工作流文件，而不是全局行为边界。",
      source: "来源：复盘字段「哪些经验值得沉淀成规则」+ 当前 first actions",
    },
    {
      id: "candidate-decision-stack",
      title: "记录本轮客户端与权限选择",
      category: "decisions",
      content: `本轮优先使用 ${primaryClient} 作为主力推进端；若任务风险上升，则回退到更保守权限模式后再继续。`,
      rationale: "这条经验对当前项目很重要，但还不一定应该立刻升级成所有任务通用规则。",
      source: `来源：推荐客户端「${primaryClient}」+ 复盘信号「${firstSignal}」`,
    },
  ];

  return {
    summary: "以下是系统基于当前复盘结构自动整理出的首版候选规则。现在先展示分类与原因，下一步再进入逐条确认保存。",
    candidates,
  };
}
