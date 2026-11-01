import "server-only";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits standard for AES-GCM
const AUTH_TAG_LENGTH = 16; // 128 bits standard

export interface EncryptedPayload {
  ciphertext: string; // base64
  iv: string; // base64
  authTag: string; // base64
}

export class EncryptionService {
  private static getKey(): Buffer {
    const rawKey = process.env.ENCRYPTION_KEY;
    if (!rawKey) {
      throw new Error("ENCRYPTION_KEY environment variable is not defined");
    }

    // Try decoding base64 key or derive 32-byte buffer
    const buf = Buffer.from(rawKey, "base64");
    if (buf.length === 32) {
      return buf;
    }

    // Fallback: SHA-256 hash to guarantee exactly 32 bytes
    return crypto.createHash("sha256").update(rawKey).digest();
  }

  /**
   * Encrypts plaintext string using AES-256-GCM with a random IV.
   */
  public static encrypt(plaintext: string): EncryptedPayload {
    if (typeof plaintext !== "string") {
      throw new TypeError("Plaintext to encrypt must be a string");
    }

    const key = this.getKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
      authTagLength: AUTH_TAG_LENGTH,
    });

    const encrypted = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return {
      ciphertext: encrypted.toString("base64"),
      iv: iv.toString("base64"),
      authTag: authTag.toString("base64"),
    };
  }

  /**
   * Decrypts ciphertext using AES-256-GCM.
   */
  public static decrypt(
    ciphertext: string,
    iv: string,
    authTag: string
  ): string {
    const key = this.getKey();
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      key,
      Buffer.from(iv, "base64"),
      { authTagLength: AUTH_TAG_LENGTH }
    );

    decipher.setAuthTag(Buffer.from(authTag, "base64"));

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(ciphertext, "base64")),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  }

  /**
   * Safe helper for nullable fields
   */
  public static encryptNullable(
    text: string | null | undefined
  ): EncryptedPayload | null {
    if (!text || text.trim() === "") return null;
    return this.encrypt(text);
  }

  /**
   * Safe helper for decrypting nullable fields
   */
  public static decryptNullable(
    ciphertext?: string | null,
    iv?: string | null,
    authTag?: string | null
  ): string | null {
    if (!ciphertext || !iv || !authTag) return null;
    try {
      return this.decrypt(ciphertext, iv, authTag);
    } catch {
      return null;
    }
  }
}

