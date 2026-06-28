"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import { buildAiOsArtifact, buildDiagnosis, type IntakeInput } from "@/lib/diagnosis";

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
    tasks: String(formData.get("tasks") ?? ""),
    concerns: String(formData.get("concerns") ?? ""),
  };

  const diagnosis = buildDiagnosis(intake);
  const artifact = buildAiOsArtifact(intake, diagnosis);
  const exportRoot = path.join(process.cwd(), "generated-ai-os", sanitizeSegment(artifact.workspaceName), "AI-OS");

  for (const file of artifact.fileContents) {
    const targetPath = path.join(process.cwd(), "generated-ai-os", sanitizeSegment(artifact.workspaceName), file.path);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, file.content, "utf8");
  }

  redirect(`/ai-os?${buildQuery(intake, { exported: "1", exportPath: exportRoot })}`);
}
