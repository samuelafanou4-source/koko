"use client";

import { useState } from "react";

export interface MoodPickerProps {
  initialMood?: string;
  initialSymptoms?: string[];
  // Resolve to true once really stored: only then is "Enregistré" shown
  onSave?: (mood: string, symptoms: string[]) => void | Promise<boolean>;
}

const MOODS = [
  {
    id: "sereine",
    emoji: "🌿",
    label: "Sereine",
    activeBg: "bg-primary-fixed/50",
  },
  {
    id: "energique",
    emoji: "✨",
    label: "Énergique",
    activeBg: "bg-secondary-fixed/50",
  },
  {
    id: "fatiguee",
    emoji: "☁️",
    label: "Fatiguée",
    activeBg: "bg-surface-container-highest",
  },
  {
    id: "anxieuse",
    emoji: "🌧️",
    label: "Stress",
    activeBg: "bg-tertiary-fixed/50",
  },
  {
    id: "sensible",
    emoji: "🌸",
    label: "Sensible",
    activeBg: "bg-secondary-container/50",
  },
];

const DEFAULT_SYMPTOMS = [
  "+ Légers tiraillements",
  "+ Besoin de repos",
  "+ Plein d'idées",
  "+ Sensibilité mammaire",
  "+ Crampes douces",
  "+ Ballonnements",
];

export function MoodPicker({
  initialMood,
  initialSymptoms = [],
  onSave,
}: MoodPickerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(
    initialMood || null
  );
  const [selectedSymptoms, setSelectedSymptoms] =
    useState<string[]>(initialSymptoms);
  const [savedBadge, setSavedBadge] = useState(false);

  const triggerSave = async (newMood: string, newSymptoms: string[]) => {
    if (!onSave) return;
    const saved = await onSave(newMood, newSymptoms);
    if (saved === true) {
      setSavedBadge(true);
      setTimeout(() => setSavedBadge(false), 2400);
    }
  };

  const handleMoodSelect = (id: string) => {
    setSelectedMood(id);
    triggerSave(id, selectedSymptoms);
  };

  const handleToggleSymptom = (symptom: string) => {
    const updated = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];
    setSelectedSymptoms(updated);
    if (selectedMood) {
      triggerSave(selectedMood, updated);
    }
  };

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-headline-sm text-on-surface font-bold">
          Comment te sens-tu ?
        </h2>
        <span
          role="status"
          className={`transition-opacity duration-300 font-label text-label-sm text-primary bg-primary-fixed/40 px-2.5 py-0.5 rounded-full ${
            savedBadge ? "opacity-100" : "opacity-0"
          }`}
        >
          {savedBadge ? "✓ Enregistré" : ""}
        </span>
      </div>

      {/* Mood Buttons Grid */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 py-1">
        {MOODS.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleMoodSelect(m.id)}
              type="button"
              aria-pressed={isSelected}
              className={`group flex flex-col items-center justify-center min-h-[72px] p-2 sm:p-3 rounded-2xl transition-all text-center ${
                isSelected
                  ? `${m.activeBg} ring-2 ring-primary shadow-xs`
                  : "bg-surface-container-low hover:bg-surface-container-high"
              }`}
            >
              <div aria-hidden="true" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container-lowest/80 group-hover:scale-105 transition-transform flex items-center justify-center text-xl mb-1 shadow-xs">
                {m.emoji}
              </div>
              <span className="font-label text-label-sm text-on-surface font-semibold transition-colors">
                {m.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Micro Symptom Tag Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {DEFAULT_SYMPTOMS.map((symptom) => {
          const active = selectedSymptoms.includes(symptom);
          return (
            <button
              key={symptom}
              onClick={() => handleToggleSymptom(symptom)}
              type="button"
              aria-pressed={active}
              className={`px-3.5 py-2 rounded-full text-label-md font-label transition-colors ${
                active
                  ? "bg-primary-container text-on-primary-container font-semibold"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {symptom.replace(/^\+ /, "")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

