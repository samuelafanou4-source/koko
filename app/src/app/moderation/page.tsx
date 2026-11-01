"use client";

import { useEffect, useState, useCallback } from "react";
import { AuthGate } from "@/components/auth/AuthGate";
import { useAppStore } from "@/lib/store";

interface PendingPost {
  id: string;
  title: string;
  category: string;
  content: string;
  status: string;
  reportsCount: number;
  authorPseudonym: string;
}

function ModerationBoard() {
  const { user } = useAppStore();
  const [posts, setPosts] = useState<PendingPost[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/circle/moderate");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Accès refusé.");
      return;
    }
    setPosts(data.posts || []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const act = async (postId: string, action: "APPROVE" | "REJECT") => {
    await fetch("/api/circle/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, action }),
    });
    load();
  };

  if (user.role !== "MODERATOR" && user.role !== "ADMIN") {
    return (
      <p className="font-body text-body-md text-on-surface-variant">
        Cet espace est réservé aux sages-femmes et psychologues modératrices.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <p className="text-error font-label text-label-md">{error}</p>}
      {posts.length === 0 && (
        <p className="font-body text-body-md text-on-surface-variant">
          Aucun message en attente.
        </p>
      )}
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-2xl bg-surface-container-lowest p-5 border border-outline-variant/30 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-headline text-headline-sm font-bold">{post.title}</h2>
            <span className="font-label text-label-sm">{post.status}</span>
          </div>
          <p className="font-body text-body-sm text-on-surface-variant">
            {post.authorPseudonym} · {post.category} · signalements {post.reportsCount}
          </p>
          <p className="font-body text-body-md">{post.content}</p>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => act(post.id, "APPROVE")}
              className="px-4 py-2 rounded-full bg-primary text-on-primary font-label text-label-sm"
            >
              Approuver
            </button>
            <button
              type="button"
              onClick={() => act(post.id, "REJECT")}
              className="px-4 py-2 rounded-full bg-error text-on-error font-label text-label-sm"
            >
              Refuser
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ModerationPage() {
  return (
    <AuthGate>
      <div className="w-full max-w-[900px] mx-auto px-margin py-space-lg flex flex-col gap-6">
        <h1 className="font-display text-display font-bold">Modération du Cercle</h1>
        <p className="font-body text-body-md text-on-surface-variant">
          Les publications restent en attente jusqu&apos;à validation par une sage-femme
          ou une psychologue.
        </p>
        <ModerationBoard />
      </div>
    </AuthGate>
  );
}
