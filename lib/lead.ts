export const LEAD_SERVICES = [
  "Комплексна хімчистка салону",
  "Хімчистка окремих елементів",
  "Чистка та догляд за шкіряним салоном",
  "Інше / потрібна консультація",
] as const;

export type LeadService = (typeof LEAD_SERVICES)[number];

export function isLeadService(value: string): value is LeadService {
  return (LEAD_SERVICES as readonly string[]).includes(value);
}
