"use client";

import { useState } from "react";

export function DoorMotif() {
  const [isKnocked, setIsKnocked] = useState(false);

  const handleKnock = () => {
    setIsKnocked(true);
    setTimeout(() => {
      setIsKnocked(false);
    }, 700);
  };

  return (
    <div
      className="relative group my-2 cursor-pointer transition-transform duration-500 hover:scale-105 select-none"
      onClick={handleKnock}
      title="Touche la porte (Ko-ko)"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleKnock();
      }}
    >
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-125 transition-all group-hover:bg-primary/20 pointer-events-none" />
      <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center p-3">
        <div className="w-full h-full rounded-full bg-surface-container-low flex items-center justify-center relative overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full text-secondary/30 pointer-events-none"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              fill="none"
              r="72"
              stroke="currentColor"
              strokeDasharray="4 6"
              strokeWidth="1.5"
            />
          </svg>

          {/* Ripple animation on knock */}
          <div
            className={`absolute w-28 h-28 rounded-full bg-primary-fixed/50 transition-all duration-700 pointer-events-none ${
              isKnocked
                ? "scale-150 opacity-100"
                : "scale-75 opacity-0"
            }`}
          />

          {/* Stylized Arch Door Icon */}
          <div className="relative flex flex-col items-center justify-center">
            <svg
              className="w-20 h-20 md:w-24 md:h-24 text-primary"
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Welcoming outer archway */}
              <path
                d="M15 110V50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50V110"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Inner open door frame */}
              <path
                d="M28 110V52C28 39.85 37.85 30 50 30C62.15 30 72 39.85 72 52V110"
                fill="#b5506f"
                fillOpacity="0.15"
                stroke="#b5506f"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Gentle golden door knob / hearth */}
              <circle cx="64" cy="72" r="4.5" fill="#d98e73" />
              {/* Botanical sprout inside the arch */}
              <path
                d="M50 85C50 75 42 70 42 70C42 70 48 70 50 75C52 70 58 70 58 70C58 70 50 75 50 85Z"
                fill="#4f7a5e"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-surface-container-lowest text-primary px-3 py-1 rounded-full shadow-sm font-label text-label-sm flex items-center gap-1 whitespace-nowrap border border-outline-variant/30">
        <span className="material-symbols-outlined text-[14px]">touch_app</span>
        <span>{isKnocked ? "Ko-ko ! Entre doucement..." : "Touche la porte"}</span>
      </div>
    </div>
  );
}

