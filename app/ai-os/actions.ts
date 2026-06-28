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
  const environmentCheck = await detectEnvironment(intake);
  const ruleScan = await detectExistingRules(artifact);
  const diffPlan = await buildDiffPlan(artifact, ruleScan);
  const riskGuard = await detectRiskGuard(intake, diagnosis);
  const mcpHealth = await detectMcpHealth(intake, diagnosis);
  const exportRoot = path.join(process.cwd(), "generated-ai-os", sanitizeSegment(artifact.workspaceName), "AI-OS");

  for (const file of artifact.fileContents) {
    const targetPath = path.join(process.cwd(), "generated-ai-os", sanitizeSegment(artifact.workspaceName), file.path);
    await mkdir(path.dirname(targetPath), { recursive: true });
    const content =
      file.path === "AI-OS/install/environment-check.md"
        ? buildEnvironmentCheckContent(environmentCheck)
        : file.path === "AI-OS/install/existing-rules-scan.md"
          ? buildRuleScanContent(ruleScan)
          : file.path === "AI-OS/install/diff-merge-plan.md"
            ? buildDiffPlanContent(diffPlan)
            : file.path === "AI-OS/install/sensitive-risk-guard.md"
              ? buildRiskGuardContent(riskGuard)
              : file.path === "AI-OS/install/mcp-health.md"
                ? buildMcpHealthContent(mcpHealth)
          : file.content;
    await writeFile(targetPath, content, "utf8");
  }

  redirect(`/ai-os?${buildQuery(intake, { exported: "1", exportPath: exportRoot })}`);
}
