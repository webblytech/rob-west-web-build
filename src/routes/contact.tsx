import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCallBar } from "@/components/site/StickyCallBar";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { GoogleRating } from "@/components/site/StarRating";
import { OpeningHours } from "@/components/site/OpeningHours";
import { business } from "@/lib/business";

const TITLE = "Contact Rob West Plumbing And Handyman";
const DESC = "Call or email Rob about your plumbing or handyman job.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="bg-navy text-navy-foreground">
          <div className="container-page py-12 lg:py-16">
            <Breadcrumbs page="Contact" />
            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl">
              Let's Talk About Your Job
            </h1>
            <p className="mt-4 max-w-xl text-navy-foreground/75">
              Call Rob directly or email him about your plumbing or handyman job.
            </p>
            <a
              href={business.phoneHref}
              className="mt-7 inline-block text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              {business.phoneDisplay}
            </a>
            <div className="mt-6">
              <Button asChild variant="onNavy" size="xl">
                <a href={business.phoneHref}>
                  <Phone aria-hidden="true" />
                  Call Rob
                </a>
              </Button>
            </div>
            <a
              href={`mailto:${business.email}`}
              className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-navy-foreground underline decoration-navy-foreground/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              <Mail className="size-4" aria-hidden="true" />
              {business.email}
            </a>
            <GoogleRating tone="dark" className="mt-6" />
          </div>
        </section>

        <section className="section-y">
          <div className="container-page">
            <Reveal as="div" className="mx-auto max-w-2xl space-y-3">
              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h2 className="text-lg font-bold text-navy">Call Rob</h2>
                <a
                  href={business.phoneHref}
                  className="mt-2 inline-flex items-center gap-2 text-2xl font-extrabold text-navy hover:text-primary"
                >
                  <Phone className="size-5 text-primary" aria-hidden="true" />
                  {business.phoneDisplay}
                </a>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
                  <MapPin className="size-5 text-primary" aria-hidden="true" />
                  Business Address
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{business.address}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
                  <Mail className="size-5 text-primary" aria-hidden="true" />
                  Email
                </h2>
                <a
                  href={`mailto:${business.email}`}
                  className="mt-2 inline-block text-sm text-muted-foreground hover:text-primary"
                >
                  {business.email}
                </a>
              </div>
              <OpeningHours />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
