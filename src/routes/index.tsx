import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Droplets,
  Hammer,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCallBar } from "@/components/site/StickyCallBar";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ReviewCard } from "@/components/site/ReviewCard";
import { CtaSection } from "@/components/site/CtaSection";
import { ImagePlaceholder } from "@/images/Rob-plumbing-hero.jpeg";
import { WorkCarousel } from "@/components/site/WorkCarousel";
import { Reveal } from "@/components/site/Reveal";
import { GoogleRating, Stars } from "@/components/site/StarRating";
import { business } from "@/lib/business";

const TITLE = "Rob West Plumbing & Handyman | Plumbing & Handyman Services";
const DESC =
  "Rob West Plumbing & Handyman provides plumbing and handyman help. Rated 5.0 on Google from 31+ reviews. Call Rob on 07884 584645.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: business.name,
          description: "Plumbing and handyman services.",
          telephone: "+447884584645",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: 31,
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

const TRUST = [
  { icon: Star, title: "5.0 ★ Google Rating", note: `${business.reviewCount}+ reviews` },
  { icon: MapPin, title: "Local Service", note: business.areaPlaceholder },
  { icon: ShieldCheck, title: "Placeholder Trust Signal", note: "[Replace or remove]" },
  { icon: Wrench, title: "Placeholder Accreditation", note: "[Replace or remove]" },
];

const STEPS = [
  { n: "01", title: "Get in Touch", body: "Call Rob or send an enquiry." },
  { n: "02", title: "Discuss the Job", body: "Explain what you need help with." },
  { n: "03", title: "Arrange the Work", body: "Discuss the next steps with Rob." },
];

const BENEFITS = [
  { icon: MessageSquare, title: "Clear communication", body: "You'll know what's happening and what comes next." },
  { icon: Phone, title: "Easy to get in touch", body: "Call Rob directly or send a short enquiry." },
  { icon: Wrench, title: "Professional approach", body: "A tidy, considered approach to every job." },
  { icon: MapPin, title: "Local, personal service", body: "You deal with Rob — not a call centre." },
];

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border bg-background">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-surface lg:block" />
          <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                <Wrench className="size-3.5" aria-hidden="true" />
                Plumbing &amp; Handyman
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-[3.4rem]">
                Reliable Plumbing &amp; Handyman Services
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Need a hand with a plumbing or handyman job? Get in touch with Rob to discuss what
                you need.
              </p>

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

              <a
                href={business.phoneHref}
                className="mt-6 inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-navy hover:text-primary"
              >
                <Phone className="size-5 text-primary" aria-hidden="true" />
                {business.phoneDisplay}
              </a>

              <div className="mt-6 border-t border-border pt-5">
                <GoogleRating />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:pl-4">
              <ImagePlaceholder
                label="Main Hero Image"
                ratio="4/3"
                note="Placeholder — add a photo of Rob at work"
                className="shadow-[var(--shadow-lift)]"
              />
            </Reveal>
          </div>
        </section>

        {/* TRUST BAR */}
        <section aria-label="Trust signals" className="border-b border-border bg-surface">
          <div className="container-page grid grid-cols-2 gap-px overflow-hidden py-6 lg:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.title} className="flex items-start gap-3 px-2 py-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-primary shadow-[var(--shadow-card)]">
                  <t.icon className="size-4.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-navy">{t.title}</span>
                  <span className="block text-xs text-muted-foreground">{t.note}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="section-y">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Services"
                title="How Can Rob Help?"
                description="Two main areas of work. Specific services will be listed here once confirmed."
              />
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Reveal delay={60}>
                <ServiceCard
                  icon={Droplets}
                  title="Plumbing Services"
                  description="Placeholder — add confirmed plumbing services here."
                  imageLabel="Plumbing Work"
                />
              </Reveal>
              <Reveal delay={120}>
                <ServiceCard
                  icon={Hammer}
                  title="Handyman Services"
                  description="Placeholder — add confirmed handyman services here."
                  imageLabel="Handyman Work"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE ROB */}
        <section className="bg-surface section-y">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <ImagePlaceholder
                label="About Section Photo"
                ratio="3/4"
                note="Placeholder — add a photo of Rob or recent work"
                className="mx-auto max-w-sm shadow-[var(--shadow-card)] lg:max-w-md"
              />
            </Reveal>
            <Reveal delay={80}>
              <SectionHeading
                eyebrow="Why choose Rob"
                title="A Straightforward Service, From Start to Finish"
                description="A local, personal service — easy to arrange and easy to deal with."
              />
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-primary shadow-[var(--shadow-card)]">
                      <b.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-bold text-navy">{b.title}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{b.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-y">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="How it works" title="Three Simple Steps" align="center" />
            </Reveal>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.n} delay={i * 70}>
                  <div className="h-full rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
                    <span className="text-sm font-extrabold tracking-[0.14em] text-primary">
                      {s.n}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-navy">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="bg-surface section-y">
          <div className="container-page">
            <Reveal className="text-center">
              <Stars className="justify-center" />
              <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
                Rated 5.0 Stars on Google
              </h2>
              <p className="mt-3 text-muted-foreground">
                <span className="font-bold text-navy">5.0</span> — {business.reviewCount} Google
                reviews
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Reveal key={i} delay={i * 70}>
                  <ReviewCard index={i} />
                </Reveal>
              ))}
            </div>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="call" size="lg">
                <a href={business.phoneHref}>
                  <Phone aria-hidden="true" />
                  Call Rob
                </a>
              </Button>
              <Button asChild variant="quote" size="lg">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* RECENT WORK */}
        <section className="section-y">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Gallery"
                title="Recent Work"
                description="Take a look at some recent work. The images below are placeholders — real project photos will be added here."
              />
            </Reveal>
            <Reveal delay={80} className="mt-10">
              <WorkCarousel />
            </Reveal>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
