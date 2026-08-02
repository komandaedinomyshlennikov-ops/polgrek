import type { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/lib/books";

export const metadata: Metadata = {
  title: "Конфиденциальность",
  description: "Политика конфиденциальности polgrek.site",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Конфиденциальность</h1>
      <div className="mt-6 space-y-4 text-fg-muted">
        <p>{siteData.legal.privacy}</p>
        <p>{siteData.legal.disclaimer}</p>
        <p>
          Связь:{" "}
          <a href={`mailto:${siteData.legal.email}`} className="text-accent underline">
            {siteData.legal.email}
          </a>
        </p>
      </div>
      <Link href="/" className="mt-8 inline-flex text-sm font-semibold text-accent hover:underline">
        ← На главную
      </Link>
    </div>
  );
}
