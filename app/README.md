# 🌿 Koko — Refuge & Bien-être intime

> **« Frappe à la porte de ton bien-être intime. »**

Koko est une plateforme numérique confidentielle, bienveillante et hautement sécurisée pour la santé sexuelle, reproductive et mentale des jeunes femmes et étudiantes au Togo (Lomé, Kara et tout le pays).

Conçue pour garantir une discrétion absolue même sur smartphones partagés ou connexions à faible débit, Koko sépare hermétiquement l'identité de ses utilisatrices de leurs données intimes de santé.

---

## 🏛️ Architecture & Confidentialité Hermétique

Koko intègre une séparation physique et logique stricte :
1. **Base Identité (`identity.prisma`)** : Contient uniquement les pseudonymes poétiques (ex: *FleurDeBaobab*), les mots de passe hachés avec **Argon2id**, et un identifiant opaque UUID (`anonId`). Aucun nom de famille, aucune adresse email obligatoire.
2. **Base Santé (`health.prisma`)** : Contient le suivi de cycle menstruel, les ressentis d'humeur, les notes secrètes du carnet intime, les échanges du Cercle et les Pass Santé. Ces tables référencent **uniquement** le `anonId` anonyme et ne connaissent aucun nom ni téléphone.
3. **Chiffrement AES-256-GCM** : Toutes les notes de journal intime et les historiques de conversation sont chiffrés au repos avec une clé de 256 bits et un vecteur d'initialisation (IV) unique par enregistrement.
4. **Zéro Traçage IP & Zéro Traqueur** : Aucune adresse IP n'est journalisée. Aucun script externe, aucun pixel tiers commercial.

---

## 🔐 Modèle d'accès : une plateforme sous pseudo

Toutes les fonctionnalités demandent d'être connectée avec son pseudo. Seules quelques pages restent publiques.

**Pages publiques** : `/` (présentation), `/onboarding` (création d'espace), `/connexion`, `/charte`, `/sos-ecoute`, `/offline`.
La page SOS et le bouton SOS restent accessibles sans compte : une personne en détresse doit joindre les numéros d'urgence en un geste.

**Pages privées** : `/tableau-de-bord`, `/assistant-koko`, `/carnet-intime`, `/le-cercle`, `/pass-sante`, `/parametres`, `/moderation` (modératrices et admins uniquement).
Toute autre adresse est privée par défaut (liste blanche des routes publiques dans `src/lib/routes.ts`).

**API publiques** : `/api/auth/login`, `register`, `refresh`, `logout`, `me`, `pseudonyms`, ainsi que `/api/sos`, `/api/whatsapp/*` (protégées par leurs propres secrets) et `/api/vouchers/validate` (utilisée par les centres partenaires).
Toutes les autres API sont privées et répondent `401` sans session.

**Contrôle en profondeur** :
1. `src/proxy.ts` (le « middleware » de Next.js 16) fait un contrôle léger : cookie présent et signature JWT valide. Il redirige vers `/connexion?next=…` (pages) ou répond `401` (API).
2. Les vérifications serveur passent par `src/lib/session.ts` : `requireSession()` dans le layout `(platform)` et dans chaque page privée, `withSession()` dans chaque route API privée. Elles vérifient le JWT **et** la session en base, donc une déconnexion révoque immédiatement les jetons.
3. Le paramètre `next` est validé (`src/lib/safe-next.ts`) : seuls les chemins internes relatifs vers une page privée sont acceptés.

**Session** :
- cookies `httpOnly`, `secure` en production, `sameSite=lax` ;
- jeton d'accès de 15 minutes et jeton de renouvellement de 7 jours, avec rotation à chaque renouvellement (l'ancien reste valable 60 s pour les requêtes parallèles) ;
- une session expirée renvoie vers `/connexion` avec le message « Ta session a expiré, reconnecte-toi » ;
- déconnexion automatique après `INACTIVITY_TIMEOUT_MINUTES` minutes sans activité (15 par défaut). Ce délai s'ajoute au voile anti-regards.

Pourquoi `sameSite=lax` et pas `strict` : avec `strict`, ouvrir Koko depuis un lien WhatsApp perdait la session.

