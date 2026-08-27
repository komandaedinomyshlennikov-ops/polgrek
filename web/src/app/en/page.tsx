import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProblemDoors } from "@/components/ProblemDoors";
import { LabNow } from "@/components/LabNow";
import { MicroExperiment } from "@/components/MicroExperiment";
import { AuthorBlock } from "@/components/AuthorBlock";
import { HomeBooks } from "@/components/HomeBooks";
import { ThreadsBlock } from "@/components/ThreadsBlock";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pol Grek — brain science without the mysticism",
  description:
    "Popular-science books on stress, sleep, energy, and attention. Start with a chapter. Buy only if the voice lands.",
  alternates: {
    canonical: `${SITE_URL}/en/`,
    languages: { ru: `${SITE_URL}/`, en: `${SITE_URL}/en/`, "x-default": `${SITE_URL}/` },
  },
};

export default function EnHomePage() {
  return (
    <>
      <Hero locale="en" />
      <ProblemDoors
        locale="en"
        title="What’s going on with you?"
        lead="Pick a state, not a title. Then a short piece — and a chapter if the voice lands."
      />
      <LabNow locale="en" />
      <MicroExperiment locale="en" />
      <AuthorBlock locale="en" />
      <HomeBooks locale="en" />
      <ThreadsBlock locale="en" />
    </>
  );
}
