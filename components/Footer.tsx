import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="murec-footer">
      <div className="murec-container">
        <div className="murec-footer__grid">
          {/* Brand Column */}
          <div className="murec-footer__brand">
            <Link href="/" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
              <Image
                src="/images/murec.png"
                alt="MUREC"
                width={120}
                height={30}
                style={{ height: "auto" }}
              />
            </Link>
            <h3 className="murec-footer__heading">THE MUREC Team</h3>
            <div className="murec-footer__text">
              <p style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "var(--color-cream)", fontWeight: 500 }}>Corporate Address:</strong><br />
                Madhusudan, 2nd Floor, Riana Towers, 51-52, Noida Sector 136, Uttar Pradesh - 201301
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong style={{ color: "var(--color-cream)", fontWeight: 500 }}>Email</strong><br />
                <a href="mailto:info@murec.com">info@murec.com</a>
              </p>
              <p>
                <strong style={{ color: "var(--color-cream)", fontWeight: 500 }}>Phone</strong><br />
                <a href="tel:+919717773229" style={{ color: "var(--color-cream)" }}>+91 97177 73229</a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="murec-footer__col-title">Navigation</h4>
            <ul className="murec-footer__links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/legacy">Our Legacy</Link></li>
              <li><Link href="/forest-walk">The MUREC Collection</Link></li>
              <li><Link href="/design-philosophy">Design Philosophy</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="murec-footer__col-title">Company</h4>
            <ul className="murec-footer__links">
              <li><Link href="/principles">Living By Principles</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/news">News & Insights</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="murec-footer__col-title">Connect</h4>
            <ul className="murec-footer__links">
              <li><a href="https://www.instagram.com/murec_official/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.youtube.com/@Murec_official" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://www.facebook.com/people/Murec/61586724462166/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="murec-footer__disclaimer">
          This website is purely conceptual and not a legal document. All layouts, specifications, amenities, and visuals are subject to change as may be decided by MUREC or the competent authority. No information herein shall be construed as an offer, solicitation, or invitation to purchase. Interested parties are requested to verify all details, including approvals, specifications, and prices, directly with MUREC before making any commitments.
        </p>

        {/* Copyright */}
        <div className="murec-footer__bottom">
          <span>Copyright © {new Date().getFullYear()} MUREC · All Rights Reserved</span>
          <span>Powered by Propacity</span>
        </div>
      </div>
    </footer>
  );
}
