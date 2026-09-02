import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";

export function CtaSection({
  title = "Need a Hand With a Job?",
  description = "Get in touch with Rob to discuss your plumbing or handyman requirements.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="container-page section-y">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-[1.1] sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75">{description}</p>
          <a
            href={business.phoneHref}
            className="mt-8 inline-block text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {business.phoneDisplay}
          </a>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="onNavy" size="xl">
              <a href={business.phoneHref}>
                <Phone aria-hidden="true" />
                Call Rob
              </a>
            </Button>
            <Button asChild variant="onNavyOutline" size="xl">
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
