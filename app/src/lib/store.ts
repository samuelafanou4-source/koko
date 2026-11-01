"use client";

import { create } from "zustand";

interface UserState {
  pseudonym: string | null;
  anonId: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

interface AppStore {
  // Discretion & Security
  isDiscreetMode: boolean;
  toggleDiscreetMode: () => void;
  setDiscreetMode: (value: boolean) => void;

  isVeilActive: boolean;
  setVeilActive: (value: boolean) => void;
  liftVeil: () => void;

  // Session User
  user: UserState;
  setUser: (user: Partial<UserState>) => void;
  logout: () => void;

  // Local traces clearing
  clearLocalTraces: () => void;
}

const DISCREET_PREF_KEY = "koko_discreet_mode";

function readDiscreetPreference(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(DISCREET_PREF_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDiscreetPreference(value: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DISCREET_PREF_KEY, value ? "1" : "0");
  } catch {
    // Preference only — never store health data here.
  }
}

export const useAppStore = create<AppStore>((set) => ({
  isDiscreetMode: readDiscreetPreference(),
  toggleDiscreetMode: () =>
    set((state) => {
      const next = !state.isDiscreetMode;
      writeDiscreetPreference(next);
      return { isDiscreetMode: next };
    }),
  setDiscreetMode: (value: boolean) => {
    writeDiscreetPreference(value);
    set({ isDiscreetMode: value });
  },

  isVeilActive: false,
  setVeilActive: (value: boolean) => set({ isVeilActive: value }),
  liftVeil: () => set({ isVeilActive: false }),

  user: {
    pseudonym: null,
    anonId: null,
    role: null,
    isAuthenticated: false,
  },
  setUser: (updated) =>
    set((state) => ({
      user: { ...state.user, ...updated, isAuthenticated: true },
    })),
  logout: () =>
    set({
      user: {
        pseudonym: null,
        anonId: null,
        role: null,
        isAuthenticated: false,
      },
    }),

  clearLocalTraces: () => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.clear();
        localStorage.removeItem(DISCREET_PREF_KEY);
        localStorage.clear();
        // Clear caches if available
        if ("caches" in window) {
          caches.keys().then((names) => {
            names.forEach((name) => caches.delete(name));
          });
        }
      } catch {
        // Ignore storage access errors (private browsing).
      }
    }
    set({
      isDiscreetMode: false,
      isVeilActive: false,
      user: {
        pseudonym: null,
        anonId: null,
        role: null,
        isAuthenticated: false,
      },
    });
  },
}));

