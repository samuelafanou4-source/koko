import { describe, it, expect, beforeAll } from "vitest";

describe("EncryptionService (AES-256-GCM)", () => {
  beforeAll(() => {
    // Ensure test encryption key is set (32 bytes base64)
    process.env.ENCRYPTION_KEY =
      "L+T4bu/BE9PK4wnH9oI2afQhJqqedBU++WVhiqFhEQ8=";
  });

  it("encrypts and decrypts a sensitive plaintext string successfully", async () => {
    const { EncryptionService } = await import("@/lib/crypto");
    const secret = "Note confidentielle : retard de 3 jours, légères crampes.";

    const encrypted = EncryptionService.encrypt(secret);
    expect(encrypted.ciphertext).toBeDefined();
    expect(encrypted.iv).toBeDefined();
    expect(encrypted.authTag).toBeDefined();

    const decrypted = EncryptionService.decrypt(
      encrypted.ciphertext,
      encrypted.iv,
      encrypted.authTag
    );
    expect(decrypted).toBe(secret);
  });

  it("produces distinct IVs and ciphertexts for the same plaintext", async () => {
    const { EncryptionService } = await import("@/lib/crypto");
    const secret = "Mon message secret";

    const enc1 = EncryptionService.encrypt(secret);
    const enc2 = EncryptionService.encrypt(secret);

    expect(enc1.iv).not.toBe(enc2.iv);
    expect(enc1.ciphertext).not.toBe(enc2.ciphertext);
  });

  it("fails to decrypt when the ciphertext has been tampered with", async () => {
    const { EncryptionService } = await import("@/lib/crypto");
    const secret = "Message authentique";

    const enc = EncryptionService.encrypt(secret);
    const tampered = enc.ciphertext.slice(0, -4) + "AAAA";

    expect(() => {
      EncryptionService.decrypt(tampered, enc.iv, enc.authTag);
    }).toThrow();
  });

  it("safely handles null and empty inputs with nullable helpers", async () => {
    const { EncryptionService } = await import("@/lib/crypto");

    expect(EncryptionService.encryptNullable(null)).toBeNull();
    expect(EncryptionService.encryptNullable("   ")).toBeNull();
    expect(EncryptionService.decryptNullable(null, null, null)).toBeNull();
  });
});

