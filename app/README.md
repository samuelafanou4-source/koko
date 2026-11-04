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
- Node.js version 20 LTS ou 22 LTS
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

### 4. Génération et migration des deux schémas Prisma
Koko sépare strictement les modèles identité et santé :
```bash
# Générer les clients Prisma
npm run db:generate

# Déployer les schémas sur vos deux bases
npm run db:migrate

# Pour synchroniser directement en développement sans fichier de migration :
npm run prisma:push
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

### 7. Lancement des tests unitaires
```bash
npm test
```

### 8. Construction et démarrage pour la production
```bash
npm run build
npm start
```

---

## 🛠️ Dépannage & FAQ

- **Port 3000 déjà utilisé** : Lancez avec `npm run dev -- -p 3001` ou arrêtez le processus écoutant sur le port 3000.
- **Erreur de variable d'environnement au démarrage** : Le validateur `src/lib/env.ts` affiche un message précis indiquant le nom exact de la variable manquante.
- **Erreur de connexion Prisma** : Vérifiez que vos deux serveurs PostgreSQL sont en ligne et que les paramètres de connexion autorisent les requêtes avec le schéma public. Pour réinitialiser complètement les bases en local, utilisez `npm run db:reset`.

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
