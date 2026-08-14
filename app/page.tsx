"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeAssociations from "@/components/HomeAssociations";
import HomePartners from "@/components/HomePartners";
import RealEstateMotionShowcase from "@/components/RealEstateMotionShowcase";
import DigitalRealEstateShowcase from "@/components/DigitalRealEstateShowcase";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────
   SINGLE ANIMATED ARROW COMPONENT
   ──────────────────────────────────── */
function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span className="anim-arrow" aria-hidden="true">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ transform: down ? "rotate(90deg)" : "none", display: "block" }}
      >
        <path
          d="M1 8H15M15 8L9 2M15 8L9 14"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ────────────────────────────────────
   CINEMATIC INTRO SPLASH SCREEN
   ──────────────────────────────────── */
function CinematicIntro({ onEnter }: { onEnter: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const enterTlRef = useRef<gsap.core.Timeline | null>(null);
  const isEnteringRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = gsap.timeline({ delay: reduceMotion ? 0 : 0.25 });
    enterTlRef.current = tl;

    if (reduceMotion) {
      tl.set([logoRef.current, tagRef.current, btnRef.current], { opacity: 1, y: 0 })
        .set(lineRef.current, { height: 60 });
    } else {
      tl.fromTo(buildingRef.current, { opacity: 0, y: "12%", scale: 1.16 }, { opacity: 0.24, y: 0, scale: 1, duration: 2.2, ease: "expo.out" })
        .fromTo([panelLeftRef.current, panelRightRef.current], { clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0% 0 0%)", duration: 1.6, ease: "expo.inOut", stagger: 0.08 }, "-=1.8")
        .fromTo(arrowRef.current, { opacity: 0, y: 12 }, { opacity: 0.8, y: 0, duration: 0.8, ease: "expo.out" }, "-=1.5")
        .fromTo(logoRef.current, { opacity: 0, y: 34, letterSpacing: "0.7em" }, { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 1.5, ease: "expo.out" }, "-=1.1")
        .fromTo(tagRef.current, { opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1, ease: "expo.out" }, "-=0.9")
        .fromTo(btnRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out" }, "-=0.55")
        .fromTo(lineRef.current, { height: 0, opacity: 0 }, { height: 60, opacity: 1, duration: 1.4, ease: "expo.out" }, "-=0.35")
        .to(logoRef.current, { y: -3, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true }, "+=0.2");
    }

    return () => { tl.kill(); };
  }, []);

  const handleEnter = () => {
    if (isEnteringRef.current) return;
    isEnteringRef.current = true;
    enterTlRef.current?.kill();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const transitionTl = gsap.timeline({ onComplete: onEnter });
    transitionTl
      .to(arrowRef.current, {
        opacity: 1,
        y: -18,
        duration: reduceMotion ? 0 : 0.35,
        ease: "power2.out",
      })
      .to(buildingRef.current, {
        opacity: 1,
        scale: 1.08,
        y: 0,
        duration: reduceMotion ? 0 : 0.8,
        ease: "expo.out",
      }, "-=0.25")
      .to(wrapRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: reduceMotion ? 0 : 1.1,
        ease: "expo.inOut",
      }, "-=0.45");
  };

  return (
    <div
      ref={wrapRef}
      className="murec-intro"
      style={{ clipPath: "inset(0 0 0 0)" }}
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleEnter()}
      aria-label="Enter MUREC Experience"
    >
      <div ref={buildingRef} className="murec-intro__building" aria-hidden="true">
        <Image src="/images/villa.jpg" alt="" fill sizes="100vw" priority />
      </div>
      <div className="murec-intro__panels" aria-hidden="true">
        <div ref={panelLeftRef} className="murec-intro__panel murec-intro__panel--left">
          <Image src="/images/villa.jpg" alt="" fill sizes="50vw" priority />
          <span>ESTATE I</span>
        </div>
        <div ref={panelRightRef} className="murec-intro__panel murec-intro__panel--right">
          <Image src="/images/villa.jpg" alt="" fill sizes="50vw" priority />
          <span>ESTATE II</span>
        </div>
      </div>
      <div ref={arrowRef} className="murec-intro__arrow" aria-hidden="true">
        <Arrow down />
      </div>
      <div ref={logoRef} className="murec-intro__logo" style={{ opacity: 0, transform: "translateY(28px)" }}>
        MUREC
      </div>
      <p ref={tagRef} className="murec-intro__tagline" style={{ opacity: 0, transform: "translateY(16px)" }}>
        78+ Years of Legacy
      </p>
      <button
        ref={btnRef}
        className="murec-intro__cta"
        style={{ opacity: 0, transform: "translateY(16px)" }}
        onClick={(e) => { e.stopPropagation(); handleEnter(); }}
      >
        Enter Experience
      </button>
      <div ref={lineRef} className="murec-intro__line" style={{ height: 0 }} />
    </div>
  );
}

