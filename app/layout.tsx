import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { SITE_URL, asset } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CleanT професійна хімчистка авто | Auto Cleaning & Detailing",
    template: "%s | CleanT",
  },
  description:
    "CleanT професійна хімчистка салону автомобіля: сидіння, стеля, підлога, шкіряний салон. Безпечна хімія, фіксовані ціни, оплата після виконання. Запишіться онлайн!",
  keywords: [
    "хімчистка авто",
    "хімчистка салону автомобіля",
    "чистка сидінь авто",
    "догляд за шкіряним салоном",
    "детейлінг салону",
    "CleanT",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "CleanT професійна хімчистка авто",
    description:
      "Глибока хімчистка салону, окремих елементів та шкіри. Оплата після виконання.",
    url: "/",
    siteName: "CleanT",
    type: "website",
    locale: "uk_UA",
    images: [
      {
        url: "/images/hero.png",
        width: 1024,
        height: 576,
        alt: "CleanT професійна хімчистка салону автомобіля",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanT професійна хімчистка авто",
    description:
      "Глибока хімчистка салону, окремих елементів та шкіри. Оплата після виконання.",
    images: ["/images/hero.png"],
  },
  icons: {
    apple: asset("/images/logo.jpg"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MS7PCSZG');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MS7PCSZG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
