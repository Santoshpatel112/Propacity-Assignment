"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "1948",
    title: "The Founding Era",
    desc: "Post-independence foundation built on perseverance, nation-building through enterprise, and the guiding oath of quality before profit.",
    img: "/images/counterbg1.jpg",
  },
  {
    year: "1969",
    title: "Structural Expansion",
    desc: "Scaling operations into heavy industrial operations, establishing trust as the ultimate business currency across sectors.",
    img: "/images/counterbg2.jpg",
  },
  {
    year: "1980",
    title: "Diverse Enterprises",
    desc: "Venture expansions across 7+ key operational sectors, delivering legacy value to over 100M families nationwide.",
    img: "/images/counterbg3.jpg",
  },
  {
    year: "Present",
    title: "The MUREC Collection",
    desc: "Translating decades of integrity into high-end residential collections, green certified design, and contemporary urban spaces.",
    img: "/images/banner.jpg",
  },
];

export default function LegacyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro reveals
      gsap.fromTo(
        ".legacy-intro-animate",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" }
      );

      // Timeline events scroll triggers
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item: any) => {
        const title = item.querySelector(".timeline-title");
        const desc = item.querySelector(".timeline-desc");
        const year = item.querySelector(".timeline-year");
        const imgWrap = item.querySelector(".timeline-img-wrap");

        gsap.fromTo(
          [year, title, desc],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          }
        );

        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { scale: 1.15, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "var(--color-void)", color: "var(--color-text-primary)", overflow: "hidden" }}>
      {/* Editorial Header */}
      <section className="murec-section" style={{ minHeight: "65vh", display: "flex", alignItems: "center", paddingTop: "180px" }}>
        <div className="murec-container">
          <span className="text-label legacy-intro-animate" style={{ display: "block", marginBottom: "1rem", opacity: 0 }}>
            Our Heritage
          </span>
          <h1 className="text-display-xl legacy-intro-animate" style={{ opacity: 0, marginBottom: "2rem" }}>
            The Legacy<br /><em>Beyond Compare</em>
          </h1>
          <p className="text-body-lg legacy-intro-animate" style={{ maxWidth: "600px", opacity: 0 }}>
            For over seven decades, we stood for perseverance, integrity, and nation-building through enterprise. Every step was guided by one oath: quality before profit, trust before everything.
          </p>
        </div>
      </section>

      {/* Cinematic Timeline List */}
      <section className="murec-section" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="murec-container">
          <div style={{ position: "relative" }}>
            {/* Timeline Line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "var(--color-border)", transform: "translateX(-50%)" }} className="d-none d-md-block" />

            {timelineEvents.map((event, idx) => (
              <div
                key={event.year}
                className="timeline-item grid-2col"
                style={{
                  marginBottom: "8rem",
                }}
              >
                {/* Content block */}
                <div style={{ order: idx % 2 === 0 ? 1 : 2, textAlign: idx % 2 === 0 ? "right" : "left" }}>
                  <span className="timeline-year" style={{ fontFamily: "var(--font-display)", fontSize: "4rem", color: "var(--color-gold)", display: "block", marginBottom: "0.5rem" }}>
                    {event.year}
                  </span>
                  <h3 className="timeline-title" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1rem" }}>
                    {event.title}
                  </h3>
                  <p className="timeline-desc text-body" style={{ maxWidth: "450px", marginLeft: idx % 2 === 0 ? "auto" : "0", marginRight: idx % 2 === 0 ? "0" : "auto" }}>
                    {event.desc}
                  </p>
                </div>

                {/* Media block */}
                <div className="timeline-img-wrap" style={{ order: idx % 2 === 0 ? 2 : 1, position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    style={{ objectFit: "cover" }}
                    data-cursor="view"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Group Action */}
      <section className="murec-section" style={{ background: "var(--color-charcoal)" }}>
        <div className="murec-cta">
          <span className="text-label" style={{ display: "block", marginBottom: "1rem" }}>Future Outlook</span>
          <h2 className="murec-cta__title">The Group <em>Vision</em></h2>
          <p className="murec-cta__text">
            From our foundational enterprises to contemporary urban collections, MUREC continues to shape high-rise landmarks and residential sanctuaries that stand the test of time.
          </p>
          <Link href="/about" className="murec-btn murec-btn--filled">
            About Our Group <span className="murec-btn__arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
