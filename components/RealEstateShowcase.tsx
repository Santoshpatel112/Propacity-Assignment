"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PropertyCard {
  id: string;
  title: string;
  location: string;
  type: string;
  price: string;
  area: string;
  image: string;
  status: "Available" | "Sold Out" | "Coming Soon";
  features: string[];
}

const properties: PropertyCard[] = [
  {
    id: "forest-walk",
    title: "MUREC Forest Walk",
    location: "Whitefield, Bangalore",
    type: "Premium Gated Villas",
    price: "₹2.5 Cr Onwards",
    area: "3000+ Sq Ft",
    image: "/images/about-forest.webp",
    status: "Available",
    features: ["IGBC Certified", "Landscape Design", "Premium Amenities", "Gated Community"]
  },
  {
    id: "heritage-homes",
    title: "MUREC Heritage",
    location: "Koramangala, Bangalore", 
    type: "Luxury Apartments",
    price: "₹1.8 Cr Onwards",
    area: "2200+ Sq Ft",
    image: "/images/counterbg2.jpg",
    status: "Coming Soon",
    features: ["Central Location", "Heritage Architecture", "Modern Amenities", "Investment Grade"]
  },
  {
    id: "urban-edge",
    title: "MUREC Urban Edge",
    location: "Electronic City, Bangalore",
    type: "Contemporary Residences", 
    price: "₹95 L Onwards",
    area: "1400+ Sq Ft",
    image: "/images/counterbg3.jpg",
    status: "Available",
    features: ["Tech Hub Proximity", "Modern Design", "Smart Homes", "Investment Opportunity"]
  }
];

