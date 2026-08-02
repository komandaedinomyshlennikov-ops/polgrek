import { LAB_PROGRESS } from "@/data/lab";
import { cn } from "@/lib/cn";

const toneBar: Record<string, string> = {
  green: "bg-bio",
  amber: "bg-amber-500",
  blue: "bg-accent",
};

const toneDot: Record<string, string> = {
  green: "text-bio",
  amber: "text-amber-500",
  blue: "text-accent",
};

export function LabProgress() {
  return (
    <section id="progress" className="scroll-mt-20">
      <div className="mb-5 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          📊 Live Lab Status
        </p>
        <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
          Живой прогресс проектов
        </h2>
        <p className="mt-2 text-sm text-fg-muted">
          Не roadmap с дедлайнами. Честно: где черновик, где бета, где «в процессе» — без обещаний
          «завтра релиз».
        </p>
      </div>

      <ul className="space-y-4 rounded-2xl border border-border bg-bg-elevated p-5 sm:p-6">
        {LAB_PROGRESS.map((item) => (
          <li key={item.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-fg">
                <span className={cn("mr-1.5", toneDot[item.tone])} aria-hidden>
                  ●
                </span>
                {item.label}
              </p>
              <span className="text-xs font-medium text-fg-muted">
                {item.percent < 0 ? "в процессе" : `${item.percent}%`}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-fg-muted">{item.detail}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  toneBar[item.tone],
                  item.percent < 0 && "w-1/3 animate-pulse opacity-70"
                )}
                style={item.percent >= 0 ? { width: `${item.percent}%` } : undefined}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
