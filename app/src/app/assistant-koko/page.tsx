"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChatBubble, ChatMessage } from "@/components/chat/ChatBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useAppStore } from "@/lib/store";
import { AuthGate } from "@/components/auth/AuthGate";

export default function AssistantKokoPage() {
  const { user } = useAppStore();
  const pseudonym = user.pseudonym || "FleurDeBaobab";

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-assistant",
      role: "assistant",
      content:
        "Bonjour. Je suis Koko, une guide d'écoute — pas un médecin. Pose ta question en français, à ton rythme. Ici, personne ne te juge.",
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Prefill from the landing page (?q=...) without sending: she stays in control
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setInput(q.slice(0, 500));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${crypto.randomUUID()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${crypto.randomUUID()}`,
        role: "assistant",
        content:
          data.content ||
          "Je suis à ton écoute. Peux-tu me préciser ce qui t'inquiète le plus ?",
        timestamp: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isCrisis: data.isCrisis,
        actions: data.actions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${crypto.randomUUID()}`,
          role: "assistant",
          content:
            "Désolée, une petite coupure de connexion s'est produite. Sache que je reste à tes côtés, n'hésite pas à réécrire ton message.",
          timestamp: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "cleared-msg",
        role: "assistant",
        content:
          "✨ Historique de conversation effacé de cette session. De quoi aimerais-tu parler en toute sérénité aujourd'hui ?",
        timestamp: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const quickTopics = [
    {
      emoji: "🌿",
      label: "Contraception & Pilule du lendemain",
      prompt: "Je m'interroge sur la contraception et la pilule du lendemain.",
    },
    {
      emoji: "🩸",
      label: "Retard de règles & cycle",
      prompt: "J'ai un retard de règles et un cycle très irrégulier avec les cours.",
    },
    {
      emoji: "🌸",
      label: "Douleurs pelviennes & crampes",
      prompt: "Je ressens des douleurs pelviennes intenses et des crampes.",
    },
    {
      emoji: "💧",
      label: "Pertes & mycoses",
      prompt: "Comment savoir si mes pertes blanches indiquent une mycose ?",
    },
    {
      emoji: "📚",
      label: "Stress d'examen & fatigue",
      prompt: "Le stress de mes examens me fatigue énormément.",
    },
    {
      emoji: "🧡",
      label: "Première fois & consentement",
      prompt:
        "J'aimerais comprendre mes ressentis et parler de première fois & consentement.",
    },
  ];

  return (
    <AuthGate>
    <div className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg">
      {/* Ethical & Safety Disclaimer Banner */}
      <div className="w-full bg-secondary-container/40 text-on-secondary-container rounded-2xl p-space-md flex items-start sm:items-center gap-3 shadow-xs border border-secondary/20">
        <span
          className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5 sm:mt-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          info
        </span>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
            <strong className="font-semibold text-secondary">
              Espace d&apos;écoute bienveillante :
            </strong>{" "}
            Koko est une guide d&apos;information et de soutien confidentiel, pas un
            médecin. En cas de douleur aiguë ou d&apos;urgence, consulte sans attendre
            un professionnel de santé.
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] font-label text-secondary bg-surface-container-lowest/80 px-2.5 py-1 rounded-full whitespace-nowrap self-start sm:self-auto font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />{" "}
            Anonymat garanti
          </span>
        </div>
      </div>

      {/* Main Sanctuary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left: Chat Column (8 cols) */}
        <section className="lg:col-span-8 flex flex-col bg-surface-container-low rounded-t-[2.5rem] rounded-b-2xl shadow-xs border border-outline-variant/30 overflow-hidden min-h-[640px] relative">
          {/* Header */}
          <header className="bg-surface-container-lowest px-space-md md:px-space-lg py-space-md flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-b border-outline-variant/20 z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary-fixed/50 flex items-center justify-center p-1 text-primary text-xl shadow-xs">
                🌿
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-headline text-headline-sm text-on-surface font-bold">
                    Koko à ton écoute
                  </h1>
                  <span
                    className="material-symbols-outlined text-primary text-[18px]"
                    title="Refuge chiffré"
                  >
                    verified_user
                  </span>
                </div>
                <p className="font-label text-label-sm text-on-surface-variant flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span>En ligne 24/7 • Échanges éphémères &amp; chiffrés</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                type="button"
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
                title="Effacer la conversation de cette session"
              >
                <span className="material-symbols-outlined text-[18px]">
                  delete_sweep
                </span>
              </button>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant font-label text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Zéro trace IP</span>
              </div>
            </div>
          </header>

          {/* Quick Topic Exploration Chips */}
          <div className="bg-surface-container px-space-md md:px-space-lg py-2.5 overflow-x-auto flex items-center gap-2 border-b border-outline-variant/20">
            <span className="font-label text-label-sm text-on-surface-variant whitespace-nowrap flex items-center gap-1 mr-1">
              <span className="material-symbols-outlined text-[14px]">
                lightbulb
              </span>{" "}
              Sujets :
            </span>
            {quickTopics.map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(topic.prompt)}
                className="px-3 py-1 rounded-full bg-surface-container-lowest hover:bg-primary-fixed/40 text-on-surface-variant hover:text-primary text-xs font-label transition-all whitespace-nowrap flex items-center gap-1 shadow-xs border border-outline-variant/20"
              >
                <span>{topic.emoji}</span>
                <span>{topic.label}</span>
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-space-md md:p-space-lg flex flex-col gap-4 overflow-y-auto max-h-[500px]">
            <div className="flex justify-center my-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label text-label-sm text-center">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  spa
                </span>
                Ici, personne ne te juge. Tu es dans ton sanctuaire.
              </span>
            </div>

            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}

            {loading && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 md:p-4 bg-surface-container-lowest border-t border-outline-variant/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="flex-1 relative flex items-center">
                <span className="absolute left-3.5 text-on-surface-variant/60 pointer-events-none">
                  <span className="material-symbols-outlined text-[18px]">
                    lock
                  </span>
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pose ta question en toute sécurité..."
                  className="w-full pl-10 pr-10 py-3.5 rounded-full bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary font-body text-body-md text-on-surface"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-xs shrink-0"
                title="Envoyer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>
              </button>
            </form>
            <div className="flex items-center justify-between px-2 pt-2 text-[11px] font-label text-on-surface-variant">
              <span>🌸 Connectée sous le pseudonyme {pseudonym}</span>
              <span>🔒 Échange chiffré</span>
            </div>
          </div>
        </section>

        {/* Right Sidebar (4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-space-md">
          {/* Need human help card */}
          <div className="rounded-t-[2.5rem] rounded-b-2xl bg-tertiary-fixed/30 p-6 border border-tertiary/20 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">
                support_agent
              </span>
            </div>
            <h3 className="font-headline text-headline-sm text-on-surface font-bold">
              Besoin d’une voix humaine ?
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
              Koko est une guide numérique. Si tu as besoin d’un soutien d’urgence
              ou de parler à une sage-femme togolaise, utilise le service SOS.
            </p>
            <Link
              href="/sos-ecoute"
              className="mt-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-tertiary text-on-tertiary font-label text-label-md font-semibold hover:bg-tertiary-container transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>Accéder à SOS Écoute</span>
            </Link>
          </div>

          {/* Privacy Shield Checklist */}
          <div className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/30 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-headline text-headline-sm font-bold">
              <span className="material-symbols-outlined text-[22px]">
                shield
              </span>
              <span>Bouclier de confidentialité</span>
            </div>
            <ul className="flex flex-col gap-2 font-body text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">
                  check
                </span>
                <span> Aucun nom ni numéro de téléphone obligatoire </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">
                  check
                </span>
                <span> Notes et conversations chiffrées </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">
                  check
                </span>
                <span> Suppression de toutes tes données en un clic </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">
                  check
                </span>
                <span>Aucune publicité, aucun traceur</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
    </AuthGate>
  );
}

