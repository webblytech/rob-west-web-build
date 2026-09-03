import { cn } from "@/lib/utils";

type Props = {
  label: string;
  imageSrc: string;
  /** e.g. "4/3", "16/9", "3/4" */
  ratio?: string;
  className?: string;
  note?: string;
};

export function ImagePlaceholder({ label, imageSrc, ratio = "4/3", className }: Props) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-navy/10 bg-surface",
        className,
      )}
    >
      <img src={imageSrc} alt={label} loading="lazy" className="size-full object-cover" />
    </div>
  );
}
