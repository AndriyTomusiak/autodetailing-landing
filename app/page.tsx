import Image from "next/image";
import type { CSSProperties } from "react";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import ScrollReveal from "@/components/ScrollReveal";
import { faqs } from "@/lib/faq";
import { SITE_URL, BRAND, PHONE_DISPLAY, PHONE_E164, asset } from "@/lib/site";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/* ─── Дані-заглушки: замініть на реальні ─── */
const PHONE = PHONE_DISPLAY;
const PHONE_HREF = `tel:${PHONE_E164}`;
const TELEGRAM_URL = "https://t.me/your_username";
const VIBER_URL = "viber://chat?number=%2B380000000000";

const advantages = [
  {
    title: "Гарантія результату",
    text: "Видаляємо до 99% плям і запахів. Якщо пляма не піддається — попередимо чесно ще до початку робіт.",
  },
  {
    title: "Фіксовані ціни",
    text: "Майстер оглядає авто перед роботою та узгоджує вартість. Ціна не змінюється у процесі.",
  },
  {
    title: "Безпечна еко-хімія",
    text: "Сертифіковані гіпоалергенні засоби, безпечні для дітей, тварин та людей з чутливою шкірою.",
  },
  {
    title: "Професійне обладнання",
    text: "Екстракторні машини, парогенератори та професійна хімія — глибока чистка без пошкодження оббивки.",
  },
];

const works = [
  {
    src: asset("/images/before-after-seat.png"),
    alt: "Хімчистка сидіння авто: до і після",
    label: "Хімчистка тканинного сидіння",
  },
  {
    src: asset("/images/before-after-interior.png"),
    alt: "Комплексна хімчистка салону: до і після",
    label: "Комплексна чистка салону",
  },
  {
    src: asset("/images/before-after-carpet.png"),
    alt: "Чистка підлоги та килимків авто: до і після",
    label: "Чистка підлоги та багажника",
  },
  {
    src: asset("/images/before-after-leather.png"),
    alt: "Догляд за шкіряним салоном: до і після",
    label: "Чистка та догляд за шкірою",
  },
];

const prices = [
  { service: "Комплексна хімчистка салону (седан)", price: "2 500 грн" },
  { service: "Комплексна хімчистка салону (кросовер)", price: "3 000 грн" },
  { service: "Комплексна хімчистка салону (мінівен/бус)", price: "3 500 грн" },
  { service: "Хімчистка одного сидіння", price: "350 грн" },
  { service: "Хімчистка стелі", price: "600 грн" },
  { service: "Хімчистка багажника", price: "500 грн" },
  { service: "Хімчистка дверних карт (4 шт)", price: "600 грн" },
  { service: "Чистка та догляд за шкіряним салоном", price: "3 500 грн" },
];

const steps = [
  {
    title: "Заявка",
    text: "Телефонуєте або залишаєте заявку на сайті — передзвонимо протягом 15 хвилин.",
  },
  {
    title: "Запис у бокс",
    text: "Узгоджуємо зручний час. Наш бокс обладнаний усім необхідним для глибокої чистки.",
  },
  {
    title: "Огляд і фіксація ціни",
    text: "Майстер оглядає салон, тестує тканину та називає остаточну вартість до початку робіт.",
  },
  {
    title: "Чистка та приймання",
    text: "Виконуємо роботу за 2–4 години. Ви приймаєте результат і оплачуєте — готівкою або карткою.",
  },
];

