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
