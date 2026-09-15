import { isLeadService } from "@/lib/lead";
import { formatUaMobileE164, isValidUaMobile } from "@/lib/phone";
import { sendLeadToTelegram } from "@/lib/telegram";

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json({ error: "Telegram is not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, phone, service, comment } = body as Record<string, unknown>;

  const nameText = typeof name === "string" ? name.trim() : "";
  const phoneText = typeof phone === "string" ? phone.trim() : "";
  const serviceText = typeof service === "string" ? service.trim() : "";
  const commentText = typeof comment === "string" ? comment.trim() : "";

  if (!nameText || nameText.length > 80) {
    return Response.json({ error: "Invalid name" }, { status: 400 });
  }

  if (!isValidUaMobile(phoneText)) {
    return Response.json({ error: "Invalid phone" }, { status: 400 });
  }

  if (!isLeadService(serviceText)) {
    return Response.json({ error: "Invalid service" }, { status: 400 });
  }

  if (commentText.length > 500) {
    return Response.json({ error: "Invalid comment" }, { status: 400 });
  }

  try {
    await sendLeadToTelegram(token, chatId, {
      name: nameText,
      phone: formatUaMobileE164(phoneText),
      service: serviceText,
      comment: commentText,
    });
  } catch {
    return Response.json({ error: "Telegram request failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
