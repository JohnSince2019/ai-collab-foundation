import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import type { AiOsArtifact } from "@/lib/diagnosis";
import type { RuleScanResult } from "@/lib/rule-scanner";

export type DiffPreviewLine = {
  type: "add" | "remove" | "keep";
  text: string;
};

export type MergeAction = "create-new" | "append-merge" | "keep-unchanged";

export type DiffPlanItem = {
  name: string;
  targetPath: string;
  candidatePath: string;
  currentState: RuleScanResult["items"][number]["status"];
  recommendation: MergeAction;
  rationale: string;
  summary: string;
  preview: DiffPreviewLine[];
};

export type DiffPlanResult = {
  summary: string;
  nextAction: string;
  items: DiffPlanItem[];
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

function getCandidateContent(artifact: AiOsArtifact, candidatePath: string) {
  return normalizeContent(artifact.fileContents.find((item) => item.path === candidatePath)?.content ?? "");
}

function buildPreview(currentContent: string, candidateContent: string) {
  const currentLines = currentContent.split("\n").filter((line) => line.length > 0);
  const candidateLines = candidateContent.split("\n").filter((line) => line.length > 0);

  if (!currentContent) {
    return candidateLines.slice(0, 6).map((line) => ({ type: "add" as const, text: line }));
  }

  if (currentContent === candidateContent) {
    return candidateLines.slice(0, 6).map((line) => ({ type: "keep" as const, text: line }));
  }

  const preview: DiffPreviewLine[] = [];
  currentLines.slice(0, 3).forEach((line) => preview.push({ type: "remove", text: line }));
  candidateLines.slice(0, 3).forEach((line) => preview.push({ type: "add", text: line }));
  return preview;
}

async function buildPlanItem(artifact: AiOsArtifact, scanItem: RuleScanResult["items"][number]): Promise<DiffPlanItem> {
  const candidateContent = getCandidateContent(artifact, scanItem.candidatePath);
  const hasCurrent = await exists(scanItem.targetPath);
  const currentContent = hasCurrent ? normalizeContent(await readFile(scanItem.targetPath, "utf8")) : "";

  if (scanItem.status === "missing") {
    return {
      name: scanItem.name,
      targetPath: scanItem.targetPath,
      candidatePath: scanItem.candidatePath,
      currentState: scanItem.status,
      recommendation: "create-new",
      rationale: "目标位点为空，直接新建不会覆盖现有规则。",
      summary: "建议直接新建，并以 AI-OS candidate 作为首版内容。",
      preview: buildPreview("", candidateContent),
    };
  }

  if (scanItem.status === "compatible") {
    return {
      name: scanItem.name,
      targetPath: scanItem.targetPath,
      candidatePath: scanItem.candidatePath,
      currentState: scanItem.status,
      recommendation: "keep-unchanged",
      rationale: "当前规则已经兼容或已明确引用 AI-OS，共享事实源无需再次覆盖。",
      summary: "建议保持不动，只在后续规则升级时再检查是否需要同步。",
      preview: buildPreview(currentContent, candidateContent),
    };
  }

  return {
    name: scanItem.name,
    targetPath: scanItem.targetPath,
    candidatePath: scanItem.candidatePath,
    currentState: scanItem.status,
    recommendation: "append-merge",
    rationale: "当前规则位点已有内容，但与 candidate 不完全一致，更适合先看差异再决定如何合并。",
    summary: "建议进入 append / merge，而不是直接覆盖。",
    preview: buildPreview(currentContent, candidateContent),
  };
}

export async function buildDiffPlan(artifact: AiOsArtifact, scan: RuleScanResult): Promise<DiffPlanResult> {
  const items = await Promise.all(scan.items.map((item) => buildPlanItem(artifact, item)));
  const createCount = items.filter((item) => item.recommendation === "create-new").length;
  const keepCount = items.filter((item) => item.recommendation === "keep-unchanged").length;
  const mergeCount = items.filter((item) => item.recommendation === "append-merge").length;

  return {
    summary: `当前 diff 规划包含 ${createCount} 个直接新建、${keepCount} 个保持不动、${mergeCount} 个建议合并的目标文件。`,
    nextAction:
      mergeCount > 0
        ? "先处理建议合并的规则位点，再批量新建缺失文件。"
        : "当前没有检测到需要手动合并的规则位点，可优先新建缺失文件并保留兼容文件不动。",
    items,
  };
}

export function buildDiffPlanContent(plan: DiffPlanResult) {
  return `# Diff And Merge Plan

## Summary
- ${plan.summary}

## Next Action
- ${plan.nextAction}

## File Plans
${plan.items
  .map((item) => `### ${item.name}
- Target Path: \`${item.targetPath}\`
- Candidate Path: \`${item.candidatePath}\`
- Current State: ${item.currentState}
- Recommendation: ${item.recommendation}
- Summary: ${item.summary}
- Rationale: ${item.rationale}

#### Preview
${item.preview.map((line) => `- [${line.type}] ${line.text}`).join("\n")}`)
  .join("\n\n")}
`;
}
