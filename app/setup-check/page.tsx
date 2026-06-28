import Link from "next/link";
import { CheckCircle2, ClipboardCheck, FolderTree, CircleDashed, PlugZap } from "lucide-react";
import { Card, Pill, SectionTag, Shell, TopNav } from "@/components/ui";
import { buildAiOsArtifact, buildDiagnosis, type IntakeInput } from "@/lib/diagnosis";
import { detectEnvironment } from "@/lib/environment-doctor";
import { detectExistingRules } from "@/lib/rule-scanner";
import { buildDiffPlan } from "@/lib/diff-planner";
import { detectRiskGuard } from "@/lib/risk-guard";
import { detectMcpHealth } from "@/lib/mcp-health";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function getMany(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  return value ? [value] : [];
}

function buildQuery(input: IntakeInput) {
  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key === "mcpSelections" ? "mcpSelection" : key, item));
      return;
    }
    params.set(key, value);
  });
  return params.toString();
}

function buildSetupStages(hasExport: boolean) {
  return [
    {
      name: "已导出但未放置",
      status: hasExport ? "completed" : "current",
      summary: hasExport ? "AI-OS 文件已经写出到本地，可进入放置阶段。" : "先从 AI-OS 页面导出文件到本地目录。",
    },
    {
      name: "已放置待验证",
      status: hasExport ? "current" : "upcoming",
      summary: "将 AGENTS.md、Cursor rules、Claude Code 说明放到目标位置，并逐个客户端做验证。",
    },
    {
      name: "已接入可使用",
      status: "upcoming",
      summary: "多个客户端都能复述相同规则、边界和工作流时，才算真正接入完成。",
    },
  ] as const;
}

function buildPlacementCards() {
  return [
    {
      name: "Codex",
      placement: "项目根目录放置 `AGENTS.md`，并保留 `AI-OS/` 作为共享规则目录。",
      verification: "让它在编辑前复述规则、权限边界和验证标准。",
    },
    {
      name: "Claude Code",
      placement: "在项目根目录保留 `AI-OS/`，长会话开场时引用 `AI-OS/clients/claude-code.md`。",
      verification: "确认它能解释任务边界、判断标准和风险点，而不是只给泛化建议。",
    },
    {
      name: "Cursor",
      placement: "保留 `AI-OS/` 在仓库中，并只把稳定规则镜像到 Cursor 项目规则里。",
      verification: "确认它的局部建议仍遵守共享命名、边界和验证要求。",
    },
  ];
}

function buildClientSyncCards() {
  return [
    {
      client: "Codex",
      target: "AGENTS.md",
      summary: "当共享规则、工作流或版本记录更新后，同步仓库级代理说明。",
    },
    {
      client: "Cursor",
      target: ".cursor/rules/ai-collab-foundation.mdc",
      summary: "把稳定规则镜像到 Cursor 项目规则，保持 IDE 内建议与共享底座一致。",
    },
    {
      client: "Claude Code",
      target: "AI-OS/candidates/claude-code/session-start.md",
      summary: "更新长会话开场提示，确保 Claude Code 也能读到新的规则和版本变化。",
    },
  ];
}

