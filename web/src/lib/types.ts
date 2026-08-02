export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  promise: string;
  tags: string[];
  authors: string[];
  coverFile: string;
  excerptFile: string;
  buyUrl: string;
  amazon: string;
  flagship: boolean;
  forWhom: string[];
  takeaways: string[];
  annotation: string;
  series: string;
};

export type SiteData = {
  links: {
    litresAuthor: string;
    amazonAuthor: string;
    threads: string;
    telegram: string;
  };
  affiliate: {
    enabled: boolean;
    template: string;
    authorSub1: string;
    bySlug: Record<string, string>;
  };
  books: Book[];
  socialProof: {
    reviews: Array<{
      author: string;
      book: string;
      slug: string;
      text: string;
      storeLabel?: string;
      rating?: number;
    }>;
    items: Array<{ book: string; rating: number; votes: number; slug: string }>;
    note?: string;
  };
  legal: {
    email: string;
    disclaimer: string;
    privacy: string;
  };
  faq: Array<{ q?: string; a?: string; question?: string; answer?: string }>;
};

export type Locale = "ru" | "en";

export type NavigatorCategory = {
  id: string;
  emoji: string;
  label: string;
  labelEn: string;
  fact: string;
  factEn: string;
  protocol: string;
  protocolEn: string;
  bookSlug: string;
};
