import Image from "next/image";
import Link from "next/link";
import { EMERGENCY_CONTACTS, PLATFORM_CONFIG } from "@/lib/constants";
// Self-hosted Unsplash photos (see src/assets/landing/CREDITS.md)
import heroPhoto from "@/assets/landing/koko-hero.jpg";
import confiancePhoto from "@/assets/landing/koko-confiance.jpg";
import cerclePhoto from "@/assets/landing/koko-cercle.jpg";

// Short label on screen, full question prefilled in the assistant
const COMMON_QUESTIONS = [
  { emoji: "💊", label: "Oubli de pilule", q: "J'ai oublié ma pilule, que faire ?" },
  { emoji: "📅", label: "Règles en retard", q: "Mes règles sont en retard, je m'inquiète" },
  { emoji: "🌿", label: "Ça gratte ou ça brûle", q: "Ça brûle ou ça gratte, est-ce une infection ?" },
  { emoji: "🩸", label: "Règles douloureuses", q: "J'ai des règles très douloureuses" },
  { emoji: "🌙", label: "Stress, angoisse", q: "Je stresse beaucoup, j'ai besoin d'en parler" },
  { emoji: "🤍", label: "Pilule du lendemain", q: "Comment fonctionne la pilule du lendemain ?" },
];

const PILLARS = [
  {
    href: "/assistant-koko",
    icon: "chat_bubble",
    title: "Assistant Koko",
    text: "Tes questions, 24h/24, sans jugement.",
    tone: "bg-primary-fixed/45 text-primary",
  },
  {
    href: "/carnet-intime",
    icon: "calendar_month",
    title: "Carnet intime",
    text: "Suis ton cycle et ton humeur.",
    tone: "bg-secondary-container/70 text-secondary",
  },
  {
    href: "/le-cercle",
    icon: "diversity_1",
    title: "Le Cercle",
    text: "Parle avec d'autres filles, sous pseudo.",
    tone: "bg-tertiary-fixed/70 text-tertiary",
  },
  {
    href: "/pass-sante",
    icon: "qr_code_2",
    title: "Pass Santé",
    text: "Des consultations anonymes.",
    soon: true,
    tone: "bg-sage-soft text-sage",
  },
];

// Figures from the Koko dossier (sources cited there)
const CONTEXT_FIGURES = [
  { value: "17 %", label: "de grossesses précoces chez les 15-19 ans" },
  { value: "72 %", label: "des étudiant·e·s renoncent aux soins" },
  { value: "< 10", label: "psychiatres pour 8 millions d'habitants" },
];

