import { Hero } from "@/components/Hero";
import { Recognize } from "@/components/Recognize";
import { NeuroNavigator } from "@/components/NeuroNavigator";
import { AuthorBlock } from "@/components/AuthorBlock";
import { HomeBooks } from "@/components/HomeBooks";
import { Philosophy } from "@/components/Philosophy";
import { LabTeaser } from "@/components/LabTeaser";
import { ThreadsBlock } from "@/components/ThreadsBlock";
import { HomeCta } from "@/components/HomeCta";

/**
 * Home: recognition → why → book as a tool.
 * Hero is ~100vh. Books appear only after the first scroll.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Recognize />
      <NeuroNavigator />
      <AuthorBlock />
      <HomeBooks />
      <Philosophy />
      <LabTeaser />
      <ThreadsBlock />
      <HomeCta />
    </>
  );
}
