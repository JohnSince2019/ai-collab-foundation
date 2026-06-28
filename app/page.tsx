import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CheckLine, Pill, ProgressHeader, SectionTag, Shell, TopNav } from "@/components/ui";
import { onboardingHighlights, outcomeCards } from "@/lib/data";

export default function HomePage() {
  return (
    <Shell>
      <TopNav />
      <main className="mx-auto mt-8 flex max-w-7xl flex-col gap-8">
        <Card className="overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <SectionTag>Foundation Layer</SectionTag>
              <ProgressHeader
                eyebrow="Unified Human + AI Operating Layer"
                title="先配置协作系统，再让不同 AI 客户端替你工作。"
                body="AI 协作底座位于 ContentOps、video-ops、LLM Gateway 以及个人工作流之上，负责统一诊断、推荐组合、权限边界、规则沉淀与后续复用。"
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
                >
                  开始 onboarding
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/configure"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
                >
                  查看配置流程
                </Link>
              </div>
            </div>

            <div className="soft-grid rounded-[28px] border border-slate-200 bg-slate-50/70 p-6">
              <div className="flex flex-wrap gap-2">
                <Pill active>Codex</Pill>
                <Pill>Claude Code</Pill>
                <Pill>Cursor</Pill>
                <Pill>Copilot</Pill>
                <Pill>Linear</Pill>
                <Pill>MCP</Pill>
              </div>
              <div className="mt-8 space-y-4">
                {onboardingHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-white bg-white/85 p-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-indigo-50 p-2 text-indigo-600">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">{item.body}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {outcomeCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="px-5 py-5">
                <div className="rounded-2xl bg-slate-100 p-2 text-slate-700 w-fit">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-base font-semibold text-slate-900">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{item.body}</div>
              </Card>
            );
          })}
        </section>

        <Card className="px-6 py-6 md:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-lg font-semibold text-slate-900">为什么它是上游模块</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">
                它不是再做一个聊天窗口，而是把用户目标、工作习惯、风险边界、客户端适配和可复用规则整理成一个统一基础层。
              </div>
            </div>
            <div className="grid gap-3">
              <CheckLine>让下游产品默认读取同一套目标、上下文、风格和权限设定。</CheckLine>
              <CheckLine>让新的项目和功能不再从零开始写规则，而是继承既有标准。</CheckLine>
              <CheckLine>让 MCP、Linear、本地 docs 和 AI 客户端形成一条可验证的交付链路。</CheckLine>
            </div>
          </div>
        </Card>
      </main>
    </Shell>
  );
}
