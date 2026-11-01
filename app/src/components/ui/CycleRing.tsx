"use client";

interface CycleRingProps {
  currentDay: number;
  totalCycleLength: number;
  periodLength: number;
  phaseLabel: string;
  isFertileToday?: boolean;
  size?: "sm" | "md" | "lg";
}

export function CycleRing({
  currentDay = 14,
  totalCycleLength = 28,
  periodLength = 5,
  phaseLabel = "Phase ovulatoire",
  size = "md",
}: CycleRingProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.3
  const progressRatio = Math.min(1, Math.max(0, currentDay / totalCycleLength));
  const strokeDashoffset = circumference - progressRatio * circumference;

  const sizeClasses = {
    sm: "w-28 h-28",
    md: "w-56 h-56 sm:w-64 sm:h-64",
    lg: "w-64 h-64 sm:w-72 sm:h-72",
  }[size];

  return (
    <div className={`relative ${sizeClasses} shrink-0 flex items-center justify-center`}>
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke="#e5e2dd"
          strokeWidth="7"
        />

        {/* Menstruation segment (Days 1 to periodLength) */}
        <circle
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke="#d98e73"
          strokeWidth="7"
          strokeDasharray={`${(periodLength / totalCycleLength) * circumference} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          className="opacity-80"
        />

        {/* Progress up to current day */}
        <circle
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke="#3f644b"
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />

        {/* Ovulation marker dot around Day 14 */}
        <circle
          cx="50"
          cy="10"
          fill="#a6634b"
          r="3.5"
          className="animate-pulse"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 select-none">
        <span className="font-headline text-headline-sm text-primary font-bold leading-none">
          J{currentDay}
        </span>
        <span className="font-label text-label-sm text-on-surface-variant mt-0.5">
          sur {totalCycleLength} jours
        </span>
        <span className="mt-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label text-[10px] truncate max-w-[120px]">
          {phaseLabel}
        </span>
      </div>
    </div>
  );
}

