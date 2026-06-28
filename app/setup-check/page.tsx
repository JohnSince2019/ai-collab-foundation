import Link from "next/link";
import { CheckCircle2, ClipboardCheck, FolderTree } from "lucide-react";
import { Card, Pill, SectionTag, Shell, TopNav } from "@/components/ui";
import { buildAiOsArtifact, buildDiagnosis, type IntakeInput } from "@/lib/diagnosis";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function buildQuery(input: IntakeInput) {
  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
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
    tasks: getFirst(params.tasks),
    concerns: getFirst(params.concerns),
  };

  const diagnosis = buildDiagnosis(intake);
  const artifact = buildAiOsArtifact(intake, diagnosis);
  const verification = artifact.fileContents.find((item) => item.path === "AI-OS/install/verification-checklist.md");
  const targets = artifact.fileContents.find((item) => item.path === "AI-OS/install/target-locations.md");
  const query = buildQuery(intake);

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
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5">
              <div className="text-sm font-semibold text-slate-900">本次检查重点</div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <div><span className="font-medium text-slate-900">目标：</span>{intake.goal || "建立统一 AI 协作系统"}</div>
                <div><span className="font-medium text-slate-900">角色：</span>{intake.role || diagnosis.roleLabel}</div>
                <div><span className="font-medium text-slate-900">主要客户端：</span>{intake.clients || diagnosis.recommendedClients.map((item) => item.name).join("、")}</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
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
