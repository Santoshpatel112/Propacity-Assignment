"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedArrow() {
  return (
    <span className="anim-arrow" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 9H16M16 9L10 3M16 9L10 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const principles = [
  {
    num: "01",
    title: "Trust",
    subtitle: "The Foundation",
    desc: "Principles have always mattered more than profit. At MUREC, every decision is rooted in honesty, so trust is never compromised. For over 78 years, this unwavering commitment has defined our relationships with families, partners, and communities alike.",
    img: "/images/counterbg1.jpg",
    accent: "rgba(196, 162, 101, 0.08)",
  },
  {
    num: "02",
    title: "Quality",
    subtitle: "Our Constant Signature",
    desc: "In our every venture, quality has been our constant signature. We build with precision so that trust is built into every detail. From materials to methods, from design to delivery — excellence is not an aspiration at MUREC, it is the standard.",
    img: "/images/dp2.jpg",
    accent: "rgba(45, 59, 42, 0.12)",
  },
  {
    num: "03",
    title: "Transparency",
    subtitle: "Clarity in Everything",
    desc: "Fairness defines how we price, promise, and deliver. Clarity in communication is non-negotiable across every project phase. We believe an informed stakeholder is the foundation of a lasting relationship — and lasting relationships are the foundation of lasting value.",
    img: "/images/dp3.jpg",
    accent: "rgba(30, 50, 70, 0.12)",
  },
  {
    num: "04",
    title: "Innovation",
    subtitle: "Building Tomorrow",
    desc: "We embrace new ideas, green building technologies, and architectural planning to deliver outstanding contemporary residential collections. At MUREC, innovation is not disruption for its own sake — it is the thoughtful integration of what is possible with what is meaningful.",
    img: "/images/dp1.jpg",
    accent: "rgba(139, 115, 85, 0.08)",
  },
];

export default function PrinciplesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero line reveal
      gsap.fromTo(
        ".principles-hero-line",
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.14, duration: 1.4, ease: "expo.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".principles-hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.9 }
      );

      // Each principle section
      const sections = gsap.utils.toArray(".principle-editorial") as HTMLElement[];
      sections.forEach((section) => {
        const label = section.querySelector(".pe-label");
        const num = section.querySelector(".pe-num");
        const titleLines = section.querySelectorAll(".pe-title-line");
        const sub = section.querySelector(".pe-subtitle");
        const body = section.querySelector(".pe-body");
        const imgWrap = section.querySelector(".pe-image-wrap");
        const imgInner = section.querySelector(".pe-image-inner");
        const cta = section.querySelector(".pe-cta");
        const divider = section.querySelector(".pe-divider");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });

        if (label) tl.fromTo(label, { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, 0);
        if (num) tl.fromTo(num, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, 0.1);
        titleLines.forEach((line, i) => {
          tl.fromTo(line, { y: "110%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1.2, ease: "expo.out" }, 0.2 + i * 0.08);
        });
        if (sub) tl.fromTo(sub, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, 0.5);
        if (divider) tl.fromTo(divider, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.out", transformOrigin: "left" }, 0.6);
        if (body) tl.fromTo(body, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, 0.7);
        if (cta) tl.fromTo(cta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, 0.85);

        // Image clip reveal
        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.out",
              scrollTrigger: { trigger: section, start: "top 78%", once: true },
            }
          );
        }

        // Image scale down (Ken Burns style)
        if (imgInner) {
          gsap.fromTo(
            imgInner,
            { scale: 1.18 },
            {
              scale: 1, duration: 2, ease: "expo.out",
              scrollTrigger: { trigger: section, start: "top 78%", once: true },
            }
          );

          // Parallax on scroll
          gsap.to(imgInner, {
            y: "14%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "var(--color-void)", color: "var(--color-text-primary)", overflow: "hidden" }}>

      {/* ── EDITORIAL HERO ── */}
      <section
        ref={heroRef}
        className="murec-section"
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "180px",
          paddingBottom: "var(--space-section)",
          position: "relative",
          overflow: "hidden",
          background: "var(--color-void)",
        }}
      >
        {/* Subtle background texture image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/counterbg2.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", opacity: 0.07 }}
            aria-hidden="true"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--color-void) 0%, rgba(8,8,10,0.7) 50%, var(--color-void) 100%)" }} />
        </div>

        <div className="murec-container" style={{ position: "relative", zIndex: 2 }}>
          <span
            className="text-label principles-hero-sub"
            style={{ display: "block", marginBottom: "1.5rem", opacity: 0 }}
          >
            Vision &amp; Values
          </span>

          <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
            <h1
              className="text-display-xl"
              style={{ overflow: "visible", lineHeight: 0.95 }}
            >
              <span className="principles-hero-line" style={{ display: "block", overflow: "hidden" }}>
                <span style={{ display: "block" }}>Living By</span>
              </span>
              <span className="principles-hero-line" style={{ display: "block", overflow: "hidden" }}>
                <span style={{ display: "block" }}><em>Principles</em></span>
              </span>
            </h1>
          </div>

          <p
            className="text-body-lg principles-hero-sub"
            style={{ maxWidth: "600px", marginTop: "2rem", opacity: 0 }}
          >
            MUREC is guided by values that shape every decision—building trust, delivering quality, practicing transparency, and embracing innovation as the foundation of everything we create.
          </p>

          {/* Small decorative counter */}
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "3rem" }}>
            {["01 Trust", "02 Quality", "03 Transparency", "04 Innovation"].map((item) => (
              <span
                key={item}
                className="text-label principles-hero-sub"
                style={{ opacity: 0, color: "rgba(196,162,101,0.5)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL PRINCIPLE SECTIONS ── */}
      {principles.map((p, idx) => {
        const isEven = idx % 2 === 0;

        return (
          <section
            key={p.num}
            className="principle-editorial murec-section"
            style={{
              background: idx % 2 === 0 ? "var(--color-void)" : "var(--color-charcoal)",
              overflow: "hidden",
            }}
          >
            <div className="murec-container">
              <div
                className={isEven ? "grid-1-12 principle-layout" : "grid-12-1 principle-layout"}
                style={{ alignItems: "stretch", gap: "clamp(3rem, 8vw, 8rem)" }}
              >
                {/* Text side */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    order: isEven ? 0 : 1,
                    paddingRight: isEven ? 0 : "var(--space-lg)",
                  }}
                >
                  <span className="pe-label text-label" style={{ display: "block", marginBottom: "1.25rem", opacity: 0 }}>
                    Principle {p.num}
                  </span>

                  <span
                    className="pe-num"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(5rem, 12vw, 9rem)",
                      fontWeight: 300,
                      lineHeight: 1,
                      color: "rgba(196, 162, 101, 0.12)",
                      display: "block",
                      marginBottom: "-0.5rem",
                      letterSpacing: "-0.02em",
                      opacity: 0,
                    }}
                  >
                    {p.num}
                  </span>

                  <div style={{ overflow: "hidden", marginBottom: "0.25rem" }}>
                    <h2
                      className="text-display-lg"
                      style={{ overflow: "visible" }}
                    >
                      <span className="pe-title-line" style={{ display: "block", overflow: "hidden" }}>
                        <span style={{ display: "block" }}>{p.title}</span>
                      </span>
                    </h2>
                  </div>

                  <p
                    className="pe-subtitle"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1rem, 2vw, 1.3rem)",
                      fontStyle: "italic",
                      color: "var(--color-gold)",
                      marginBottom: "2rem",
                      opacity: 0,
                    }}
                  >
                    {p.subtitle}
                  </p>

                  <div
                    className="pe-divider"
                    style={{
                      width: "60px",
                      height: "1px",
                      background: "var(--color-gold)",
                      marginBottom: "2rem",
                      transformOrigin: "left",
                      opacity: 0.5,
                    }}
                  />

                  <p
                    className="pe-body text-body-lg"
                    style={{ maxWidth: "500px", marginBottom: "2.5rem", opacity: 0 }}
                  >
                    {p.desc}
                  </p>

                  <div className="pe-cta" style={{ opacity: 0 }}>
                    <Link href="/contact" className="murec-text-link">
                      Get in Touch <AnimatedArrow />
                    </Link>
                  </div>
                </div>

                {/* Image side */}
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    order: isEven ? 1 : 0,
                  }}
                >
                  <div
                    className="pe-image-wrap"
                    style={{
                      position: "relative",
                      aspectRatio: "3/4",
                      overflow: "hidden",
                      clipPath: "inset(100% 0 0 0)",
                    }}
                  >
                    <div
                      className="pe-image-inner"
                      style={{ width: "100%", height: "100%", transform: "scale(1.18)" }}
                    >
                      <Image
                        src={p.img}
                        alt={`MUREC Principle — ${p.title}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      {/* subtle overlay for mood */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(135deg, ${p.accent} 0%, transparent 70%)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Floating number badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-1rem",
                      right: isEven ? "-1rem" : "auto",
                      left: isEven ? "auto" : "-1rem",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(8rem, 20vw, 16rem)",
                      fontWeight: 300,
                      lineHeight: 1,
                      color: "rgba(196, 162, 101, 0.04)",
                      userSelect: "none",
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  >
                    {p.num}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CLOSING CTA ── */}
      <section className="murec-section" style={{ background: "var(--color-void)", textAlign: "center" }}>
        <div className="murec-container murec-container--narrow">
          <span className="text-label" style={{ display: "block", marginBottom: "1.5rem" }}>Live The Vision</span>
          <h2 className="text-display-md" style={{ marginBottom: "1.5rem" }}>
            Experience MUREC<br /><em>Forest Walk</em>
          </h2>
          <p className="text-body-lg" style={{ marginBottom: "2.5rem" }}>
            Our principles come to life in every stone, every pathway, and every home we build. See them in action at Forest Walk, Dasna.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/forest-walk" className="murec-btn murec-btn--filled">
              Explore Forest Walk <AnimatedArrow />
            </Link>
            <Link href="/contact" className="murec-btn">
              Contact Us <AnimatedArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
