import { ArrowRight, Check, CircleDashed, LockKeyhole, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  Card,
  Pill,
  PrimaryButton,
  SecondaryButton,
  Shell,
  StepBadge,
  TopNav,
} from "@/components/ui";
import { configureSteps } from "@/lib/data";
import { buildDiagnosis, type IntakeInput } from "@/lib/diagnosis";

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

export default async function ConfigurePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const role = getFirst(params.role);
  const goal = getFirst(params.goal);
  const clients = getFirst(params.clients);
  const tokenStatus = getFirst(params.tokenStatus);
  const mcpSelections = getMany(params.mcpSelection).filter((item) => item.trim().length > 0);
  const tasks = getFirst(params.tasks);
  const concerns = getFirst(params.concerns);
  const intake: IntakeInput = { role, goal, clients, tokenStatus, mcpSelections, tasks, concerns };
  const diagnosis = buildDiagnosis(intake);

  return (
    <Shell className="pb-12">
      <TopNav />
      <main className="mx-auto mt-8 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <Card className="px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Configuration Flow</div>
              <div className="mt-4 space-y-4">
                {configureSteps.map((step, index) => (
                  <div key={step.id} className="flex gap-3">
                    <StepBadge index={index + 1} active={step.status === "current"} complete={step.status === "complete"} />
                    <div className="pt-1">
                      <div className="text-sm font-semibold text-slate-900">{step.label}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-500">{step.caption}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="px-4 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Shield className="h-4 w-4 text-indigo-600" />
                默认策略
              </div>
              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <div>先推荐主力组合，再提供替代选项。</div>
                <div>先给最小可用 MCP，再逐步扩展。</div>
                <div>所有高风险动作默认需要人工确认。</div>
              </div>
            </Card>

            {(role || goal) ? (
              <Card className="px-4 py-4">
                <div className="text-sm font-semibold text-slate-900">来自诊断结果</div>
                <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {role ? <div><span className="font-medium text-slate-900">角色：</span>{role}</div> : null}
                  {goal ? <div><span className="font-medium text-slate-900">目标：</span>{goal}</div> : null}
                </div>
              </Card>
            ) : null}
          </aside>

          <form action="/ai-os" className="space-y-6">
            <input type="hidden" name="role" value={role} />
            <input type="hidden" name="goal" value={goal} />
            <input type="hidden" name="clients" value={clients} />
            <input type="hidden" name="tokenStatus" value={tokenStatus} />
            <input type="hidden" name="tasks" value={tasks} />
            <input type="hidden" name="concerns" value={concerns} />
            <Card className="px-6 py-6 md:px-8 md:py-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">Step 2 · Recommended Stack</div>
                  <h1 className="mt-3 text-[34px] leading-[1.08] font-semibold text-slate-950 md:text-[46px]">
                    先给出一套默认推荐，再解释为什么。
                  </h1>
                  <p className="mt-4 text-[15px] leading-7 text-slate-600">
                    这一页借鉴左侧 stepper + 中央卡片配置结构，作为 AI 协作底座的核心配置流程。默认推荐会明确给出主力客户端、模型、权限、交付方式与替代方案。
                  </p>
                </div>
                <Pill active>{diagnosis.recommendedClients[0]?.name ?? "Recommended"}</Pill>
              </div>

              <div className="mt-8 grid gap-4 xl:grid-cols-3">
                {diagnosis.recommendedClients.map((client) => (
                  <div
                    key={client.name}
                    className={`rounded-[24px] border p-5 ${
                      client.recommended ? "border-indigo-300 bg-indigo-50/70" : "border-slate-200 bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-base font-semibold text-slate-900">{client.name}</div>
                      {client.recommended ? (
                        <div className="inline-flex items-center gap-1 rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-white">
                          <Sparkles className="h-3.5 w-3.5" />
                          默认
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-3 text-sm leading-6 text-slate-600">{client.description}</div>
                    <div className="mt-4 rounded-2xl bg-white px-3 py-3 text-sm leading-6 text-slate-700">{client.fit}</div>
                    <div className="mt-3 space-y-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm leading-6 text-slate-600">
                      <div><span className="font-medium text-slate-900">模型：</span>{client.model}</div>
                      <div><span className="font-medium text-slate-900">权限起点：</span>{client.permissionMode}</div>
                      <div><span className="font-medium text-slate-900">交付方式：</span>{client.deliveryStyle}</div>
                    </div>
                    <div className="mt-3 text-sm leading-6 text-slate-600">{client.rationale}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card className="px-6 py-6 md:px-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Sparkles className="h-4 w-4 text-violet-600" />
                  GPT Token 入口
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">当前状态</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.tokenPlan.label}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">适用价值</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.tokenPlan.valueSummary}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">接入说明</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.tokenPlan.guidance}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">责任边界</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.tokenPlan.riskBoundary}</div>
                  </div>
                </div>
              </Card>

              <Card className="px-6 py-6 md:px-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <LockKeyhole className="h-4 w-4 text-indigo-600" />
                  权限与确认策略
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">推荐起点</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.permissionPlan.startMode.label}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-500">{diagnosis.permissionPlan.startMode.summary}</div>
                  </div>
                  {diagnosis.permissionPlan.modes.map((item) => (
                    <div key={item.name} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-600">{item.summary}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-500">{item.fit}</div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">动作确认边界</div>
                    <div className="mt-3 space-y-3">
                      {diagnosis.permissionPlan.actionBoundaries.map((item) => (
                        <div key={item.type} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                          <div className="text-sm font-semibold text-slate-900">{item.type}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">{item.confirmation}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-500">{item.examples}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="px-6 py-6 md:px-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <CircleDashed className="h-4 w-4 text-sky-600" />
                  MCP 可选连接层
                </div>
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  {diagnosis.mcpPlan.fallbackMessage}
                </div>
                <input type="hidden" name="mcpSelection" value="" />
                <div className="mt-5 space-y-3">
                  {diagnosis.recommendedMcp.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <label className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="mcpSelection"
                              value={item.name}
                              defaultChecked={item.selected || (!mcpSelections.length && item.state === "recommended")}
                              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-300"
                            />
                            <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                            <Pill active={item.state === "recommended"}>
                              {item.state === "recommended" ? "推荐" : item.state === "optional" ? "可选" : "后续"}
                            </Pill>
                          </div>
                          <div className="mt-2 text-sm leading-6 text-slate-600">{item.description}</div>
                          <div className="mt-2 text-sm leading-6 text-slate-500">{item.rationale}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="text-sm font-semibold text-slate-900">当前选择结果</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{diagnosis.mcpPlan.selectionSummary}</div>
                </div>
              </Card>
            </div>

            <Card className="px-6 py-5 md:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-base font-semibold text-slate-900">下一步产出</div>
                  <div className="mt-1 text-sm text-slate-500">AI-OS 目录、客户端适配建议、MCP 选择、规则沉淀入口。</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/diagnosis">
                    <SecondaryButton>返回诊断</SecondaryButton>
                  </Link>
                  <PrimaryButton>
                    继续生成 AI-OS
                    <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                </div>
              </div>
            </Card>
          </form>
        </div>
      </main>
    </Shell>
  );
}
