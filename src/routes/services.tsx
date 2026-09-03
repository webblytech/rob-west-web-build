import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Hammer, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCallBar } from "@/components/site/StickyCallBar";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaSection } from "@/components/site/CtaSection";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { GoogleReviewsFrame } from "@/components/site/GoogleReviewsFrame";
import { WorkCarousel } from "@/components/site/WorkCarousel";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { GoogleRating } from "@/components/site/StarRating";
import { business } from "@/lib/business";

const TITLE = "Plumbing & Handyman Services | Rob West";
const DESC =
  "Plumbing and handyman services from Rob West. Get in touch with Rob on 07884 584645 to discuss what you need.";

const PLUMBING_SUMMARY =
  "Leak detection and repair, pipe, tap, shower, toilet and water-tank installation and repair, water-heater installation, drain and sewer cleaning and repair, and outdoor plumbing-system repair.";

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

const SERVICE_GROUPS = {
  Plumbing: [
    {
      title: "Leaks & Pipe Repairs",
      description: "Leak detection and repair, including plumbing pipe repair.",
      imageSrc: "/images/work/work-1.jpg",
    },
    {
      title: "Bathroom & Water Systems",
      description:
        "Shower, tap and toilet installation and repair, plus water-heater and water-tank installation and repair.",
      imageSrc: "/images/work/work-2.jpg",
    },
    {
      title: "Drains, Sewers & Outdoor Plumbing",
      description: "Drain and sewer cleaning and repair, alongside outdoor plumbing-system repair.",
      imageSrc: "/images/work/work-3.jpg",
    },
  ],
  Handyman: [
    {
      title: "Bathroom Fixture Help",
      description: "Practical help with tap, shower and toilet installation or repair.",
      imageSrc: "/images/work/work-4.jpg",
    },
    {
      title: "Water & Pipe Repairs",
      description: "Help with pipe and water-tank repairs as part of wider home maintenance.",
      imageSrc: "/images/work/work-5.jpg",
    },
    {
      title: "Home & Outdoor Repairs",
      description:
        "General home repair help, including drain, sewer and outdoor plumbing-system work. Get in touch to discuss the job.",
      imageSrc: "/images/work/work-6.jpg",
    },
  ],
} as const;

function ServiceGrid({ kind }: { kind: "Plumbing" | "Handyman" }) {
  const Icon = kind === "Plumbing" ? Droplets : Hammer;
  return (
    <ul className="mt-8 grid gap-5 md:grid-cols-3">
      {SERVICE_GROUPS[kind].map((service, i) => (
        <Reveal as="li" key={service.title} delay={i * 50}>
          <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
            <ImagePlaceholder
              label={`${service.title} work`}
              imageSrc={service.imageSrc}
              ratio="16/9"
              className="rounded-none border-0 border-b"
            />
            <div className="flex flex-1 flex-col p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-surface text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3.5 text-base font-bold text-navy">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.description}</p>
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
                description={PLUMBING_SUMMARY}
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
                description="Practical home repairs including tap, shower and toilet work, pipe and water-tank repairs, drain and sewer cleaning, and other jobs around the home. Get in touch to discuss the work you need carried out."
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
                description="A selection of Rob's recent work. Photos will be added here as projects are completed."
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
