"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import { buildAiOsArtifact, buildDiagnosis, type IntakeInput } from "@/lib/diagnosis";
import { buildEnvironmentCheckContent, detectEnvironment } from "@/lib/environment-doctor";
import { buildRuleScanContent, detectExistingRules } from "@/lib/rule-scanner";
import { buildDiffPlan, buildDiffPlanContent } from "@/lib/diff-planner";
import { buildRiskGuardContent, detectRiskGuard } from "@/lib/risk-guard";
import { buildMcpHealthContent, detectMcpHealth } from "@/lib/mcp-health";
import { applySelectedRuleCandidates, buildRetrospectiveDraft, buildRuleCandidates } from "@/lib/retrospective";

function sanitizeSegment(input: string) {
  const normalized = input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return normalized || "default-ai-os";
}

function buildQuery(input: IntakeInput, extra?: Record<string, string>) {
  const params = new URLSearchParams();

  Object.entries(input).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key === "mcpSelections" ? "mcpSelection" : key, item));
      return;
    }
    params.set(key, value);
  });

  Object.entries(extra ?? {}).forEach(([key, value]) => {
    params.set(key, value);
  });

  return params.toString();
}

export async function exportAiOsAction(formData: FormData) {
  const intake: IntakeInput = {
    role: String(formData.get("role") ?? ""),
    goal: String(formData.get("goal") ?? ""),
    clients: String(formData.get("clients") ?? ""),
    tokenStatus: String(formData.get("tokenStatus") ?? ""),
    mcpSelections: formData.getAll("mcpSelection").map(String).filter((item) => item.trim().length > 0),
    tasks: String(formData.get("tasks") ?? ""),
    concerns: String(formData.get("concerns") ?? ""),
  };

  const diagnosis = buildDiagnosis(intake);
  const artifact = buildAiOsArtifact(intake, diagnosis);
  const retrospective = buildRetrospectiveDraft(intake, diagnosis, artifact);
  const ruleCandidates = buildRuleCandidates(intake, diagnosis, artifact, retrospective);
  const selectedCandidateIds = formData.getAll("selectedCandidate").map(String);
  const selectedCandidates = ruleCandidates.candidates.filter((item) => selectedCandidateIds.includes(item.id));
  const savedCandidateResult = applySelectedRuleCandidates(artifact, selectedCandidates);
  const environmentCheck = await detectEnvironment(intake);
  const ruleScan = await detectExistingRules(artifact);
  const diffPlan = await buildDiffPlan(artifact, ruleScan);
  const riskGuard = await detectRiskGuard(intake, diagnosis);
  const mcpHealth = await detectMcpHealth(intake, diagnosis);
  const exportRoot = path.join(process.cwd(), "generated-ai-os", sanitizeSegment(artifact.workspaceName), "AI-OS");

  for (const file of artifact.fileContents) {
    const targetPath = path.join(process.cwd(), "generated-ai-os", sanitizeSegment(artifact.workspaceName), file.path);
    await mkdir(path.dirname(targetPath), { recursive: true });
    let content = file.content;

    if (file.path === "AI-OS/rules.md") {
      content = savedCandidateResult.rulesContent;
    } else if (file.path === "AI-OS/workflows.md") {
      content = savedCandidateResult.workflowsContent;
    } else if (file.path === "AI-OS/memory/decisions.md") {
      content = savedCandidateResult.decisionsContent;
    } else if (file.path === "AI-OS/memory/rule-versions.md") {
      content = savedCandidateResult.versionLogContent;
    } else if (file.path === "AI-OS/install/environment-check.md") {
      content = buildEnvironmentCheckContent(environmentCheck);
    } else if (file.path === "AI-OS/install/existing-rules-scan.md") {
      content = buildRuleScanContent(ruleScan);
    } else if (file.path === "AI-OS/install/diff-merge-plan.md") {
      content = buildDiffPlanContent(diffPlan);
    } else if (file.path === "AI-OS/install/sensitive-risk-guard.md") {
      content = buildRiskGuardContent(riskGuard);
    } else if (file.path === "AI-OS/install/mcp-health.md") {
      content = buildMcpHealthContent(mcpHealth);
    }

    await writeFile(targetPath, content, "utf8");
  }

  redirect(
    `/ai-os?${buildQuery(intake, {
      exported: "1",
      exportPath: exportRoot,
      savedCandidates: selectedCandidates.map((item) => item.title).join(" | "),
      savedVersion: savedCandidateResult.versionSummary.version,
      savedAt: savedCandidateResult.versionSummary.savedAt,
      changeSummary: savedCandidateResult.versionSummary.changeSummary.join(" | "),
      syncClients: savedCandidateResult.clientSyncPrompts.map((item) => item.client).join(" | "),
      syncPaths: savedCandidateResult.clientSyncPrompts.map((item) => item.targetPath).join(" | "),
      syncReasons: savedCandidateResult.clientSyncPrompts.map((item) => item.reason).join(" | "),
    })}`,
  );
}
