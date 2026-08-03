import { Hero } from "@/components/Hero";
import { NeuroNavigator } from "@/components/NeuroNavigator";
import { BooksShowcase } from "@/components/BooksShowcase";
import { ThreadsBlock } from "@/components/ThreadsBlock";

/**
 * Home funnel (lean):
 * Hero → Navigator → Books → Threads
 * Author lives on /about (no second portrait on home).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <NeuroNavigator />
      <BooksShowcase mode="flagships" />
      <ThreadsBlock />
    </>
  );
}
