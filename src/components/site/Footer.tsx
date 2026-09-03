import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";

export function Footer() {
  return (
    <footer className="bg-navy pb-24 pt-14 text-navy-foreground lg:pb-14">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-extrabold">{business.name}</p>
            <p className="mt-1 text-sm text-navy-foreground/70">{business.tagline}</p>
            <div className="mt-5 flex flex-col items-start gap-6">
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight hover:text-navy-foreground/80"
            >
              <Phone className="size-5" aria-hidden="true" />
              {business.phoneDisplay}
            </a>

            <Button asChild variant="onNavy" size="lg">
              <a href={business.phoneHref}>
                <Phone aria-hidden="true" />
                Call Rob
              </a>
            </Button>
          </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-navy-foreground/60">
              Pages
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="rounded text-navy-foreground/80 transition-colors hover:text-navy-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-navy-foreground/60">
              Details
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-navy-foreground/80">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>Service area: {business.areaPlaceholder}</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>Email: {business.emailPlaceholder}</span>
              </li>
              <li className="text-navy-foreground/60">[Add social media links if applicable]</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-navy-foreground/15 pt-6 text-xs text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>Rated {business.rating} on Google from {business.reviewCount}+ reviews.</p>
        </div>
      </div>
    </footer>
  );
}
