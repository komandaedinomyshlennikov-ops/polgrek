import type { Metadata } from "next";
import Link from "next/link";
import { NeuroCheckup } from "@/components/lab/NeuroCheckup";
import { LabBeta } from "@/components/lab/LabBeta";
import { LabPrompts } from "@/components/lab/LabPrompts";
import { SITE_URL } from "@/lib/seo";
import { ui } from "@/data/ui";

const t = ui("en").lab;

export const metadata: Metadata = {
  title: t.title,
  description: t.metaDesc,
  alternates: {
    canonical: `${SITE_URL}/en/lab/`,
    languages: {
      ru: `${SITE_URL}/lab/`,
      en: `${SITE_URL}/en/lab/`,
      "x-default": `${SITE_URL}/lab/`,
    },
  },
  openGraph: {
    locale: "en_US",
    title: t.ogTitle,
    description: t.ogDesc,
    url: `${SITE_URL}/en/lab/`,
  },
};

const JUMP = [
  { href: "#checkup", label: t.jump.checkup },
  { href: "#beta", label: t.jump.beta },
  { href: "#prompts", label: t.jump.prompts },
];

export default function EnLabPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-border bg-gradient-to-b from-accent-soft/30 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <span className="inline-flex items-center rounded-full border border-bio/30 bg-bio-soft px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-bio uppercase">
            {t.badge}
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {t.lead}
          </p>

          <nav
            className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Lab sections"
          >
            {JUMP.map((j) => (
              <a
                key={j.href}
                href={j.href}
                className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-border bg-bg-elevated px-3.5 text-sm font-medium text-fg-muted transition hover:border-accent/40 hover:text-fg"
              >
                {j.label}
              </a>
            ))}
            <Link
              href="/en/books/"
              className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-border bg-bg-elevated px-3.5 text-sm font-medium text-fg-muted transition hover:border-accent/40 hover:text-fg"
            >
              {t.jump.books}
            </Link>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <NeuroCheckup locale="en" />
        <LabBeta locale="en" />
        <LabPrompts locale="en" />
      </div>
    </div>
  );
}
