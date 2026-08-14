"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro reveals
      gsap.fromTo(
        ".contact-intro-animate",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" }
      );

      // Stagger sections
      gsap.fromTo(
        ".contact-slide-in",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "expo.out", delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
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
      {/* Page Header */}
      <section className="murec-section" style={{ minHeight: "55vh", display: "flex", alignItems: "center", paddingTop: "180px" }}>
        <div className="murec-container">
          <span className="text-label contact-intro-animate" style={{ display: "block", marginBottom: "1rem", opacity: 0 }}>
            Connect
          </span>
          <h1 className="text-display-xl contact-intro-animate" style={{ opacity: 0, marginBottom: "2rem" }}>
            Get In<br /><em>Touch</em>
          </h1>
          <p className="text-body-lg contact-intro-animate" style={{ maxWidth: "600px", opacity: 0 }}>
            Looking to collaborate, invest, or simply know more? Reach out and let&apos;s connect.
          </p>
        </div>
      </section>

      {/* Grid of contact card + form */}
      <section className="murec-section" style={{ borderTop: "1px solid var(--color-border)", paddingBottom: "100px" }}>
        <div className="murec-container">
          <div className="contact-grid grid-2col" style={{ alignItems: "start" }}>
            {/* Contact Details */}
            <div className="contact-slide-in" style={{ background: "var(--color-charcoal)", padding: "3.5rem 3rem", border: "1px solid var(--color-border)", opacity: 0 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "2rem" }}>THE MUREC Team</h3>

              <div style={{ marginBottom: "2rem" }}>
                <span className="text-label" style={{ display: "block", marginBottom: "0.5rem" }}>Corporate Address</span>
                <p className="text-body" style={{ color: "var(--color-cream)" }}>
                  Madhusudan, 2nd Floor, Riana Towers, 51-52, Noida Sector 136, Uttar Pradesh - 201301
                </p>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <span className="text-label" style={{ display: "block", marginBottom: "0.5rem" }}>Email Address</span>
                <a href="mailto:info@murec.com" className="text-display-sm" style={{ fontSize: "1.4rem", color: "var(--color-gold)", textDecoration: "none" }}>
                  info@murec.com
                </a>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <span className="text-label" style={{ display: "block", marginBottom: "0.5rem" }}>Phone Number</span>
                <a href="tel:+919717773229" className="text-display-sm" style={{ fontSize: "1.4rem", color: "var(--color-cream)", textDecoration: "none" }}>
                  +91 97177 73229
                </a>
              </div>

              <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", marginTop: "3rem" }}>
                <Image
                  src="/images/counterbg1.jpg"
                  alt="MUREC Noida Headquarters Office"
                  fill
                  style={{ objectFit: "cover", opacity: 0.7 }}
                />
              </div>
            </div>

            {/* Message form */}
            <div className="contact-slide-in" style={{ background: "var(--color-charcoal)", padding: "3.5rem 3rem", border: "1px solid var(--color-border)", opacity: 0 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "2.5rem" }}>Send A Message</h3>

              {submitted ? (
                <div style={{ background: "rgba(196,162,101,0.05)", border: "1px solid var(--color-gold)", padding: "3rem", borderRadius: "12px", textAlign: "center" }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-gold)", marginBottom: "1.25rem" }}>
                    Message Received
                  </h4>
                  <p className="text-body" style={{ color: "var(--color-cream)" }}>
                    Thank you for contacting MUREC. Our private client team will connect with you promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <div className="murec-form__group">
                    <label className="murec-form__label">Full Name *</label>
                    <input
                      required
                      className="murec-form__input"
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="grid-2col">
                    <div className="murec-form__group">
                      <label className="murec-form__label">Email *</label>
                      <input
                        required
                        className="murec-form__input"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="murec-form__group">
                      <label className="murec-form__label">Phone Number *</label>
                      <input
                        required
                        className="murec-form__input"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="murec-form__group">
                    <label className="murec-form__label">Message / Requirement</label>
                    <textarea
                      className="murec-form__textarea"
                      placeholder="Tell us about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div style={{ marginTop: "1.5rem" }}>
                    <button type="submit" className="murec-btn murec-btn--filled" style={{ width: "100%", justifyContent: "center" }}>
                      Submit Inquiry <span className="murec-btn__arrow">→</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
