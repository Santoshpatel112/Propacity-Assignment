"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Zone A uses counterbg3.jpg (lush forest), Zone B uses dp1.jpg (water/landscape), Zone C uses about-forest.webp */
const zones = [
  {
    letter: "A",
    title: "The Hidden Forest",
    desc: "A lush preservation sanctuary designed around ancient local trees, shaded pathways, and quiet forest clearings meant for deep contemplation and natural cooling.",
    img: "/images/counterbg3.jpg",
    color: "rgba(45, 59, 42, 0.6)",
  },
  {
    letter: "B",
    title: "The Water Miracle",
    desc: "An active ecological zone utilizing rainwater channels, cascading pools, and moisture-retaining plant life to elevate local microclimatic conditions.",
    img: "/images/dp1.jpg",
    color: "rgba(30, 50, 70, 0.6)",
  },
  {
    letter: "C",
    title: "The Street Forest",
    desc: "A canopy-covered arterial corridor bringing nature directly to your doorstep, filtering incoming air and dampening external urban sounds.",
    img: "/images/about-forest.webp",
    color: "rgba(40, 55, 38, 0.6)",
  },
];

const cards = [
  {
    img: "/images/villa.jpg",
    text: "Only 97 exclusive villas with private lawns",
  },
  {
    img: "/images/hiway.jpg",
    text: "Direct access from NH-24 & Eastern Peripheral Expressway",
  },
  {
    img: "/images/temple.jpg",
    text: "30 minutes from Akshardham",
  },
];

