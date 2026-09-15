/** Базова адреса сайту (GitHub Pages). Включає шлях репозиторію. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://andriytomusiak.github.io/autodetailing-landing";

export const BRAND = "CleanT";
export const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(093) 266-41-59";
export const PHONE_E164 = process.env.NEXT_PUBLIC_PHONE_E164 ?? "+380932664159";
export const TELEGRAM_USERNAME =
  process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "andriytomusiak";

/** Токен бота (@BotFather). Потрапляє в клієнтський бандл (статичний GitHub Pages). */
export const TELEGRAM_BOT_TOKEN =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ?? "";

/** chat_id, куди слати заявки (особистий акаунт або група). */
export const TELEGRAM_CHAT_ID =
  process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ?? "";

/** Повертає шлях до статичного файлу з урахуванням basePath. */
export const asset = (path: string) => `${path}`;
