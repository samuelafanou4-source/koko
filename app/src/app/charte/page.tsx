import Link from "next/link";

export default function ChartePage() {
  const commitments = [
    {
      icon: "visibility_off",
      title: "1. Anonymat et Pseudonymat protecteur",
      desc: "Nous ne te demanderons jamais ton nom de famille, ton adresse postale ou ta carte d'identité. Ton compte repose uniquement sur un pseudonyme poétique et un mot de passe choisi par tes soins.",
    },
    {
      icon: "lock",
      title: "2. Chiffrement rigoureux des données",
      desc: "Toutes les communications circulent sous protocole chiffré HTTPS/TLS. Tes notes intimes, tes messages et tes informations sensibles sont chiffrés au repos à l'aide de l'algorithme robuste AES-256-GCM. Même nos administrateurs ne peuvent pas lire tes notes en clair.",
    },
    {
      icon: "device_hub",
      title: "3. Séparation hermétique Identité / Santé",
      desc: "Koko applique une architecture scindée : tes identifiants de connexion sont stockés dans une base de données séparée de tes données de santé. Ces dernières sont associées à un identifiant anonyme aléatoire et opaque, empêchant tout recoupement direct.",
    },
    {
      icon: "no_accounts",
      title: "4. Zéro enregistrement d'adresse IP & Zéro traqueur",
      desc: "Aucune adresse IP n'est conservée dans nos journaux de connexion. Nous n'utilisons aucun outil publicitaire tiers, aucun pixel de suivi commercial et aucun cookie intrusif.",
    },
    {
      icon: "delete_sweep",
      title: "5. Droit à l'oubli immédiat et intégral",
      desc: "D'un simple clic dans tes paramètres, tu peux ordonner l'effacement définitif et complet de toutes tes données dans nos deux bases. Aucun délai de rétention dissimulé.",
    },
    {
      icon: "gavel",
      title: "6. Alignement avec la législation togolaise (IPDCP)",
      desc: "Koko respecte scrupuleusement les principes fondamentaux de la loi togolaise relative à la protection des données à caractère personnel : minimisation de la collecte, finalité légitime de santé publique et sécurité renforcée.",
    },
  ];

  return (
    <div className="w-full max-w-[900px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg">
      {/* Header Arch */}
      <div className="relative overflow-hidden rounded-t-[2.5rem] rounded-b-2xl bg-primary-fixed/30 p-space-md sm:p-space-lg md:p-space-xl border border-primary/20 flex flex-col gap-3 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label text-label-sm w-fit font-semibold">
          <span className="material-symbols-outlined text-[16px]">shield</span>
          <span>Pacte de Confiance Fondateur</span>
        </div>
        <h1 className="font-display text-display text-on-surface font-bold">
          Charte de Discrétion &amp; Confidentialité
        </h1>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          Notre engagement sacré pour faire de Koko un sanctuaire où tu peux poser
          toutes tes questions intimes sans craindre la moindre indiscrétion.
        </p>
      </div>

      {/* Commitments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {commitments.map((c, i) => (
          <div
            key={i}
            className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/30 flex flex-col gap-3 shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">
                {c.icon}
              </span>
            </div>
            <h2 className="font-headline text-headline-sm text-on-surface font-bold">
              {c.title}
            </h2>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Scientific & Community Care Disclosure */}
      <div className="rounded-2xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 flex flex-col gap-3">
        <h3 className="font-headline text-headline-sm text-on-surface font-bold">
          Notre rôle : Guider sans remplacer le médecin
        </h3>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          L&apos;Assistant Koko est un outil d&apos;orientation, de soutien chaleureux
          et d&apos;information générale basé sur une intelligence artificielle.
          Il ne remplace pas un professionnel de santé et ne délivre ni
          ordonnance ni diagnostic. En cas de situation médicale complexe, il
          t&apos;encouragera toujours à consulter une sage-femme ou un médecin.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-primary font-label text-label-md font-semibold hover:underline"
          >
            <span>Retourner à l&apos;accueil</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

