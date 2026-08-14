"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const showcaseFeatures = [
  {
    id: "01",
    tag: "ARCHITECTURAL SANCTUARY",
    title: "Envisioned for Refined Living",
    desc: "A master-planned luxury gated villa enclave blending low-density architecture, private courtyards, and organic forest trails into one harmonious retreat.",
    img: "/images/banner.jpg",
    specs: ["97 Exclusive Villas", "Independent Plots", "Private Lawns"],
  },
  {
    id: "02",
    tag: "FOREST CANOPY TRAIL",
    title: "Dense Canopy & Shaded Pathways",
    desc: "Over 60% open green cover featuring native species, natural cooling mounds, and tranquil tree-lined arterial walks designed for daily rejuvenation.",
    img: "/images/counterbg3.jpg",
    specs: ["60%+ Green Cover", "Shaded Trails", "Microclimate Cooling"],
  },
  
  {
    id: "03",
    tag: "WATER MIRACLE LAKES",
    title: "Cascading Pools & Bio-Retention",
    desc: "Integrated water harvesting, reflecting pools, and cascading bio-swales that elevate local air humidity and ground natural ecosystems.",
    img: "/images/dp1.jpg",
    specs: ["Cascading Lakes", "Rainwater Swales", "Eco-Retention"],
  },
  {
    id: "04",
    tag: "IGBC GREEN CERTIFIED",
    title: "Sustainable Luxury Built To Last",
    desc: "Engineered to IGBC green building standards—utilizing solar energy, low-VOC materials, intelligent waste systems, and net-zero water management.",
    img: "/images/dp2.jpg",
    specs: ["IGBC Standard", "Solar Integration", "Net-Zero Water"],
  },
];

