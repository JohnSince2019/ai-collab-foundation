import type { HTMLAttributes, ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("min-h-screen px-6 py-8 md:px-10 lg:px-14", className)}>{children}</div>;
}

export function TopNav() {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-3 backdrop-blur-md">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">AI Collaboration Foundation</div>
        <div className="mt-1 text-sm font-semibold text-slate-900">上游 AI 协作配置系统</div>
      </div>
      <a
        href="/configure"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-medium text-white"
      >
        查看配置流程
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-indigo-700 uppercase">
      {children}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("surface-shadow rounded-[28px] border border-white/70 bg-white/92", className)}>
      {children}
    </div>
  );
}

export function Pill({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        active ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600",
      )}
    >
      {children}
    </span>
  );
}

export function InputField({
  label,
  placeholder,
  helper,
  name,
  defaultValue,
  required,
}: {
  label: string;
  placeholder: string;
  helper?: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
        placeholder={placeholder}
      />
      {helper ? <div className="mt-2 text-xs leading-5 text-slate-500">{helper}</div> : null}
    </label>
  );
}

export function TextareaField({
  label,
  placeholder,
  helper,
  name,
  defaultValue,
  required,
}: {
  label: string;
  placeholder: string;
  helper?: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
        placeholder={placeholder}
      />
      {helper ? <div className="mt-2 text-xs leading-5 text-slate-500">{helper}</div> : null}
    </label>
  );
}

export function PrimaryButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children }: { children: ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
      {children}
    </button>
  );
}

export function StatLine({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm leading-6 text-slate-600">{body}</div>
    </div>
  );
}

export function CheckLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
      <div className="text-sm leading-6 text-slate-600">{children}</div>
    </div>
  );
}

export function ProgressHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</div>
      <h1 className="mt-4 text-[40px] leading-[1.05] font-semibold text-slate-950 md:text-[56px]">{title}</h1>
      <p className="mt-5 text-[15px] leading-7 text-slate-600 md:text-[17px]">{body}</p>
    </div>
  );
}

export function StepBadge({
  index,
  active,
  complete,
}: {
  index: number;
  active?: boolean;
  complete?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold",
        complete
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : active
            ? "border-indigo-500 bg-indigo-600 text-white"
            : "border-slate-200 bg-white text-slate-400",
      )}
    >
      {index}
    </div>
  );
}
