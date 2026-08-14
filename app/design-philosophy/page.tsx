"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Energy Efficiency",
    desc: "Designed with climate-responsive planning and efficient systems to reduce energy consumption while enhancing everyday comfort.",
    img: "/images/dp1.jpg",
  },
  {
    title: "Water Stewardship",
    desc: "Integrated water management systems support conservation, reuse, and responsible consumption across the development.",
    img: "/images/dp2.jpg",
  },
  {
    title: "Sustainable Materials",
    desc: "Materials are chosen with an emphasis on durability, low environmental impact, and healthier indoor living environments.",
    img: "/images/dp3.jpg",
  },
  {
    title: "Indoor Environmental Quality",
    desc: "Enhanced natural daylighting, premium indoor air quality, and acoustic comfort to cultivate holistic well-being.",
    img: "/images/counterbg3.jpg",
  },
];

export default function DesignPhilosophyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        ".philosophy-intro-animate",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" }
      );

      // Section animations
      const sections = gsap.utils.toArray(".philosophy-block");
      sections.forEach((sec: any) => {
        const title = sec.querySelector(".philosophy-block__title");
        const desc = sec.querySelector(".philosophy-block__desc");
        const imgWrap = sec.querySelector(".philosophy-block__img-wrap");

        gsap.fromTo(
          [title, desc],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 70%",
            },
          }
        );

        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 65%",
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
      {/* Page Hero */}
      <section className="murec-section" style={{ minHeight: "65vh", display: "flex", alignItems: "center", paddingTop: "180px" }}>
        <div className="murec-container">
          <span className="text-label philosophy-intro-animate" style={{ display: "block", marginBottom: "1rem", opacity: 0 }}>
            Sustainability
          </span>
          <h1 className="text-display-xl philosophy-intro-animate" style={{ opacity: 0, marginBottom: "2rem" }}>
            Design<br /><em>Philosophy</em>
          </h1>
          <p className="text-body-lg philosophy-intro-animate" style={{ maxWidth: "600px", opacity: 0 }}>
            The first MUREC collection is envisioned to align with the IGBC certification standards, reflecting a commitment to responsible development. From efficient resource planning to healthier living environments, the project integrates sustainability as a core design principle.
          </p>
        </div>
      </section>

      {/* Sustainable Pillars List */}
      <div>
        {pillars.map((pillar, idx) => (
          <section key={idx} className="philosophy-block murec-section" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="murec-container">
              <div className={`grid-1-12 ${idx % 2 === 0 ? "" : "grid-reverse"}`}>
                <div style={{ order: idx % 2 === 0 ? 1 : 2 }}>
                  <span className="text-label" style={{ display: "block", marginBottom: "1.25rem" }}>Pillar 0{idx + 1}</span>
                  <h2 className="text-display-md philosophy-block__title" style={{ marginBottom: "1.5rem" }}>{pillar.title}</h2>
                  <p className="text-body-lg philosophy-block__desc">{pillar.desc}</p>
                </div>

                <div className="philosophy-block__img-wrap" style={{ order: idx % 2 === 0 ? 2 : 1, position: "relative", aspectRatio: "4/3", overflow: "hidden", clipPath: "inset(0 100% 0 0)" }}>
                  <Image
                    src={pillar.img}
                    alt={pillar.title}
                    fill
                    style={{ objectFit: "cover" }}
                    data-cursor="view"
                  />
                </div>
              </div>
            </div>
          </section>

        ))}
      </div>

      {/* Final Call to Action */}
      <section className="murec-section" style={{ background: "var(--color-charcoal)" }}>
        <div className="murec-cta">
          <span className="text-label" style={{ display: "block", marginBottom: "1rem" }}>Commitment to Nature</span>
          <h2 className="murec-cta__title">Sustainable <em>Future</em></h2>
          <p className="murec-cta__text">
            Discover a home built around principles of conservation, green building certification, and lasting ecological impact.
          </p>
          <Link href="/contact" className="murec-btn murec-btn--filled">
            Connect With Us <span className="murec-btn__arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
