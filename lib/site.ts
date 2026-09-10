/** Базова адреса сайту (GitHub Pages). Включає шлях репозиторію. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://andriytomusiak.github.io/autodetailing-landing";

export const BRAND = "CleanT";
export const PHONE_DISPLAY = "(093) 266-41-59";
export const PHONE_E164 = "+380932664159";

/**
 * ID форми Formspree (https://formspree.io).
 * Зареєструйте безкоштовну форму та вставте її ID сюди —
 * заявки надходитимуть на вашу пошту.
 */
export const FORMSPREE_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID";

/**
 * Префікс шляху на GitHub Pages (ім'я репозиторію).
 * next/image з unoptimized не додає basePath автоматично,
 * тому підставляємо його вручну через цей хелпер.
 */
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/autodetailing-landing" : "";

/** Повертає шлях до статичного файлу з урахуванням basePath. */
export const asset = (path: string) => `${BASE_PATH}${path}`;
