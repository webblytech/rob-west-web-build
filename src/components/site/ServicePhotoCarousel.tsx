import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Paintbrush } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ImagePlaceholder } from "./ImagePlaceholder";

const PAINTING_PHOTOS = [
  { src: "/images/painting.png", label: "Painting work" },
  { src: "/images/painting2.png", label: "Painting work detail" },
  { src: "/images/painting3.png", label: "Painting work finish" },
];

export function ServicePhotoCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <article className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {PAINTING_PHOTOS.map((photo) => (
            <div key={photo.src} className="min-w-0 flex-[0_0_100%]">
              <ImagePlaceholder
                label={photo.label}
                imageSrc={photo.src}
                ratio="16/9"
                className="rounded-none border-0 border-b"
                imageClassName="object-contain bg-white"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <span className="flex size-10 items-center justify-center rounded-lg bg-surface text-primary">
            <Paintbrush className="size-5" aria-hidden="true" />
          </span>
          <h3 className="mt-3.5 text-xl font-bold text-navy">Painting Services</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Interior painting and finishing work to refresh and improve your home.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-block rounded text-sm font-bold text-primary hover:text-accent"
          >
            Contact Rob
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous painting photo"
            className="flex size-10 items-center justify-center rounded-md border border-navy/15 bg-background text-navy hover:bg-surface"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            aria-label="Next painting photo"
            className="flex size-10 items-center justify-center rounded-md border border-navy/15 bg-background text-navy hover:bg-surface"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-2 pb-5" role="tablist" aria-label="Painting photos">
        {PAINTING_PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            role="tab"
            aria-selected={i === selected}
            aria-label={`Go to painting photo ${i + 1}`}
            onClick={() => embla?.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${i === selected ? "w-6 bg-primary" : "w-2 bg-navy/20"}`}
          />
        ))}
      </div>
    </article>
  );
}
