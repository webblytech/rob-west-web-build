import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Hammer, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCallBar } from "@/components/site/StickyCallBar";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaSection } from "@/components/site/CtaSection";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { WorkCarousel } from "@/components/site/WorkCarousel";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { GoogleRating } from "@/components/site/StarRating";
import { business } from "@/lib/business";

const TITLE = "Plumbing & Handyman Services | Rob West";
const DESC =
  "Plumbing and handyman services from Rob West. Get in touch with Rob on 07884 584645 to discuss what you need.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServiceGrid({ kind }: { kind: "Plumbing" | "Handyman" }) {
  const Icon = kind === "Plumbing" ? Droplets : Hammer;
  const imageSrc =
    kind === "Plumbing" ? "/images/plumbing-service.jpg" : "/images/handyman-service.jpg";
  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Reveal as="li" key={i} delay={i * 50}>
          <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
            <ImagePlaceholder
              label={`${kind} Work`}
              imageSrc={imageSrc}
              ratio="16/9"
              className="rounded-none border-0 border-b"
            />
            <div className="flex flex-1 flex-col p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-surface text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3.5 text-base font-bold text-navy">{kind} Service</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                [Add confirmed {kind.toLowerCase()} service here] — placeholder description to be
                replaced.
              </p>
              <Link
                to="/contact"
                className="mt-4 self-start rounded text-sm font-bold text-primary hover:text-accent"
              >
                Contact Rob
              </Link>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="bg-navy text-navy-foreground">
          <div className="container-page py-12 lg:py-16">
            <Breadcrumbs page="Services" />
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] sm:text-5xl">
              Plumbing &amp; Handyman Services
            </h1>
            <p className="mt-4 max-w-xl text-navy-foreground/75">
              Get in touch with Rob to talk through your job and what you need help with.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="onNavy" size="xl">
                <a href={business.phoneHref}>
                  <Phone aria-hidden="true" />
                  Call Rob — {business.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="onNavyOutline" size="xl">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
            <GoogleRating tone="dark" className="mt-6" />
          </div>
        </section>

        <section className="section-y">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Plumbing"
                title="Plumbing Services"
                description="Placeholder — add confirmed plumbing services here."
              />
            </Reveal>
            <ServiceGrid kind="Plumbing" />
          </div>
        </section>

        <section className="bg-surface section-y">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Handyman"
                title="Handyman Services"
                description="Placeholder — add confirmed handyman services here."
              />
            </Reveal>
            <ServiceGrid kind="Handyman" />
          </div>
        </section>

        <section className="section-y">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Gallery"
                title="Recent Work"
                description="Placeholder images — real project photos will be added here."
              />
            </Reveal>
            <Reveal delay={80} className="mt-10">
              <WorkCarousel />
            </Reveal>
          </div>
        </section>

        <CtaSection
          title="Not Sure If Rob Can Help?"
          description="Get in touch and Rob will let you know."
        />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
