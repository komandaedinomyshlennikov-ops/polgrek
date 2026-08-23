import type { Metadata, Viewport } from "next";
import { Manrope, Lora } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { YandexMetrika } from "@/components/YandexMetrika";
import { defaultOg, OG_IMAGE, OG_IMAGE_ALT, SITE_URL } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lora",
  display: "swap",
});

const title = "Пол Грэк — нейробиология без эзотерики";
const description =
  "Мозг не ленится — он пытается вас защитить. Книги Пола Грэка о стрессе, памяти, сне и энергии простым языком. Главы бесплатно на сайте.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Пол Грэк",
  },
  description,
  openGraph: {
    ...defaultOg,
    title,
    description:
      "Мозг не ленится. Он пытается вас защитить. Главы бесплатно · книги на Литрес.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Главы бесплатно · книги на Литрес · без «просто возьмите себя в руки».",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL,
    languages: { ru: SITE_URL, en: `${SITE_URL}/en/`, "x-default": SITE_URL },
  },
  other: {
    "og:image:alt": OG_IMAGE_ALT,
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
  url: SITE_URL,
  image: `${SITE_URL}/images/pol-grek-portrait.webp`,
  jobTitle: "Автор научпопа о мозге",
  sameAs: [
    "https://www.litres.ru/author/pol-grek/",
    "https://www.threads.net/@pol.grek",
    "https://t.me/+KGQgs6MVHHYwZGVi",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${manrope.variable} ${lora.variable}`}>
      <body className="bg-bg font-sans text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
          <YandexMetrika />
        </ThemeProvider>
      </body>
    </html>
  );
}
