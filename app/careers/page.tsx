"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const roles = [
  {
    role: "Sales Associate",
    exp: "1-2 Years in Real Estate / Client Facing",
    location: "Noida, Sector 136",
  },
  {
    role: "Project Architect",
    exp: "5-7 Years in residential real estate design",
    location: "Noida, Sector 136",
  },
  {
    role: "Marketing Manager",
    exp: "4-6 Years in brand & performance marketing",
    location: "Noida, Sector 136",
  },
];

export default function CareersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page reveals
      gsap.fromTo(
        ".career-intro-animate",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" }
      );

      // Stagger job cards
      gsap.fromTo(
        ".job-card-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "expo.out", delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div ref={containerRef} style={{ background: "var(--color-void)", color: "var(--color-text-primary)", overflow: "hidden" }}>
      {/* Editorial Header */}
      <section className="murec-section" style={{ minHeight: "65vh", display: "flex", alignItems: "center", paddingTop: "180px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/career.jpg"
            alt="MUREC Corporate Careers — Build Your Career with MUREC"
            fill
            style={{ objectFit: "cover", opacity: 0.25 }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--color-void) 0%, rgba(8,8,10,0.5) 60%, var(--color-void) 100%)" }} />
        </div>

        <div className="murec-container" style={{ position: "relative", zIndex: 2 }}>
          <span className="text-label career-intro-animate" style={{ display: "block", marginBottom: "1rem", opacity: 0 }}>
            Join The Team
          </span>
          <h1 className="text-display-xl career-intro-animate" style={{ opacity: 0, marginBottom: "2rem" }}>
            Careers at<br /><em>MUREC</em>
          </h1>
          <p className="text-body-lg career-intro-animate" style={{ maxWidth: "600px", opacity: 0 }}>
            Join us at MUREC, where legacy meets purpose and every role is an opportunity to build more than just structures, it&apos;s to build trust. We believe in fairness, transparency, and giving you the space to grow with values.
          </p>
        </div>
      </section>

      {/* Job Roles Grid */}
      <section className="murec-section" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="murec-container">
          <div style={{ marginBottom: "var(--space-2xl)" }}>
            <span className="text-label">Open Positions</span>
            <h2 className="text-display-md" style={{ marginTop: "0.5rem" }}>
              Current <em>Opportunities</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.5rem" }}>
            {roles.map((item, idx) => (
              <div key={idx} className="job-card job-card-reveal" style={{ opacity: 0 }}>
                <span className="text-label" style={{ display: "block", marginBottom: "0.75rem" }}>Role</span>
                <h3 className="job-card__role">{item.role}</h3>
                
                <div className="job-card__detail">
                  <span className="job-card__detail-icon">■</span>
                  <span><strong>Experience:</strong> {item.exp}</span>
                </div>
                
                <div className="job-card__detail" style={{ marginBottom: "2rem" }}>
                  <span className="job-card__detail-icon">■</span>
                  <span><strong>Location:</strong> {item.location}</span>
                </div>

                <a href={`mailto:careers@murec.com?subject=Application for ${item.role}`} className="murec-btn" style={{ width: "100%", justifyContent: "center" }}>
                  Apply Now <span className="murec-btn__arrow">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="murec-section" style={{ background: "var(--color-charcoal)", borderTop: "1px solid var(--color-border)" }}>
        <div className="murec-container" style={{ maxWidth: "var(--container-narrow)" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="text-label">Get In Touch</span>
            <h2 className="text-display-md" style={{ marginTop: "0.5rem" }}>Submit Your <em>Resume</em></h2>
            <p className="text-body" style={{ marginTop: "1rem" }}>
              Please share your updated resume along with a brief introduction. Our team will review your profile and get back to you.
            </p>
          </div>

          {submitted ? (
            <div style={{ background: "rgba(196,162,101,0.05)", border: "1px solid var(--color-gold)", padding: "3rem", borderRadius: "12px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-gold)", marginBottom: "1rem" }}>Thank You</h3>
              <p className="text-body">Your application has been received. Our HR team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleApply}>
              <div className="murec-form__group">
                <label className="murec-form__label">Full Name</label>
                <input 
                  className="murec-form__input" 
                  type="text" 
                  required 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="murec-form__group">
                <label className="murec-form__label">Email Address</label>
                <input 
                  className="murec-form__input" 
                  type="email" 
                  required 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="murec-form__group">
                <label className="murec-form__label">Preferred Role</label>
                <select 
                  className="murec-form__select" 
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="">Select a role...</option>
                  <option value="Sales Associate">Sales Associate</option>
                  <option value="Project Architect">Project Architect</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Other">Other / General Application</option>
                </select>
              </div>
              <div className="murec-form__group">
                <label className="murec-form__label">Brief Bio / Introduction</label>
                <textarea 
                  className="murec-form__textarea" 
                  required 
                  placeholder="Introduce yourself and your experience..." 
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
              
              <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <button type="submit" className="murec-btn murec-btn--filled">
                  Submit Application <span className="murec-btn__arrow">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