**Connexion** :
- limite par client (empreinte réseau hachée, gardée en mémoire, jamais journalisée) et par pseudo (5 échecs / 15 min) ;
- message unique « Pseudo ou mot de passe incorrect » et délai constant en cas d'échec ;
- la création d'espace est limitée à 10 essais par heure et par client.

**Pas de récupération du mot de passe** : Koko ne connaît ni numéro ni e-mail. En cas d'oubli, il faut créer un nouvel espace.

**Cache et PWA** :
- toutes les réponses privées portent `Cache-Control: private, no-store` ;
- le service worker (`public/sw.js`, cache `koko-static-v3`) ne met jamais en cache les pages ni `/api`. Hors ligne, il affiche toujours `/offline` ;
- l'application installée s'ouvre sur `/tableau-de-bord` ;
- à la déconnexion, le stockage local, le Cache Storage et l'état en mémoire sont vidés.

**Sujets de la page d'accueil** : seule une clé courte (ex. `pilule-oubli`) est gardée en `sessionStorage`, jamais la question dans l'URL. Après connexion, l'assistant s'ouvre avec la question préremplie depuis `src/lib/topics.ts`.

**Indexation** : seules `/` et `/charte` sont dans le sitemap. Les pages privées, `/connexion` et `/onboarding` sont en `noindex`.

---

## 🚀 Guide d'installation rapide

### 1. Prérequis
- Node.js 20.12 ou plus récent (22 LTS conseillé)
- Deux bases de données PostgreSQL distinctes (ex: Supabase, Neon ou PostgreSQL local)

### 2. Installation propre des dépendances
```bash
cd koko/app
npm install
```

### 3. Configuration des variables d'environnement
Copiez le fichier `.env.example` en `.env` :
```bash
cp .env.example .env
```

Générez automatiquement les clés cryptographiques et secrets JWT locaux :
```bash
npm run setup:env
```
Ce script injecte automatiquement des valeurs aléatoires sécurisées pour `ENCRYPTION_KEY`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` et `CRON_SECRET` dans `.env` sans écraser les valeurs déjà existantes.

Renseignez ensuite vos deux URLs de base de données et votre clé API optionnelle :
- `IDENTITY_DATABASE_URL` : URL PostgreSQL de la base identité (ex: `postgresql://postgres:password@localhost:5432/koko_identity?schema=public`)
- `HEALTH_DATABASE_URL` : URL PostgreSQL de la base santé (ex: `postgresql://postgres:password@localhost:5432/koko_health?schema=public`)
- `GEMINI_API_KEY` : Clé API Google AI Studio pour l'Assistant Koko (si absente, un mode secours chaleureux prend le relais automatiquement).
- `INACTIVITY_TIMEOUT_MINUTES` (optionnel) : minutes sans activité avant la déconnexion automatique (défaut `15`, de 1 à 1440).

### 4. Génération et migrations des deux bases
Les deux clients Prisma (`src/generated/`, non versionnés) sont régénérés automatiquement à chaque `npm install` et avant chaque `npm run build`. Vous pouvez aussi lancer :
```bash
npm run db:generate
```

Chaque base a son propre historique de migrations : `prisma/migrations/identity` et `prisma/migrations/health`.

```bash
npm run db:deploy     # applique les migrations en attente sur les DEUX bases
npm run db:status     # état des migrations des deux bases
npm run db:migrate    # développement : crée une nouvelle migration après une modification de schéma
```

`db:deploy` utilise `IDENTITY_DIRECT_URL` / `HEALTH_DIRECT_URL` si elles sont définies, sinon `IDENTITY_DATABASE_URL` / `HEALTH_DATABASE_URL`. Les migrations ne doivent pas passer par le pooler « Transaction » de Supabase (port 6543) : utilisez la connexion directe ou le pooler « Session » (port 5432).

**Quand lancer `db:deploy` en production ?** Avant de déployer une version qui contient un nouveau dossier dans `prisma/migrations/`. Depuis votre poste, avec les URL directes de production dans votre terminal (jamais dans un fichier versionné) :
```bash
IDENTITY_DIRECT_URL="…" HEALTH_DIRECT_URL="…" npm run db:deploy
```

