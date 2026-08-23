import type { LabArticle, LabBlock } from "@/data/lab-articles";
import { GRADE_META } from "./lab-grade";

function BlockView({ block }: { block: LabBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-pretty">{block.text}</p>;
    case "h2":
      return (
        <h2
          id={block.id}
          className="font-display scroll-mt-24 pt-6 text-[1.35rem] font-semibold tracking-tight text-fg sm:text-[1.5rem]"
        >
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="my-1 list-disc space-y-2 pl-5 marker:text-accent">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-1 list-decimal space-y-3 pl-5 marker:font-semibold marker:text-accent">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-accent/50 pl-4 font-display text-lg font-medium leading-snug text-fg sm:text-xl">
          {block.text}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="rounded-2xl border border-border bg-surface/70 p-5">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {block.title}
          </p>
          <p className="mt-2 text-fg">{block.body}</p>
        </aside>
      );
    case "experiment":
      return (
        <aside className="rounded-2xl border border-bio/30 bg-bio-soft/40 p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-bio uppercase">
            Эксперимент
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold text-fg">{block.title}</h3>
          <p className="mt-2">{block.body}</p>
          {block.steps && (
            <ol className="mt-4 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-bio">
              {block.steps.map((step) => (
                <li key={step} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          )}
        </aside>
      );
    case "grade": {
      const meta = GRADE_META[block.letter];
      return (
        <aside className="rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Сила доказательств
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-fg">
            {block.letter}
            <span className="ml-2 text-base font-medium text-fg-muted">{meta.title}</span>
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{block.note}</p>
        </aside>
      );
    }
    default:
      return null;
  }
}

export function LabArticleBody({ article }: { article: LabArticle }) {
  return (
    <div className="font-reader space-y-5 text-[1.05rem] leading-[1.75] text-fg sm:text-[1.125rem]">
      {article.body.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}
