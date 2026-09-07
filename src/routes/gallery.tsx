import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaSection } from "@/components/site/CtaSection";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { StickyCallBar } from "@/components/site/StickyCallBar";
import { WorkCarousel } from "@/components/site/WorkCarousel";
import { Button } from "@/components/ui/button";

const TITLE = "Gallery | Rob West Plumbing And Handyman";
const DESC = "See examples of Rob West's plumbing and handyman work in Melton Mowbray.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/gallery" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="bg-navy text-navy-foreground">
          <div className="container-page py-12 lg:py-16">
            <Breadcrumbs page="Gallery" />
            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl">Work Gallery</h1>
            <p className="mt-4 max-w-xl text-navy-foreground/75">
              A selection of plumbing and handyman work completed by Rob West.
            </p>
          </div>
        </section>

        <section className="section-y">
          <div className="container-page">
            <Reveal as="div">
              <WorkCarousel />
            </Reveal>
            <div className="mt-10 flex justify-center">
              <Button asChild variant="quote" size="lg">
                <Link to="/contact">
                  Talk to Rob about your job
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <CtaSection />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