**Bases créées avant les migrations (avec `prisma db push`)** : leurs tables existent déjà. Une seule fois, marquez la migration initiale comme appliquée, puis vérifiez :
```bash
IDENTITY_DIRECT_URL="…" HEALTH_DIRECT_URL="…" npm run db:baseline
IDENTITY_DIRECT_URL="…" HEALTH_DIRECT_URL="…" npm run db:status
```

### 5. Peuplement initial (Seed de démonstration)
Pour insérer les structures partenaires de démonstration (ATBEF Lomé, CMS CNOU Université, Cabinet Bè-Kpota, ATBEF Kara) et des comptes de test :
```bash
npm run db:seed
```

Comptes de test (données de démonstration à renouveler avant le déploiement public) :
- Utilisatrice : `FleurDeBaobab` / `KokoSecurite2026!`
- Modératrice : `SageFemmeKoko` / `KokoModeration2026!`

### 6. Lancement du serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 7. Tests
```bash
npm test            # tests unitaires (rapides, sans base de données)
npm run test:db     # migrations depuis zéro + séparation identité/santé (PostgreSQL de test)
npm run test:e2e    # parcours complets sur le build de PRODUCTION (Playwright)
```
`test:db` et `test:e2e` démarrent eux-mêmes un PostgreSQL jetable (port 54329) : ils n'utilisent **jamais** vos vraies bases ni vos vrais secrets. Le premier lancement télécharge PostgreSQL ; pour Playwright, installez le navigateur une fois avec `npx playwright install chromium`.

Les tests découvrent automatiquement toutes les pages et routes API de `src/app` : une nouvelle page non protégée fait échouer les tests.

### 8. Avant chaque `git push` : `npm run predeploy`
```bash
npm run predeploy
```
Enchaîne, dans l'ordre : `tsc --noEmit`, lint, tests unitaires, tests de base de données, build de production, tests end-to-end. **Lancez-le avant chaque `git push`.** GitHub Actions (`.github/workflows/ci.yml`) refait les mêmes vérifications à chaque push et pull request.

### 9. Après chaque déploiement : `npm run smoke`
```bash
npm run smoke -- https://koko-tg.vercel.app
```
Vérification en lecture seule (aucun compte créé) : pages publiques en 200, pages privées redirigées vers `/connexion`, API privées en 401 et `/api/health` au vert (bases, configuration, chiffrement).

### 10. Construction et démarrage pour la production
```bash
npm run build
npm start
```

### 11. Logo et icônes
- **Logo maître** : `public/brand/koko-mark.svg` (l'arche et le point « toc », mêmes formes et couleurs que le logo de l'en-tête dans `src/components/layout/Brand.tsx`). Le logo complet avec le mot « Koko » est `public/brand/koko-logo.svg`.
- **Régénérer toutes les icônes** après une modification du logo :
  ```bash
  npm run icons
  ```
  Cette commande recrée le favicon (`src/app/favicon.ico`, `icon.svg`, `icon.png`), l'icône iOS (`apple-icon.png`), les icônes PWA (`public/icons/`) et l'image d'aperçu des liens (`opengraph-image.png`, `twitter-image.png`). Les polices utilisées (licence OFL) sont dans `assets/brand/fonts/`. Vérifie ensuite avec `npm test` (le test `tests/unit/icons.test.ts` contrôle les tailles, le manifeste et l'absence des icônes Next.js par défaut).
- Si les icônes de `public/icons/` changent, augmente `CACHE_VERSION` dans `public/sw.js`.
- **Les navigateurs gardent les favicons en cache très longtemps** (parfois plusieurs jours). Après un déploiement, une ancienne icône peut encore s'afficher : vide le cache ou ouvre le site en navigation privée pour vérifier, et réinstalle l'application sur l'écran d'accueil si besoin.

---

## 🛠️ Dépannage & FAQ

- **Port 3000 déjà utilisé** : Lancez avec `npm run dev -- -p 3001` ou arrêtez le processus écoutant sur le port 3000.
- **Erreur de variable d'environnement au démarrage** : Le validateur `src/lib/env.ts` affiche un message précis indiquant le nom exact de la variable manquante.
- **Erreur de connexion Prisma** : Vérifiez que vos deux serveurs PostgreSQL sont en ligne et que les paramètres de connexion autorisent les requêtes avec le schéma public. Pour réinitialiser complètement les bases en local, utilisez `npm run db:reset`.

### Erreurs en production (Vercel)

