import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "@/lib/utils";

const SLIDES = [
  "Project Photo",
  "Plumbing Work",
  "Handyman Work",
  "Completed Job",
  "Project Photo",
  "Handyman Work",
];

export function WorkCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false, containScroll: "trimSnaps" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
  }, [embla, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="-ml-4 flex touch-pan-y">
          {SLIDES.map((label, i) => (
            <li
              key={i}
              className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
            >
              <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
                <ImagePlaceholder
                  label={label}
                  ratio="4/3"
                  className="rounded-none border-0 transition-transform duration-500 group-hover:scale-[1.02]"
                  note="Placeholder — replace with real photo"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Carousel pagination">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === selected ? "w-6 bg-primary" : "w-2 bg-navy/20 hover:bg-navy/40",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous slide"
            className="flex size-11 items-center justify-center rounded-md border border-navy/15 bg-background text-navy transition-colors hover:bg-surface disabled:opacity-40"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            aria-label="Next slide"
            className="flex size-11 items-center justify-center rounded-md border border-navy/15 bg-background text-navy transition-colors hover:bg-surface disabled:opacity-40"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
