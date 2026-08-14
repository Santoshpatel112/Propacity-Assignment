"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const newsItems = [
  {
    id: 1,
    title: "MUREC Unveils Sustainable Luxury Living Architecture in Noida",
    date: "August 2026",
    tag: "IN THE SPOTLIGHT",
    desc: "Setting a benchmark for responsible development, MUREC integrates IGBC ecological planning with modern architectural elegance.",
    img: "/images/banner.jpg",
  },
  {
    id: 2,
    title: "Bobby Mukherrji Engaged to Conceptualize Clubhouse & Lobby Interiors",
    date: "July 2026",
    tag: "PARTNERSHIP",
    desc: "Renowned architect Bobby Mukherrji brings refined luxury and bespoke spatial identity to MUREC residential collections.",
    img: "/images/about-img.jpg",
  },
  {
    id: 3,
    title: "Goonmeet Ji Sculpting Contemporary High-Rise Landmarks for MUREC",
    date: "June 2026",
    tag: "ARCHITECTURE",
    desc: "Design Forum International crafts the iconic elevation and master planning for MUREC's contemporary high-rise environment.",
    img: "/images/counterbg1.jpg",
  },
];

export default function NewsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        ".news-intro-animate",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" }
      );

      // Stagger news cards
      gsap.fromTo(
        ".news-card-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "expo.out", delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featured = newsItems[0];
  const gridItems = newsItems.slice(1);

  return (
    <div ref={containerRef} style={{ background: "var(--color-void)", color: "var(--color-text-primary)", overflow: "hidden" }}>
      {/* Editorial Header */}
      <section className="murec-section" style={{ minHeight: "55vh", display: "flex", alignItems: "center", paddingTop: "180px" }}>
        <div className="murec-container">
          <span className="text-label news-intro-animate" style={{ display: "block", marginBottom: "1rem", opacity: 0 }}>
            Press & Media
          </span>
          <h1 className="text-display-xl news-intro-animate" style={{ opacity: 0, marginBottom: "2rem" }}>
            In The<br /><em>Spotlight</em>
          </h1>
          <p className="text-body-lg news-intro-animate" style={{ maxWidth: "600px", opacity: 0 }}>
            Discover recent press releases, construction milestones, and corporate updates from Madhusudan Urban Real Estate Collection.
          </p>
        </div>
      </section>

      {/* Featured Story Block */}
      {featured && (
        <section className="murec-section" style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="murec-container">
            <div className="news-card-reveal grid-12-1" style={{ opacity: 0 }}>
              <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  style={{ objectFit: "cover" }}
                  data-cursor="view"
                />
              </div>

              <div>
                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "1.5rem" }}>
                  <span>{featured.tag}</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>{featured.date}</span>
                </div>
                <h2 className="text-display-sm" style={{ marginBottom: "1.5rem" }}>{featured.title}</h2>
                <p className="text-body-lg" style={{ marginBottom: "2.5rem" }}>{featured.desc}</p>
                <Link href="/contact" className="murec-btn">
                  Read Press Release <span className="murec-btn__arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Media Grid */}
      <section className="murec-section">
        <div className="murec-container">
          <div className="grid-2col">
            {gridItems.map((item) => (
              <div key={item.id} className="murec-card news-card-reveal" style={{ opacity: 0 }}>
                <div className="murec-card__image" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    data-cursor="view"
                  />
                </div>
                <div className="murec-card__content">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--color-gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    <span>{item.tag}</span>
                    <span style={{ color: "var(--color-text-secondary)" }}>{item.date}</span>
                  </div>
                  <h3 className="murec-card__title" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{item.title}</h3>
                  <p className="text-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
