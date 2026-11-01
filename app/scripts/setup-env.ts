import fs from "fs";
import path from "path";
import crypto from "crypto";

const envPath = path.resolve(process.cwd(), ".env");
const examplePath = path.resolve(process.cwd(), ".env.example");

let envContent = "";
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, "utf-8");
} else if (fs.existsSync(examplePath)) {
  envContent = fs.readFileSync(examplePath, "utf-8");
}

interface SecretSpec {
  key: string;
  generate: () => string;
}

const secrets: SecretSpec[] = [
  {
    key: "ENCRYPTION_KEY",
    generate: () => crypto.randomBytes(32).toString("base64"),
  },
  {
    key: "JWT_ACCESS_SECRET",
    generate: () => crypto.randomBytes(64).toString("hex"),
  },
  {
    key: "JWT_REFRESH_SECRET",
    generate: () => crypto.randomBytes(64).toString("hex"),
  },
  {
    key: "CRON_SECRET",
    generate: () => crypto.randomBytes(64).toString("hex"),
  },
];

let updatedContent = envContent;
const addedOrUpdated: string[] = [];

for (const { key, generate } of secrets) {
  const regex = new RegExp(`^${key}=(.*)$`, "m");
  const match = updatedContent.match(regex);

  if (match) {
    const currentValue = match[1].trim().replace(/^["']|["']$/g, "");
    if (!currentValue) {
      const newValue = generate();
      updatedContent = updatedContent.replace(regex, `${key}="${newValue}"`);
      addedOrUpdated.push(key);
    }
  } else {
    const newValue = generate();
    if (updatedContent && !updatedContent.endsWith("\n")) {
      updatedContent += "\n";
    }
    updatedContent += `${key}="${newValue}"\n`;
    addedOrUpdated.push(key);
  }
}

fs.writeFileSync(envPath, updatedContent, "utf-8");

if (addedOrUpdated.length > 0) {
  console.log(`[setup-env] Generated new secure values for: ${addedOrUpdated.join(", ")}`);
} else {
  console.log("[setup-env] All required secrets are already configured. Nothing changed.");
}
