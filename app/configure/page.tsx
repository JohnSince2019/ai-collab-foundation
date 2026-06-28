import { ArrowRight, Check, CircleDashed, LockKeyhole, Shield, Sparkles } from "lucide-react";
import {
  Card,
  Pill,
  PrimaryButton,
  SecondaryButton,
  Shell,
  StepBadge,
  TopNav,
} from "@/components/ui";
import { configureSteps, recommendedClients, recommendedMcp } from "@/lib/data";

export default function ConfigurePage() {
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
          </aside>

          <div className="space-y-6">
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
                <Pill active>Recommended</Pill>
              </div>

              <div className="mt-8 grid gap-4 xl:grid-cols-3">
                {recommendedClients.map((client) => (
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
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card className="px-6 py-6 md:px-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <LockKeyhole className="h-4 w-4 text-indigo-600" />
                  权限与确认策略
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    "只建议：适合高风险决策、思考与规划阶段",
                    "可读：允许读取代码、文档、知识库和任务系统",
                    "可写：允许修改本地文件，但重要变更需要提交门",
                    "可执行：允许运行命令，但真实世界动作必须人工确认",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <div className="text-sm leading-6 text-slate-600">{item}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="px-6 py-6 md:px-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <CircleDashed className="h-4 w-4 text-sky-600" />
                  MCP 可选连接层
                </div>
                <div className="mt-5 space-y-3">
                  {recommendedMcp.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                        <Pill active={item.state === "recommended"}>
                          {item.state === "recommended" ? "推荐" : item.state === "optional" ? "可选" : "后续"}
                        </Pill>
                      </div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">{item.description}</div>
                    </div>
                  ))}
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
                  <SecondaryButton>返回诊断</SecondaryButton>
                  <PrimaryButton>
                    继续生成 AI-OS
                    <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </Shell>
  );
}
