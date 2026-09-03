import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "@/lib/utils";

const SLIDES = Array.from({ length: 7 }, (_, index) => ({
  label: `Recent work photo ${index + 1}`,
  src: `/images/work/work-${index + 1}.jpg`,
}));

export function WorkCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

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

  useEffect(() => {
    if (!embla || !isPlaying || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const interval = window.setInterval(() => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
    }, 3000);
    return () => window.clearInterval(interval);
  }, [embla, isPlaying]);

  const pause = () => setIsPlaying(false);
  const play = () => setIsPlaying(true);

  return (
    <div onMouseEnter={pause} onMouseLeave={play} onFocus={pause} onBlur={play}>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="-ml-4 flex touch-pan-y">
          {SLIDES.map((slide, i) => (
            <li
              key={i}
              className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
            >
              <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
                <ImagePlaceholder
                  label={slide.label}
                  imageSrc={slide.src}
                  ratio="4/3"
                  className="rounded-none border-0 transition-transform duration-500 group-hover:scale-[1.02]"
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            aria-label={isPlaying ? "Pause automatic carousel" : "Play automatic carousel"}
            className="flex size-11 items-center justify-center rounded-md border border-navy/15 bg-background text-navy transition-colors hover:bg-surface"
          >
            {isPlaying ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
          </button>
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