**1. Lire l'état de santé.** Ouvrez `https://koko-tg.vercel.app/api/health` ou lancez `npm run smoke -- https://koko-tg.vercel.app`. Chaque vérification répond `ok` ou `ko`. `invalidEnv` donne le **nom** des variables à corriger, jamais leur valeur.

**2. Trouver les logs.** Vercel > projet > **Logs**. Choisissez l'environnement *Production* et la bonne période.

**3. Lire un « digest ».** L'écran d'erreur affiche une *Référence* : c'est le digest Next.js. Cherchez ce nombre dans les logs Vercel. Vous trouverez une ligne `[koko] request-error route=… digest=… code=…` avec :
- la route concernée ;
- un code sûr, par exemple `PG_42P05` (erreur PostgreSQL) ou `P2021` (table absente : migrations non appliquées).

Les logs Koko ne contiennent jamais de données de santé, de corps de requête, de jeton ni d'adresse IP.

**4. Codes fréquents :**
- `PG_42P05` / `PG_26000` (« prepared statement ») : URL du pooler Supabase (port 6543) sans `pgbouncer=true`. Depuis cette version, Koko l'ajoute automatiquement. Si l'erreur persiste, vérifiez que le déploiement contient bien ce correctif.
- `P2021` / `P2022` (table ou colonne absente) : lancez `npm run db:deploy` sur la production (voir l'étape 4 de l'installation).
- `PrismaClientInitializationError` : URL de base invalide ou base injoignable. Vérifiez les variables ci-dessous.

**5. Variables à vérifier sur Vercel** (Settings > Environment Variables, environnement *Production*) :
- obligatoires : `IDENTITY_DATABASE_URL`, `HEALTH_DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `ENCRYPTION_KEY`, `CRON_SECRET` ;
- conseillée : `APP_URL` (https://koko-tg.vercel.app) ;
- optionnelles : `GEMINI_API_KEY`, `INACTIVITY_TIMEOUT_MINUTES`, `WHATSAPP_*` ;
- migrations seulement, à garder sur votre poste plutôt que sur Vercel : `IDENTITY_DIRECT_URL`, `HEALTH_DIRECT_URL`.

Toute modification de variable demande un **redéploiement** pour être prise en compte.

**6. Revenir à la version précédente.** Vercel > **Deployments**, choisissez le dernier déploiement qui fonctionnait, menu « ⋯ » > **Promote to Production** (ou **Instant Rollback**). Le site revient immédiatement à cette version. Corrigez ensuite le problème, lancez `npm run predeploy`, puis poussez.

---

## 📱 Fonctionnalités Clés Implémentées

- **Sortie Rapide d'Urgence** : Bouton œil permanent et touche `Échap` redirigeant immédiatement vers une page neutre (météo / dictionnaire) tout en purgeant le cache temporaire.
- **Mode Discret** : Floutage instantané des graphiques de cycle et notes intimes pour protéger l'écran en public.
- **Voile Anti-Regards** : Floutage automatique activé après 2 minutes d'inactivité.
- **Assistant Koko** : Guide IA d'orientation bienveillante (24h/24) intégrant un filtre de détection de détresse / violences / urgences médicales et déclenchant les secours d'urgence adaptés.
- **Mon Carnet Intime** : Suivi de cycle, prédiction de la fenêtre d'ovulation, journal des symptômes et notes chiffrées en AES-256-GCM.
- **Le Cercle Bienveillant** : Forum anonyme d'entraide entre sœurs avec réactions de soutien (« Câlin », « Moi aussi ») et signalement modérateur.
- **Pass Santé Partenaire & Carte** : Répertoire géolocalisé des cliniques "girl-friendly" togolaises (formule Haversine) et génération de bons de consultation anonymes avec QR code.
- **SOS Écoute** : Accès direct aux numéros d'urgence nationaux (1014, Ligne Verte 80 00 11 22) et exercice guidé de respiration relaxante.

---

## 🔒 Avertissement Déontologique & Médical

L'Assistant Koko et les fonctionnalités de suivi de cycle sont conçus pour fournir de l'information et du soutien d'orientation. Koko n'est pas un médecin et ne pose aucun diagnostic. Les données chiffrées de santé restent sous le contrôle souverain et exclusif de l'utilisatrice.
