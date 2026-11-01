import crypto from "crypto";

console.log("# Colle ces valeurs dans app/.env — ne les commite jamais.");
console.log(`JWT_ACCESS_SECRET="${crypto.randomBytes(48).toString("base64")}"`);
console.log(`JWT_REFRESH_SECRET="${crypto.randomBytes(48).toString("base64")}"`);
console.log(`ENCRYPTION_KEY="${crypto.randomBytes(32).toString("base64")}"`);
console.log(`CRON_SECRET="${crypto.randomBytes(32).toString("base64")}"`);
