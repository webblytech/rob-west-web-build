import { ExternalLink, MapPin } from "lucide-react";
import { business } from "@/lib/business";

export function GoogleReviewsFrame() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="relative aspect-[16/9] min-h-64 bg-surface">
        <iframe
          title={`Google Maps reviews for ${business.name}`}
          src={business.googleMapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
          allowFullScreen
        />
      </div>
      <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-surface text-primary">
            <MapPin className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="font-bold text-navy">See Rob on Google</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Read reviews and browse customer photos.
            </p>
          </div>
        </div>
        <a
          href={business.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
        >
          View photos and reviews
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
