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

  // 2. Health centers are NOT seeded: only centers with a signed agreement,
  //    verified address, phone and price may be added (manually) to the database.

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

