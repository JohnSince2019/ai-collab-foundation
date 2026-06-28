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
