"use client";

import { useState, useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { AuthGate } from "@/components/auth/AuthGate";

interface ForumPostItem {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  hugReactions: number;
  meTooReactions: number;
  commentsCount: number;
  authorPseudonym: string;
}

interface CommentItem {
  id: string;
  content: string;
  createdAt: string;
  authorPseudonym: string;
}

export default function LeCerclePage() {
  const { user } = useAppStore();
  const [posts, setPosts] = useState<ForumPostItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("contraception");
  const [newContent, setNewContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");

  // Comments view modal
  const [activePost, setActivePost] = useState<ForumPostItem | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  const categories = [
    { id: "all", label: "Toutes les discussions", icon: "forum" },
    { id: "contraception", label: "Contraception & Urgence", icon: "medication" },
    { id: "cycle", label: "Règles & Cycle", icon: "water_drop" },
    { id: "sante_mentale", label: "Stress & Bien-être", icon: "spa" },
    { id: "relations", label: "Relations & Intimité", icon: "favorite" },
  ];

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/circle/posts?category=${selectedCategory}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || posting) return;

    setPosting(true);
    setPostError("");

    try {
      const res = await fetch("/api/circle/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          content: newContent,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPostError(data.error || "Erreur lors de la publication");
        setPosting(false);
        return;
      }

      setNewTitle("");
      setNewContent("");
      setShowCreateModal(false);
      setPostError(
        data.message ||
          "Ton message sera visible après validation par l'équipe de modération."
      );
      fetchPosts();
    } catch {
      setPostError("Erreur de connexion. Réessaie dans un instant.");
    } finally {
      setPosting(false);
    }
  };

  const handleReaction = async (
    postId: string,
    reactionType: "HUG" | "ME_TOO"
  ) => {
    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        if (reactionType === "HUG") {
          return { ...p, hugReactions: p.hugReactions + 1 };
        }
        return { ...p, meTooReactions: p.meTooReactions + 1 };
      })
    );

    try {
      await fetch("/api/circle/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reactionType }),
      });
    } catch {
      // Ignore in demo
    }
  };

  const handleReport = async (postId: string) => {
    if (!confirm("Signaler ce message à la modération bienveillante ?")) return;
    try {
      await fetch("/api/circle/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reactionType: "REPORT" }),
      });
      alert("Merci. Le message a été transmis à nos modératrices.");
    } catch {
      // Ignore in demo
    }
  };

  const openComments = async (post: ForumPostItem) => {
    setActivePost(post);
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/circle/comments?postId=${post.id}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !activePost) return;

    const text = commentInput.trim();
    setCommentInput("");

    try {
      const res = await fetch("/api/circle/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: activePost.id, content: text }),
      });
      const data = await res.json();
      if (data.comment) {
        setComments((prev) => [...prev, data.comment]);
        setPosts((prev) =>
          prev.map((p) =>
            p.id === activePost.id
              ? { ...p, commentsCount: p.commentsCount + 1 }
              : p
          )
        );
      }
    } catch {
      // In demo
      setComments((prev) => [
        ...prev,
        {
          id: `comment-${Date.now()}`,
          content: text,
          createdAt: new Date().toISOString(),
          authorPseudonym: user.pseudonym || "FleurDeBaobab",
        },
      ]);
    }
  };

  return (
    <AuthGate>
    <div className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg">
      {/* Header with Arch Motif */}
      <div className="relative overflow-hidden rounded-t-[2.5rem] rounded-b-2xl bg-tertiary-fixed/30 p-space-md sm:p-space-lg md:p-space-xl border border-tertiary/20 flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-xs">
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest text-tertiary font-label text-label-sm w-fit font-semibold shadow-xs">
            <span className="material-symbols-outlined text-[16px]">
              diversity_1
            </span>
            <span>Espace Sœurité &amp; Entraide</span>
          </div>
          <h1 className="font-display text-display text-on-surface font-bold">
            Le Cercle Bienveillant
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Ici, les jeunes femmes et étudiantes échangent sans tabou. Pose tes
            questions les plus intimes et trouve le réconfort d&apos;une sœur.
          </p>
        </div>

        {/* Moderation Pill Badge */}
        <div className="flex flex-col gap-3 items-start md:items-end">
          <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2.5 rounded-full shadow-xs border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[20px]">
              verified
            </span>
            <div className="flex flex-col text-left">
              <span className="font-label text-label-xs uppercase tracking-wider text-on-surface-variant font-bold">
                Espace Protégé
              </span>
              <span className="font-label text-label-sm text-primary font-semibold">
                Chaque message est relu avant publication
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-tertiary text-on-tertiary font-label text-label-md font-semibold hover:bg-tertiary-container transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Nouveau partage</span>
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => {
          const isActive = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              type="button"
              className={`px-4 py-2 rounded-full font-label text-label-sm transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                isActive
                  ? "bg-tertiary text-on-tertiary font-bold border-tertiary shadow-xs"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-outline-variant/30"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {c.icon}
              </span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Discussions Feed */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="py-12 text-center text-on-surface-variant font-body">
            Chargement des partages du Cercle...
          </div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center rounded-2xl bg-surface-container-low border border-outline-variant/30 px-6">
            <p className="font-body text-body-md text-on-surface-variant">
              Aucune discussion validée pour le moment. Les messages restent privés
              jusqu&apos;à leur relecture par l&apos;équipe de modération.
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-3 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-secondary-container/40 text-on-secondary-container flex items-center justify-center text-sm font-semibold">
                    🌸
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label text-label-sm font-semibold text-on-surface">
                      {post.authorPseudonym}
                    </span>
                    <span className="font-body text-[11px] text-on-surface-variant">
                      {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label text-label-xs uppercase tracking-wider font-semibold">
                  {post.category}
                </span>
              </div>

              <h2 className="font-headline text-headline-sm text-on-surface font-bold">
                {post.title}
              </h2>

              <p className="font-body text-body-md text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Action Reactions & Comment Count */}
              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Câlin button */}
                  <button
                    onClick={() => handleReaction(post.id, "HUG")}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-secondary-fixed/50 text-on-surface transition-colors font-label text-label-sm"
                    title="Envoyer un câlin bienveillant"
                  >
                    <span>🫂</span>
                    <span className="font-semibold">{post.hugReactions}</span>
                    <span className="hidden sm:inline text-on-surface-variant">
                      Câlins
                    </span>
                  </button>

                  {/* Moi aussi button */}
                  <button
                    onClick={() => handleReaction(post.id, "ME_TOO")}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-tertiary-fixed/50 text-on-surface transition-colors font-label text-label-sm"
                    title="Moi aussi j'ai ressenti cela"
                  >
                    <span>🧡</span>
                    <span className="font-semibold">{post.meTooReactions}</span>
                    <span className="hidden sm:inline text-on-surface-variant">
                      Moi aussi
                    </span>
                  </button>

                  {/* Comments trigger */}
                  <button
                    onClick={() => openComments(post)}
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-label text-label-sm transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      chat_bubble_outline
                    </span>
                    <span>{post.commentsCount} réponses</span>
                  </button>
                </div>

                {/* Report flag */}
                <button
                  onClick={() => handleReport(post.id)}
                  type="button"
                  className="text-on-surface-variant hover:text-error transition-colors p-1"
                  title="Signaler ce message"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    flag
                  </span>
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Modal: Create Post */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-t-[2.5rem] rounded-b-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-tertiary font-headline text-headline-sm font-bold">
              <span className="material-symbols-outlined text-[24px]">
                diversity_1
              </span>
              <span>Déposer un mot dans Le Cercle</span>
            </div>

            <p className="font-body text-body-sm text-on-surface-variant">
              Exprime-toi librement sous ton pseudonyme{" "}
              <strong className="text-on-surface">
                {user.pseudonym || "toi"}</strong>. L&apos;équipe de modération veille
              sur la sérénité des échanges.
            </p>

            {postError && (
              <div
                className={`p-3 rounded-xl font-label text-label-sm ${
                  postError.includes("attente")
                    ? "bg-primary-fixed/50 text-on-primary-fixed-variant"
                    : "bg-error-container text-on-error-container"
                }`}
              >
                {postError}
              </div>
            )}

            <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label text-label-sm text-on-surface font-semibold">
                  Sujet :
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-label text-label-sm focus:outline-none focus:border-primary text-on-surface"
                >
                  <option value="contraception">Contraception &amp; Urgence</option>
                  <option value="cycle">Règles &amp; Cycle</option>
                  <option value="sante_mentale">Stress &amp; Bien-être</option>
                  <option value="relations">Relations &amp; Intimité</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label text-label-sm text-on-surface font-semibold">
                  Titre bienveillant :
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex : Inquiète après mon premier oubli de pilule..."
                  required
                  className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 font-body text-body-md focus:outline-none focus:border-primary text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label text-label-sm text-on-surface font-semibold">
                  Ton partage :
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Raconte ce que tu traverses sans crainte. Ici personne ne te jugera..."
                  rows={5}
                  required
                  className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 font-body text-body-md focus:outline-none focus:border-primary text-on-surface"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-full font-label text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={posting}
                  className="px-6 py-2.5 rounded-full bg-tertiary text-on-tertiary font-label text-label-md font-semibold hover:bg-tertiary-container transition-all shadow-xs disabled:opacity-50"
                >
                  {posting ? "Envoi en cours..." : "Partager au Cercle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Comments Sheet */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface-container-lowest max-w-lg w-full max-h-[85vh] rounded-t-[2.5rem] rounded-b-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4 relative overflow-hidden">
            <button
              onClick={() => setActivePost(null)}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-sm"
            >
              ✕
            </button>

            <div className="pr-8">
              <span className="font-label text-label-xs uppercase tracking-wider text-tertiary font-semibold">
                Discussion
              </span>
              <h2 className="font-headline text-headline-sm text-on-surface font-bold line-clamp-2">
                {activePost.title}
              </h2>
            </div>

            {/* Comments Stream */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 py-1 max-h-[360px]">
              {loadingComments ? (
                <div className="text-center py-6 text-on-surface-variant font-body text-sm">
                  Chargement des messages de soutien...
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-6 text-on-surface-variant font-body text-sm">
                  Soyez la première sœur à lui répondre avec douceur 🌸
                </div>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-label font-semibold text-primary">
                        🌸 {c.authorPseudonym}
                      </span>
                      <span className="text-on-surface-variant text-[11px]">
                        {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <p className="font-body text-body-sm text-on-surface leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-2 border-t border-outline-variant/20">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Écris un mot réconfortant..."
                className="flex-1 px-4 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface font-body text-body-sm focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="px-4 py-2.5 rounded-full bg-tertiary text-on-tertiary font-label text-label-sm font-semibold hover:bg-tertiary-container disabled:opacity-40 transition-colors shrink-0"
              >
                Répondre
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </AuthGate>
  );
}

