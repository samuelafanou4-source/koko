import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { logServerError } from "@/lib/logger";

const KOKO_SYSTEM_PROMPT = `Tu es "Assistant Koko", une guide numérique chaleureuse, bienveillante, profondément respectueuse et sans aucun jugement, conçue pour les jeunes femmes et étudiantes au Togo (Lomé, Kara et tout le pays).

RÈGLES D'OR ABSOLUES :
1. TON ET LANGAGE : Exprime-toi en français simple, doux, accessible et réconfortant. Utilise le tutoiement respectueux et bienveillant. Pas de jargon médical froid.
2. POSTURE MÉDICALE : Tu es une guide d'information et d'écoute bienveillante, JAMAIS un médecin.
   - Ne pose JAMAIS de diagnostic ferme.
   - Ne prescris JAMAIS de posologie ni de doses médicamenteuses précises.
   - Précise régulièrement avec douceur que tu es une guide IA d'orientation et non un professionnel de santé.
3. CONTEXTE LOCAL TOGOLAIS : Tu connais les réalités des jeunes femmes au Togo (stress des examens universitaires, coût des soins, pudeur sociale, structures d'accueil comme l'ATBEF ou les centres médico-sociaux universitaires).
4. ENCOURAGEMENT : Encourage toujours l'utilisatrice à consulter une sage-femme ou un médecin dans un centre de santé si les doutes persistent.
7. VÉRITÉ : N'invente JAMAIS de prix, d'adresse, de numéro de téléphone, de nom de centre partenaire ni de statistique. Ne dis jamais qu'un centre est partenaire de Koko. Pour les urgences, renvoie uniquement vers l'espace SOS de l'application.
5. SUJETS COUVERTS : Contraception régulière et d'urgence (pilule du lendemain dans le délai des 72h), règles douloureuses et cycles irréguliers, mycoses et infections, consentement et première fois, anxiété et bien-être mental.
6. FORMAT : N'utilise JAMAIS de markdown : aucun astérisque, aucun dièse, aucun gras. Écris en texte simple, en paragraphes courts. Pour une liste, commence chaque ligne par "• ". Réponds en 5 à 8 lignes maximum.`;

export interface GeminiResponse {
  content: string;
  isFallback: boolean;
}

export async function askKokoAssistant(
  prompt: string,
  history: { role: "user" | "model"; parts: string }[] = []
): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    // Graceful offline/demo response with warm medical-validated advice
    return {
      content: generateCompassionateFallback(prompt),
      isFallback: true,
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.8-flash",
      systemInstruction: KOKO_SYSTEM_PROMPT,
    });

    const firstUser = history.findIndex((h) => h.role === "user");
    const cleanHistory = firstUser === -1 ? [] : history.slice(firstUser);

    const chat = model.startChat({
      history: cleanHistory.map((h) => ({
        role: h.role,
        parts: [{ text: h.parts }],
      })),
      generationConfig: {
        maxOutputTokens: 1200,
        temperature: 0.4,
      },
    });

    const t0 = Date.now();
    const result = await chat.sendMessage(prompt);
    console.log("[koko] gemini ms:", Date.now() - t0);
    const text = result.response.text();

    return {
      content: text,
      isFallback: false,
    };
  } catch (error) {
    console.error("[koko] gemini error:", error);
    logServerError("gemini.fallback");
    return {
      content: generateCompassionateFallback(prompt),
      isFallback: true,
    };
  }
}

function generateCompassionateFallback(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (
    lower.includes("retard") ||
    lower.includes("enceinte") ||
    lower.includes("grossesse")
  ) {
    return (
      "🌸 Bonjour ma sœur. Tout d'abord, respire doucement : un retard de règles arrive fréquemment et ne signifie pas automatiquement une grossesse.\n\n" +
      "Le stress des cours, un changement d'alimentation, la fatigue ou une émotion forte peuvent décaler l'ovulation de plusieurs jours.\n\n" +
      "• **Si tu as eu un rapport récent sans protection** : Un test urinaire de pharmacie est fiable à partir du 1er jour de retard des règles.\n" +
      "• **Pilule du lendemain** : Efficace idéalement dans les 72h suivant le rapport.\n\n" +
      "Rappelle-toi que je suis une guide numérique et non un médecin. Une sage-femme ou un médecin dans un centre de santé pourra t'accompagner sans jugement."
    );
  }

  if (
    lower.includes("douleur") ||
    lower.includes("crampe") ||
    lower.includes("mal au ventre")
  ) {
    return (
      "🌿 Je comprends tellement ton inconfort. Les douleurs menstruelles (dysménorrhées) touchent beaucoup de jeunes femmes, mais souffrir en silence n'est pas une fatalité.\n\n" +
      "Quelques gestes doux immédiats :\n" +
      "• Applique une bouillotte d'eau chaude sur ton bas-ventre pour détendre les muscles utérins.\n" +
      "• Bois une infusion tiède de menthe ou de gingembre doux.\n" +
      "• Évite le café et les boissons très sucrées qui augmentent l'inflammation.\n\n" +
      "Si la douleur t'empêche de suivre les cours ou si elle résiste aux antalgiques usuels, fais vérifier cela auprès d'une sage-femme ou d'un médecin."
    );
  }

  if (
    lower.includes("perte") ||
    lower.includes("gratte") ||
    lower.includes("demangeaison") ||
    lower.includes("brulure")
  ) {
    return (
      "💧 Les démangeaisons ou changements de pertes sont très fréquents et la grande majorité se soigne très facilement.\n\n" +
      "• Les pertes blanches normales sont inodores et transparentes ou blanchâtres.\n" +
      "• Si les pertes ressemblent à du lait caillé avec de fortes démangeaisons, il peut s'agir d'une mycose (très courante après un traitement antibiotique, avec la transpiration ou les sous-vêtements synthétiques).\n" +
      "• **Conseil d'hygiène** : Lave uniquement la vulve externe avec de l'eau tiède, sans savon décapant et jamais de douche vaginale interne.\n\n" +
      "N'hésite pas à consulter une sage-femme ou un médecin pour un examen rapide et le traitement adapté."
    );
  }

  return (
    "🌸 Merci pour ta question. Tu es dans un espace totalement protégé, confidentiel et sans jugement.\n\n" +
    "Prendre soin de son corps et s'interroger sur sa santé intime est un acte de force et de maturité. Chaque corps féminin a son propre rythme.\n\n" +
    "Je suis à tes côtés pour t'expliquer comment fonctionne ton cycle, te guider sur la contraception ou t'apaiser face au stress. Si ta situation nécessite un avis médical, une sage-femme ou un médecin pourra t'examiner en toute confidentialité."
  );
}

