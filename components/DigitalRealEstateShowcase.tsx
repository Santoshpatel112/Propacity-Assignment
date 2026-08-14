"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────
   DIGITAL BUILDING ANIMATION - 3D Wireframe Effect
   ──────────────────────────────────── */
function DigitalBuildingWireframe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame: number;
    let progress = 0;

    const drawBuilding = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const buildingHeight = 280;
      const buildingWidth = 160;

      ctx.strokeStyle = `rgba(196, 162, 101, ${0.3 + Math.sin(progress) * 0.2})`;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(196, 162, 101, 0.5)";

      // Draw building wireframe with construction animation
      const sections = 8;
      const sectionHeight = buildingHeight / sections;
      
      for (let i = 0; i <= sections; i++) {
        const constructionProgress = Math.min(1, Math.max(0, (progress - i * 0.3) / 2));
        if (constructionProgress <= 0) continue;

        const y = centerY + buildingHeight / 2 - i * sectionHeight;
        const width = buildingWidth - i * 8;
        
        ctx.globalAlpha = constructionProgress * 0.8;
        
        // Floor outline
        ctx.beginPath();
        ctx.moveTo(centerX - width / 2, y);
        ctx.lineTo(centerX + width / 2, y);
        ctx.lineTo(centerX + width / 2 + 30, y - 20);
        ctx.lineTo(centerX - width / 2 + 30, y - 20);
        ctx.closePath();
        ctx.stroke();

        // Vertical lines
        for (let j = 0; j < 4; j++) {
          const x = centerX - width / 2 + (width / 3) * j;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 30, y - 20);
          if (i > 0) {
            ctx.lineTo(x + 30, y - 20 - sectionHeight);
          }
          ctx.stroke();
        }

        // Windows with glow
        if (i > 0 && constructionProgress > 0.5) {
          for (let w = 0; w < 3; w++) {
            const wx = centerX - width / 2 + 20 + w * 40;
            const wy = y - sectionHeight / 2;
            
            ctx.fillStyle = `rgba(196, 162, 101, ${constructionProgress * 0.6})`;
            ctx.fillRect(wx, wy, 25, 15);
          }
        }
      }

      // Digital grid lines
      ctx.strokeStyle = "rgba(196, 162, 101, 0.15)";
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.4;
      
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (canvas.height / 10) * i);
        ctx.lineTo(canvas.width, (canvas.height / 10) * i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo((canvas.width / 10) * i, 0);
        ctx.lineTo((canvas.width / 10) * i, canvas.height);
        ctx.stroke();
      }

      progress += 0.015;
      animationFrame = requestAnimationFrame(drawBuilding);
    };

    drawBuilding();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "450px",
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, rgba(196, 162, 101, 0.05), transparent 70%)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

/* ────────────────────────────────────
   DIGITAL PROPERTY CARD - Holographic Effect
   ──────────────────────────────────── */
function DigitalPropertyCard({
  title,
  value,
  icon,
  delay = 0,
}: {
  title: string;
  value: string;
  icon: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { 
        opacity: 0, 
        y: 50, 
        rotateX: -20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        delay,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );

    // Floating animation
    gsap.to(cardRef.current, {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="digital-property-card"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, rgba(13, 13, 15, 0.9), rgba(22, 22, 24, 0.9))",
        border: "1px solid rgba(196, 162, 101, 0.3)",
        borderRadius: "20px",
        padding: "2rem",
        overflow: "hidden",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        perspective: "1000px",
        opacity: 0,
      }}
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.3,
          ease: "power2.out",
        });

        // Update holographic gradient position
        const gradient = card.querySelector(".holographic-gradient") as HTMLElement;
        if (gradient) {
          gradient.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(196, 162, 101, 0.3), transparent 60%)`;
        }
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }}
    >
      {/* Holographic gradient overlay */}
      <div
        className="holographic-gradient"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(196, 162, 101, 0.2), transparent 60%)",
          pointerEvents: "none",
          transition: "background 0.1s ease",
        }}
      />

      {/* Animated border glow */}
      <div
        style={{
          position: "absolute",
          inset: -2,
          background: "linear-gradient(45deg, transparent, rgba(196, 162, 101, 0.5), transparent)",
          borderRadius: "20px",
          opacity: 0,
          animation: "borderRotate 3s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            filter: "drop-shadow(0 0 15px rgba(196, 162, 101, 0.4))",
          }}
        >
          {icon}
        </div>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            fontWeight: 300,
            color: "var(--color-gold)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(240, 235, 224, 0.7)",
            fontWeight: 500,
          }}
        >
          {title}
        </p>
      </div>

      {/* Corner accents */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "30px",
        height: "30px",
        borderTop: "2px solid var(--color-gold)",
        borderLeft: "2px solid var(--color-gold)",
        borderTopLeftRadius: "20px",
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "30px",
        height: "30px",
        borderBottom: "2px solid var(--color-gold)",
        borderRight: "2px solid var(--color-gold)",
        borderBottomRightRadius: "20px",
      }} />
    </div>
  );
}

/* ────────────────────────────────────
   PARTICLE SYSTEM - Digital Rain Effect
   ──────────────────────────────────── */
function DigitalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }

    let animationFrame: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(196, 162, 101, ${particle.opacity})`;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);

        particle.y += particle.speed;

        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.3,
      }}
    />
  );
}

