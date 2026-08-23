export type EvidenceGrade = "A" | "B" | "C" | "D";

export type LabBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "experiment"; title: string; body: string; steps?: string[] }
  | { type: "callout"; title: string; body: string }
  | { type: "grade"; letter: EvidenceGrade; note: string };

export type LabArticle = {
  slug: string;
  rubric: string;
  title: string;
  dek: string;
  minutes: number;
  grade: EvidenceGrade;
  published: string;
  status: "live" | "soon";
  bookSlug?: string;
  body: LabBlock[];
};
