import Image from "next/image";
import Link from "next/link";
import { EMERGENCY_CONTACTS, PLATFORM_CONFIG } from "@/lib/constants";
// Self-hosted Unsplash photos (see src/assets/landing/CREDITS.md)
import heroPhoto from "@/assets/landing/koko-hero.jpg";
import confiancePhoto from "@/assets/landing/koko-confiance.jpg";
import cerclePhoto from "@/assets/landing/koko-cercle.jpg";

// Real questions young women ask: each opens the assistant with the text prefilled
const COMMON_QUESTIONS = [
  { emoji: "💊", text: "J'ai oublié ma pilule, que faire ?" },
  { emoji: "📅", text: "Mes règles sont en retard, je m'inquiète" },
  { emoji: "🌿", text: "Ça brûle ou ça gratte, est-ce une infection ?" },
  { emoji: "🩸", text: "J'ai des règles très douloureuses" },
  { emoji: "🌙", text: "Je stresse beaucoup pour mes examens" },
  { emoji: "🤍", text: "Comment fonctionne la pilule du lendemain ?" },
];

const PILLARS = [
  {
    href: "/assistant-koko",
    icon: "chat_bubble",
    title: "Assistant Koko",
    tag: "24h/24 • Web",
    text: "Pose tes questions sur la contraception, les infections, les règles ou le stress. Koko t'écoute et t'oriente, avec un bouton SOS toujours à portée.",
    cta: "Parler à Koko",
    tone: "bg-primary-fixed/45 text-primary",
  },
  {
    href: "/carnet-intime",
    icon: "calendar_month",
    title: "Le Carnet Intime",
    tag: "Suivi du cycle",
    text: "Visualise ton cycle, anticipe tes règles et ton ovulation, note ton humeur. Tout reste chiffré et effaçable en un clic.",
    cta: "Ouvrir mon carnet",
    tone: "bg-secondary-container/70 text-secondary",
  },
  {
    href: "/le-cercle",
    icon: "diversity_1",
    title: "Le Cercle Koko",
    tag: "Communauté sous pseudo",
    text: "Échange avec d'autres jeunes filles sous pseudonyme strict. Chaque message est relu par l'équipe de modération avant d'être publié.",
    cta: "Rejoindre le Cercle",
    tone: "bg-tertiary-fixed/70 text-tertiary",
  },
  {
    href: "/pass-sante",
    icon: "qr_code_2",
    title: "Le Pass Santé",
    tag: "Bientôt",
    text: "Un bon de consultation anonyme, valable dans les centres de santé « girl-friendly » qui signent une convention avec Koko. Réseau en cours de construction.",
    cta: "Découvrir le Pass",
    tone: "bg-sage-soft text-sage",
  },
];

// Figures from the Koko dossier (sources cited there)
const CONTEXT_FIGURES = [
  {
    value: "17 %",
    label: "des 15-19 ans vivent une grossesse précoce ou non désirée au Togo",
  },
  {
    value: "72 %",
    label: "des étudiant·e·s renoncent aux soins (étude Université de Lomé)",
  },
  {
    value: "< 10",
    label: "psychiatres agréés pour plus de 8 millions d'habitants",
  },
];

