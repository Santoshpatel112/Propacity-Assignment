"use client";

import Image from "next/image";

const associations = [
  { name: "Indian Green Building Council (IGBC)", tag: "Sustainability Partner", logo: "/images/o1.png" },
  { name: "HDFC Bank", tag: "Financial Institution", logo: "/images/hdfc.svg" },
  { name: "Bobby Mukherrji Architects", tag: "Interior & Architecture Visionary", logo: "/images/o2.png" },
  { name: "Design Forum International", tag: "Architectural Planning", logo: "/images/o3.png" },
  { name: "ICICI Bank", tag: "Banking Partner", logo: "/images/o4.png" },
  { name: "YES Bank", tag: "Financial Partner", logo: "/images/o5.png" },
  { name: "CREDAI", tag: "Real Estate Development", logo: "/images/o6.png" },
  { name: "State Bank of India", tag: "Banking Partner", logo: "/images/o7.png" },
  { name: "Axis Bank", tag: "Financial Institution", logo: "/images/o8.png" },
  { name: "UP RERA", tag: "Regulatory Body", logo: "/images/o9.png" },
];

export default function HomeAssociations() {
  return (
    <section className="murec-section murec-section--dark" style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", overflow: "hidden" }}>
      <div className="murec-container" style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="text-label" style={{ display: "block", marginBottom: "0.75rem" }}>
              Network & Alliances
            </span>
            <h2 className="text-display-md">
              Our <em>Associations</em>
            </h2>
          </div>
          <p className="text-body" style={{ maxWidth: "360px" }}>
            Institutions, banking partners, and design visionaries that share the MUREC commitment to excellence.
          </p>
        </div>
      </div>

      {/* Infinite Animated Marquee */}
      <div className="murec-marquee">
        <div className="murec-marquee__track">
          {associations.concat(associations).concat(associations).map((item, idx) => (
            <div key={idx} className="murec-marquee__item">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="murec-marquee__name">{item.name}</span>
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)", opacity: 0.8 }}>
                  {item.tag}
                </span>
              </div>
              {item.logo && (
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={90}
                  height={35}
                  className="murec-marquee__logo"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              )}
              <span className="murec-marquee__dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
