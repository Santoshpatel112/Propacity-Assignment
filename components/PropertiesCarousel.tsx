"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PropertySlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  videoSrc?: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
}

const propertySlides: PropertySlide[] = [
  {
    id: "forest-walk",
    title: "MUREC Forest Walk",
    subtitle: "A Sanctuary Shaped by Landscape",
    description: "Immerse yourself in 40 acres of pristine nature where luxury villas blend seamlessly with ancient trees and natural topography. Every home is a testament to sustainable architecture.",
    image: "/images/about-forest.webp",
    features: ["IGBC Certified", "40 Acres", "Premium Villas", "Natural Landscape"],
    cta: {
      label: "Discover Forest Walk",
      href: "/forest-walk"
    }
  },
  {
    id: "urban-collection", 
    title: "MUREC Urban Collection",
    subtitle: "Modern Living Redefined",
    description: "Contemporary residences that celebrate urban sophistication while maintaining the tranquility of thoughtful design. Located in the heart of Bangalore's tech corridor.",
    image: "/images/counterbg2.jpg",
    features: ["Tech Hub Location", "Modern Design", "Smart Homes", "Premium Amenities"],
    cta: {
      label: "Explore Collection",
      href: "/urban-collection"
    }
  },
  {
    id: "heritage-homes",
    title: "MUREC Heritage",
    subtitle: "Timeless Elegance",
    description: "Where architectural heritage meets contemporary comfort. These homes honor traditional craftsmanship while embracing modern lifestyle needs.",
    image: "/images/counterbg3.jpg", 
    features: ["Heritage Design", "Premium Location", "Luxury Finishes", "Investment Grade"],
    cta: {
      label: "View Heritage",
      href: "/heritage"
    }
  }
];