export default function RealEstateShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeProperty, setActiveProperty] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(".showcase-title", 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(".property-card", 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8,
          rotateX: 15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.4,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Parallax effect on cards
      gsap.to(".property-card", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Image parallax within cards
      gsap.to(".card-image", {
        y: 20,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: 2
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const image = card.querySelector('.card-image');
    const overlay = card.querySelector('.card-overlay');
    
    gsap.to(card, {
      y: -10,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(image, {
      scale: 1.1,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.to(overlay, {
      background: "linear-gradient(180deg, rgba(8,8,10,0.1) 0%, rgba(8,8,10,0.7) 70%, rgba(8,8,10,0.95) 100%)",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const image = card.querySelector('.card-image');
    const overlay = card.querySelector('.card-overlay');
    
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)"
    });

    gsap.to(image, {
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(overlay, {
      background: "linear-gradient(180deg, rgba(8,8,10,0.2) 0%, rgba(8,8,10,0.7) 70%, rgba(8,8,10,0.9) 100%)",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="real-estate-showcase murec-section murec-section--charcoal"
      style={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="murec-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="showcase-title" style={{ opacity: 0 }}>
            <span 
              className="text-label"
              style={{ 
                display: "block", 
                marginBottom: "1.5rem",
                color: "var(--color-gold)" 
              }}
            >
              Portfolio
            </span>
            <h2 
              className="text-display-xl"
              style={{ 
                marginBottom: "2rem",
                maxWidth: "800px",
                margin: "0 auto 2rem"
              }}
            >
              Premium <em>Real Estate</em> Collection
            </h2>
            <p 
              className="text-body-lg"
              style={{ 
                maxWidth: "600px",
                margin: "0 auto",
                color: "rgba(240,235,224,0.85)"
              }}
            >
              Discover our meticulously crafted developments that redefine luxury living. Each project reflects our commitment to quality, innovation, and timeless design.
            </p>
          </div>
        </div>

        {/* Property Cards Grid */}
        <div 
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "2.5rem",
            perspective: "1000px"
          }}
        >
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="property-card"
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(22, 22, 24, 0.8)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(196, 162, 101, 0.15)",
                cursor: "pointer",
                opacity: 0,
                aspectRatio: "3/4"
              }}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {/* Property Image */}
              <div style={{ 
                position: "relative", 
                height: "60%", 
                overflow: "hidden" 
              }}>
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="card-image"
                  style={{ 
                    objectFit: "cover",
                    scale: 1.05,
                    transition: "transform 0.8s ease-out"
                  }}
                />
                
                {/* Status Badge */}
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: property.status === "Available" 
                    ? "rgba(34, 197, 94, 0.9)"
                    : property.status === "Coming Soon"
                    ? "rgba(234, 179, 8, 0.9)" 
                    : "rgba(239, 68, 68, 0.9)",
                  color: "white",
                  backdropFilter: "blur(10px)"
                }}>
                  {property.status}
                </div>

                {/* Gradient Overlay */}
                <div 
                  className="card-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(8,8,10,0.2) 0%, rgba(8,8,10,0.7) 70%, rgba(8,8,10,0.9) 100%)",
                    zIndex: 1
                  }}
                />
              </div>

              {/* Property Details */}
              <div style={{ 
                padding: "2rem", 
                height: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 2
              }}>
                <div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <h3 style={{
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      marginBottom: "0.25rem",
                      color: "var(--color-cream)"
                    }}>
                      {property.title}
                    </h3>
                    <p style={{
                      fontSize: "0.9rem",
                      color: "rgba(240,235,224,0.7)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {property.location}
                    </p>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem"
                  }}>
                    <div>
                      <span style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(240,235,224,0.6)",
                        display: "block",
                        marginBottom: "0.25rem"
                      }}>
                        Price
                      </span>
                      <span style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--color-gold)"
                      }}>
                        {property.price}
                      </span>
                    </div>
                    <div>
                      <span style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase", 
                        letterSpacing: "0.1em",
                        color: "rgba(240,235,224,0.6)",
                        display: "block",
                        marginBottom: "0.25rem"
                      }}>
                        Area
                      </span>
                      <span style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--color-cream)"
                      }}>
                        {property.area}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/${property.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "30px",
                    border: "1px solid rgba(196, 162, 101, 0.4)",
                    background: "rgba(196, 162, 101, 0.1)",
                    color: "var(--color-gold)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    justifyContent: "center"
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      background: "var(--color-gold)",
                      color: "var(--color-void)",
                      borderColor: "var(--color-gold)",
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      background: "rgba(196, 162, 101, 0.1)",
                      color: "var(--color-gold)",
                      borderColor: "rgba(196, 162, 101, 0.4)",
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                >
                  Explore Project
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 8H15M15 8L9 2M15 8L9 14"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .property-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        
        @media (max-width: 1200px) {
          .murec-container > div:first-of-type {
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .property-card {
            aspect-ratio: 4/5;
            margin: 0 auto;
            max-width: 400px;
          }
          
          .showcase-title h2 {
            font-size: clamp(2rem, 6vw, 2.5rem);
            line-height: 1.2;
          }
          
          .showcase-title p {
            font-size: 1rem;
            padding: 0 1rem;
          }
          
          .murec-container > div:first-of-type {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .property-card {
            aspect-ratio: 3/4;
            max-width: 320px;
          }
          
          .property-card > div:last-child {
            padding: 1.5rem;
          }
          
          .property-card h3 {
            font-size: 1.25rem;
          }
          
          .property-card > div:last-child > div:nth-child(2) {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            text-align: center;
          }
          
          .showcase-title {
            margin-bottom: 3rem;
          }
          
          .showcase-title h2 {
            font-size: 1.875rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .property-card {
            animation: none !important;
            transition: none !important;
          }
          
          .card-image {
            transition: none !important;
          }
          
          .showcase-title,
          .showcase-title * {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-height: 600px) and (orientation: landscape) {
          .property-card {
            aspect-ratio: 5/3;
          }
          
          .property-card > div:first-child {
            height: 70%;
          }
          
          .property-card > div:last-child {
            height: 30%;
            padding: 1rem;
          }
        }

        @media (hover: none) {
          .property-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}