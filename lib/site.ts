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

/**
 * ID форми Formspree (https://formspree.io).
 * Зареєструйте безкоштовну форму та вставте її ID сюди
 * заявки надходитимуть на вашу пошту.
 */
export const FORMSPREE_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID";

/** Повертає шлях до статичного файлу з урахуванням basePath. */
export const asset = (path: string) => `${path}`;
