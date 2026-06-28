import Link from "next/link";
import { ArrowRight, BookOpenText, FolderTree, RefreshCcw, ShieldCheck } from "lucide-react";
import { Card, Pill, PrimaryButton, SectionTag, Shell, TopNav } from "@/components/ui";
import { ExportAiOsButton } from "@/components/export-ai-os-button";
import { exportAiOsAction } from "@/app/ai-os/actions";
import { buildAiOsArtifact, buildDiagnosis, type IntakeInput } from "@/lib/diagnosis";
import { buildEnvironmentCheckContent, detectEnvironment } from "@/lib/environment-doctor";
import { buildRuleScanContent, detectExistingRules } from "@/lib/rule-scanner";
import { buildDiffPlan, buildDiffPlanContent } from "@/lib/diff-planner";
import { buildRiskGuardContent, detectRiskGuard } from "@/lib/risk-guard";
import { buildMcpHealthContent, detectMcpHealth } from "@/lib/mcp-health";
import { buildRetrospectiveDraft, buildRuleCandidates } from "@/lib/retrospective";

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

export default async function AiOsPage({
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
  const environmentCheckContent = buildEnvironmentCheckContent(environmentCheck);
  const ruleScan = await detectExistingRules(artifact);
  const ruleScanContent = buildRuleScanContent(ruleScan);
  const diffPlan = await buildDiffPlan(artifact, ruleScan);
  const diffPlanContent = buildDiffPlanContent(diffPlan);
  const riskGuard = await detectRiskGuard(intake, diagnosis);
  const riskGuardContent = buildRiskGuardContent(riskGuard);
  const mcpHealth = await detectMcpHealth(intake, diagnosis);
  const mcpHealthContent = buildMcpHealthContent(mcpHealth);
  const retrospective = buildRetrospectiveDraft(intake, diagnosis, artifact);
  const ruleCandidates = buildRuleCandidates(intake, diagnosis, artifact, retrospective);
  const query = buildQuery(intake);
  const exported = getFirst(params.exported) === "1";
  const exportPath = getFirst(params.exportPath);
  const savedCandidates = getFirst(params.savedCandidates)
    .split(" | ")
    .map((item) => item.trim())
    .filter(Boolean);
  const savedVersion = getFirst(params.savedVersion);
  const savedAt = getFirst(params.savedAt);
  const changeSummary = getFirst(params.changeSummary)
    .split(" | ")
    .map((item) => item.trim())
    .filter(Boolean);
  const syncClients = getFirst(params.syncClients)
    .split(" | ")
    .map((item) => item.trim())
    .filter(Boolean);
  const syncPaths = getFirst(params.syncPaths)
    .split(" | ")
    .map((item) => item.trim())
    .filter(Boolean);
  const syncReasons = getFirst(params.syncReasons)
    .split(" | ")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <Shell className="pb-12">
      <TopNav />
      <main className="mx-auto mt-8 max-w-7xl space-y-6">
        {exported && exportPath ? (
          <Card className="px-6 py-5 md:px-8">
            <div className="text-sm font-semibold text-slate-900">AI-OS 已写出到本地目录</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              当前已生成的目录：
              {" "}
              <span className="font-medium text-slate-900">{exportPath}</span>
            </div>
            {savedCandidates.length > 0 ? (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                本次已确认保存：
                {" "}
                <span className="font-medium text-slate-900">{savedCandidates.join("、")}</span>
              </div>
            ) : (
              <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
                本次未勾选任何候选规则，系统只写出了基础 AI-OS 骨架，没有追加共享规则内容。
              </div>
            )}
            {savedVersion ? (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">规则轻量版本记录</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">
                  当前版本：
                  {" "}
                  <span className="font-medium text-slate-900">{savedVersion}</span>
                </div>
                <div className="text-sm leading-6 text-slate-500">保存时间：{savedAt}</div>
                <div className="mt-2 space-y-1">
                  {changeSummary.map((item) => (
                    <div key={item} className="text-sm leading-6 text-slate-500">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {syncClients.length > 0 ? (
              <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">客户端同步提示</div>
                <div className="mt-2 space-y-3">
                  {syncClients.map((client, index) => (
                    <div key={`${client}-${syncPaths[index]}`} className="text-sm leading-6 text-slate-500">
                      <span className="font-medium text-slate-900">{client}</span>
                      {" "}
                      {"-> "}
                      {syncPaths[index]}
                      {" "}
                      <span className="text-slate-500">{syncReasons[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </Card>
        ) : null}

        <Card className="px-6 py-6 md:px-8 md:py-8">
          <SectionTag>AI-OS Output</SectionTag>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">Reusable Operating Layer</div>
              <h1 className="mt-3 text-[34px] leading-[1.08] font-semibold text-slate-950 md:text-[48px]">
                这是你的第一版 AI-OS，可直接作为后续项目的起点。
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">{artifact.northStar}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Pill active>{artifact.workspaceName}</Pill>
                <Pill>{diagnosis.maturityLabel}</Pill>
                <Pill>{diagnosis.recommendedClients[0]?.name ?? "Recommended Stack"}</Pill>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5">
              <div className="text-sm font-semibold text-slate-900">推荐落地方式</div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <div><span className="font-medium text-slate-900">主力客户端：</span>{diagnosis.recommendedClients[0]?.name}</div>
                <div><span className="font-medium text-slate-900">推荐模型：</span>{diagnosis.modelRecommendation}</div>
                <div><span className="font-medium text-slate-900">Token 状态：</span>{diagnosis.tokenPlan.label}</div>
                <div><span className="font-medium text-slate-900">默认权限：</span>{diagnosis.permissionPlan.startMode.label}</div>
                <div><span className="font-medium text-slate-900">MCP 选择：</span>{diagnosis.mcpPlan.selected.join("、") || "当前未接入"}</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              全局 operating rules
            </div>
            <div className="mt-5 space-y-3">
              {artifact.operatingRules.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FolderTree className="h-4 w-4 text-indigo-600" />
              建议创建的 AI-OS 文件
            </div>
            <div className="mt-5 space-y-3">
              {artifact.starterFiles.map((item) => (
                <div key={item.path} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="text-sm font-semibold text-slate-900">{item.path}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{item.purpose}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="px-6 py-6 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <BookOpenText className="h-4 w-4 text-sky-600" />
              客户端角色分工
            </div>
            <div className="mt-5 space-y-3">
              {artifact.clientProfiles.map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{item.mission}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-500">{item.usage}</div>
                </div>
              ))}
            </div>
          </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <RefreshCcw className="h-4 w-4 text-violet-600" />
            复利机制
            </div>
            <div className="mt-5 space-y-3">
              {artifact.memoryLoop.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">建议立刻执行的 5 个动作</div>
              <div className="mt-3 space-y-2">
                {artifact.firstActions.map((item) => (
                  <div key={item} className="text-sm leading-6 text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-slate-900">任务后复盘</div>
              <div className="mt-1 text-sm leading-6 text-slate-500">
                先把这轮任务里真正有效的经验收住，后续系统才有机会把它升级成共享规则。
              </div>
            </div>
            <a
              href="#retrospective-form"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              进入复盘
            </a>
          </div>
          <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {retrospective.summary}
          </div>
          <div className="mt-4 grid gap-3 xl:grid-cols-3">
            {retrospective.candidateSignals.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
                {item}
              </div>
            ))}
          </div>
          <div id="retrospective-form" className="mt-5 grid gap-4 xl:grid-cols-2">
            {retrospective.fields.map((field) => (
              <label key={field.name} className="block rounded-[24px] border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{field.label}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{field.helper}</div>
                <textarea
                  name={field.name}
                  defaultValue={field.defaultValue}
                  className="mt-3 min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] leading-6 text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </label>
            ))}
          </div>
          <div className="mt-4 rounded-[24px] border border-dashed border-slate-300 bg-white px-4 py-4">
            <div className="text-sm font-semibold text-slate-900">保存策略</div>
            <div className="mt-3 space-y-2">
              {retrospective.savePolicy.map((item) => (
                <div key={item} className="text-sm leading-6 text-slate-500">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-slate-900">规则候选生成与分类</div>
              <div className="mt-1 text-sm leading-6 text-slate-500">
                系统先基于复盘结构生成候选，再告诉你它为什么被分到这个层级。
              </div>
            </div>
            <Pill>{ruleCandidates.candidates.length} 条候选</Pill>
          </div>
          <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {ruleCandidates.summary}
          </div>
          <form action={exportAiOsAction} className="mt-4 space-y-4">
            <input type="hidden" name="role" value={intake.role} />
            <input type="hidden" name="goal" value={intake.goal} />
            <input type="hidden" name="clients" value={intake.clients} />
            <input type="hidden" name="tokenStatus" value={intake.tokenStatus} />
            {intake.mcpSelections.map((item) => (
              <input key={item} type="hidden" name="mcpSelection" value={item} />
            ))}
            <input type="hidden" name="tasks" value={intake.tasks} />
            <input type="hidden" name="concerns" value={intake.concerns} />

            {ruleCandidates.candidates.map((item) => (
              <label key={item.id} className="block rounded-[24px] border border-slate-200 bg-white px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="selectedCandidate"
                      value={item.id}
                      defaultChecked
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-300"
                    />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">
                        将写入：
                        {" "}
                        <span className="font-medium text-slate-900">
                          {item.category === "rules"
                            ? "AI-OS/rules.md"
                            : item.category === "workflows"
                              ? "AI-OS/workflows.md"
                              : "AI-OS/memory/decisions.md"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Pill>{item.category}</Pill>
                </div>
                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                  {item.content}
                </div>
                <div className="mt-3 text-sm leading-6 text-slate-600">{item.rationale}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.source}</div>
              </label>
            ))}

            <div className="rounded-[24px] border border-dashed border-slate-300 bg-white px-4 py-4">
              <div className="text-sm font-semibold text-slate-900">确认保存规则</div>
              <div className="mt-1 text-sm leading-6 text-slate-500">
                只有你勾选的候选会写回共享规则文件；未勾选项不会被自动写入。
              </div>
              <div className="mt-4">
                <ExportAiOsButton />
              </div>
            </div>
          </form>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="text-sm font-semibold text-slate-900">权限边界策略</div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            推荐起点：{diagnosis.permissionPlan.startMode.label}。{diagnosis.permissionPlan.startMode.summary}
          </div>
          {riskGuard.recommendedModeOverride && riskGuard.recommendedModeOverride !== diagnosis.permissionPlan.startMode.label ? (
            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
              风险扫描建议将默认权限起点下调为：{riskGuard.recommendedModeOverride}
            </div>
          ) : null}
          <div className="mt-3 grid gap-3 xl:grid-cols-2">
            {diagnosis.permissionPlan.actionBoundaries.map((item) => (
              <div key={item.type} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{item.type}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{item.confirmation}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.examples}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="text-sm font-semibold text-slate-900">MCP 接入结果</div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {diagnosis.mcpPlan.selectionSummary}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            {diagnosis.mcpPlan.fallbackMessage}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="text-sm font-semibold text-slate-900">MCP 连接状态检测与失败兜底</div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {mcpHealth.summary}
          </div>
          <div className="mt-3 grid gap-3 xl:grid-cols-2">
            {mcpHealth.items.length > 0 ? (
              mcpHealth.items.map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                    <div className="text-xs font-medium text-slate-500">{item.status}</div>
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-500">失败原因：{item.failureReason}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-500">兜底：{item.fallback}</div>
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

        <Card className="px-6 py-6 md:px-8">
          <div className="text-sm font-semibold text-slate-900">本地环境检测</div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {environmentCheck.summary}
          </div>
          <div className="mt-3 grid gap-3 xl:grid-cols-2">
            {environmentCheck.clients.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">状态：{item.status}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.summary}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 xl:grid-cols-3">
            {environmentCheck.targets.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">状态：{item.status}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.summary}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            下一步建议：{environmentCheck.nextAction}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="text-sm font-semibold text-slate-900">已有规则识别与冲突扫描</div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {ruleScan.summary}
          </div>
          <div className="mt-3 grid gap-3 xl:grid-cols-3">
            {ruleScan.items.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">状态：{item.status}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.summary}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">建议动作：{item.suggestedAction}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            下一步建议：{ruleScan.nextAction}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="text-sm font-semibold text-slate-900">配置 diff 预览与合并建议</div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {diffPlan.summary}
          </div>
          <div className="mt-3 space-y-3">
            {diffPlan.items.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                  <div className="text-xs font-medium text-slate-500">{item.recommendation}</div>
                </div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.rationale}</div>
                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                  {item.preview.map((line, index) => (
                    <div key={`${item.name}-${index}`} className="text-xs leading-6 text-slate-600">
                      [{line.type}] {line.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            下一步建议：{diffPlan.nextAction}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="text-sm font-semibold text-slate-900">敏感信息检查与风险提示</div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            {riskGuard.summary}
          </div>
          <div className="mt-3 grid gap-3 xl:grid-cols-2">
            {riskGuard.findings.map((item) => (
              <div key={`${item.name}-${item.path}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                  <div className="text-xs font-medium text-slate-500">{item.severity}</div>
                </div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.rationale}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">权限影响：{item.permissionImpact}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-500">
            下一步建议：{riskGuard.nextAction}
          </div>
        </Card>

        <Card className="px-6 py-6 md:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FolderTree className="h-4 w-4 text-indigo-600" />
            AI-OS 文件内容预览
          </div>
          <div className="mt-5 space-y-4">
            {artifact.fileContents.map((item) => (
              <div key={item.path} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-sm font-semibold text-slate-900">{item.path}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.purpose}</div>
                </div>
                <pre className="overflow-x-auto px-4 py-4 text-xs leading-6 text-slate-700 whitespace-pre-wrap">
                  {item.path === "AI-OS/memory/rule-versions.md" && savedVersion
                    ? `# Rule Versions\n\n## ${savedVersion}\n- Saved at: ${savedAt}\n${changeSummary.map((entry) => `- ${entry}`).join("\n")}`
                    : item.path === "AI-OS/install/environment-check.md"
                    ? environmentCheckContent
                    : item.path === "AI-OS/install/existing-rules-scan.md"
                      ? ruleScanContent
                      : item.path === "AI-OS/install/diff-merge-plan.md"
                        ? diffPlanContent
                        : item.path === "AI-OS/install/sensitive-risk-guard.md"
                          ? riskGuardContent
                          : item.path === "AI-OS/install/mcp-health.md"
                            ? mcpHealthContent
                      : item.content}
                </pre>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-6 py-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-slate-900">下一步</div>
              <div className="mt-1 text-sm text-slate-500">
                现在你已经有了第一版 AI-OS 骨架。下一步可以继续把它同步到客户端适配文件、MCP 勾选和真实项目目录。
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
                href={`/setup-check?${query}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
              >
                接入检查页
              </Link>
              <Link href={`/onboarding?${query}`}>
                <PrimaryButton>
                  重新生成
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </Shell>
  );
}
