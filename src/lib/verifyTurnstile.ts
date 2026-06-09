export async function verifyTurnstile(token: string, secretKey: string, ip: string) {
  if (!token) return false;
  try {
    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip || undefined,
      }),
    });
    const outcome: any = await result.json();
    return outcome.success === true;
  } catch (e) {
    console.error("Turnstile verification failed:", e);
    return false;
  }
}
