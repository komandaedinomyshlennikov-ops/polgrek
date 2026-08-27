import { Hero } from "@/components/Hero";
import { ProblemDoors } from "@/components/ProblemDoors";
import { LabNow } from "@/components/LabNow";
import { MicroExperiment } from "@/components/MicroExperiment";
import { AuthorBlock } from "@/components/AuthorBlock";
import { HomeBooks } from "@/components/HomeBooks";
import { ThreadsBlock } from "@/components/ThreadsBlock";

/**
 * Home: recognition → problem door → lab / chapter → book.
 * Hero is ~100vh. Books after the first scroll.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemDoors />
      <LabNow />
      <MicroExperiment />
      <AuthorBlock />
      <HomeBooks />
      <ThreadsBlock />
    </>
  );
}
