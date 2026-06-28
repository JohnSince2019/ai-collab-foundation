import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import type { AiOsArtifact } from "@/lib/diagnosis";

export type RuleScanStatus = "compatible" | "conflict" | "missing";

export type RuleScanItem = {
  name: string;
  targetPath: string;
  candidatePath: string;
  status: RuleScanStatus;
  summary: string;
  reason: string;
  suggestedAction: "keep" | "review" | "create";
};

export type RuleScanResult = {
  workspaceRoot: string;
  summary: string;
  nextAction: string;
  items: RuleScanItem[];
};

async function exists(targetPath: string) {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function normalizeContent(input: string) {
  return input.replace(/\r\n/g, "\n").trim();
}

async function classifyRuleItem({
  name,
  targetPath,
  candidatePath,
  candidateContent,
}: {
  name: string;
  targetPath: string;
  candidatePath: string;
  candidateContent: string;
}): Promise<RuleScanItem> {
  const targetExists = await exists(targetPath);

  if (!targetExists) {
    return {
      name,
      targetPath,
      candidatePath,
      status: "missing",
      summary: "当前工作区还没有这份规则文件，可安全新建。",
      reason: "目标位点不存在，不会覆盖现有规则。",
      suggestedAction: "create",
    };
  }

  const currentContent = normalizeContent(await readFile(targetPath, "utf8"));
  const desiredContent = normalizeContent(candidateContent);
  const currentHasAiOsReference = currentContent.includes("AI-OS/");
  const desiredHasAiOsReference = desiredContent.includes("AI-OS/");

  if (currentContent === desiredContent || (currentHasAiOsReference && desiredHasAiOsReference)) {
    return {
      name,
      targetPath,
      candidatePath,
      status: "compatible",
      summary: "当前工作区已存在相容规则，可继续沿用。",
      reason: currentContent === desiredContent ? "现有内容与候选内容一致。" : "现有内容已引用 AI-OS 作为共享事实源。",
      suggestedAction: "keep",
    };
  }

  return {
    name,
    targetPath,
    candidatePath,
    status: "conflict",
    summary: "当前工作区已存在规则文件，但与候选内容不完全一致，后续需要 diff / merge。",
    reason: "目标位点已有内容，但尚未确认它是否与 AI-OS 候选规则兼容。",
    suggestedAction: "review",
  };
}

function getCandidateContent(artifact: AiOsArtifact, candidatePath: string) {
  return artifact.fileContents.find((item) => item.path === candidatePath)?.content ?? "";
}

export async function detectExistingRules(artifact: AiOsArtifact): Promise<RuleScanResult> {
  const workspaceRoot = process.cwd();
  const items = await Promise.all([
    classifyRuleItem({
      name: "AGENTS.md",
      targetPath: path.join(workspaceRoot, "AGENTS.md"),
      candidatePath: "AI-OS/candidates/project-root/AGENTS.md",
      candidateContent: getCandidateContent(artifact, "AI-OS/candidates/project-root/AGENTS.md"),
    }),
    classifyRuleItem({
      name: "Cursor Rule",
      targetPath: path.join(workspaceRoot, ".cursor", "rules", "ai-collab-foundation.mdc"),
      candidatePath: "AI-OS/candidates/.cursor/rules/ai-collab-foundation.mdc",
      candidateContent: getCandidateContent(artifact, "AI-OS/candidates/.cursor/rules/ai-collab-foundation.mdc"),
    }),
    classifyRuleItem({
      name: "Claude Session Start",
      targetPath: path.join(workspaceRoot, "claude-code", "session-start.md"),
      candidatePath: "AI-OS/candidates/claude-code/session-start.md",
      candidateContent: getCandidateContent(artifact, "AI-OS/candidates/claude-code/session-start.md"),
    }),
  ]);

  const compatibleCount = items.filter((item) => item.status === "compatible").length;
  const conflictCount = items.filter((item) => item.status === "conflict").length;
  const missingCount = items.filter((item) => item.status === "missing").length;

  return {
    workspaceRoot,
    summary:
      conflictCount > 0
        ? `检测到 ${conflictCount} 个潜在冲突规则位点、${compatibleCount} 个兼容位点、${missingCount} 个可安全新建位点。`
        : compatibleCount > 0
          ? `当前已识别 ${compatibleCount} 个兼容位点，另有 ${missingCount} 个可安全新建位点。`
          : `当前没有识别到可直接复用的现有规则位点，${missingCount} 个目标文件可安全新建。`,
    nextAction:
      conflictCount > 0
        ? "先处理已存在但可能冲突的规则文件，再决定是否覆盖或合并。"
        : "优先把缺失位点从 AI-OS candidates 落到工作区，再进入 diff / merge 阶段。",
    items,
  };
}

export function buildRuleScanContent(scan: RuleScanResult) {
  return `# Existing Rules Scan

## Workspace Root
${scan.workspaceRoot}

## Summary
- ${scan.summary}

## Next Action
- ${scan.nextAction}

## Rule Targets
${scan.items
  .map((item) => `### ${item.name}
- Target Path: \`${item.targetPath}\`
- Candidate Path: \`${item.candidatePath}\`
- Status: ${item.status}
- Summary: ${item.summary}
- Reason: ${item.reason}
- Suggested Action: ${item.suggestedAction}`)
  .join("\n\n")}
`;
}
