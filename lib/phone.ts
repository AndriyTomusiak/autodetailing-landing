/** Мобільні коди операторів України (після 0 або 380). */
const UA_MOBILE_CODES = [
  "39",
  "50",
  "63",
  "66",
  "67",
  "68",
  "73",
  "75",
  "77",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
] as const;

const UA_PHONE_RE = new RegExp(
  `^(?:0|380)(?:${UA_MOBILE_CODES.join("|")})\\d{7}$`,
);

export const UA_PHONE_ERROR =
  "Введіть український мобільний номер, лише цифри (наприклад 0932664159)";

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidUaMobile(value: string) {
  return UA_PHONE_RE.test(digitsOnly(value));
}

/** Нормалізує валідний UA номер до +380XXXXXXXXX. */
export function formatUaMobileE164(value: string) {
  const digits = digitsOnly(value);
  const national = digits.startsWith("380") ? digits.slice(3) : digits.slice(1);
  return `+380${national}`;
}