const PRIVACY_PROMISES = [
  { icon: "badge", title: "Juste un pseudo" },
  { icon: "lock", title: "Données chiffrées" },
  { icon: "visibility_off", title: "Sortie rapide" },
  { icon: "delete_sweep", title: "Tout effacer quand tu veux" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative overflow-hidden px-margin md:px-margin-tablet lg:px-margin-desktop pt-8 pb-14 md:pt-14 md:pb-20">
        <div className="absolute -top-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary-fixed/50 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-24 -right-32 w-[26rem] h-[26rem] rounded-full bg-secondary-container/60 blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-tertiary-fixed/50 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-[1120px] mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="font-display text-[34px] leading-[42px] md:text-[52px] md:leading-[60px] font-bold text-on-surface tracking-tight max-w-2xl">
              Frappe à la porte de ton{" "}
              <span className="text-primary">bien-être intime.</span>
            </h1>

            <p className="font-body text-body-lg text-on-surface-variant max-w-md mt-5">
              Pose tes questions intimes. Sans ton nom, sans jugement.
            </p>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/onboarding"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg shadow-soft hover:bg-primary-container transition-colors"
              >
                Entrer dans mon espace
                <span aria-hidden="true" className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/assistant-koko"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest text-on-surface border border-outline-variant font-label text-label-lg hover:border-primary/50 hover:text-primary transition-colors"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  chat_bubble
                </span>
                Poser une question
              </Link>
            </div>

            <ul className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mt-7 font-label text-label-md text-on-surface-variant">
              {["Gratuit", "Anonyme", "Sans numéro"].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-sage">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Arch-framed photo: the open door of Koko */}
          <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:max-w-[24rem] mb-16 lg:mb-8">
            <div className="absolute -inset-3 rounded-t-full rounded-b-[2.75rem] border-2 border-primary/15 pointer-events-none" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-primary-fixed shadow-soft">
              <Image
                src={heroPhoto}
                alt="Jeune femme souriante qui écrit sur son téléphone"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 352px, 320px"
                className="object-cover"
              />
            </div>

            <div className="absolute top-10 -right-3 sm:-right-10 flex items-center gap-2 px-3 py-2 rounded-2xl bg-surface-container-lowest shadow-soft border border-outline-variant/40 animate-floatSoft">
              <span className="w-8 h-8 rounded-full bg-sage-soft text-sage flex items-center justify-center">
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">lock</span>
              </span>
              <span className="font-label text-label-md text-on-surface">
                Juste un pseudo
              </span>
            </div>

            <div className="absolute -bottom-12 -left-3 sm:-left-12 w-[16.5rem] bg-surface-container-lowest/95 backdrop-blur rounded-3xl p-3.5 shadow-soft border border-outline-variant/40 flex flex-col gap-2">
              <span className="font-label text-label-sm text-on-surface-variant">
                Exemple
              </span>
              <div className="self-end max-w-[90%] px-3.5 py-2 rounded-2xl rounded-br-md bg-primary text-on-primary font-body text-body-sm">
                J&apos;ai peur d&apos;être enceinte…
              </div>
              <div className="self-start max-w-[95%] px-3.5 py-2 rounded-2xl rounded-bl-md bg-surface-container font-body text-body-sm text-on-surface">
                On regarde ça ensemble, calmement 🤍
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common questions */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-12">
        <div className="rounded-[2rem] bg-surface-container-low border border-outline-variant/50 p-6 md:p-10">
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mb-6">
            Tu te demandes…
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMMON_QUESTIONS.map((q) => (
              <Link
                key={q.label}
                href={`/assistant-koko?q=${encodeURIComponent(q.q)}`}
                className="group flex items-center gap-3 px-4 min-h-[56px] rounded-2xl bg-surface-container-lowest border border-outline-variant/50 hover:border-primary/40 hover:shadow-soft transition-all"
              >
                <span className="text-xl" aria-hidden>
                  {q.emoji}
                </span>
                <span className="font-body text-body-md text-on-surface font-semibold flex-1">
                  {q.label}
                </span>
                <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The 4 pillars */}
      <section
        id="espaces"
        className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-12 md:py-16"
      >
        <h2 className="font-headline text-headline-lg-mobile md:text-display text-on-surface font-bold text-center mb-8">
          Tout pour prendre soin de toi
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {PILLARS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex items-center gap-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/50 p-5 hover:shadow-soft transition-all"
            >
              <span className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${p.tone}`}>
                <span aria-hidden="true" className="material-symbols-outlined text-[28px]">{p.icon}</span>
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2">
                  <span className="font-headline text-headline-sm text-on-surface font-bold">
                    {p.title}
                  </span>
                  {p.soon && (
                    <span className="font-label text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                      Bientôt
                    </span>
                  )}
                </span>
                <span className="block font-body text-body-md text-on-surface-variant mt-0.5">
                  {p.text}
                </span>
              </span>
              <span aria-hidden="true" className="material-symbols-outlined text-[22px] text-outline group-hover:text-primary group-hover:translate-x-1 transition-all">
                arrow_forward
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Koko exists */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-inverse-surface text-inverse-on-surface p-7 md:p-12">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/40 blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg font-bold">
                Trop de filles restent seules avec leurs questions.
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {CONTEXT_FIGURES.map((f) => (
                <div
                  key={f.value}
                  className="rounded-2xl bg-white/[0.07] border border-white/10 p-5"
                >
                  <p className="font-display text-[34px] leading-none font-bold text-primary-fixed-dim">
                    {f.value}
                  </p>
                  <p className="font-body text-body-md opacity-90 mt-3">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy promises */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-12 md:py-16">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-t-[3rem] lg:rounded-t-full rounded-b-[2rem] bg-secondary-fixed shadow-soft">
            <Image
              src={confiancePhoto}
              alt="Jeune femme de profil portant un foulard en pagne kente"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover object-[center_35%]"
            />
          </div>

          <div>
            <h2 className="font-headline text-headline-lg-mobile md:text-display text-on-surface font-bold mb-6">
              Ici, personne ne te juge.
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {PRIVACY_PROMISES.map((p) => (
                <li
                  key={p.title}
                  className="rounded-2xl bg-secondary-fixed/50 border border-secondary-container px-4 py-3.5 flex items-center gap-3"
                >
                  <span className="w-10 h-10 shrink-0 rounded-full bg-surface-container-lowest text-secondary flex items-center justify-center">
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px]">{p.icon}</span>
                  </span>
                  <span className="font-label text-label-lg text-on-surface">{p.title}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/charte"
              className="inline-block mt-5 py-2 font-label text-label-md text-secondary underline"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* SOS */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-3xl bg-tertiary-fixed/40 border border-tertiary-fixed-dim/50">
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="w-12 h-12 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <span aria-hidden="true" className="material-symbols-outlined text-[24px]">support</span>
            </div>
            <div>
              <h2 className="font-headline text-headline-sm text-on-surface font-bold mb-1">
                Besoin d&apos;aide maintenant ?
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Gratuit et confidentiel.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${EMERGENCY_CONTACTS.nationalEmergencyNumber}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-tertiary text-on-tertiary font-label text-label-md hover:bg-on-tertiary-fixed-variant transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">call</span>
              Appeler le {EMERGENCY_CONTACTS.nationalEmergencyNumber}
            </a>
            <Link
              href="/sos-ecoute"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-surface-container-lowest text-tertiary border border-tertiary-fixed-dim font-label text-label-md hover:bg-tertiary-fixed/50 transition-colors"
            >
              Autres lignes d&apos;écoute
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-12 md:py-16">
        <div className="relative overflow-hidden rounded-t-[3rem] rounded-b-[2rem] bg-primary text-on-primary grid md:grid-cols-2 items-stretch">
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none" />
          <div className="relative px-6 py-12 md:py-16 md:pl-12 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-display text-headline-lg md:text-display font-bold max-w-md">
              {PLATFORM_CONFIG.slogan}
            </h2>
            <p className="font-body text-body-lg opacity-90 mt-3">
              Ton espace en 30 secondes.
            </p>
            <Link
              href="/onboarding"
              className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest text-primary font-label text-label-lg hover:bg-primary-fixed transition-colors"
            >
              Commencer anonymement
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="relative min-h-[240px] md:min-h-full">
            <Image
              src={cerclePhoto}
              alt="Deux amies assises qui rient ensemble"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-primary via-primary/10 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
}