function AnimatedArrow({ direction = "right" }: { direction?: "right" | "down" }) {
  const isDown = direction === "down";
  return (
    <span className="anim-arrow" aria-hidden="true">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        style={{ transform: isDown ? "rotate(90deg)" : "none" }}
      >
        <path d="M2 9H16M16 9L10 3M16 9L10 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ForestWalkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const zonesRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero elements fade-in
      gsap.fromTo(
        ".forest-hero__reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.18, duration: 1.4, ease: "expo.out" }
      );

      // Parallax on hero
      gsap.to(".forest-hero__bg", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // About section
      gsap.fromTo(
        ".forest-about__reveal",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: aboutRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".forest-about__img-wrap",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.out",
          scrollTrigger: { trigger: aboutRef.current, start: "top 72%" },
        }
      );

      gsap.fromTo(
        ".forest-about__img-inner",
        { scale: 1.15 },
        {
          scale: 1, duration: 2, ease: "expo.out",
          scrollTrigger: { trigger: aboutRef.current, start: "top 72%" },
        }
      );

      // Zone cards — staggered reveal with image scale
      const zoneCards = gsap.utils.toArray(".zone-story-card") as HTMLElement[];
      zoneCards.forEach((card, i) => {
        const img = card.querySelector(".zone-story-card__img-inner");
        const content = card.querySelector(".zone-story-card__content");

        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)", opacity: 1,
            duration: 1.2, ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
            delay: i * 0.1,
          }
        );

        if (img) {
          gsap.fromTo(img, { scale: 1.15 }, {
            scale: 1, duration: 1.8, ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 82%" },
          });
        }

        if (content) {
          gsap.fromTo(content, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 70%" },
          });
        }

        // Parallax on each zone card image
        gsap.to(img, {
          y: "12%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Residences cards reveal
      gsap.fromTo(
        ".residence-card-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: collectionRef.current, start: "top 75%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "var(--color-void)", color: "var(--color-text-primary)", overflow: "hidden" }}>
      {/* 🎬 Fullscreen Cinematic Video Hero */}
      <div ref={heroRef} className="page-hero" style={{ height: "100vh", display: "flex", alignItems: "flex-end" }}>
        <div className="page-hero__bg forest-hero__bg" style={{ position: "absolute", inset: 0 }}>
          <video
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
            poster="/images/banner.jpg"
            aria-hidden="true"
          >
            <source src="/images/Vid2.mp4" type="video/mp4" />
          </video>
          <Image
            src="/images/banner.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", opacity: 0.4 }}
            aria-hidden="true"
          />
          <div className="page-hero__overlay" style={{ background: "linear-gradient(to top, var(--color-void) 0%, rgba(8,8,10,0.5) 55%, rgba(8,8,10,0.15) 100%)" }} />
        </div>

        <div className="page-hero__content" style={{ zIndex: 10 }}>
          <span className="text-label forest-hero__reveal" style={{ display: "inline-block", opacity: 0, marginBottom: "1rem" }}>
            The MUREC Collection
          </span>
          <h1 className="text-display-xl forest-hero__reveal" style={{ opacity: 0, marginBottom: "2rem" }}>
            Forest Walk<br /><em>Dasna, Ghaziabad</em>
          </h1>
          <div className="forest-hero__reveal" style={{ opacity: 0 }}>
            <Link href="#masterplan" className="murec-btn murec-btn--filled">
              Explore Masterplan <AnimatedArrow direction="down" />
            </Link>
          </div>
        </div>
      </div>

      {/* 🎥 Quote Section */}
      <div className="murec-section" style={{ background: "var(--color-charcoal)", padding: "var(--space-2xl) 0" }}>
        <div className="murec-container murec-container--narrow" style={{ textAlign: "center" }}>
          <p className="text-display-sm" style={{ fontStyle: "italic", fontWeight: 300, lineHeight: 1.5, color: "var(--color-cream)" }}>
            &ldquo;Not just a home, but a way of being. Where the forest greets you daily, and stillness waits at your door. Where paths curve gently toward peace, and mornings begin in birdsong, not bustle.&rdquo;
          </p>
          <p className="text-label" style={{ marginTop: "2rem", color: "var(--color-gold)" }}>
            NH-24 &amp; Eastern Peripheral Expressway, NCR
          </p>
        </div>
      </div>

      {/* 🌲 About Forest Walk */}
      <section ref={aboutRef} className="murec-section" style={{ background: "var(--color-void)" }}>
        <div className="murec-container">
          <div className="grid-1-12">
            <div>
              <span className="text-label forest-about__reveal" style={{ display: "block", marginBottom: "1.25rem", opacity: 0 }}>
                Introducing
              </span>
              <h2 className="text-display-md forest-about__reveal" style={{ opacity: 0, marginBottom: "1.5rem" }}>
                A Sanctuary<br /><em>Shaped by Landscape</em>
              </h2>
              <div className="forest-about__reveal" style={{ width: "50px", height: "1px", background: "var(--color-gold)", margin: "1.5rem 0", opacity: 0 }} />
              <p className="text-body-lg forest-about__reveal" style={{ opacity: 0, marginBottom: "1.5rem" }}>
                Forest Walk is a premium gated villa community envisioned as a living forest ecosystem, not just a plotted development. Designed around natural mounds, cascading water features, shaded trails, and immersive green corridors.
              </p>
              <p className="text-body forest-about__reveal" style={{ opacity: 0, marginBottom: "2.5rem" }}>
                Set right on NH-24 at the Eastern Peripheral Expressway, the project ensures seamless access from Delhi while preserving the stillness of a forest retreat. With only 97 exclusive villas on independent plots, Forest Walk blends privacy, sustainability, and refined design into one cohesive living experience.
              </p>
              <div className="forest-about__reveal" style={{ opacity: 0 }}>
                <Link href="/contact" className="murec-btn">
                  Enquire Now <AnimatedArrow />
                </Link>
              </div>
            </div>

            <div
              className="forest-about__img-wrap"
              style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", clipPath: "inset(100% 0 0 0)" }}
            >
              <div className="forest-about__img-inner" style={{ width: "100%", height: "100%", transform: "scale(1.15)" }}>
                <Image
                  src="/images/about-forest.webp"
                  alt="MUREC Forest Walk — A living forest sanctuary"
                  fill
                  style={{ objectFit: "cover" }}
                  data-cursor="view"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🗺️ Masterplan Zones — Cinematic Storytelling */}
      <section id="masterplan" ref={zonesRef} className="murec-section" style={{ background: "var(--color-void)", paddingBottom: 0 }}>
        <div className="murec-container">
          <div style={{ marginBottom: "var(--space-2xl)", textAlign: "center" }}>
            <span className="text-label">Landscape Architecture</span>
            <h2 className="text-display-md" style={{ marginTop: "0.75rem" }}>
              Masterplan <em>Zones</em>
            </h2>
            <p className="text-body-lg" style={{ maxWidth: "540px", margin: "1.5rem auto 0", color: "var(--color-text-secondary)" }}>
              Three distinct ecological zones, each with its own character — woven together as one living, breathing landscape.
            </p>
          </div>
        </div>

        {/* Full-bleed zone storytelling cards */}
        <div className="zone-story-grid">
          {zones.map((zone, i) => (
            <div
              key={zone.letter}
              className="zone-story-card"
              style={{ clipPath: "inset(100% 0 0 0)", opacity: 0, position: "relative", overflow: "hidden", minHeight: "80vh" }}
            >
              {/* Background Image */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <div className="zone-story-card__img-inner" style={{ width: "100%", height: "100%", transform: "scale(1.15)" }}>
                  <Image
                    src={zone.img}
                    alt={`Zone ${zone.letter} — ${zone.title}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(8,8,10,0.92) 0%, rgba(8,8,10,0.6) 55%, ${zone.color} 100%)` }} />
              </div>

              {/* Content */}
              <div
                className="zone-story-card__content murec-container"
                style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", minHeight: "80vh", opacity: 0 }}
              >
                <div style={{ maxWidth: "560px", padding: "var(--space-2xl) 0" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "2rem" }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(5rem, 12vw, 10rem)",
                      fontWeight: 300,
                      lineHeight: 1,
                      color: "rgba(196, 162, 101, 0.2)",
                    }}>
                      {zone.letter}
                    </span>
                    <span className="text-label" style={{ color: "var(--color-gold)" }}>Zone {zone.letter}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    marginBottom: "1.5rem",
                    color: "var(--color-cream)",
                    letterSpacing: "-0.02em",
                  }}>
                    {zone.title}
                  </h3>
                  <div style={{ width: "50px", height: "1px", background: "var(--color-gold)", marginBottom: "1.5rem", opacity: 0.6 }} />
                  <p className="text-body-lg" style={{ color: "rgba(240,235,224,0.85)" }}>
                    {zone.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏘️ Residences Grid Section */}
      <section ref={collectionRef} className="murec-section" style={{ background: "var(--color-charcoal)" }}>
        <div className="murec-container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
            <span className="text-label">Scale &amp; Privacy</span>
            <h2 className="text-display-md" style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
              Limited Residences. <em>Infinite Privacy.</em>
            </h2>
            <p className="text-body" style={{ maxWidth: "540px", margin: "0 auto" }}>
              Designed at an intentional scale, Forest Walk offers rare breathing room in a world of excess density.
            </p>
          </div>

          <div className="grid-3col">
            {cards.map((card, i) => (
              <div key={i} className="murec-card residence-card-reveal" style={{ opacity: 0 }}>
                <div className="murec-card__image">
                  <Image
                    src={card.img}
                    alt={card.text}
                    fill
                    style={{ objectFit: "cover" }}
                    data-cursor="view"
                  />
                </div>
                <div className="murec-card__content">
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, color: "var(--color-cream)", lineHeight: 1.4 }}>
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "4rem", textAlign: "center" }}>
            <Link href="/contact" className="murec-btn murec-btn--filled">
              Register Interest <AnimatedArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
