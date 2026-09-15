"use client";

import { useState } from "react";
import { LEAD_SERVICES } from "@/lib/lead";
import {
  UA_PHONE_ERROR,
  digitsOnly,
  formatUaMobileE164,
  isValidUaMobile,
} from "@/lib/phone";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function handlePhoneChange(value: string) {
    const next = digitsOnly(value).slice(0, 12);
    setPhone(next);
    if (!next || isValidUaMobile(next)) setPhoneError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!isValidUaMobile(phone)) {
      setPhoneError(UA_PHONE_ERROR);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          phone: formatUaMobileE164(phone),
          service: String(data.get("service") ?? "").trim(),
          comment: String(data.get("comment") ?? "").trim(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setPhone("");
      setPhoneError("");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-surface p-8 text-center">
        <p className="text-4xl">✅</p>
        <h3 className="mt-4 text-xl font-bold">Заявку надіслано!</h3>
        <p className="mt-2 text-sm text-muted">
          Менеджер зв&apos;яжеться з вами протягом 15 хвилин у робочий час.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent hover:underline"
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-surface p-6 md:p-8">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
          Ваше ім&apos;я
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="Михайло"
          className="w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
          Номер телефону
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          required
          maxLength={12}
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={() => {
            if (phone && !isValidUaMobile(phone)) setPhoneError(UA_PHONE_ERROR);
          }}
          placeholder="0932664159"
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? "phone-error" : undefined}
          className="w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent"
        />
        {phoneError ? (
          <p id="phone-error" className="mt-1.5 text-sm text-red-400">
            {phoneError}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-semibold">
          Послуга
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none transition focus:border-accent"
        >
          {LEAD_SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment" className="mb-1.5 block text-sm font-semibold">
          Коментар <span className="font-normal text-muted">(необов&apos;язково)</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={2}
          placeholder="Марка авто, тип забруднення, бажаний час…"
          className="w-full resize-none rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-accent px-6 py-4 font-bold text-white transition hover:bg-accent-strong disabled:opacity-60"
      >
        {status === "loading" ? "Надсилаємо…" : "Отримати знижку 10%"}
      </button>
      {status === "error" && (
        <p className="text-center text-sm text-red-400">
          Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.
        </p>
      )}
      <p className="text-center text-xs text-muted">
        Натискаючи кнопку, ви даєте згоду на обробку персональних даних
      </p>
    </form>
  );
}
