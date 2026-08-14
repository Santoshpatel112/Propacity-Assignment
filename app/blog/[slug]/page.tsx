"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const blogDetails: Record<
  string,
  {
    title: string;
    date: string;
    tag: string;
    img: string;
    content: string[];
  }
> = {
  "3-bhk-vs-4-bhk-luxury-apartments": {
    title: "3 BHK vs 4 BHK Luxury Apartments: Choosing the Right Home",
    date: "August 2026",
    tag: "Luxury Living",
    img: "/images/banner.jpg",
    content: [
      "Choosing between a 3 BHK and a 4 BHK luxury apartment is one of the most critical decisions for discerning homebuyers. In high-end developments, the choice extends far beyond merely adding an extra bedroom—it defines spatial flow, long-term family flexibility, and lifestyle comfort.",
      "A 4 BHK floor plan allows dedicated zoning for home offices, wellness rooms, or private guest suites without encroaching on primary family spaces. With expansive balconies and high ceilings, these residences provide unprecedented breathing room.",
      "From an investment perspective, luxury 4 BHK residences in prime locations such as Noida Sector 136 and Dasna have consistently commanded higher rental yields and robust capital appreciation due to limited supply in low-density developments.",
    ],
  },
  "legal-checklist-before-buying-luxury-apartments": {
    title: "Legal Checklist Before Buying Luxury Apartments",
    date: "August 2026",
    tag: "Legal & RERA",
    img: "/images/about-img.jpg",
    content: [
      "When purchasing a premium residence, complete legal clarity is non-negotiable. At MUREC, transparency is a foundational principle guiding all development documentation.",
      "1. RERA Registration: Always verify the active RERA registration number and quarterly project filings on the state RERA portal.",
      "2. Clear Land Title: Ensure the developer has unencumbered ownership of the land parcel with clear non-agricultural conversion and sanctioned layout plans.",
      "3. Environmental and Authority Approvals: Confirm fire NOCs, environmental clearances, and height permissions from competent authorities.",
    ],
  },
  "what-to-look-for-when-buying-luxury-apartments": {
    title: "What to Look for When Buying Luxury Apartments in NCR",
    date: "July 2026",
    tag: "Guide",
    img: "/images/dp1.jpg",
    content: [
      "True luxury is defined by privacy, density, and thoughtful architecture. As NCR urban density increases, gated low-density communities with expansive open spaces stand out as rare sanctuaries.",
      "Look for IGBC green building certifications that guarantee energy efficiency, superior indoor air quality, and responsible water stewardship.",
      "Architectural partnerships with renowned planners and interior designers ensure enduring aesthetic appeal and functional elegance.",
    ],
  },
  "luxury-apartments-in-ghaziabad": {
    title: "Luxury Living in Ghaziabad: The Rise of Forest Walk, Dasna",
    date: "July 2026",
    tag: "Market Trends",
    img: "/images/about-forest.webp",
    content: [
      "Dasna in Ghaziabad has emerged as an ultra-luxury residential corridor thanks to direct access to NH-24 (Delhi-Meerut Expressway) and the Eastern Peripheral Expressway.",
      "Forest Walk by MUREC introduces a rare 97-villa sanctuary shaped around living forest ecosystems, cascading water bodies, and private lawns.",
      "Reaching central Delhi and Akshardham in just 30 minutes, residents enjoy unmatched urban connectivity paired with tranquil woodland stillness.",
    ],
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const post = blogDetails[unwrappedParams.slug];

  if (!post) {
    notFound();
  }

  return (
    <div style={{ background: "var(--color-void)", color: "var(--color-text-primary)", minHeight: "100vh", paddingTop: "140px", paddingBottom: "100px" }}>
      <div className="murec-container" style={{ maxWidth: "800px" }}>
        <Link href="/blog" className="murec-text-link" style={{ marginBottom: "2.5rem" }}>
          ← Back to Journal
        </Link>

        <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "1rem" }}>
          <span>{post.tag}</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ color: "var(--color-text-secondary)" }}>{post.date}</span>
        </div>

        <h1 className="text-display-sm" style={{ marginBottom: "2.5rem", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}>
          {post.title}
        </h1>

        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", marginBottom: "3rem" }}>
          <Image
            src={post.img}
            alt={post.title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="article-content" style={{ padding: 0 }}>
          {post.content.map((p, i) => (
            <p key={i} style={{ marginBottom: "1.5rem" }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
