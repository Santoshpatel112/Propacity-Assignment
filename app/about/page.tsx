"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "78", plus: "+", label: "Years of Legacy", img: "/images/counterbg1.jpg" },
  { num: "100", plus: "M+", label: "Family Impacted", img: "/images/counterbg2.jpg" },
  { num: "7", plus: "+", label: "Sectors of Operation", img: "/images/counterbg3.jpg" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in title elements
      gsap.fromTo(
        ".about-intro-animate",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" }
      );

      // Stagger stats card reveals
      gsap.fromTo(
        ".about-stat-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".about-stats-row",
            start: "top 80%",
          },
        }
      );

      // Mission block reveal
      gsap.fromTo(
        ".about-mission-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".about-mission-section",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".about-mission-img",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".about-mission-section",
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "var(--color-void)", color: "var(--color-text-primary)", overflow: "hidden" }}>
      {/* Page Title / Eyebrow */}
      <section className="murec-section" style={{ minHeight: "65vh", display: "flex", alignItems: "center", paddingTop: "180px" }}>
        <div className="murec-container">
          <span className="text-label about-intro-animate" style={{ display: "block", marginBottom: "1rem", opacity: 0 }}>
            Who We Are
          </span>
          <h1 className="text-display-xl about-intro-animate" style={{ opacity: 0, marginBottom: "2rem" }}>
            Madhusudan Urban<br /><em>Real Estate Collection</em>
          </h1>
          <p className="text-body-lg about-intro-animate" style={{ maxWidth: "600px", opacity: 0 }}>
            A portfolio shaped by legacy and guided by vision, MUREC is where every residential development project reflects our way of building with unmatched craftsmanship.
          </p>
        </div>
      </section>

      {/* Counters Grid with clip-path/opacity reveals */}
      <section className="murec-section" style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="murec-container">
          <div className="about-stats-row grid-3col">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="about-stat-card"
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "2rem",
                  opacity: 0,
                }}
              >
                <Image
                  src={stat.img}
                  alt={stat.label}
                  fill
                  style={{ objectFit: "cover" }}
                  data-cursor="view"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,10,0.9) 0%, rgba(8,8,10,0.1) 60%)" }} />

                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "4rem", color: "var(--color-gold)", lineHeight: 1 }}>
                    {stat.num}{stat.plus}
                  </div>
                  <p className="text-body" style={{ color: "var(--color-cream)", marginTop: "0.5rem" }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission-section murec-section" style={{ background: "var(--color-charcoal)" }}>
        <div className="murec-container">
          <div className="grid-1-12">
            <div>
              <span className="text-label about-mission-reveal" style={{ display: "block", marginBottom: "1.25rem", opacity: 0 }}>
                Our Foundation
              </span>
              <h2 className="text-display-md about-mission-reveal" style={{ opacity: 0, marginBottom: "1.5rem" }}>
                The Group<br /><em>Mission</em>
              </h2>
              <div className="about-mission-reveal" style={{ width: "50px", height: "1px", background: "var(--color-gold)", margin: "1.5rem 0", opacity: 0.5 }} />
              <p className="text-body-lg about-mission-reveal" style={{ opacity: 0, marginBottom: "2rem" }}>
                Our mission is to blend legacy with innovation, turning values into living spaces that endure for generations. Guided by transparency, uncompromising quality, and the promise of trust, we shape modern landmarks designed for inspired living.
              </p>
              <div className="about-mission-reveal" style={{ opacity: 0 }}>
                <Link href="/legacy" className="murec-btn">
                  Explore Group Legacy <span className="murec-btn__arrow">→</span>
                </Link>
              </div>
            </div>

            <div className="about-mission-img" style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", clipPath: "inset(0 100% 0 0)" }}>
              <Image
                src="/images/mission.jpg"
                alt="MUREC Mission Vision Statement"
                fill
                style={{ objectFit: "cover" }}
                data-cursor="view"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
