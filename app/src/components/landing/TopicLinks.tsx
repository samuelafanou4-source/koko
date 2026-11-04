"use client";

import Link from "next/link";
import { TOPICS, rememberTopic, type TopicKey } from "@/lib/topics";

/**
 * Quick topics: they lead to sign-up, remembering only the topic key
 * (sessionStorage). After sign-up or login the assistant opens with the
 * question prefilled from the local mapping. No health text in the URL.
 */
export function TopicLinks() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {(Object.keys(TOPICS) as TopicKey[]).map((key) => {
        const topic = TOPICS[key];
        return (
          <Link
            key={key}
            href="/onboarding"
            onClick={() => rememberTopic(key)}
            className="group flex items-center gap-3 px-4 min-h-[56px] rounded-2xl bg-surface-container-lowest border border-outline-variant/50 hover:border-primary/40 hover:shadow-soft transition-all"
          >
            <span className="text-xl" aria-hidden>
              {topic.emoji}
            </span>
            <span className="font-body text-body-md text-on-surface font-semibold flex-1">
              {topic.label}
            </span>
            <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">
              arrow_forward
            </span>
          </Link>
        );
      })}
    </div>
  );
}
