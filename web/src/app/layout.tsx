import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polgrek.site"),
  title: {
    default: "Пол Грэк — нейробиология без эзотерики",
    template: "%s | Пол Грэк",
  },
  description:
    "Физиологические причины выгорания, тревоги и снижения фокуса. Книги Пола Грэка: главы бесплатно на сайте, полные тексты на Литрес.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Пол Грэк",
    title: "Пол Грэк — нейробиология без эзотерики",
    description:
      "Как устроен мозг и как вернуть ресурс. Главы бесплатно · книги на Литрес.",
    url: "https://polgrek.site",
  },
  twitter: {
    card: "summary_large_image",
    title: "Пол Грэк — нейробиология без эзотерики",
    description: "Главы бесплатно · книги на Литрес · без «просто соберись».",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://polgrek.site",
    languages: { ru: "https://polgrek.site", en: "https://polgrek.site/en/" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Пол Грэк",
  alternateName: "Pol Grek",
  url: "https://polgrek.site",
  jobTitle: "Автор научпопа о мозге",
  sameAs: [
    "https://www.litres.ru/author/pol-grek/",
    "https://www.threads.net/@pol.grek",
    "https://t.me/+KGQgs6MVHHYwZGVi",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${jakarta.variable} ${lora.variable}`}>
      <body className="bg-bg font-sans text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
