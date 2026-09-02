import { Quote } from "lucide-react";
import { Stars } from "./StarRating";

export function ReviewCard({ index }: { index: number }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="flex items-center justify-between">
        <Stars />
        <Quote className="size-5 text-primary/25" aria-hidden="true" />
      </div>
      <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-navy">
        “Verified customer review will be added here.”
      </p>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        [Add verified Google review {index}]
      </p>
    </article>
  );
}
