/**
 * SCRIPT DE SEED / DÉMONSTRATION KOKO
 *
 * NOTE DE TRANSPARENCE :
 * Les données créées ci-dessous sont des exemples de démonstration
 * clairement identifiés comme prototypes pour tester l'interface et
 * l'écosystème local togolais avant le lancement officiel.
 */

import { identityDb } from "../lib/db/identity";
import { healthDb } from "../lib/db/health";
import { hashPassword } from "../lib/passwords";
import { EncryptionService } from "../lib/crypto";

async function main() {
  console.log("🌱 Début du peuplement des bases Koko (Identité & Santé)...");

  // 1. Seed Demo User Account in Identity Database
  const demoPseudo = "FleurDeBaobab";
  const passwordHash = await hashPassword("KokoSecurite2026!");
  const demoAnonId = "anon-demo-uuid-baobab-001";

  const existing = await identityDb.userAccount.findUnique({
    where: { pseudonym: demoPseudo },
  });

  if (!existing) {
    await identityDb.userAccount.create({
      data: {
        pseudonym: demoPseudo,
        passwordHash,
        anonId: demoAnonId,
        role: "USER",
      },
    });
    console.log(`✓ Compte de démonstration créé : ${demoPseudo}`);
  }

  const moderatorPseudo = "SageFemmeKoko";
  const existingMod = await identityDb.userAccount.findUnique({
    where: { pseudonym: moderatorPseudo },
  });
  if (!existingMod) {
    await identityDb.userAccount.create({
      data: {
        pseudonym: moderatorPseudo,
        passwordHash: await hashPassword("KokoModeration2026!"),
        anonId: "anon-demo-uuid-moderator-001",
        role: "MODERATOR",
      },
    });
    console.log(`✓ Compte modération de démonstration créé : ${moderatorPseudo}`);
  }

  // 2. Seed Partner Health Centers in Health Database
  const demoCenters = [
    {
      name: "ATBEF Siège National (Association Togolaise pour le Bien-Être Familial)",
      description:
        "Centre de référence national pour la santé sexuelle et reproductive, planning familial et consultations gynécologiques bienveillantes.",
      city: "Lomé",
      address: "Rue des Étoiles, Tokoin Solidarité",
      latitude: 6.1375,
      longitude: 1.2125,
      phone: "+228 22 21 44 26",
      priceInfo: "Consultation jeune : 1 500 FCFA (tarif protégé Pass Koko)",
      isGirlFriendly: true,
      isPartner: true,
    },
    {
      name: "Centre Médico-Social Universitaire (CNOU Université de Lomé)",
      description:
        "Structure médicale intégrée au campus de Lomé. Accueil confidentiel réservé aux étudiantes pour la contraception et le suivi de cycle.",
      city: "Lomé",
      address: "Campus Universitaire de Lomé, Boulevard Eyadéma",
      latitude: 6.1752,
      longitude: 1.2158,
      phone: "+228 22 25 99 96",
      priceInfo: "Tarif conventionné étudiante : 500 FCFA",
      isGirlFriendly: true,
      isPartner: true,
    },
    {
      name: "Cabinet de Soins Espoir & Sérénité Bè-Kpota",
      description:
        "Cabinet de proximité animé par des sages-femmes conventionnées Koko. Écoute sans jugement et soins gynécologiques doux.",
      city: "Lomé",
      address: "Quartier Bè-Kpota, face Pharmacie du Peuple",
      latitude: 6.142,
      longitude: 1.238,
      phone: "+228 90 12 34 56",
      priceInfo: "Consultation intime réduite : 2 000 FCFA",
      isGirlFriendly: true,
      isPartner: true,
    },
    {
      name: "Antenne Régionale ATBEF Kara",
      description:
        "Structure d'écoute, de distribution de préservatifs et de dépistage confidentiel pour les jeunes femmes de la région de la Kara.",
      city: "Kara",
      address: "Quartier Chaminade, Kara",
      latitude: 9.5511,
      longitude: 1.1861,
      phone: "+228 26 60 03 14",
      priceInfo: "Consultation : 1 500 FCFA",
      isGirlFriendly: true,
      isPartner: true,
    },
  ];

  for (const center of demoCenters) {
    const found = await healthDb.healthCenter.findFirst({
      where: { name: center.name },
    });
    if (!found) {
      await healthDb.healthCenter.create({ data: center });
    }
  }
  console.log(`✓ ${demoCenters.length} centres partenaires répertoriés.`);

  // 3. Seed Sample Cycle Entries for demo account
  const today = new Date();
  const cycleStart = new Date(today);
  cycleStart.setDate(cycleStart.getDate() - 13); // Day 14

  const sampleLog = await healthDb.dailyLog.findFirst({
    where: { anonId: demoAnonId },
  });

  if (!sampleLog) {
    const encNote = EncryptionService.encrypt(
      "Note secrète démo : Journée sereine, examen d'anglais validé !"
    );

    await healthDb.dailyLog.create({
      data: {
        anonId: demoAnonId,
        date: new Date(),
        mood: "sereine",
        symptoms: ["Énergie haute", "Plein d'idées"],
        encryptedNotes: encNote.ciphertext,
        notesIv: encNote.iv,
        notesAuthTag: encNote.authTag,
      },
    });

    await healthDb.cycleEntry.create({
      data: {
        anonId: demoAnonId,
        startDate: cycleStart,
        cycleLength: 28,
        periodLength: 5,
        flowIntensity: "medium",
      },
    });
    console.log("✓ Données de démonstration du carnet intime générées.");
  }

  console.log("✨ Initialisation des données de test terminée avec succès !");
}

main()
  .catch((e) => {
    console.error("Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await identityDb.$disconnect();
    await healthDb.$disconnect();
  });

