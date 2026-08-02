import { Hero } from "@/components/Hero";
import { NeuroNavigator } from "@/components/NeuroNavigator";
import { AuthorBlock } from "@/components/AuthorBlock";
import { BooksShowcase } from "@/components/BooksShowcase";
import { ThreadsBlock } from "@/components/ThreadsBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NeuroNavigator />
      <AuthorBlock />
      <BooksShowcase mode="flagships" />
      <ThreadsBlock />
    </>
  );
}
