import { access, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { IntakeInput } from "@/lib/diagnosis";

const execFileAsync = promisify(execFile);

export type ClientHealth = {
  name: string;
  status: "ready" | "partial" | "missing";
  summary: string;
  evidence: string[];
};

export type WorkspaceTarget = {
  name: string;
  path: string;
  status: "present" | "missing";
  summary: string;
};

export type EnvironmentCheck = {
  workspaceRoot: string;
  overallStatus: "healthy" | "attention";
  summary: string;
  nextAction: string;
  clients: ClientHealth[];
  targets: WorkspaceTarget[];
};

async function exists(targetPath: string) {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function hasExecutable(command: string) {
  try {
    const { stdout } = await execFileAsync("sh", ["-lc", `command -v ${command}`]);
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

async function isDirectory(targetPath: string) {
  try {
    const result = await stat(targetPath);
    return result.isDirectory();
  } catch {
    return false;
  }
}

async function detectCodex(workspaceRoot: string): Promise<ClientHealth> {
  const checks = await Promise.all([
    hasExecutable("codex"),
    exists(path.join(workspaceRoot, "AGENTS.md")),
    exists(path.join(homedir(), ".codex")),
  ]);
  const [hasCli, hasAgents, hasHome] = checks;
  const evidence = [
    hasCli ? "检测到本地 `codex` 可执行命令。" : "未检测到本地 `codex` 可执行命令。",
    hasAgents ? "当前工作区已存在 `AGENTS.md`。" : "当前工作区尚未放置 `AGENTS.md`。",
    hasHome ? "检测到 `~/.codex` 目录。" : "未检测到 `~/.codex` 目录。",
  ];

  if (hasCli && (hasAgents || hasHome)) {
    return {
      name: "Codex",
      status: "ready",
      summary: "Codex 运行条件基本具备，可继续验证项目级规则是否已接入。",
      evidence,
    };
  }

  if (hasCli || hasAgents || hasHome) {
    return {
      name: "Codex",
      status: "partial",
      summary: "Codex 已有部分基础条件，但项目级规则或本地环境仍未完全到位。",
      evidence,
    };
  }

  return {
    name: "Codex",
    status: "missing",
    summary: "尚未发现 Codex 可执行环境或项目接入痕迹。",
    evidence,
  };
}

async function detectClaudeCode(workspaceRoot: string): Promise<ClientHealth> {
  const checks = await Promise.all([
    hasExecutable("claude"),
    exists(path.join(workspaceRoot, "AI-OS", "clients", "claude-code.md")),
    exists(path.join(workspaceRoot, "AI-OS", "candidates", "claude-code", "session-start.md")),
  ]);
  const [hasCli, hasProfile, hasSessionTemplate] = checks;
  const evidence = [
    hasCli ? "检测到本地 `claude` 可执行命令。" : "未检测到本地 `claude` 可执行命令。",
    hasProfile ? "当前工作区已存在 `AI-OS/clients/claude-code.md`。" : "当前工作区尚未放置 Claude Code profile。",
    hasSessionTemplate ? "当前工作区已存在 Claude Code session 模板。" : "当前工作区尚未放置 Claude Code session 模板。",
  ];

  if (hasCli && (hasProfile || hasSessionTemplate)) {
    return {
      name: "Claude Code",
      status: "ready",
      summary: "Claude Code 的本地入口和会话规则基础已具备。",
      evidence,
    };
  }

  if (hasCli || hasProfile || hasSessionTemplate) {
    return {
      name: "Claude Code",
      status: "partial",
      summary: "Claude Code 已部分可用，但仍缺少共享规则或本地入口。",
      evidence,
    };
  }

  return {
    name: "Claude Code",
    status: "missing",
    summary: "尚未发现 Claude Code 的本地入口或接入文件。",
    evidence,
  };
}

async function detectCursor(workspaceRoot: string): Promise<ClientHealth> {
  const checks = await Promise.all([
    exists(path.join("/Applications", "Cursor.app")),
    exists(path.join(workspaceRoot, ".cursor", "rules")),
    exists(path.join(workspaceRoot, "AI-OS", "clients", "cursor.md")),
  ]);
  const [hasApp, hasRulesDir, hasProfile] = checks;
  const evidence = [
    hasApp ? "检测到本机存在 `Cursor.app`。" : "未检测到本机 `Cursor.app`。",
    hasRulesDir ? "当前工作区已存在 `.cursor/rules/`。" : "当前工作区尚未放置 `.cursor/rules/`。",
    hasProfile ? "当前工作区已存在 `AI-OS/clients/cursor.md`。" : "当前工作区尚未放置 Cursor profile。",
  ];

  if (hasApp && (hasRulesDir || hasProfile)) {
    return {
      name: "Cursor",
      status: "ready",
      summary: "Cursor 的 IDE 环境与规则镜像位点已基本具备。",
      evidence,
    };
  }

  if (hasApp || hasRulesDir || hasProfile) {
    return {
      name: "Cursor",
      status: "partial",
      summary: "Cursor 已有部分可用条件，但规则镜像或工作区落位仍不完整。",
      evidence,
    };
  }

  return {
    name: "Cursor",
    status: "missing",
    summary: "尚未发现 Cursor 应用或项目规则位点。",
    evidence,
  };
}

async function detectWorkspaceTargets(workspaceRoot: string): Promise<WorkspaceTarget[]> {
  const aiOsPath = path.join(workspaceRoot, "AI-OS");
  const agentsPath = path.join(workspaceRoot, "AGENTS.md");
  const cursorRulesPath = path.join(workspaceRoot, ".cursor", "rules");
  const checks = await Promise.all([
    isDirectory(aiOsPath),
    exists(agentsPath),
    isDirectory(cursorRulesPath),
  ]);
  const [hasAiOs, hasAgents, hasCursorRules] = checks;

  return [
    {
      name: "AI-OS 目录",
      path: aiOsPath,
      status: hasAiOs ? "present" : "missing",
      summary: hasAiOs ? "当前工作区已存在共享 AI-OS 目录。" : "当前工作区尚未存在共享 AI-OS 目录。",
    },
    {
      name: "AGENTS.md",
      path: agentsPath,
      status: hasAgents ? "present" : "missing",
      summary: hasAgents ? "当前工作区已存在项目级 AGENTS.md。" : "当前工作区尚未放置项目级 AGENTS.md。",
    },
    {
      name: ".cursor/rules",
      path: cursorRulesPath,
      status: hasCursorRules ? "present" : "missing",
      summary: hasCursorRules ? "当前工作区已存在 Cursor 规则目录。" : "当前工作区尚未放置 Cursor 规则目录。",
    },
  ];
}

export async function detectEnvironment(_input: IntakeInput): Promise<EnvironmentCheck> {
  const workspaceRoot = process.cwd();
  const [clients, targets] = await Promise.all([
    Promise.all([detectCodex(workspaceRoot), detectClaudeCode(workspaceRoot), detectCursor(workspaceRoot)]),
    detectWorkspaceTargets(workspaceRoot),
  ]);

  const readyCount = clients.filter((item) => item.status === "ready").length;
  const missingTargets = targets.filter((item) => item.status === "missing").length;
  const overallStatus = readyCount >= 1 && missingTargets <= 1 ? "healthy" : "attention";

  return {
    workspaceRoot,
    overallStatus,
    summary:
      overallStatus === "healthy"
        ? "当前环境已经具备至少一个主客户端入口，并且关键工作区落位大体可用。"
        : "当前环境仍存在缺口，建议先补齐客户端入口或关键落位，再继续大规模接入。",
    nextAction:
      missingTargets > 0
        ? "优先补齐当前工作区中的 AI-OS / AGENTS.md / .cursor/rules 等关键落位目标。"
        : "优先让一个主客户端复述共享规则，再扩展到其他客户端。",
    clients,
    targets,
  };
}

export function buildEnvironmentCheckContent(check: EnvironmentCheck) {
  return `# Environment Check

## Workspace Root
${check.workspaceRoot}

## Overall Status
- ${check.overallStatus === "healthy" ? "Healthy" : "Needs Attention"}
- ${check.summary}

## Next Action
- ${check.nextAction}

## Client Availability
${check.clients
  .map((item) => `### ${item.name}
- Status: ${item.status}
- Summary: ${item.summary}
${item.evidence.map((line) => `- ${line}`).join("\n")}`)
  .join("\n\n")}

## Workspace Targets
${check.targets
  .map((item) => `### ${item.name}
- Path: \`${item.path}\`
- Status: ${item.status}
- Summary: ${item.summary}`)
  .join("\n\n")}
`;
}
