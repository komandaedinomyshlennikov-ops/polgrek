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
          We use Yandex Metrica (counter 110711984) for traffic stats. It may set cookies. We do
          not sell personal data. There is no email capture form on the site right now.
        </p>
        <p>
          Language: Russian stays if the browser lists a Russian-family language. English opens
          only when the browser is explicitly English (or you tap EN). The choice is remembered.
          Crawlers are not redirected.
        </p>
        <p>
          LitRes links may be affiliate (AdvCake; erid 2VfnxyNkZrY). Purchase happens on LitRes.
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
