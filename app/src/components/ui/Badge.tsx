import type { ReactNode } from "react";

type Tone = "primary" | "secondary" | "tertiary" | "neutral";

const tones: Record<Tone, string> = {
  primary: "bg-primary-fixed/40 text-on-primary-fixed-variant",
  secondary: "bg-secondary-container/50 text-on-secondary-container",
  tertiary: "bg-tertiary-fixed/60 text-on-tertiary-fixed-variant",
  neutral: "bg-surface-container-highest text-on-surface-variant",
};

export function Badge({
  children,
  tone = "neutral",
  icon,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label text-label-sm font-semibold ${tones[tone]}`}
    >
      {icon ? (
        <span className="material-symbols-outlined text-[14px]">{icon}</span>
      ) : null}
      {children}
    </span>
  );
}
