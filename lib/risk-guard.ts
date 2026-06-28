import { access, readdir, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import type { DiagnosisProfile, IntakeInput } from "@/lib/diagnosis";

export type RiskFinding = {
  name: string;
  severity: "high" | "medium";
  status: "present" | "watch";
  path: string;
  summary: string;
  rationale: string;
  permissionImpact: string;
};

export type RiskGuardResult = {
  summary: string;
  nextAction: string;
  recommendedModeOverride?: string;
  findings: RiskFinding[];
};

async function exists(targetPath: string) {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function collectWorkspaceFiles(root: string, depth = 2, prefix = ""): Promise<string[]> {
  if (depth < 0) return [];
  const dir = prefix ? path.join(root, prefix) : root;
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: string[] = [];
  for (const entry of entries) {
    const rel = prefix ? path.join(prefix, entry.name) : entry.name;
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git", "generated-ai-os"].includes(entry.name)) continue;
      files.push(...(await collectWorkspaceFiles(root, depth - 1, rel)));
    } else {
      files.push(rel);
    }
  }
  return files;
}

export async function detectRiskGuard(_input: IntakeInput, diagnosis: DiagnosisProfile): Promise<RiskGuardResult> {
  const workspaceRoot = process.cwd();
  const files = await collectWorkspaceFiles(workspaceRoot, 2);

  const envCandidates = files.filter((item) => item === ".env" || item.startsWith(".env."));
  const keyCandidates = files.filter((item) => /\.(pem|key|p12)$/i.test(item));
  const configCandidates = files.filter((item) => item === ".npmrc");
  const findings: RiskFinding[] = [];

  for (const rel of envCandidates) {
    findings.push({
      name: "环境变量文件",
      severity: "high",
      status: "present",
      path: path.join(workspaceRoot, rel),
      summary: "工作区中存在 `.env` 类文件，可能包含 token、数据库地址或第三方密钥。",
      rationale: "这类文件通常承载真实凭证，不适合默认交给代理式客户端广泛读取或写回。",
      permissionImpact: "建议从“可读”或更低权限起步，并对读取范围做显式确认。",
    });
  }

  for (const rel of keyCandidates) {
    findings.push({
      name: "证书或私钥文件",
      severity: "high",
      status: "present",
      path: path.join(workspaceRoot, rel),
      summary: "工作区中存在证书或私钥样式文件。",
      rationale: "`.pem`、`.key`、`.p12` 等文件通常对应签名、证书或私钥材料，误读或误写风险高。",
      permissionImpact: "建议保持低权限，并避免自动读取、改写或复制这些文件。",
    });
  }

  for (const rel of configCandidates) {
    findings.push({
      name: "包管理私有配置",
      severity: "medium",
      status: "present",
      path: path.join(workspaceRoot, rel),
      summary: "工作区中存在 `.npmrc`，可能包含私有 registry 或 token。",
      rationale: "这类配置文件常带认证信息，虽然不一定是高危密钥，但仍应避免无界读取。",
      permissionImpact: "建议保守读取，并在需要时显式说明用途。",
    });
  }

  const rootReadme = path.join(workspaceRoot, "README.md");
  if (await exists(rootReadme)) {
    const content = await readFile(rootReadme, "utf8").catch(() => "");
    if (/token|api key|secret/i.test(content)) {
      findings.push({
        name: "文档中提到敏感凭证",
        severity: "medium",
        status: "watch",
        path: rootReadme,
        summary: "工作区文档中出现 token / key / secret 等字样，建议后续确认是否只是说明文案。",
        rationale: "文档里提到敏感字段不一定代表泄露，但说明当前项目已接近真实凭证语境。",
        permissionImpact: "建议在读取文档时保留敏感信息意识，不把示例文案自动当成可复制数据。",
      });
    }
  }

  if (findings.length === 0) {
    findings.push(
      {
        name: "环境变量与凭证类文件",
        severity: "medium",
        status: "watch",
        path: "workspace-root",
        summary: "当前工作区未检测到 `.env`、私钥或 `.npmrc` 等高频敏感文件。",
        rationale: "这说明当前仓库表层风险较低，但真实项目接入时仍应默认检查这些位点。",
        permissionImpact: "可继续沿用当前权限起点，但在导入真实业务仓库时应重新做风险扫描。",
      },
      {
        name: "高风险目录提醒",
        severity: "medium",
        status: "watch",
        path: "workspace-root",
        summary: "默认仍应谨慎对待包含支付、生产配置、用户数据导出、证书目录的路径。",
        rationale: "这些风险在当前仓库未命中，不代表在真实用户仓库中不存在。",
        permissionImpact: "建议把外部系统动作和敏感目录读取保持在人工确认之后。",
      },
    );
  }

  const hasHigh = findings.some((item) => item.severity === "high" && item.status === "present");
  const recommendedModeOverride = hasHigh ? "可读" : diagnosis.permissionPlan.startMode.label;

  return {
    summary: hasHigh
      ? "检测到高风险敏感位点，建议降低默认权限起点并谨慎读取相关文件。"
      : "当前未检测到明显高危敏感文件，但仍需对真实业务仓库保持保守读取策略。",
    nextAction: hasHigh
      ? "先确认敏感文件是否需要纳入 AI 协作范围，再决定是否提升到可写或可执行。"
      : "继续保持当前权限起点，并在接入真实业务仓库时重新做风险扫描。",
    recommendedModeOverride,
    findings,
  };
}

export function buildRiskGuardContent(result: RiskGuardResult) {
  return `# Sensitive Risk Guard

## Summary
- ${result.summary}

## Next Action
- ${result.nextAction}

## Permission Recommendation
- ${result.recommendedModeOverride ?? "未调整"}

## Findings
${result.findings
  .map((item) => `### ${item.name}
- Severity: ${item.severity}
- Status: ${item.status}
- Path: \`${item.path}\`
- Summary: ${item.summary}
- Rationale: ${item.rationale}
- Permission Impact: ${item.permissionImpact}`)
  .join("\n\n")}
`;
}