/* ────────────────────────────────────
   HOME PAGE
   ──────────────────────────────────── */
export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const heroRef      = useRef<HTMLElement>(null);
  const legacyRef    = useRef<HTMLElement>(null);
  const principlesRef = useRef<HTMLElement>(null);
  const collectionRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const ctaRef       = useRef<HTMLElement>(null);

  /* ── RUN ALL GSAP AFTER INTRO IS DISMISSED ── */
  useEffect(() => {
    if (!entered) return;

    const ctx = gsap.context(() => {

      /* ──── HERO ENTRANCE ──── */
      const heroTl = gsap.timeline({ delay: 0.05 });

      heroTl
        .fromTo(".hero-eyebrow",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "expo.out" })
        .fromTo(".hero-line",
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.12, duration: 1.4, ease: "expo.out" },
          "-=0.7")
        .fromTo(".hero-sub",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
          "-=0.8")
        .fromTo(".hero-cta-wrap",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
          "-=0.6")
        .fromTo(".hero-scroll-hint",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "expo.out" },
          "-=0.3");

      /* Hero parallax */
      gsap.to(".hero-parallax-img", {
        y: "25%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      /* ──── LEGACY SECTION ──── */
      gsap.fromTo(".legacy-label",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: legacyRef.current, start: "top 78%" } });

      gsap.fromTo(".legacy-title",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: legacyRef.current, start: "top 74%" } });

      gsap.fromTo(".legacy-body",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: legacyRef.current, start: "top 68%" } });

      /* Image clip reveal + scale down */
      gsap.fromTo(".legacy-img-wrap",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.out",
          scrollTrigger: { trigger: ".legacy-img-wrap", start: "top 82%" } });

      gsap.fromTo(".legacy-img-inner",
        { scale: 1.18 },
        { scale: 1, duration: 2, ease: "expo.out",
          scrollTrigger: { trigger: ".legacy-img-wrap", start: "top 82%" } });

      /* Stats stagger */
      gsap.fromTo(".stat-block",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".grid-stats", start: "top 84%" } });

      /* ──── PRINCIPLES SECTION ──── */
      gsap.fromTo(".princ-label",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: principlesRef.current, start: "top 78%" } });

      gsap.fromTo(".princ-word",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: principlesRef.current, start: "top 72%" } });

      gsap.fromTo(".princ-body",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: principlesRef.current, start: "top 66%" } });

      gsap.fromTo(".princ-value",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.13, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: ".princ-grid", start: "top 82%" } });

      /* ──── COLLECTION SECTION ──── */
      gsap.fromTo(".coll-img-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "expo.out",
          scrollTrigger: { trigger: collectionRef.current, start: "top 74%" } });

      gsap.fromTo(".coll-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: collectionRef.current, start: "top 68%" } });

      /* ──── PHILOSOPHY SECTION ──── */
      gsap.fromTo(".phil-img",
        { opacity: 0, scale: 1.14 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out",
          scrollTrigger: { trigger: philosophyRef.current, start: "top 78%" } });

      gsap.fromTo(".phil-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: philosophyRef.current, start: "top 70%" } });

      /* ──── CTA SECTION ──── */
      gsap.fromTo(".cta-big",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 82%" } });

      gsap.fromTo(".cta-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 78%" } });

    });

    return () => ctx.revert();
  }, [entered]);

  return (
    <>
      {!entered && <CinematicIntro onEnter={() => setEntered(true)} />}

      {/* ═══════════════════════════════════════
          HERO — full-screen with background image
          ═══════════════════════════════════════ */}
      <section ref={heroRef} className="murec-hero">

        {/* Background image (always visible) */}
        <div className="murec-hero__media">
          <div className="hero-parallax-img" style={{ position: "absolute", inset: "0 0 -25%", overflow: "hidden" }}>
            <Image
              src="/images/banner.jpg"
              alt="MUREC Forest Walk — A Sanctuary Shaped by Landscape"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
          </div>
          {/* Dark gradient overlay for readability */}
          <div className="murec-hero__overlay" style={{
            position: "absolute", inset: 0, zIndex: 2,
            background: "linear-gradient(to bottom, rgba(8,8,10,0.25) 0%, rgba(8,8,10,0.4) 40%, rgba(8,8,10,0.88) 100%)"
          }} />
        </div>

        {/* Hero text content */}
        <div className="murec-hero__content" style={{ position: "relative", zIndex: 5 }}>

          {/* Eyebrow */}
          <div
            className="hero-eyebrow"
            style={{ opacity: 0 }}
            aria-label="78 plus years of legacy"
          >
            <span className="murec-hero__eyebrow">78+ Years of Legacy</span>
          </div>

          {/* Title — split into lines with overflow:hidden for the wipe effect */}
          <h1 className="murec-hero__title" style={{ overflow: "hidden" }}>
            <span className="murec-hero__title-line">
              <span className="hero-line" style={{ display: "inline-block", opacity: 0 }}>The Legacy</span>
            </span>
            <span className="murec-hero__title-line">
              <span className="hero-line" style={{ display: "inline-block", opacity: 0 }}>
                <em>Beyond</em> Compare
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="murec-hero__subtitle hero-sub"
            style={{ opacity: 0 }}
          >
            For over seven decades, we stood for perseverance, integrity, and nation-building through enterprise. Every step guided by one oath: quality before profit, trust before everything.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-cta-wrap"
            style={{ opacity: 0, display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <Link href="/legacy" className="murec-btn murec-btn--filled">
              Our History <Arrow />
            </Link>
            <Link href="/about" className="murec-btn">
              Learn More <Arrow />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="murec-hero__scroll hero-scroll-hint" style={{ opacity: 0 }}>
          <span className="murec-hero__scroll-text">Scroll</span>
          <div className="murec-hero__scroll-line" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          REAL ESTATE MOTION ANIMATION SHOWCASE
          (Inspired by Dribbble Real Estate Motion)
          ═══════════════════════════════════════ */}
      <RealEstateMotionShowcase />

      {/* ═══════════════════════════════════════
          LEGACY SECTION
          ═══════════════════════════════════════ */}
      <section ref={legacyRef} className="murec-section murec-section--dark" style={{ overflow: "hidden" }}>
        <div className="murec-container">
          <div className="grid-2col">

            {/* Text */}
            <div>
              <span className="text-label legacy-label" style={{ opacity: 0, display: "block", marginBottom: "1.25rem" }}>
                Our Story
              </span>
              <h2 className="text-display-lg legacy-title" style={{ opacity: 0, marginBottom: "1.5rem" }}>
                The Legacy<br /><em>Beyond</em> Compare
              </h2>
              <div style={{ width: 50, height: 1, background: "var(--color-gold)", marginBottom: "1.5rem", opacity: 0.5 }} />
              <p className="text-body-lg legacy-body" style={{ opacity: 0, marginBottom: "2rem", maxWidth: 520 }}>
                For over seven decades, we stood for perseverance, integrity, and nation-building through enterprise. Every step was guided by one oath: quality before profit, trust before everything.
              </p>
              <Link href="/legacy" className="murec-text-link legacy-body" style={{ opacity: 0 }}>
                Explore our legacy <Arrow />
              </Link>
            </div>

            {/* Image */}
            <div
              className="legacy-img-wrap"
              style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", clipPath: "inset(100% 0 0 0)" }}
            >
              <div className="legacy-img-inner" style={{ position: "absolute", inset: 0, transform: "scale(1.18)" }}>
                <Image
                  src="/images/counterbg1.jpg"
                  alt="MUREC Legacy — 78+ years of building trust"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid-stats">
            {[
              { num: "78+", label: "Years of Legacy" },
              { num: "100M+", label: "Families Impacted" },
              { num: "7+", label: "Sectors of Operation" },
            ].map((s, i) => (
              <div key={i} className="stat-block">
                <div className="stat-block__number">{s.num}</div>
                <div className="stat-block__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRINCIPLES SECTION
          ═══════════════════════════════════════ */}
      <section ref={principlesRef} className="murec-section murec-section--charcoal" style={{ overflow: "hidden" }}>
        <div className="murec-container">
          <span className="text-label princ-label" style={{ display: "block", marginBottom: "1.25rem", opacity: 0 }}>
            Values &amp; Foundations
          </span>

          <div style={{ marginBottom: "clamp(2.5rem,5vh,4rem)", overflow: "hidden" }}>
            <h2 className="text-display-xl">
              <span className="princ-word" style={{ display: "inline-block", opacity: 0, marginRight: "0.3em" }}>Living</span>
              <span className="princ-word" style={{ display: "inline-block", opacity: 0, marginRight: "0.3em" }}>By</span>
              <span className="princ-word" style={{ display: "inline-block", opacity: 0 }}><em>Principles</em></span>
            </h2>
          </div>

          <p className="text-body-lg princ-body" style={{ maxWidth: 640, marginBottom: "clamp(2.5rem,5vh,4rem)", opacity: 0 }}>
            MUREC is guided by values that shape every decision—building trust, delivering quality, practicing transparency, and embracing innovation as the foundation of everything we create.
          </p>

          <div className="princ-grid" style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "2rem"
          }}>
            {[
              { num: "01", title: "Trust", desc: "Principles have always mattered more than profit. At MUREC, every decision is rooted in honesty." },
              { num: "02", title: "Quality", desc: "In our every venture, quality has been our constant signature. We build with precision." },
              { num: "03", title: "Transparency", desc: "Fairness defines how we price, promise, and deliver. Clarity in communication is non-negotiable." },
              { num: "04", title: "Innovation", desc: "We embrace new ideas, technologies, and approaches to deliver better outcomes." },
            ].map((v) => (
              <div key={v.num} className="princ-value" style={{ opacity: 0, borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 300, color: "rgba(196,162,101,0.25)", display: "block", marginBottom: "0.5rem" }}>
                  {v.num}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.75rem", color: "var(--color-cream)" }}>
                  {v.title}
                </h3>
                <p className="text-body" style={{ color: "rgba(240,235,224,0.78)" }}>{v.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Link href="/principles" className="murec-btn">
              Explore More <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MUREC COLLECTION
          ═══════════════════════════════════════ */}
      <section ref={collectionRef} className="murec-section murec-section--dark" style={{ overflow: "hidden" }}>
        <div className="murec-container">
          <div className="grid-12-1">
            {/* Image */}
            <div
              className="coll-img-wrap"
              style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", clipPath: "inset(0 100% 0 0)" }}
            >
              <Image
                src="/images/about-forest.webp"
                alt="MUREC Forest Walk Collection — Premium Gated Villas"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,10,0.15)" }} />
            </div>

            {/* Text */}
            <div>
              <span className="text-label coll-text" style={{ display: "block", marginBottom: "1.25rem", opacity: 0 }}>Portfolio</span>
              <h2 className="text-display-lg coll-text" style={{ marginBottom: "1.5rem", opacity: 0 }}>
                MUREC<br /><em>Collection</em>
              </h2>
              <p className="text-body-lg coll-text" style={{ maxWidth: 480, marginBottom: "2rem", opacity: 0 }}>
                A portfolio shaped by legacy and guided by vision, the MUREC Collection is where every project reflects our way of building.
              </p>
              <div className="coll-text" style={{ opacity: 0 }}>
                <Link href="/forest-walk" className="murec-btn murec-btn--filled">
                  Discover Forest Walk <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DESIGN PHILOSOPHY
          ═══════════════════════════════════════ */}
      <section ref={philosophyRef} className="murec-section" style={{ background: "var(--color-charcoal)", overflow: "hidden" }}>
        <div className="murec-container">
          <div className="grid-1-12">
            <div className="phil-content">
              <span className="text-label" style={{ display: "block", marginBottom: "1.25rem" }}>Sustainability</span>
              <h2 className="text-display-md" style={{ marginBottom: "1.5rem" }}>
                IGBC Certified<br /><em>Design Philosophy</em>
              </h2>
              <p className="text-body-lg" style={{ maxWidth: 480, marginBottom: "2.5rem" }}>
                The first MUREC collection is envisioned to align with IGBC certification standards, reflecting a commitment to responsible development. From efficient resource planning to healthier living environments, the project integrates sustainability as a core design principle.
              </p>
              <Link href="/design-philosophy" className="murec-text-link">
                Explore philosophy <Arrow />
              </Link>
            </div>

            <div
              className="phil-img"
              style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", opacity: 0 }}
            >
              <Image
                src="/images/dp2.jpg"
                alt="MUREC IGBC Certified Design Philosophy"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Associations */}
      <HomeAssociations />

      {/* Partners */}
      <HomePartners />

      {/* ═══════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════ */}
      <section ref={ctaRef} className="murec-section murec-section--dark" style={{ overflow: "hidden" }}>
        <div className="murec-cta">
          <span className="text-label cta-sub" style={{ display: "block", marginBottom: "1.5rem", opacity: 0 }}>
            Connect With Us
          </span>
          <h2 className="murec-cta__title cta-big" style={{ opacity: 0 }}>
            Get In <em>Touch</em>
          </h2>
          <p className="murec-cta__text cta-sub" style={{ opacity: 0 }}>
            Looking to collaborate, invest, or simply know more? Reach out and let&apos;s connect.
          </p>
          <div className="cta-sub" style={{ opacity: 0 }}>
            <Link href="/contact" className="murec-btn murec-btn--filled">
              Contact Us <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
