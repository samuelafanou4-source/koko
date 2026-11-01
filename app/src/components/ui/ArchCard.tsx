import React from "react";

interface ArchCardProps {
  children: React.ReactNode;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "tertiary" | "neutral";
  className?: string;
}

export function ArchCard({
  children,
  badge,
  badgeColor = "neutral",
  className = "",
}: ArchCardProps) {
  const badgeClasses = {
    primary: "bg-primary-fixed/50 text-on-primary-fixed-variant",
    secondary: "bg-secondary-container/50 text-on-secondary-container",
    tertiary: "bg-tertiary-fixed/60 text-on-tertiary-fixed-variant",
    neutral: "bg-surface-container-highest text-on-surface-variant",
  }[badgeColor];

  return (
    <div
      className={`relative overflow-hidden rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-low p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
    >
      {badge && (
        <div className="flex items-center justify-between mb-4">
          <span
            className={`font-label text-label-sm px-3 py-1 rounded-full font-semibold ${badgeClasses}`}
          >
            {badge}
          </span>
          <span className="font-label text-label-sm text-on-surface-variant opacity-80 hidden sm:inline-block">
            Ici, personne ne te juge
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

