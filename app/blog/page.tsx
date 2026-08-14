"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export const blogArticles = [
  {
    slug: "3-bhk-vs-4-bhk-luxury-apartments",
    title: "3 BHK vs 4 BHK Luxury Apartments: Choosing the Right Home",
    date: "August 2026",
    tag: "Luxury Living",
    img: "/images/banner.jpg",
    desc: "Choosing between 3 BHK and 4 BHK luxury residences requires balancing family growth, space planning, and capital appreciation potential.",
  },
  {
    slug: "legal-checklist-before-buying-luxury-apartments",
    title: "Legal Checklist Before Buying Luxury Apartments",
    date: "August 2026",
    tag: "Legal & RERA",
    img: "/images/about-img.jpg",
    desc: "Key legal due diligence essentials every luxury buyer should check—from RERA registrations to clear land titles and builder-buyer agreements.",
  },
  {
    slug: "what-to-look-for-when-buying-luxury-apartments",
    title: "What to Look for When Buying Luxury Apartments in NCR",
    date: "July 2026",
    tag: "Guide",
    img: "/images/dp1.jpg",
    desc: "From low-density floorplans to IGBC green building certifications, explore what defines genuine luxury in today's high-rise market.",
  },
  {
    slug: "luxury-apartments-in-ghaziabad",
    title: "Luxury Living in Ghaziabad: The Rise of Forest Walk, Dasna",
    date: "July 2026",
    tag: "Market Trends",
    img: "/images/about-forest.webp",
    desc: "How NH-24 and Eastern Peripheral Expressway connectivity have transformed Dasna into an exclusive sanctuary for gated villas.",
  },
];

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        ".blog-intro-animate",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" }
      );

      // Stagger job/article cards
      gsap.fromTo(
        ".blog-card-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "expo.out", delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featured = blogArticles[0];
  const gridArticles = blogArticles.slice(1);

  return (
    <div ref={containerRef} style={{ background: "var(--color-void)", color: "var(--color-text-primary)", overflow: "hidden" }}>
      {/* Editorial Header */}
      <section className="murec-section" style={{ minHeight: "55vh", display: "flex", alignItems: "center", paddingTop: "180px" }}>
        <div className="murec-container">
          <span className="text-label blog-intro-animate" style={{ display: "block", marginBottom: "1rem", opacity: 0 }}>
            Insights & Journal
          </span>
          <h1 className="text-display-xl blog-intro-animate" style={{ opacity: 0, marginBottom: "2rem" }}>
            The MUREC<br /><em>Journal</em>
          </h1>
          <p className="text-body-lg blog-intro-animate" style={{ maxWidth: "600px", opacity: 0 }}>
            Perspectives, architectural insights, and strategic legal guidelines for luxury real estate investments in NCR.
          </p>
        </div>
      </section>

      {/* Featured Article Spot */}
      {featured && (
        <section className="murec-section" style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="murec-container">
            <div className="blog-card-reveal grid-12-1" style={{ opacity: 0 }}>
              <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  style={{ objectFit: "cover" }}
                  data-cursor="view"
                />
              </div>

              <div>
                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "1.5rem" }}>
                  <span>{featured.tag}</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>{featured.date}</span>
                </div>
                <h2 className="text-display-sm" style={{ marginBottom: "1.5rem" }}>{featured.title}</h2>
                <p className="text-body-lg" style={{ marginBottom: "2.5rem" }}>{featured.desc}</p>
                <Link href={`/blog/${featured.slug}`} className="murec-btn">
                  Read Full Article <span className="murec-btn__arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Articles */}
      <section className="murec-section">
        <div className="murec-container">
          <div className="grid-3col">
            {gridArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="murec-card blog-card-reveal" style={{ opacity: 0 }}>
                <div className="murec-card__image" style={{ aspectRatio: "3/2" }}>
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                    data-cursor="view"
                  />
                </div>
                <div className="murec-card__content">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--color-gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    <span>{article.tag}</span>
                    <span style={{ color: "var(--color-text-secondary)" }}>{article.date}</span>
                  </div>
                  <h3 className="murec-card__title" style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>{article.title}</h3>
                  <p className="text-body" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
