import { Phone } from "lucide-react";
import { business } from "@/lib/business";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <a
        href={business.phoneHref}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary text-[0.95rem] font-bold text-primary-foreground shadow-[var(--shadow-card)] active:translate-y-px"
      >
        <Phone className="size-4" aria-hidden="true" />
        Call Rob — {business.phoneDisplay}
      </a>
    </div>
  );
}
