import { Clock } from "lucide-react";
import { business } from "@/lib/business";

export function OpeningHours({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "mt-6 flex items-start gap-3"
          : "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
      }
    >
      {!compact ? null : (
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-surface text-primary">
          <Clock className="size-4" aria-hidden="true" />
        </span>
      )}
      <div>
        <h2
          className={
            compact ? "font-bold text-navy" : "flex items-center gap-2 text-lg font-bold text-navy"
          }
        >
          {compact ? null : <Clock className="size-5 text-primary" aria-hidden="true" />}
          Opening Hours
        </h2>
        <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
          <div className="flex justify-between gap-6">
            <dt>Monday to Friday</dt>
            <dd className="font-semibold text-navy">{business.openingHours.weekdays}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt>Saturday &amp; Sunday</dt>
            <dd className="font-semibold text-navy">{business.openingHours.weekends}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
