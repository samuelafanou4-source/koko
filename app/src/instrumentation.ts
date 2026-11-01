export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { getEnv } = await import("./lib/env");
    try {
      getEnv();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ [Koko Configuration Error]", err.message);
      }
    }
  }
}

