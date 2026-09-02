import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  /** e.g. "4/3", "16/9", "3/4" */
  ratio?: string;
  className?: string;
  note?: string;
};

/**
 * Polished placeholder marking where real photography should be inserted.
 * Replace with <img src={...} alt="..." loading="lazy" /> once photos are supplied.
 */
export function ImagePlaceholder({ label, ratio = "4/3", className, note }: Props) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-navy/10 bg-surface",
        "bg-[repeating-linear-gradient(135deg,transparent,transparent_14px,color-mix(in_oklab,var(--navy)_5%,transparent)_14px,color-mix(in_oklab,var(--navy)_5%,transparent)_28px)]",
        className,
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-background text-primary shadow-[var(--shadow-card)]">
          <ImageIcon className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-navy">{label}</span>
        <span className="text-xs text-muted-foreground">{note ?? "Placeholder — add photo"}</span>
      </div>
    </div>
  );
}
