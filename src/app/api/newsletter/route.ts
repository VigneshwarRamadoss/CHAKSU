const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof payload === "object" && payload !== null && "email" in payload
    ? String(payload.email).trim().toLowerCase()
    : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const endpoint = process.env.NEWSLETTER_ENDPOINT;
  if (!endpoint) {
    return Response.json({ error: "Newsletter service is not configured." }, { status: 503 });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEWSLETTER_API_TOKEN
          ? { Authorization: `Bearer ${process.env.NEWSLETTER_API_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ email, source: "chaksu-web" }),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json({ error: "Newsletter service rejected the request." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Newsletter service is unavailable." }, { status: 502 });
  }
}
