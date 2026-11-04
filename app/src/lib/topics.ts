/**
 * Landing-page topics. The question text lives here, in the client bundle:
 * it never travels in a URL (browser history, server logs, Referer).
 * Between the landing page and the assistant only the short key is kept,
 * in sessionStorage (gone when the tab closes, wiped by "Sortie rapide").
 */

export const TOPICS = {
  "pilule-oubli": { emoji: "💊", label: "Oubli de pilule", question: "J'ai oublié ma pilule, que faire ?" },
  "regles-retard": { emoji: "📅", label: "Règles en retard", question: "Mes règles sont en retard, je m'inquiète" },
  "gene-intime": { emoji: "🌿", label: "Ça gratte ou ça brûle", question: "Ça brûle ou ça gratte, est-ce une infection ?" },
  "regles-douloureuses": { emoji: "🩸", label: "Règles douloureuses", question: "J'ai des règles très douloureuses" },
  stress: { emoji: "🌙", label: "Stress, angoisse", question: "Je stresse beaucoup, j'ai besoin d'en parler" },
  "pilule-lendemain": { emoji: "🤍", label: "Pilule du lendemain", question: "Comment fonctionne la pilule du lendemain ?" },
} as const;

export type TopicKey = keyof typeof TOPICS;

const STORAGE_KEY = "koko_topic";

export function isTopicKey(value: unknown): value is TopicKey {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(TOPICS, value);
}

export function rememberTopic(key: TopicKey): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, key);
  } catch {
    // Storage blocked: she will simply land on the dashboard
  }
}

export function hasPendingTopic(): boolean {
  try {
    return isTopicKey(window.sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

/** Reads and forgets the pending topic; returns the question to prefill. */
export function takePendingTopicQuestion(): string | null {
  try {
    const key = window.sessionStorage.getItem(STORAGE_KEY);
    window.sessionStorage.removeItem(STORAGE_KEY);
    return isTopicKey(key) ? TOPICS[key].question : null;
  } catch {
    return null;
  }
}