export default function PropertiesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      // Initial animation on scroll trigger
      gsap.fromTo(".carousel-container",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Parallax effect on background images
      gsap.to(".slide-bg", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

    }, carouselRef);

    return () => ctx.revert();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % propertySlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Slide transition animation
  useEffect(() => {
    if (!slidesRef.current) return;

    const slides = slidesRef.current.children;
    const currentSlideEl = slides[currentSlide] as HTMLElement;

    // Hide all slides
    gsap.set(slides, { opacity: 0, scale: 1.05, y: 50 });
    
    // Show current slide with animation
    gsap.to(currentSlideEl, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "expo.out"
    });

    // Animate slide content
    const slideContent = currentSlideEl.querySelectorAll('.slide-content > *');
    gsap.fromTo(slideContent,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        delay: 0.3,
        ease: "expo.out" 
      }
    );

  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section 
      ref={carouselRef}
      className="properties-carousel murec-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "var(--color-void)",
        overflow: "hidden"
      }}
    >
      <div 
        className="carousel-container"
        style={{ 
          width: "100%", 
          opacity: 0,
          position: "relative",
          zIndex: 2
        }}
      >
        {/* Slides Container */}
        <div 
          ref={slidesRef}
          style={{
            position: "relative",
            height: "80vh",
            minHeight: "600px"
          }}
        >
          {propertySlides.map((slide, index) => (
            <div
              key={slide.id}
              className="carousel-slide"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                opacity: index === currentSlide ? 1 : 0
              }}
            >
              {/* Background Image */}
              <div style={{
                position: "absolute",
                inset: "-10%",
                zIndex: -1
              }}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="slide-bg"
                  style={{ objectFit: "cover", scale: 1.1 }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(8,8,10,0.8) 0%, rgba(8,8,10,0.6) 50%, rgba(8,8,10,0.9) 100%)"
                }} />
              </div>

              {/* Content */}
              <div className="murec-container" style={{ position: "relative", zIndex: 1 }}>
                <div className="grid-1-1" style={{ alignItems: "center", gap: "4rem" }}>
                  <div className="slide-content" style={{ maxWidth: "600px" }}>
                    <div style={{
                      padding: "6px 16px",
                      background: "rgba(196, 162, 101, 0.15)",
                      border: "1px solid rgba(196, 162, 101, 0.4)",
                      borderRadius: "20px",
                      display: "inline-block",
                      marginBottom: "1.5rem"
                    }}>
                      <span style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        fontWeight: 600
                      }}>
                        {slide.subtitle}
                      </span>
                    </div>

                    <h2 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                      fontWeight: 300,
                      lineHeight: 1.1,
                      marginBottom: "2rem"
                    }}>
                      {slide.title}
                    </h2>

                    <p style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.7,
                      marginBottom: "2.5rem",
                      color: "rgba(240,235,224,0.9)"
                    }}>
                      {slide.description}
                    </p>

                    {/* Features */}
                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                      marginBottom: "3rem"
                    }}>
                      {slide.features.map((feature) => (
                        <span
                          key={feature}
                          style={{
                            padding: "0.5rem 1rem",
                            background: "rgba(22, 22, 24, 0.6)",
                            border: "1px solid rgba(196, 162, 101, 0.2)",
                            borderRadius: "20px",
                            fontSize: "0.875rem",
                            color: "rgba(240,235,224,0.8)",
                            backdropFilter: "blur(10px)"
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={slide.cta.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "1rem 2rem",
                        background: "var(--color-gold)",
                        color: "var(--color-void)",
                        textDecoration: "none",
                        borderRadius: "50px",
                        fontSize: "1rem",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                        border: "2px solid var(--color-gold)"
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          background: "transparent",
                          color: "var(--color-gold)",
                          scale: 1.05,
                          duration: 0.3,
                          ease: "power2.out"
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          background: "var(--color-gold)",
                          color: "var(--color-void)", 
                          scale: 1,
                          duration: 0.3,
                          ease: "power2.out"
                        });
                      }}
                    >
                      {slide.cta.label}
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M1 8H15M15 8L9 2M15 8L9 14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div 
          className="navigation-dots"
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "0.75rem",
            zIndex: 10
          }}
        >
          {propertySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "2px solid rgba(240,235,224,0.3)",
                background: index === currentSlide ? "var(--color-gold)" : "transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
                outline: "none"
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{
          position: "absolute",
          bottom: "1rem",
          left: "var(--container-pad)",
          right: "var(--container-pad)",
          height: "2px",
          background: "rgba(240,235,224,0.1)",
          zIndex: 10
        }}>
          <div 
            style={{
              height: "100%",
              background: "var(--color-gold)",
              width: `${((currentSlide + 1) / propertySlides.length) * 100}%`,
              transition: "width 0.3s ease"
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          padding: 0 1rem;
        }

        .carousel-slide {
          min-height: 500px;
        }

        .slide-content {
          padding: 2rem 0;
        }

        @media (max-width: 1024px) {
          .carousel-slide {
            min-height: 70vh;
          }
          
          .slide-content {
            text-align: center;
            max-width: 100%;
          }
          
          .slide-content h2 {
            font-size: clamp(2rem, 5vw, 3.5rem);
          }
        }

        @media (max-width: 768px) {
          .carousel-container {
            padding: 0 0.5rem;
          }
          
          .carousel-slide {
            min-height: 60vh;
          }
          
          .slide-content {
            padding: 1.5rem 0;
          }
          
          .slide-content h2 {
            font-size: 2.25rem;
            margin-bottom: 1.5rem;
          }
          
          .slide-content p {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          
          .slide-content div[style*="display: flex"] {
            justify-content: center;
            gap: 0.5rem;
          }
          
          .slide-content div[style*="display: flex"] span {
            padding: 0.375rem 0.75rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .carousel-slide {
            min-height: 50vh;
          }
          
          .slide-content h2 {
            font-size: 1.875rem;
          }
          
          .slide-content a {
            padding: 0.875rem 1.5rem;
            font-size: 0.9rem;
          }
          
          .hero-scroll-indicator {
            bottom: 2rem;
          }
          
          .navigation-dots {
            bottom: 2rem;
            gap: 0.5rem;
          }
          
          .navigation-dots button {
            width: 10px;
            height: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-slide,
          .slide-content > * {
            animation: none !important;
            transition: none !important;
          }
          
          .slide-bg {
            transform: none !important;
          }
        }

        @media (orientation: landscape) and (max-height: 600px) {
          .carousel-slide {
            min-height: 100vh;
          }
        }
      `}</style>
    </section>
  );
}