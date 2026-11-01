import Link from "next/link";
import { DoorMotif } from "@/components/ui/DoorMotif";
import { MOCK_STATISTICS, EMERGENCY_CONTACTS } from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-margin md:px-margin-tablet lg:px-margin-desktop pt-6 pb-16 lg:pb-24">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 -right-24 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-8 left-1/3 w-72 h-72 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-[1120px] mx-auto flex flex-col items-center text-center">
          {/* Active sanctuary status pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low shadow-xs mb-6 border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label text-label-sm text-primary tracking-wide uppercase font-semibold">
              Sanctuaire d&apos;écoute active • Lomé &amp; Kara
            </span>
          </div>

          {/* Interactive Door Motif */}
          <DoorMotif />

          {/* Headline */}
          <h1 className="font-display text-display md:text-[44px] md:leading-[52px] text-on-surface max-w-3xl mt-7 mb-4 tracking-tight">
            Touche à la porte de ton intimité,{" "}
            <span className="text-primary italic font-semibold">en toute sérénité.</span>
          </h1>

          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            Koko : Un sanctuaire chaleureux, 100% anonyme et bienveillant pour la
            santé intime des jeunes femmes et étudiantes au Togo.
          </p>

          {/* 3 Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-10 max-w-3xl">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-primary">
                visibility_off
              </span>
              <span className="font-label text-label-md font-semibold">
                100% Anonyme : Aucun nom de famille, aucun traçage
              </span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/50 text-on-secondary-container shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                favorite
              </span>
              <span className="font-label text-label-md font-semibold">
                Sans jugement : Pose toutes tes questions intimes
              </span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed-variant shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-tertiary">
                lock
              </span>
              <span className="font-label text-label-md font-semibold">
                Gratuit &amp; Sécurisé : Chiffrement au repos
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="w-full max-w-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 mb-6">
            <Link
              href="/onboarding"
              className="group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-container text-on-primary shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="font-label text-label-lg font-semibold tracking-wide">
                Entrer dans mon espace (Gratuit)
              </span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

            <a
              href="https://wa.me/22890000000?text=Koko%2C%20bonjour%20je%20souhaite%20un%20conseil%20confidentiel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface shadow-xs hover:shadow transition-all duration-300 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">
                chat
              </span>
              <span className="font-label text-label-md font-semibold text-left">
                Continuer sur WhatsApp Koko
              </span>
            </a>
          </div>

          <p className="font-body text-body-sm text-on-surface-variant flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-primary">
              wifi_channel
            </span>
            <span>
              WhatsApp discret &amp; faible débit • Idéal si ta connexion est limitée à
              Lomé ou Kara
            </span>
          </p>
        </div>
      </section>

      {/* 3-Step How It Works Section */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-12 md:py-16">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3.5 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label text-label-sm uppercase tracking-wider mb-3 font-semibold">
            Douceur &amp; Simplicité
          </span>
          <h2 className="font-headline text-headline-lg md:text-display text-on-surface">
            Comment ça fonctionne ?
          </h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-lg mt-2">
            Trois étapes limpides pour reprendre le pouvoir sur ta santé intime sans
            laisser de trace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Step 1 */}
          <div className="bg-surface-container-low rounded-t-[2.5rem] rounded-b-2xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group border border-outline-variant/20">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary-fixed/30 group-hover:scale-125 transition-transform duration-500" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary font-headline text-headline-sm flex items-center justify-center shadow-xs font-bold">
                  1
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant font-label text-label-sm font-semibold">
                  Discrétion
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-primary mb-5 shadow-xs">
                <span className="material-symbols-outlined text-[30px]">
                  door_front
                </span>
              </div>
              <h3 className="font-headline text-headline-sm text-on-surface mb-2.5 font-bold">
                Frappe à la porte (Ko-ko)
              </h3>
              <p className="font-body text-body-md text-on-surface-variant">
                Choisis un pseudo poétique (comme <em>FleurDeBaobab</em>) et un
                avatar doux. Aucun numéro ni document d&apos;identité n&apos;est exigé.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center gap-2 text-primary font-label text-label-md font-semibold">
              <span className="material-symbols-outlined text-[16px]">
                verified_user
              </span>
              <span>Zéro empreinte nominative</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-surface-container-low rounded-t-[2.5rem] rounded-b-2xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group border border-outline-variant/20">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-secondary-fixed/40 group-hover:scale-125 transition-transform duration-500" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-full bg-surface-container-lowest text-secondary font-headline text-headline-sm flex items-center justify-center shadow-xs font-bold">
                  2
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label text-label-sm font-semibold">
                  Bienveillance
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-secondary mb-5 shadow-xs">
                <span className="material-symbols-outlined text-[30px]">
                  support_agent
                </span>
              </div>
              <h3 className="font-headline text-headline-sm text-on-surface mb-2.5 font-bold">
                Confie-toi sans crainte
              </h3>
              <p className="font-body text-body-md text-on-surface-variant">
                Pose tes questions les plus sensibles à l&apos;IA Koko ou échange dans Le
                Cercle sécurisé et modéré par des sages-femmes togolaises.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center gap-2 text-secondary font-label text-label-md font-semibold">
              <span className="material-symbols-outlined text-[16px]">
                psychology_alt
              </span>
              <span>Orientation bienveillante</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-surface-container-low rounded-t-[2.5rem] rounded-b-2xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group border border-outline-variant/20">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-tertiary-fixed/40 group-hover:scale-125 transition-transform duration-500" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-full bg-surface-container-lowest text-tertiary font-headline text-headline-sm flex items-center justify-center shadow-xs font-bold">
                  3
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed-variant font-label text-label-sm font-semibold">
                  Prendre soin
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-tertiary mb-5 shadow-xs">
                <span className="material-symbols-outlined text-[30px]">
                  spa
                </span>
              </div>
              <h3 className="font-headline text-headline-sm text-on-surface mb-2.5 font-bold">
                Prends soin de toi
              </h3>
              <p className="font-body text-body-md text-on-surface-variant">
                Suis ton cycle menstruel en toute clarté et bénéficie de bons
                anonymes pour des consultations à tarif réduit dans nos centres
                partenaires labellisés.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center gap-2 text-tertiary font-label text-label-md font-semibold">
              <span className="material-symbols-outlined text-[16px]">
                local_hospital
              </span>
              <span>Centres partenaires à Lomé &amp; Kara</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Reassurance Banner & Statistics */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-surface-container rounded-2xl p-6 md:p-10 shadow-xs border border-outline-variant/30">
          <div className="lg:col-span-5 relative">
            <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden shadow-sm relative bg-primary-fixed/20 flex flex-col justify-end p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
              <div className="relative z-10 text-white flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2">
                  <span className="material-symbols-outlined text-[28px]">
                    volunteer_activism
                  </span>
                </div>
                <div className="font-headline text-headline-sm font-bold">
                  Espace certifié &amp; soutenu
                </div>
                <p className="font-body text-body-sm opacity-90">
                  En partenariat d&apos;orientation avec les acteurs de santé
                  communautaire au Togo.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label text-label-sm w-fit mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[14px]">
                psychology
              </span>
              <span>Pas d&apos;angoisse, pas de solitude</span>
            </div>
            <h3 className="font-headline text-headline-lg text-on-surface mb-4 font-bold">
              « Ici, personne ne te juge. Prends tout ton temps. »
            </h3>
            <p className="font-body text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Questions sur le premier cycle, doutes sur la contraception
              d&apos;urgence, crampes douloureuses ou simple besoin de parler sans être
              pointée du doigt par ton entourage. Koko est pensé pour respecter ta
              pudeur et ta liberté absolue.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-outline-variant/20">
                <p className="font-headline text-headline-md text-primary font-bold">
                  {MOCK_STATISTICS.questionsAnsweredCount}
                </p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  {MOCK_STATISTICS.questionsAnsweredLabel}
                </p>
              </div>
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-outline-variant/20">
                <p className="font-headline text-headline-md text-secondary font-bold">
                  {MOCK_STATISTICS.dataEraseGuaranteed}
                </p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  {MOCK_STATISTICS.dataEraseLabel}
                </p>
              </div>
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs col-span-2 sm:col-span-1 border border-outline-variant/20">
                <p className="font-headline text-headline-md text-tertiary font-bold">
                  {MOCK_STATISTICS.partnerClinicsCount}
                </p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  {MOCK_STATISTICS.partnerClinicsLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOS Immediate Support Banner */}
      <section className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl bg-tertiary-fixed/30 text-on-tertiary-fixed-variant shadow-xs border border-tertiary-container/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">support</span>
            </div>
            <div>
              <h4 className="font-headline text-headline-sm text-tertiary mb-1 font-bold">
                Besoin d&apos;un secours immédiat ?
              </h4>
              <p className="font-body text-body-md text-on-surface-variant">
                Ligne nationale confidentielle gratuite au Togo (violences, écoute
                intime, urgence médicale).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${EMERGENCY_CONTACTS.nationalEmergencyNumber}`}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-tertiary text-on-tertiary font-label text-label-md shadow-sm hover:bg-on-tertiary-fixed-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Appeler le {EMERGENCY_CONTACTS.nationalEmergencyNumber} (Gratuit)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
