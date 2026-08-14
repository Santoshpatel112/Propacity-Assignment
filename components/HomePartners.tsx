"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const partnersList = [
  {
    id: 1,
    name: "Bobby Mukherrji",
    designation: "Principal Interior Architect, Bobby Mukherrji & Associates",
    quote: "“We are engaged to conceptualize the interiors for Murec’s clubhouse and tower lobbies, with a focus on refined luxury and strong spatial identity.”",
    img: "/images/team_2.webp",
    logo: "/images/bobyloog.png",
  },
  {
    id: 2,
    name: "Goonmeet Singh",
    designation: "Principal Architect, Design Forum International",
    quote: "“We are engaged to sculpt the architectural vision for Murec as a contemporary residential landmark—an address conceived for refined urban living, where design elegance is thoughtfully interwoven with functional planning to shape a premium high-rise environment of enduring character and aspiration.”",
    img: "/images/team_3.webp",
    logo: "/images/desingform.png",
  },
];

export default function HomePartners() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleTransition = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;

    const tl = gsap.timeline({
      onComplete: () => setActiveIndex(nextIndex),
    });

    // Animate out
    tl.to(imgRef.current, { clipPath: "inset(0 0 100% 0)", scale: 1.1, duration: 0.6, ease: "power3.inOut" })
      .to([quoteRef.current, authorRef.current, logoRef.current], { opacity: 0, y: -20, stagger: 0.05, duration: 0.4, ease: "power2.in" }, 0);

    // Animate in (handled by useEffect trigger on activeIndex change)
  };

  useEffect(() => {
    const tl = gsap.timeline();
    // Reset state & animate in
    tl.fromTo(imgRef.current, 
      { clipPath: "inset(100% 0 0 0)", scale: 1.15 },
      { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      [quoteRef.current, authorRef.current, logoRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );
  }, [activeIndex]);

  // Autoplay partner stories
  useEffect(() => {
    const timer = setInterval(() => {
      handleTransition((activeIndex + 1) % partnersList.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const activePartner = partnersList[activeIndex];

  return (
    <section className="murec-section murec-section--light" ref={containerRef} style={{ overflow: "hidden" }}>
      <div className="murec-container">
        <div style={{ marginBottom: "var(--space-xl)" }}>
          <span className="text-label" style={{ color: "var(--color-bronze)" }}>Architectural Visions</span>
          <h2 className="text-display-md" style={{ color: "var(--color-text-dark)", marginTop: "0.5rem" }}>
            From Our <em>Partners</em>
          </h2>
        </div>

        <div className="partner-slide">
          {/* Image Container with Custom Mask */}
          <div 
            ref={imgRef}
            className="partner-slide__image" 
            style={{ 
              clipPath: "inset(0% 0 0 0)",
              position: "relative",
              aspectRatio: "4/5",
              overflow: "hidden",
            }}
          >
            <Image
              src={activePartner.img}
              alt={activePartner.name}
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Text content with custom stagger typography reveals */}
          <div className="partner-slide__content" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {activePartner.logo && (
              <div ref={logoRef}>
                <Image
                  src={activePartner.logo}
                  alt={activePartner.name}
                  width={160}
                  height={50}
                  style={{ objectFit: "contain", maxHeight: "40px", width: "auto", marginBottom: "2rem", filter: "contrast(1.2)" }}
                />
              </div>
            )}
            
            <div ref={quoteRef} className="partner-slide__quote">
              {activePartner.quote}
            </div>

            <div ref={authorRef}>
              <h4 style={{ fontFamily: "var(--font-brand)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--color-text-dark)", marginBottom: "0.25rem" }}>
                {activePartner.name}
              </h4>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--color-text-dark-secondary)", textTransform: "uppercase" }}>
                {activePartner.designation}
              </p>
            </div>

            {/* Premium Indicator Controls */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}>
              {partnersList.map((partner, idx) => (
                <button
                  key={partner.id}
                  onClick={() => handleTransition(idx)}
                  style={{
                    width: "40px",
                    height: "2px",
                    background: idx === activeIndex ? "var(--color-bronze)" : "rgba(0, 0, 0, 0.15)",
                    transition: "background 0.3s ease",
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
