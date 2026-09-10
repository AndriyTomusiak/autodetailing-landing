"use client";

import { useState } from "react";
import { FORMSPREE_ID } from "@/lib/site";

const services = [
  "Комплексна хімчистка салону",
  "Хімчистка окремих елементів",
  "Чистка та догляд за шкіряним салоном",
  "Інше / потрібна консультація",
];

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
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
          required
          pattern="[+()0-9\s-]{10,18}"
          placeholder="067-000-00-00"
          className="w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent"
        />
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
          {services.map((s) => (
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