export default async function SetupCheckPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const intake: IntakeInput = {
    role: getFirst(params.role),
    goal: getFirst(params.goal),
    clients: getFirst(params.clients),
    tokenStatus: getFirst(params.tokenStatus),
    mcpSelections: getMany(params.mcpSelection).filter((item) => item.trim().length > 0),
    tasks: getFirst(params.tasks),
    concerns: getFirst(params.concerns),
  };

  const diagnosis = buildDiagnosis(intake);
  const artifact = buildAiOsArtifact(intake, diagnosis);
  const environmentCheck = await detectEnvironment(intake);
  const ruleScan = await detectExistingRules(artifact);
  const diffPlan = await buildDiffPlan(artifact, ruleScan);
  const riskGuard = await detectRiskGuard(intake, diagnosis);
  const mcpHealth = await detectMcpHealth(intake, diagnosis);
  const verification = artifact.fileContents.find((item) => item.path === "AI-OS/install/verification-checklist.md");
  const targets = artifact.fileContents.find((item) => item.path === "AI-OS/install/target-locations.md");
  const contentOpsArtifacts = artifact.fileContents.filter((item) => item.path.startsWith("AI-OS/contentops/"));
  const query = buildQuery(intake);
  const hasExport = getFirst(params.exported) === "1";
  const stages = buildSetupStages(hasExport);
  const placementCards = buildPlacementCards();
  const clientSyncCards = buildClientSyncCards();

  return (
    <Shell className="pb-12">
      <TopNav />
      <main className="mx-auto mt-8 max-w-7xl space-y-6">
        <Card className="px-6 py-6 md:px-8 md:py-8">
          <SectionTag>Setup Check</SectionTag>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">Client Verification</div>
              <h1 className="mt-3 text-[34px] leading-[1.08] font-semibold text-slate-950 md:text-[48px]">
                接入之后，应该如何确认这套底座真的生效了。
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
                这个页面把目标放置位置和验证清单集中展示，方便你逐项确认 Codex、Claude Code、Cursor、Copilot 是否真的读到了同一套规则。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Pill active>{diagnosis.maturityLabel}</Pill>
                <Pill>{diagnosis.recommendedClients[0]?.name ?? "Recommended Stack"}</Pill>
                <Pill>{hasExport ? "已导出" : "待导出"}</Pill>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5">
              <div className="text-sm font-semibold text-slate-900">本次检查重点</div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <div><span className="font-medium text-slate-900">目标：</span>{intake.goal || "建立统一 AI 协作系统"}</div>
                <div><span className="font-medium text-slate-900">角色：</span>{intake.role || diagnosis.roleLabel}</div>
                <div><span className="font-medium text-slate-900">主要客户端：</span>{intake.clients || diagnosis.recommendedClients.map((item) => item.name).join("、")}</div>
                <div><span className="font-medium text-slate-900">MCP 选择：</span>{diagnosis.mcpPlan.selected.join("、") || "当前未接入"}</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <PlugZap className="h-4 w-4 text-violet-600" />
            当前接入阶段
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {stages.map((stage) => (
              <div
                key={stage.name}
                className={`rounded-2xl border px-4 py-4 ${
                  stage.status === "completed"
                    ? "border-emerald-200 bg-emerald-50/70"
                    : stage.status === "current"
                      ? "border-indigo-200 bg-indigo-50/70"
                      : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {stage.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <CircleDashed className="h-4 w-4 text-slate-500" />
                  )}
                  <div className="text-sm font-semibold text-slate-900">{stage.name}</div>
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{stage.summary}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <PlugZap className="h-4 w-4 text-violet-600" />
            本地环境健康检查
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {environmentCheck.summary}
          </div>
          <div className="mt-4 grid gap-3 xl:grid-cols-3">
            {environmentCheck.clients.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">状态：{item.status}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.summary}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 xl:grid-cols-3">
            {environmentCheck.targets.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">状态：{item.status}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.summary}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <PlugZap className="h-4 w-4 text-violet-600" />
            已有规则识别与冲突扫描
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {ruleScan.summary}
          </div>
          <div className="mt-4 grid gap-3 xl:grid-cols-3">
            {ruleScan.items.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">状态：{item.status}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.summary}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            下一步建议：{ruleScan.nextAction}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <PlugZap className="h-4 w-4 text-violet-600" />
            配置 diff 预览与合并建议
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {diffPlan.summary}
          </div>
          <div className="mt-4 grid gap-3">
            {diffPlan.items.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                  <div className="text-xs font-medium text-slate-500">{item.recommendation}</div>
                </div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.rationale}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            下一步建议：{diffPlan.nextAction}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <PlugZap className="h-4 w-4 text-violet-600" />
            敏感信息检查与风险提示
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {riskGuard.summary}
          </div>
          {riskGuard.recommendedModeOverride && riskGuard.recommendedModeOverride !== diagnosis.permissionPlan.startMode.label ? (
            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
              建议将默认权限起点下调为：{riskGuard.recommendedModeOverride}
            </div>
          ) : null}
          <div className="mt-4 grid gap-3 xl:grid-cols-2">
            {riskGuard.findings.map((item) => (
              <div key={`${item.name}-${item.path}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                  <div className="text-xs font-medium text-slate-500">{item.severity}</div>
                </div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.permissionImpact}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            下一步建议：{riskGuard.nextAction}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <PlugZap className="h-4 w-4 text-violet-600" />
            MCP 连接状态检测与失败兜底
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {mcpHealth.summary}
          </div>
          <div className="mt-4 grid gap-3 xl:grid-cols-2">
            {mcpHealth.items.length > 0 ? (
              mcpHealth.items.map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                    <div className="text-xs font-medium text-slate-500">{item.status}</div>
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-500">{item.fallback}</div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
                当前未选择 MCP，系统默认退回 AI-OS 核心模式。
              </div>
            )}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            下一步建议：{mcpHealth.nextAction}
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          {placementCards.map((item) => (
            <Card key={item.name} className="px-6 py-6 md:px-8">
              <div className="text-sm font-semibold text-slate-900">{item.name} 放置与验证</div>
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">建议放置位置</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{item.placement}</div>
              </div>
              <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">验证动作</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{item.verification}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="px-6 py-6 md:px-8 xl:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FolderTree className="h-4 w-4 text-sky-600" />
              ContentOps 联动产物检查
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
              这组文件就是 ContentOps 在母稿生成前应读取的上游上下文层。真正联动成功，不只是文件存在，而是下游生成链路能按这些文件的顺序消费它们。
            </div>
            <div className="mt-4 grid gap-3 xl:grid-cols-2">
              {contentOpsArtifacts.map((item) => (
                <div key={item.path} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="text-sm font-semibold text-slate-900">{item.path}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{item.purpose}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
              验收重点：先确认
              {" "}
              <span className="font-mono text-slate-600">
                profile -&gt; boundaries -&gt; style-card -&gt; source-map -&gt; draft-context -&gt; mother-draft-prompt -&gt; mother-draft-sample
              </span>
              {" "}
              已完整导出，再确认下游内容生成不会绕过这些文件。
            </div>
          </Card>

          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FolderTree className="h-4 w-4 text-indigo-600" />
              目标放置位置
            </div>
            <pre className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-600">{targets?.content}</pre>
          </Card>

          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ClipboardCheck className="h-4 w-4 text-emerald-600" />
              验证清单
            </div>
            <pre className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-600">{verification?.content}</pre>
          </Card>
        </div>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ClipboardCheck className="h-4 w-4 text-emerald-600" />
            客户端同步提示
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            新沉淀下来的规则只有真正回流到客户端适配层里，才会从“本次可用”变成“下次默认生效”。
          </div>
          <div className="mt-4 grid gap-3 xl:grid-cols-3">
            {clientSyncCards.map((item) => (
              <div key={item.client} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{item.client}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">同步目标：{item.target}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.summary}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            收尾验收标准：复盘入口已存在，规则候选可生成，确认保存可写回，轻量版本可追踪，且同步目标已明确到客户端文件。
          </div>
        </Card>

        <Card className="px-6 py-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-600" />
              <div>
                <div className="text-base font-semibold text-slate-900">完成标准</div>
                <div className="mt-1 text-sm text-slate-500">
                  当多个客户端都能复述相同的 identity、rules、workflow 边界，并且不绕过验证链路时，接入才算真正成功。
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/configure?${query}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
              >
                返回配置
              </Link>
              <Link
                href={`/ai-os?${query}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
              >
                返回 AI-OS
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </Shell>
  );
}
