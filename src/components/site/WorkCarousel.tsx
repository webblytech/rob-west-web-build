import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    label: "Before photo 1",
    src: "/images/work/01-before-1.png",
    badge: "Before",
    description: "The original space before the plumbing and finishing work began.",
  },
  {
    label: "After photo 1",
    src: "/images/work/02-after-1.png",
    badge: "After",
    description: "The completed plumbing and finishing work, ready for everyday use.",
  },
  {
    label: "Before photo 2",
    src: "/images/work/03-before-2.png",
    badge: "Before",
    description: "The original condition before the repair and improvement work.",
  },
  {
    label: "After photo 2",
    src: "/images/work/04-after-2.png",
    badge: "After",
    description: "The finished result after the repair and improvement work was completed.",
  },
  {
    label: "Bathroom basin installation",
    src: "/images/work/05-work-7.png",
    badge: null,
    description: "Bathroom refresh with a new basin, tap, wall panelling and finishing details.",
  },
  {
    label: "Bedroom timber divider",
    src: "/images/work/06-work-8.png",
    badge: null,
    description: "Built and finished a timber room divider and doorway feature in a bedroom.",
  },
  {
    label: "Tiled bathroom finish",
    src: "/images/work/07-work-9.png",
    badge: null,
    description: "Bathroom installation with tiled walls, a new basin, tap and wall-hung WC.",
  },
  {
    label: "Exterior porch repairs",
    src: "/images/work/08-work-10.png",
    badge: null,
    description: "Repaired and refreshed the exterior porch timber and entrance details.",
  },
  {
    label: "Before photo 3",
    src: "/images/work/09-before-3.png",
    badge: "Before",
    description: "The original space before the plumbing and finishing work began.",
  },
  {
    label: "After photo 3",
    src: "/images/work/10-after-3.png",
    badge: "After",
    description: "The completed result after the plumbing and finishing work.",
  },
];

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
              <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
                {slide.badge && (
                  <span className="absolute left-4 top-4 z-10 -rotate-3 rounded-sm bg-accent px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground shadow-md">
                    {slide.badge}
                  </span>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="relative block w-full cursor-zoom-in text-left"
                      aria-label={`Expand ${slide.label}`}
                    >
                      <ImagePlaceholder
                        label={slide.label}
                        imageSrc={slide.src}
                        ratio="4/3"
                        className="rounded-none border-0 transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span
                        title="Expand image"
                        className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-md bg-navy/85 text-navy-foreground shadow-md"
                      >
                        <Maximize2 className="size-4" aria-hidden="true" />
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{slide.label}</DialogTitle>
                      <DialogDescription>{slide.description}</DialogDescription>
                    </DialogHeader>
                    <img
                      src={slide.src}
                      alt={slide.label}
                      className="max-h-[70vh] w-full rounded-md object-contain"
                    />
                  </DialogContent>
                </Dialog>
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
