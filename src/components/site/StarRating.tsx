import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { business } from "@/lib/business";

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-star", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

export function GoogleRating({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
        tone === "dark" ? "text-navy-foreground/80" : "text-muted-foreground",
        className,
      )}
    >
      <Stars />
      <span className={cn("font-bold", tone === "dark" ? "text-navy-foreground" : "text-navy")}>
        {business.rating}
      </span>
      <span>Google rating</span>
      <span aria-hidden="true" className="opacity-40">
        •
      </span>
      <span>{business.reviewCount}+ reviews</span>
    </p>
  );
}