function CheckIcon() {
  return (
    <svg
      className="mt-1 h-5 w-5 shrink-0 text-accent"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.3a1 1 0 0 1-1.42.004L3.29 9.2a1 1 0 1 1 1.42-1.408l2.09 2.107 6.49-6.582a1 1 0 0 1 1.414-.006Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ─── Структуровані дані для пошуковиків (JSON-LD) ─── */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: BRAND,
  description:
    "Професійна хімчистка салону автомобіля: комплексна чистка, окремі елементи, догляд за шкіряним салоном.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.jpg`,
  image: `${SITE_URL}/images/hero.png`,
  telephone: PHONE_E164,
  priceRange: "₴₴",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
  makesOffer: prices.map((p) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: p.service },
    price: p.price.replace(/[^\d]/g, ""),
    priceCurrency: "UAH",
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollReveal />
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <Image
              src={asset("/images/logo.jpg")}
              alt="CleanT — Auto Cleaning & Detailing"
              width={44}
              height={44}
              className="rounded-full"
            />
            <span className="text-lg font-extrabold tracking-wide">
              Clean<span className="text-accent">T</span>
            </span>
          </a>
          <nav className="hidden gap-6 text-sm text-muted md:flex">
            <a className="transition hover:text-foreground" href="#services">
              Послуги
            </a>
            <a className="transition hover:text-foreground" href="#works">
              Наші роботи
            </a>
            <a className="transition hover:text-foreground" href="#prices">
              Ціни
            </a>
            <a className="transition hover:text-foreground" href="#faq">
              Питання
            </a>
            <a className="transition hover:text-foreground" href="#contacts">
              Контакти
            </a>
          </nav>
          <a
            href={PHONE_HREF}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white transition hover:bg-accent-strong"
          >
            {PHONE}
          </a>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section id="top" className="relative overflow-hidden">
        <Image
          src={asset("/images/hero.png")}
          alt="Професійна хімчистка салону автомобіля"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-36">
          <p
            data-reveal
            className="mb-4 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-sm font-semibold text-accent"
          >
            Детейлінг-студія · стаціонарний бокс
          </p>
          <h1
            data-reveal
            style={delay(100)}
            className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl"
          >
            Професійна хімчистка{" "}
            <span className="text-accent">салону авто</span>
          </h1>
          <p data-reveal style={delay(200)} className="mt-5 max-w-xl text-lg text-muted">
            Глибока чистка сидінь, стелі, підлоги та шкіряного салону.
            Повертаємо авто вигляд «як з салону» за один день.
          </p>
          <ul className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {[
              "Оплата після виконання робіт",
              "Безпечні еко-засоби без різкого запаху",
              "Фіксовані ціни без сюрпризів",
              "Досвідчені майстри та проф. обладнання",
            ].map((item, i) => (
              <li
                key={item}
                data-reveal
                style={delay(300 + i * 80)}
                className="flex items-start gap-2 text-sm md:text-base"
              >
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
          <div data-reveal style={delay(650)} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#lead"
              className="rounded-xl bg-accent px-8 py-4 text-base font-bold text-white transition hover:bg-accent-strong"
            >
              Записатися зі знижкою 10%
            </a>
            <a
              href="#prices"
              className="rounded-xl border border-white/15 px-8 py-4 text-base font-semibold transition hover:border-accent hover:text-accent"
            >
              Дивитися ціни
            </a>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-20">
        <h2 data-reveal className="text-3xl font-extrabold md:text-4xl">
          Що ми чистимо
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Хімчистка салону",
              text: "Комплексна чистка: сидіння, стеля, підлога, дверні карти, пластик. Видалення плям, запахів та алергенів методом екстракції.",
            },
            {
              title: "Окремі елементи",
              text: "Не потрібен повний комплекс? Почистимо лише сидіння, багажник, стелю або дитяче крісло — платите тільки за потрібне.",
            },
            {
              title: "Шкіряний салон",
              text: "Делікатна чистка шкіри професійними засобами + кондиціонування. Захищаємо від пересихання та тріщин, повертаємо колір.",
            },
          ].map((s, i) => (
            <div
              key={s.title}
              data-reveal
              style={delay(i * 120)}
              className="card-lift rounded-2xl border border-white/5 bg-surface p-7 hover:border-accent/40"
            >
              <h3 className="text-xl font-bold text-accent">{s.title}</h3>
              <p className="mt-3 text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Advantages ─── */}
      <section className="border-y border-white/5 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 data-reveal className="text-3xl font-extrabold md:text-4xl">
            4 причини замовити хімчистку в нас
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                data-reveal={i % 2 === 0 ? "left" : "right"}
                style={delay((i % 2) * 120)}
                className="card-lift flex gap-5 rounded-2xl bg-surface-2 p-6"
              >
                <span className="text-3xl font-extrabold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Works ─── */}
      <section id="works" className="mx-auto max-w-6xl px-4 py-20">
        <h2 data-reveal className="text-3xl font-extrabold md:text-4xl">
          Роботи наших майстрів
        </h2>
        <p data-reveal style={delay(100)} className="mt-3 text-muted">
          Ми не просто чистимо — ми повертаємо салону вигляд нового авто
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {works.map((w, i) => (
            <figure
              key={w.src}
              data-reveal="zoom"
              style={delay((i % 2) * 120)}
              className="card-lift overflow-hidden rounded-2xl border border-white/5 bg-surface"
            >
              <div className="relative aspect-[4/3]">
                <Image src={w.src} alt={w.alt} fill className="object-cover" />
                <span className="absolute left-3 top-3 rounded-md bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  До
                </span>
                <span className="absolute right-3 top-3 rounded-md bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Після
                </span>
              </div>
              <figcaption className="p-4 text-sm font-semibold">{w.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ─── Prices ─── */}
      <section id="prices" className="border-y border-white/5 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 data-reveal className="text-3xl font-extrabold md:text-4xl">
            Вартість хімчистки авто
          </h2>
          <p data-reveal style={delay(100)} className="mt-3 text-muted">
            Остаточна ціна залежить від ступеня забруднення та узгоджується до
            початку робіт
          </p>
          <div
            data-reveal
            style={delay(200)}
            className="mt-10 overflow-hidden rounded-2xl border border-white/5"
          >
            {prices.map((p, i) => (
              <div
                key={p.service}
                className={`flex items-center justify-between gap-4 px-6 py-4 ${
                  i % 2 === 0 ? "bg-surface-2" : "bg-surface"
                }`}
              >
                <span>{p.service}</span>
                <span className="whitespace-nowrap font-bold text-accent">
                  {p.price}
                </span>
              </div>
            ))}
          </div>
          <div data-reveal style={delay(300)} className="mt-8 text-center">
            <a
              href="#lead"
              className="inline-block rounded-xl bg-accent px-8 py-4 font-bold text-white transition hover:bg-accent-strong"
            >
              Отримати точний розрахунок
            </a>
          </div>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 data-reveal className="text-3xl font-extrabold md:text-4xl">
          Як ми працюємо
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              style={delay(i * 120)}
              className="card-lift rounded-2xl border border-white/5 bg-surface p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="border-y border-white/5 bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <h2 data-reveal className="text-center text-3xl font-extrabold md:text-4xl">
            Відповіді на питання
          </h2>
          <div data-reveal style={delay(150)}>
            <Faq />
          </div>
        </div>
      </section>

      {/* ─── Lead form ─── */}
      <section id="lead" className="mx-auto max-w-6xl px-4 py-20">
        <div
          data-reveal="zoom"
          className="grid items-center gap-10 rounded-3xl border border-accent/20 bg-gradient-to-br from-surface to-surface-2 p-8 md:grid-cols-2 md:p-12"
        >
          <div data-reveal="left" style={delay(200)}>
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Отримайте <span className="text-accent">знижку 10%</span> на перше
              замовлення
            </h2>
            <p className="mt-4 text-muted">
              Залишіть заявку — менеджер передзвонить протягом 15 хвилин,
              проконсультує та підбере зручний час запису.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Безкоштовна консультація та розрахунок",
                "Запис на зручний для вас час",
                "Оплата тільки після приймання робіт",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="right" style={delay(300)}>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ─── Contacts / Footer ─── */}
      <footer id="contacts" className="border-t border-white/5 bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={asset("/images/logo.jpg")}
                alt="CleanT — Auto Cleaning & Detailing"
                width={52}
                height={52}
                className="rounded-full"
              />
              <div>
                <p className="text-lg font-extrabold">
                  Clean<span className="text-accent">T</span>
                </p>
                <p className="text-[10px] uppercase tracking-widest text-muted">
                  Auto Cleaning &amp; Detailing
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              Професійна хімчистка салону автомобіля. Стаціонарний бокс,
              професійне обладнання, безпечна хімія.
            </p>
          </div>
          <div>
            <p className="font-bold">Графік роботи</p>
            <p className="mt-3 text-sm text-muted">
              Пн–Пт: 09:00–20:00
              <br />
              Сб: 09:00–18:00
              <br />
              Нд: прийом заявок
            </p>
          </div>
          <div>
            <p className="font-bold">Контакти</p>
            <a
              href={PHONE_HREF}
              className="mt-3 block text-lg font-bold text-accent hover:underline"
            >
              {PHONE}
            </a>
            <div className="mt-4 flex gap-3">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                Telegram
              </a>
              <a
                href={VIBER_URL}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                Viber
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 py-5 text-center text-xs text-muted">
          © {new Date().getFullYear()} {BRAND}. Всі права захищено.
        </div>
      </footer>
    </main>
  );
}
