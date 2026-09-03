import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCallBar } from "@/components/site/StickyCallBar";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaSection } from "@/components/site/CtaSection";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { Stars } from "@/components/site/StarRating";
import { business } from "@/lib/business";

const TITLE = "About Rob | Rob West Plumbing & Handyman";
const DESC =
  "Meet Rob of Rob West Plumbing & Handyman — a local, personal plumbing and handyman service. Rated 5.0 on Google from 31+ reviews.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="bg-navy text-navy-foreground">
          <div className="container-page py-12 lg:py-16">
            <Breadcrumbs page="About" />
            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl">Meet Rob</h1>
            <p className="mt-4 max-w-xl text-navy-foreground/75">
              A local plumbing and handyman service — you deal with Rob directly from the first call
              to the finished job.
            </p>
          </div>
        </section>

        <section className="section-y">
          <div className="container-page grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal>
              <ImagePlaceholder
                label="Rob's Photo"
                imageSrc="/images/about-rob.jpg"
                ratio="3/4"
                className="shadow-[var(--shadow-lift)]"
              />
            </Reveal>
            <Reveal delay={80}>
              <SectionHeading
                eyebrow="About"
                title="About Rob West Plumbing & Handyman"
                description="Rob West Plumbing & Handyman offers plumbing and handyman assistance for local homeowners."
              />
              <div className="mt-6 space-y-4 rounded-xl border border-dashed border-navy/20 bg-surface p-6">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary">
                  Placeholder content
                </p>
                <p className="text-navy">[Add Rob's background, experience and approach here.]</p>
                <p className="text-sm text-muted-foreground">
                  [Add any further detail Rob would like included on this page.]
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="call" size="xl">
                  <a href={business.phoneHref}>
                    <Phone aria-hidden="true" />
                    Call Rob
                  </a>
                </Button>
                <Button asChild variant="quote" size="xl">
                  <Link to="/contact">Request a Quote</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface section-y">
          <div className="container-page">
            <Reveal className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
              <Stars className="justify-center" />
              <p className="mt-4 text-4xl font-extrabold text-navy">{business.rating}</p>
              <p className="mt-1 font-semibold text-navy">Google Rating</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {business.reviewCount} Google reviews
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-y">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Working with Rob"
                title="A Personal, Local Service"
                description="Working with a local tradesperson means one point of contact throughout. You speak to Rob, explain the job, and agree how to move forward — no call centres or handovers."
              />
              <p className="mt-6 text-muted-foreground">
                [Add any further detail about how Rob works with customers here.]
              </p>
            </Reveal>
            <Reveal delay={80}>
              <ImagePlaceholder
                label="Project Photo"
                imageSrc="/images/recent-work-joinery.jpg"
                ratio="4/3"
              />
            </Reveal>
          </div>
        </section>

        <CtaSection
          title="Have a Job in Mind?"
          description="Get in touch with Rob to talk it through."
        />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
