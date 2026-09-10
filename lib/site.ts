/** Базова адреса сайту (GitHub Pages). Включає шлях репозиторію. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://andriytomusiak.github.io/autodetailing-landing";

export const BRAND = "CleanT";
export const PHONE_DISPLAY = "(0XX) 000-00-00";
export const PHONE_E164 = "+380000000000";

/**
 * ID форми Formspree (https://formspree.io).
 * Зареєструйте безкоштовну форму та вставте її ID сюди —
 * заявки надходитимуть на вашу пошту.
 */
export const FORMSPREE_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID";
