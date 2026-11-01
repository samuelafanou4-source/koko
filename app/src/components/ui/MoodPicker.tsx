"use client";

import { useState } from "react";

export interface MoodPickerProps {
  initialMood?: string;
  initialSymptoms?: string[];
  onSave?: (mood: string, symptoms: string[]) => void;
}

const MOODS = [
  {
    id: "sereine",
    emoji: "🌿",
    label: "Sereine",
    subtext: "Apaisée",
    activeBg: "bg-primary-fixed/50",
  },
  {
    id: "energique",
    emoji: "✨",
    label: "Énergique",
    subtext: "Pleine de vie",
    activeBg: "bg-secondary-fixed/50",
  },
  {
    id: "fatiguee",
    emoji: "☁️",
    label: "Fatiguée",
    subtext: "Ralentie",
    activeBg: "bg-surface-container-highest",
  },
  {
    id: "anxieuse",
    emoji: "🌧️",
    label: "Stress",
    subtext: "Tensions",
    activeBg: "bg-tertiary-fixed/50",
  },
  {
    id: "sensible",
    emoji: "🌸",
    label: "Sensible",
    subtext: "Émotive",
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

  const triggerSave = (newMood: string, newSymptoms: string[]) => {
    setSavedBadge(true);
    if (onSave) {
      onSave(newMood, newSymptoms);
    }
    setTimeout(() => setSavedBadge(false), 2400);
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
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">
            nest_eco_leaf
          </span>
          <h2 className="font-headline text-headline-sm text-on-surface">
            Mon ressenti du jour
          </h2>
        </div>
        <span
          className={`transition-opacity duration-300 font-label text-label-sm text-primary bg-primary-fixed/40 px-2.5 py-0.5 rounded-full ${
            savedBadge ? "opacity-100" : "opacity-0"
          }`}
        >
          ✓ Enregistré dans ton carnet
        </span>
      </div>

      <p className="font-body text-body-sm text-on-surface-variant">
        Choisis l&apos;état qui résonne avec ton corps en ce moment :
      </p>

      {/* Mood Buttons Grid */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 py-1">
        {MOODS.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleMoodSelect(m.id)}
              type="button"
              className={`group flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl transition-all text-center focus:outline-none ${
                isSelected
                  ? `${m.activeBg} ring-2 ring-primary shadow-xs`
                  : "bg-surface-container-low hover:bg-surface-container-high"
              }`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container-lowest/80 group-hover:scale-105 transition-transform flex items-center justify-center text-xl mb-1 shadow-xs">
                {m.emoji}
              </div>
              <span className="font-label text-label-sm text-on-surface font-semibold transition-colors">
                {m.label}
              </span>
              <span className="font-body text-[11px] text-on-surface-variant hidden sm:inline">
                {m.subtext}
              </span>
            </button>
          );
        })}
      </div>

      {/* Micro Symptom Tag Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="font-label text-label-sm text-on-surface-variant mr-1">
          Ressentis rapides :
        </span>
        {DEFAULT_SYMPTOMS.map((symptom) => {
          const active = selectedSymptoms.includes(symptom);
          return (
            <button
              key={symptom}
              onClick={() => handleToggleSymptom(symptom)}
              type="button"
              className={`px-3 py-1 rounded-full text-label-sm font-label transition-colors ${
                active
                  ? "bg-primary-container text-on-primary-container font-semibold"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {symptom}
            </button>
          );
        })}
      </div>
    </div>
  );
}

