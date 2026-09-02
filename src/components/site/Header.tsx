import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-shadow",
        scrolled ? "border-border shadow-[0_1px_12px_-6px_oklch(0.23_0.045_250/0.4)]" : "border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-md"
          onClick={() => setOpen(false)}
          aria-label={`${business.name} — home`}
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-navy text-navy-foreground">
            <Wrench className="size-4.5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-[0.95rem] font-extrabold text-navy sm:text-base">
              Rob West
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Plumbing &amp; Handyman
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="rounded-md px-3.5 py-2 text-sm font-semibold text-navy/75 transition-colors hover:bg-surface hover:text-navy"
                  activeProps={{ className: "bg-surface text-navy" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="call" size="lg" className="hidden sm:inline-flex">
            <a href={business.phoneHref}>
              <Phone aria-hidden="true" />
              Call Rob — {business.phoneDisplay}
            </a>
          </Button>
          <Button
            variant="quote"
            size="icon"
            className="h-11 w-11 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3.5 text-base font-semibold text-navy border-b border-border/70"
                    activeProps={{ className: "text-primary" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild variant="call" size="xl" className="mt-5 w-full">
              <a href={business.phoneHref}>
                <Phone aria-hidden="true" />
                Call Rob — {business.phoneDisplay}
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