export default function RealEstateMotionShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger expanding video container animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current && containerRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            width: "90%",
            borderRadius: "24px",
          },
          {
            width: "100%",
            borderRadius: "0px",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "top 25%",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Tab Switch Animation
  const handleTabChange = (index: number) => {
    if (index === activeTab) return;

    if (infoRef.current) {
      gsap.to(infoRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(index);
          gsap.fromTo(
            infoRef.current,
            { opacity: 0, y: -16 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          );
        },
      });
    } else {
      setActiveTab(index);
    }
  };

  const currentFeature = showcaseFeatures[activeTab];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="murec-section"
      style={{
        background: "var(--color-void)",
        padding: "var(--space-2xl) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section Header */}
      <div className="murec-container" style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <span
              className="text-label"
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(196, 162, 101, 0.12)",
                border: "1px solid rgba(196, 162, 101, 0.3)",
                borderRadius: "4px",
                color: "var(--color-gold)",
                marginBottom: "1rem",
              }}
            >
              REAL ESTATE ANIMATION SHOWCASE
            </span>
            <h2 className="text-display-lg" style={{ color: "#FFFFFF", textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}>
              Cinematic <em>Living Reel</em>
            </h2>
          </div>

          <p className="text-body-lg" style={{ maxWidth: "440px", color: "rgba(240, 235, 224, 0.9)" }}>
            Experience the architectural craftsmanship, low-density planning, and eco-certified living of MUREC Forest Walk.
          </p>
        </div>
      </div>

      {/* Full Unobscured Video Container */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          ref={cardRef}
          className="real-estate-motion-card"
          style={{
            position: "relative",
            minHeight: "65vh",
            overflow: "hidden",
            border: "1px solid rgba(196, 162, 101, 0.3)",
            background: "#0D0D0F",
          }}
        >
          {/* Unobscured Background Video / Visual Reel */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={currentFeature.img}
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
            >
              <source src="/images/Vid2.mp4" type="video/mp4" />
            </video>

            {/* Visual Image Layer Fallback */}
            <Image
              src={currentFeature.img}
              alt={currentFeature.title}
              fill
              priority
              style={{ objectFit: "cover", opacity: 0.25, mixBlendMode: "overlay" }}
            />

            {/* Subtle Gradient Ring Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(8, 8, 10, 0.5) 0%, rgba(8, 8, 10, 0.1) 50%, rgba(8, 8, 10, 0.75) 100%)",
                zIndex: 2,
              }}
            />
          </div>

          {/* Top Bar Badges */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              padding: "1.25rem 2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              background: "rgba(8, 8, 10, 0.55)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4CAF50",
                  boxShadow: "0 0 10px #4CAF50",
                }}
              />
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)", fontWeight: 600 }}>
                {currentFeature.tag}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#FFFFFF", textTransform: "uppercase", fontWeight: 500 }}>
                4K HDR REAL ESTATE CINEMATIC
              </span>
              <button
                onClick={togglePlay}
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  border: "1px solid rgba(196, 162, 101, 0.4)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  background: "rgba(196, 162, 101, 0.15)",
                  cursor: "pointer",
                }}
              >
                {isPlaying ? "Pause Reel ❚❚" : "Play Reel ▶"}
              </button>
            </div>
          </div>

          {/* Floating Center Play Button */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Expand 4K video reel"
              style={{
                width: "76px",
                height: "76px",
                borderRadius: "50%",
                background: "rgba(196, 162, 101, 0.3)",
                border: "1px solid var(--color-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 0.75rem",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 35px rgba(196, 162, 101, 0.5)",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M8 5V19L19 12L8 5Z" fill="var(--color-gold)" />
              </svg>
            </button>
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                textShadow: "0 2px 10px rgba(0,0,0,0.95)",
                fontWeight: 600,
              }}
            >
              Watch Fullscreen 4K Reel
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Content Below Video (Clean & Unobscured) */}
      <div className="murec-container" style={{ marginTop: "2.5rem" }}>
        {/* Interactive Feature Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "2rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
            scrollbarWidth: "none",
          }}
        >
          {showcaseFeatures.map((feat, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={feat.id}
                onClick={() => handleTabChange(idx)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "30px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  background: isActive ? "var(--color-gold)" : "rgba(22, 22, 24, 0.8)",
                  color: isActive ? "#08080A" : "rgba(240, 235, 224, 0.85)",
                  border: isActive ? "1px solid var(--color-gold)" : "1px solid rgba(255, 255, 255, 0.12)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                {feat.id} {feat.tag}
              </button>
            );
          })}
        </div>

        {/* Feature Editorial Block with Superior Contrast */}
        <div
          ref={infoRef}
          style={{
            background: "var(--color-charcoal)",
            border: "1px solid rgba(196, 162, 101, 0.25)",
            borderRadius: "16px",
            padding: "clamp(1.75rem, 4vw, 3rem)",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-gold)", fontWeight: 300 }}>
                {currentFeature.id}
              </span>
              <span className="text-label" style={{ color: "var(--color-gold)" }}>{currentFeature.tag}</span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 300,
                color: "#FAFAF8",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              {currentFeature.title}
            </h3>

            <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
              {currentFeature.specs.map((spec, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background: "rgba(196, 162, 101, 0.15)",
                    border: "1px solid rgba(196, 162, 101, 0.3)",
                    color: "var(--color-gold)",
                    fontWeight: 600,
                  }}
                >
                  ✓ {spec}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "rgba(240, 235, 224, 0.92)",
                fontWeight: 300,
              }}
            >
              {currentFeature.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal Player Overlay */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0, 0, 0, 0.96)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            aria-label="Close 4K Video Reel"
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              color: "var(--color-gold)",
              fontSize: "2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 10001,
            }}
          >
            ✕
          </button>

          <div
            style={{ width: "100%", maxWidth: "1200px", aspectRatio: "16/9", position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--color-gold)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              autoPlay
              controls
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              poster={currentFeature.img}
            >
              <source src="/images/Vid2.mp4" type="video/mp4" />
            </video>
          </div>

          <p style={{ marginTop: "1.5rem", color: "var(--color-gold)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            MUREC Architectural Real Estate Reel — Dasna, NCR
          </p>
        </div>
      )}
    </section>
  );
}