const PRIVACY_PROMISES = [
  {
    icon: "badge",
    title: "Juste un pseudo",
    text: "Ni nom, ni numéro, ni e-mail ne te sont demandés pour créer ton espace.",
  },
  {
    icon: "lock",
    title: "Données séparées & chiffrées",
    text: "Ton cycle est stocké à part de ton compte, chiffré au repos et en transit.",
  },
  {
    icon: "visibility_off",
    title: "Sortie rapide",
    text: "Un tap sur l'œil (ou Échap deux fois) et l'écran bascule vers un site neutre.",
  },
  {
    icon: "delete_sweep",
    title: "Tout effacer en 1 clic",
    text: "Tu restes maîtresse de tes données : ton compte et ton carnet s'effacent quand tu veux.",
  },
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/80 border border-outline-variant/60 shadow-xs mb-6 font-label text-label-md text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              Gratuit • Anonyme • Pensé pour les jeunes femmes au Togo
            </span>

            <h1 className="font-display text-[34px] leading-[42px] md:text-[52px] md:leading-[60px] font-bold text-on-surface tracking-tight max-w-2xl">
              Frappe à la porte de ton{" "}
              <span className="text-primary">bien-être intime.</span>
            </h1>

            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mt-5">
              Règles, contraception, infections, stress ou moment difficile :
              ici tu peux tout demander, sans être jugée, sans donner ton nom.
              Koko t&apos;écoute et t&apos;oriente vers les bonnes ressources
              si tu en as besoin.
            </p>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/onboarding"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg shadow-soft hover:bg-primary-container transition-colors"
              >
                Entrer dans mon espace
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/assistant-koko"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest text-on-surface border border-outline-variant font-label text-label-lg hover:border-primary/50 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chat_bubble
                </span>
                Poser une question
              </Link>
            </div>

            <ul className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mt-7 font-label text-label-md text-on-surface-variant">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-sage">check_circle</span>
                Aucun numéro demandé
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-sage">check_circle</span>
                Léger, même en 3G
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-sage">check_circle</span>
                Gratuit
              </li>
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
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </span>
              <span className="font-label text-label-md text-on-surface leading-tight">
                Juste un pseudo,
                <br />
                jamais ton nom
              </span>
            </div>

            <div className="absolute -bottom-12 -left-3 sm:-left-12 w-[16.5rem] bg-surface-container-lowest/95 backdrop-blur rounded-3xl p-3.5 shadow-soft border border-outline-variant/40 flex flex-col gap-2">
              <span className="font-label text-label-xs uppercase text-on-surface-variant">
                Exemple de conversation
              </span>
              <div className="self-end max-w-[90%] px-3.5 py-2 rounded-2xl rounded-br-md bg-primary text-on-primary font-body text-body-sm">
                J&apos;ai peur d&apos;être enceinte…
              </div>
              <div className="self-start max-w-[95%] px-3.5 py-2 rounded-2xl rounded-bl-md bg-surface-container font-body text-body-sm text-on-surface">
                Tu as bien fait de frapper à la porte 🤍 On regarde ça ensemble,
                calmement.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common questions */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-12">
        <div className="rounded-[2rem] bg-surface-container-low border border-outline-variant/50 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
                Tu te poses une de ces questions ?
              </h2>
              <p className="font-body text-body-md text-on-surface-variant mt-1">
                Tu n&apos;es pas la seule. Touche-en une pour en parler avec Koko.
              </p>
            </div>
            <span className="font-label text-label-md text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">favorite</span>
              Aucune question n&apos;est bête ici
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMMON_QUESTIONS.map((q) => (
              <Link
                key={q.text}
                href={`/assistant-koko?q=${encodeURIComponent(q.text)}`}
                className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 hover:border-primary/40 hover:shadow-soft transition-all"
              >
                <span className="text-xl" aria-hidden>
                  {q.emoji}
                </span>
                <span className="font-body text-body-md text-on-surface flex-1">
                  {q.text}
                </span>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">
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
        <div className="flex flex-col items-center text-center mb-10">
          <span className="font-label text-label-sm uppercase tracking-wider text-primary mb-2">
            Ton écosystème Koko
          </span>
          <h2 className="font-headline text-headline-lg-mobile md:text-display text-on-surface font-bold">
            Quatre espaces pour prendre soin de toi
          </h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-xl mt-3">
            De la première question jusqu&apos;à la consultation dans un centre
            de santé : Koko t&apos;accompagne à chaque étape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PILLARS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative overflow-hidden rounded-t-[2.5rem] rounded-b-3xl bg-surface-container-lowest border border-outline-variant/50 p-7 flex flex-col gap-4 hover:shadow-soft hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`w-14 h-14 rounded-2xl flex items-center justify-center ${p.tone}`}>
                  <span className="material-symbols-outlined text-[28px]">{p.icon}</span>
                </span>
                <span className="font-label text-label-sm px-3 py-1 rounded-full bg-surface-container text-on-surface-variant">
                  {p.tag}
                </span>
              </div>
              <h3 className="font-headline text-headline-md text-on-surface font-bold">
                {p.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant flex-1">
                {p.text}
              </p>
              <span className="inline-flex items-center gap-1.5 font-label text-label-lg text-primary">
                {p.cta}
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
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
              <span className="font-label text-label-sm uppercase tracking-wider text-primary-fixed-dim">
                Pourquoi Koko existe
              </span>
              <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg font-bold mt-2">
                Trop de jeunes filles restent seules avec leurs questions.
              </h2>
              <p className="font-body text-body-md opacity-85 mt-4">
                Par manque d&apos;argent, par peur du regard des autres ou faute de
                professionnel·le·s disponibles, beaucoup se soignent seules ou ne
                se soignent pas du tout. Koko veut lever ces barrières : un
                espace gratuit et anonyme pour s&apos;informer, être écoutée et
                trouver de l&apos;aide.
              </p>
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
                  <p className="font-body text-body-sm opacity-85 mt-3">{f.label}</p>
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
            <span className="font-label text-label-sm uppercase tracking-wider text-secondary">
              Ton secret est bien gardé
            </span>
            <h2 className="font-headline text-headline-lg-mobile md:text-display text-on-surface font-bold mt-2 mb-7">
              « Ici, personne ne te juge. »
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {PRIVACY_PROMISES.map((p) => (
                <div
                  key={p.title}
                  className="rounded-3xl bg-secondary-fixed/50 border border-secondary-container p-5 flex flex-col gap-2.5"
                >
                  <span className="w-10 h-10 rounded-full bg-surface-container-lowest text-secondary flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                  </span>
                  <h3 className="font-headline text-headline-sm text-on-surface font-bold">
                    {p.title}
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant">{p.text}</p>
                </div>
              ))}
            </div>
            <Link
              href="/charte"
              className="inline-block mt-6 font-label text-label-md text-secondary hover:underline"
            >
              Lire la charte de discrétion
            </Link>
          </div>
        </div>
      </section>

      {/* SOS */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-3xl bg-tertiary-fixed/40 border border-tertiary-fixed-dim/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">support</span>
            </div>
            <div>
              <h2 className="font-headline text-headline-sm text-on-surface font-bold mb-1">
                Tu traverses un moment difficile ?
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Violence, angoisse, urgence médicale : tu n&apos;es pas seule. Des
                personnes bienveillantes peuvent t&apos;écouter maintenant,
                gratuitement.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${EMERGENCY_CONTACTS.nationalEmergencyNumber}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-tertiary text-on-tertiary font-label text-label-md hover:bg-on-tertiary-fixed-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              Appeler le {EMERGENCY_CONTACTS.nationalEmergencyNumber}
            </a>
            <Link
              href="/sos-ecoute"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-surface-container-lowest text-tertiary border border-tertiary-fixed-dim font-label text-label-md hover:bg-tertiary-fixed/50 transition-colors"
            >
              Respirer &amp; trouver de l&apos;aide
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-12 md:py-16">
        <div className="relative overflow-hidden rounded-t-[3rem] rounded-b-[2rem] bg-primary text-on-primary grid md:grid-cols-2 items-stretch">
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none" />
          <div className="relative px-6 py-12 md:py-16 md:pl-12 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="font-label text-label-md uppercase tracking-wider opacity-80">
              Ko-ko… c&apos;est toi ?
            </p>
            <h2 className="font-display text-headline-lg md:text-display font-bold mt-2 max-w-md">
              {PLATFORM_CONFIG.slogan}
            </h2>
            <p className="font-body text-body-md opacity-90 mt-3 max-w-md">
              Entre sœurs, on prend soin les unes des autres. Crée ton espace
              en 30 secondes avec un simple pseudo.
            </p>
            <Link
              href="/onboarding"
              className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest text-primary font-label text-label-lg hover:bg-primary-fixed transition-colors"
            >
              Commencer anonymement
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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
