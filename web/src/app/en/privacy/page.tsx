import type { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/lib/books";
import { SITE_URL } from "@/lib/seo";
import { ui } from "@/data/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for polgrek.site",
  alternates: {
    canonical: `${SITE_URL}/en/privacy/`,
    languages: {
      ru: `${SITE_URL}/privacy/`,
      en: `${SITE_URL}/en/privacy/`,
    },
  },
};

export default function EnPrivacyPage() {
  const t = ui("en").privacy;
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">{t.title}</h1>
      <div className="mt-6 space-y-4 text-fg-muted">
        <p>
          We use Yandex Metrica and similar analytics to understand traffic. Cookies may be set for
          statistics. We do not sell personal data.
        </p>
        <p>
          On first visit we look up country by IP (geojs.io) to open Russian or English. CIS
          countries get Russian; others get English. The RU/EN buttons remember your choice on this
          device. Search crawlers are not redirected.
        </p>
        <p>
          Educational material about the brain and behavior. Not medical advice and not a substitute
          for a doctor or therapist.
        </p>
        <p>
          Contact:{" "}
          <a href={`mailto:${siteData.legal.email}`} className="text-accent underline">
            {siteData.legal.email}
          </a>
        </p>
      </div>
      <Link href="/en/" className="mt-8 inline-flex text-sm font-semibold text-accent hover:underline">
        {t.home}
      </Link>
    </div>
  );
}
