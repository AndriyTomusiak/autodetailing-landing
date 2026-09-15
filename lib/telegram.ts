function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export type LeadPayload = {
  name: string;
  phone: string;
  service: string;
  comment?: string;
};

export function formatLeadMessage(lead: LeadPayload) {
  const lines = [
    "🆕 <b>Нова заявка — знижка 10%</b>",
    "",
    `👤 <b>Імʼя:</b> ${escapeHtml(lead.name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    `🧽 <b>Послуга:</b> ${escapeHtml(lead.service)}`,
  ];

  const comment = lead.comment?.trim();
  if (comment) {
    lines.push(`💬 <b>Коментар:</b> ${escapeHtml(comment)}`);
  }

  return lines.join("\n");
}

export async function sendLeadToTelegram(
  token: string,
  chatId: string,
  lead: LeadPayload,
) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadMessage(lead),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const json: { ok?: boolean; description?: string } = await res.json();
  if (!res.ok || !json.ok) {
    throw new Error(json.description ?? "Telegram request failed");
  }
}
