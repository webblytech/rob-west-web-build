import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "@/lib/utils";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  imageLabel,
  imageSrc,
  ctaLabel = "View Services",
  to = "/services",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  imageLabel?: string;
  imageSrc?: string;
  ctaLabel?: string;
  to?: "/services" | "/contact";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {imageLabel && imageSrc ? (
        <ImagePlaceholder
          label={imageLabel}
          imageSrc={imageSrc}
          ratio="16/9"
          className="rounded-none border-0 border-b"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <span className="flex size-11 items-center justify-center rounded-lg bg-surface text-primary">
          <Icon className="size-5.5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-navy">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <Link
          to={to}
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded text-sm font-bold text-primary transition-colors hover:text-accent"
        >
          {ctaLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