/* ────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────── */
export default function DigitalRealEstateShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // Text glitch effect
      const letters = headingRef.current.querySelectorAll(".glitch-letter");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="digital-real-estate-section"
      style={{
        position: "relative",
        background: "var(--color-void)",
        padding: "var(--space-2xl) 0",
        overflow: "hidden",
      }}
    >
      {/* Digital particles background */}
      <DigitalParticles />

      {/* Section header */}
      <div className="murec-container" style={{ marginBottom: "4rem", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              padding: "8px 20px",
              background: "rgba(196, 162, 101, 0.15)",
              border: "1px solid rgba(196, 162, 101, 0.4)",
              borderRadius: "30px",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: "2rem",
              fontWeight: 600,
            }}
          >
            ⚡ Digital Real Estate Innovation
          </span>

          <h2
            ref={headingRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              opacity: 0,
            }}
          >
            {["The", " ", "Future", " ", "of", " "].map((word, i) => (
              <span
                key={i}
                className="glitch-letter"
                style={{
                  display: "inline-block",
                  color: word.trim() ? "#FAFAF8" : "transparent",
                }}
              >
                {word}
              </span>
            ))}
            <br />
            <em style={{ color: "var(--color-gold)" }}>
              {["Digital", " ", "Real", " ", "Estate"].map((word, i) => (
                <span
                  key={`em-${i}`}
                  className="glitch-letter"
                  style={{ display: "inline-block" }}
                >
                  {word}
                </span>
              ))}
            </em>
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(240, 235, 224, 0.85)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Experience property visualization like never before. Advanced 3D modeling, 
            virtual tours, smart home integration, and blockchain-verified ownership 
            revolutionize how you invest in real estate.
          </p>
        </div>
      </div>

      {/* 3D Building Wireframe */}
      <div className="murec-container" style={{ marginBottom: "5rem", position: "relative", zIndex: 2 }}>
        <DigitalBuildingWireframe />
        
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              fontWeight: 600,
            }}
          >
            🏗️ Real-time 3D Construction Visualization
          </p>
        </div>
      </div>

      {/* Digital Property Features */}
      <div className="murec-container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          <DigitalPropertyCard
            icon="🏠"
            value="Virtual Tours"
            title="360° Immersive Experience"
            delay={0.1}
          />
          <DigitalPropertyCard
            icon="📱"
            value="Smart Home"
            title="IoT Integration"
            delay={0.2}
          />
          <DigitalPropertyCard
            icon="🔐"
            value="Blockchain"
            title="Verified Ownership"
            delay={0.3}
          />
          <DigitalPropertyCard
            icon="🤖"
            value="AI Analytics"
            title="Price Prediction"
            delay={0.4}
          />
        </div>
      </div>

      {/* Technology Stack */}
      <div
        className="murec-container"
        style={{
          marginTop: "5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            background: "rgba(22, 22, 24, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(196, 162, 101, 0.2)",
            borderRadius: "24px",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 300,
              color: "var(--color-gold)",
              marginBottom: "2rem",
            }}
          >
            Powered by <em>Advanced Technology</em>
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {[
              "3D Modeling",
              "Virtual Reality",
              "Augmented Reality",
              "AI & Machine Learning",
              "Blockchain",
              "IoT Sensors",
              "Big Data Analytics",
              "Cloud Computing",
            ].map((tech, i) => (
              <span
                key={i}
                style={{
                  padding: "10px 24px",
                  background: "rgba(196, 162, 101, 0.1)",
                  border: "1px solid rgba(196, 162, 101, 0.3)",
                  borderRadius: "30px",
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  color: "rgba(240, 235, 224, 0.9)",
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes borderRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .digital-property-card:hover {
          border-color: rgba(196, 162, 101, 0.6);
        }

        @media (max-width: 768px) {
          .digital-property-card {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
