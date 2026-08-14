"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CinematicHeroProps {
  videoSrc?: string;
  imageSrc: string;
  eyebrow: string;
  title: string[];
  subtitle: string;
  ctaButtons: Array<{ href: string; label: string; filled?: boolean }>;
}

export default function CinematicHero({
  videoSrc,
  imageSrc,
  eyebrow,
  title,
  subtitle,
  ctaButtons,
}: CinematicHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.3 });

      heroTl
        .fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "expo.out" }
        )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: "110%", rotateX: -15 },
          {
            opacity: 1,
            y: "0%",
            rotateX: 0,
            stagger: 0.15,
            duration: 1.4,
            ease: "expo.out",
          },
          "-=0.7"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" },
          "-=0.8"
        )
        .fromTo(
          ".hero-cta-button",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
          "-=0.4"
        );

      // Parallax on hero content
      gsap.to(contentRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Parallax on video/image
      gsap.to(".hero-media-inner", {
        y: "15%",
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Fade out hero content on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
      });

      // Animated scroll indicator
      gsap.to(".scroll-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "20% top",
          scrub: 0.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Magnetic hover effect on buttons
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={heroRef}
      className="cinematic-hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Media */}
      <div
        className="hero-media"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <div
          className="hero-media-inner"
          style={{
            position: "absolute",
            inset: "-10% -5%",
            width: "110%",
            height: "120%",
          }}
        >
          {videoSrc ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: videoLoaded ? 1 : 0,
                  transition: "opacity 1s ease",
                }}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              {!videoLoaded && (
                <Image
                  src={imageSrc}
                  alt="Hero background"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              )}
            </>
          ) : (
            <Image
              src={imageSrc}
              alt="Hero background"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(8,8,10,0.3) 0%, rgba(8,8,10,0.5) 50%, rgba(8,8,10,0.85) 100%)",
            zIndex: 2,
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "1200px",
          padding: "0 var(--container-pad)",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div
          className="hero-eyebrow"
          style={{
            opacity: 0,
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "8px 20px",
              background: "rgba(196, 162, 101, 0.15)",
              border: "1px solid rgba(196, 162, 101, 0.4)",
              borderRadius: "30px",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: "2rem",
            perspective: "1000px",
          }}
        >
          {title.map((line, i) => (
            <div
              key={i}
              style={{
                overflow: "hidden",
                paddingBottom: "0.1em",
              }}
            >
              <span
                className="hero-title-line"
                style={{
                  display: "inline-block",
                  opacity: 0,
                }}
              >
                {line.includes("<em>") ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: line }}
                    style={{ color: i % 2 === 1 ? "var(--color-gold)" : "inherit" }}
                  />
                ) : (
                  line
                )}
              </span>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
          style={{
            opacity: 0,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.8,
            maxWidth: "700px",
            margin: "0 auto 3rem",
            color: "rgba(240, 235, 224, 0.9)",
            fontWeight: 300,
          }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {ctaButtons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              className={`hero-cta-button murec-btn ${
                btn.filled ? "murec-btn--filled" : ""
              }`}
              style={{ opacity: 0 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {btn.label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginLeft: "8px" }}
              >
                <path
                  d="M1 8H15M15 8L9 2M15 8L9 14"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hero-scroll-indicator"
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          opacity: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(240, 235, 224, 0.7)",
            fontWeight: 500,
          }}
        >
          Scroll
        </span>
        <div
          className="scroll-line"
          style={{
            width: "1px",
            height: "60px",
            background:
              "linear-gradient(to bottom, rgba(196, 162, 101, 0), var(--color-gold), rgba(196, 162, 101, 0))",
          }}
        />
      </div>

      <style jsx>{`
        .cinematic-hero {
          position: relative;
          isolation: isolate;
        }
        
        .hero-media-inner {
          will-change: transform;
        }
        
        .hero-content {
          padding-left: max(1rem, env(safe-area-inset-left));
          padding-right: max(1rem, env(safe-area-inset-right));
        }

        @media (max-width: 1024px) {
          .hero-content {
            max-width: 900px;
            padding: 0 2rem;
          }
          
          .hero-content h1 {
            font-size: clamp(2.5rem, 7vw, 5rem);
          }
          
          .hero-content p {
            font-size: clamp(1rem, 2.5vw, 1.125rem);
            max-width: 600px;
          }
        }

        @media (max-width: 768px) {
          .cinematic-hero {
            min-height: 70vh;
            height: 100svh;
          }
          
          .hero-content {
            padding: 0 1.5rem;
            text-align: center;
          }
          
          .hero-content h1 {
            font-size: clamp(2rem, 8vw, 3.5rem);
            margin-bottom: 1.5rem;
          }
          
          .hero-content p {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 2.5rem;
            max-width: 500px;
          }
          
          .hero-cta-button {
            min-width: 140px;
            padding: 0.875rem 1.5rem;
            font-size: 0.9rem;
          }
          
          .hero-content > div:last-child {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          
          .hero-scroll-indicator {
            bottom: 2rem;
          }
          
          .hero-scroll-indicator span {
            font-size: 0.7rem;
          }
          
          .scroll-line {
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .cinematic-hero {
            min-height: 60vh;
          }
          
          .hero-content {
            padding: 0 1rem;
          }
          
          .hero-content h1 {
            font-size: 2.25rem;
            line-height: 1.1;
          }
          
          .hero-content p {
            font-size: 0.95rem;
            margin-bottom: 2rem;
          }
          
          .hero-eyebrow span {
            padding: 6px 16px;
            font-size: 0.7rem;
          }
          
          .hero-cta-button {
            min-width: 130px;
            padding: 0.75rem 1.25rem;
            font-size: 0.85rem;
          }
          
          .hero-scroll-indicator {
            bottom: 1.5rem;
          }
        }

        @media (max-width: 360px) {
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .hero-content p {
            font-size: 0.9rem;
          }
          
          .hero-cta-button {
            min-width: 120px;
            padding: 0.7rem 1.1rem;
            font-size: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-title-line,
          .hero-subtitle,
          .hero-eyebrow,
          .hero-cta-button,
          .hero-scroll-indicator {
            animation: none !important;
            transition: none !important;
          }
          
          .hero-media-inner {
            transform: none !important;
          }
          
          .scroll-line animate {
            display: none;
          }
        }

        @media (orientation: landscape) and (max-height: 500px) {
          .cinematic-hero {
            height: 100vh;
            min-height: 500px;
          }
          
          .hero-content h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          
          .hero-content p {
            margin-bottom: 1.5rem;
          }
          
          .hero-scroll-indicator {
            display: none;
          }
        }

        @media (hover: none) {
          .hero-cta-button:hover {
            transform: none;
          }
        }

        @media (max-width: 768px) and (orientation: portrait) {
          .hero-content > div:last-child {
            width: 100%;
          }
          
          .hero-cta-button {
            flex: 1;
            max-width: 200px;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
