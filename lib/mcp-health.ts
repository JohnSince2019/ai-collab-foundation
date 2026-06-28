import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import type { DiagnosisProfile, IntakeInput } from "@/lib/diagnosis";

export type McpHealthItem = {
  name: string;
  status: "connected" | "not-detected" | "selected-not-configured";
  summary: string;
  failureReason: string;
  nextAction: string;
  fallback: string;
};

export type McpHealthResult = {
  summary: string;
  nextAction: string;
  items: McpHealthItem[];
};

async function exists(targetPath: string) {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function detectLinearMcp(workspaceRoot: string): Promise<McpHealthItem> {
  const localDoc = path.join(workspaceRoot, "docs", "linear", "current-execution-status.md");
  const hasDoc = await exists(localDoc);
  return {
    name: "Linear MCP",
    status: hasDoc ? "connected" : "selected-not-configured",
    summary: hasDoc ? "当前项目已具备本地 Linear 镜像与 issue 执行证据。" : "已选择 Linear MCP，但当前项目未检测到本地 issue 镜像证据。",
    failureReason: hasDoc ? "未发现阻断，至少本地镜像链路已建立。" : "常见原因是只选了 Linear，但未完成本地 docs/linear 或项目接入约定。",
    nextAction: hasDoc ? "继续用 Linear 驱动 issue、状态与证据闭环。" : "先建立或校准 docs/linear 镜像，再确认客户端是否真正能读取项目任务上下文。",
    fallback: "即使 MCP 暂时不可用，也可以继续通过本地 docs/linear 和 AI-OS 维持交付闭环。",
  };
}

async function detectKnowledgeIndexMcp(workspaceRoot: string): Promise<McpHealthItem> {
  const signals = await Promise.all([
    exists(path.join(workspaceRoot, "PROJECT-SOP.md")),
    exists(path.join(workspaceRoot, "docs")),
    exists(path.join(workspaceRoot, "README.md")),
  ]);
  const [hasSop, hasDocs, hasReadme] = signals;
  const connected = hasSop && hasDocs;

  return {
    name: "Knowledge Index MCP",
    status: connected ? "connected" : "selected-not-configured",
    summary: connected ? "当前项目已存在可索引的 SOP / docs 基础，可作为知识索引候选源。" : "已选择 Knowledge Index MCP，但尚未检测到足够明确的知识索引承载结构。",
    failureReason: connected ? "未发现明显阻断，本地知识结构已具备索引基础。" : "常见原因是还没有形成稳定 docs / SOP / 知识目录，或未将其接到统一检索层。",
    nextAction: connected ? "继续把 SOP、roadmap、决策记录沉淀到统一文档层。" : "先补齐 docs / SOP / 决策文档，再考虑接知识索引层。",
    fallback: "即使没有 Knowledge Index MCP，AI-OS、README、PROJECT-SOP 和 docs 仍可充当本地共享上下文。",
  };
}

async function detectDatabaseMcp(workspaceRoot: string): Promise<McpHealthItem> {
  const candidates = [".env", ".env.local", "prisma/schema.prisma"];
  const signals = await Promise.all(candidates.map((item) => exists(path.join(workspaceRoot, item))));
  const connected = signals.some(Boolean);

  return {
    name: "Database MCP",
    status: connected ? "connected" : "not-detected",
    summary: connected ? "当前工作区存在数据库相关信号，可进一步确认是否已接入数据库上下文层。" : "当前未检测到数据库上下文接入信号。",
    failureReason: connected ? "还需确认数据库访问是否被安全授权，但至少工作区已有相关配置痕迹。" : "常见原因是当前项目并未接入数据库，或连接信息未在本地仓库显式出现。",
    nextAction: connected ? "确认数据库读取范围、脱敏策略与只读边界。" : "若当前任务不依赖数据库，可继续跳过；若依赖，先建立只读数据上下文链路。",
    fallback: "没有 Database MCP 时，先用导出文档、人工摘要或只读报表替代实时数据访问。",
  };
}

async function detectDesignReferenceMcp(workspaceRoot: string): Promise<McpHealthItem> {
  const hasFigmaNotes = await exists(path.join(workspaceRoot, "docs", "linear", "linear-task-creation-guide.md"));
  return {
    name: "Design Reference MCP",
    status: hasFigmaNotes ? "not-detected" : "not-detected",
    summary: "当前未检测到设计参考 MCP 的真实接入状态。",
    failureReason: "常见原因是只在流程里考虑了 Mobbin / Figma，但并未建立本地设计接入配置。",
    nextAction: "在需要高保真实现时，再补设计参考 MCP 或等价资料链路。",
    fallback: "没有设计 MCP 时，仍可继续使用截图参考、PRD 和本地验收截图推进 UI 工作。",
  };
}

export async function detectMcpHealth(input: IntakeInput, diagnosis: DiagnosisProfile): Promise<McpHealthResult> {
  const workspaceRoot = process.cwd();
  const selected = diagnosis.mcpPlan.selected;
  const items: McpHealthItem[] = [];

  for (const name of selected) {
    if (name.includes("Linear")) {
      items.push(await detectLinearMcp(workspaceRoot));
    } else if (name.includes("Knowledge")) {
      items.push(await detectKnowledgeIndexMcp(workspaceRoot));
    } else if (name.includes("Database")) {
      items.push(await detectDatabaseMcp(workspaceRoot));
    } else if (name.includes("Design")) {
      items.push(await detectDesignReferenceMcp(workspaceRoot));
    } else {
      items.push({
        name,
        status: "not-detected",
        summary: "当前还没有为这个 MCP 建立专门的本地状态检测器。",
        failureReason: "常见原因是它仍停留在推荐或未来规划阶段。",
        nextAction: "后续按真实集成需求补专门的健康检查规则。",
        fallback: "在专门状态检测器上线前，继续用 AI-OS 和本地文档维持主流程。",
      });
    }
  }

  if (items.length === 0) {
    return {
      summary: "当前未选择任何 MCP，系统将默认退回到 AI-OS + 本地规则 + docs/linear 的基础模式。",
      nextAction: "继续使用核心 AI-OS 能力，后续按真实需要再接 1-2 个高价值 MCP。",
      items: [],
    };
  }

  const connectedCount = items.filter((item) => item.status === "connected").length;
  return {
    summary:
      connectedCount > 0
        ? `已选 MCP 中有 ${connectedCount} 个检测到基础接入信号，其余项仍需要补配置或保持 fallback。`
        : "当前已选 MCP 尚未检测到稳定接入信号，建议先依赖 fallback 模式继续使用核心能力。",
    nextAction:
      connectedCount > 0
        ? "先使用已具备接入信号的 MCP，其余项保守处理并补齐配置。"
        : "继续使用 AI-OS、本地 docs 和客户端适配文件，不让 MCP 缺口阻塞主流程。",
    items,
  };
}

export function buildMcpHealthContent(result: McpHealthResult) {
  return `# MCP Health And Fallback

## Summary
- ${result.summary}

## Next Action
- ${result.nextAction}

## MCP Items
${result.items.length > 0
  ? result.items
      .map((item) => `### ${item.name}
- Status: ${item.status}
- Summary: ${item.summary}
- Failure Reason: ${item.failureReason}
- Next Action: ${item.nextAction}
- Fallback: ${item.fallback}`)
      .join("\n\n")
  : "- No MCP selected. Core AI-OS mode remains available."}
`;
}
