"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/legacy", label: "Legacy" },
  { href: "/principles", label: "Principles" },
  { href: "/forest-walk", label: "Collection" },
  { href: "/design-philosophy", label: "Design Philosophy" },
  { href: "/contact", label: "Contact" },
];

const menuLinks = [
  { href: "/", label: "Home", num: "01" },
  { href: "/about", label: "About Us", num: "02" },
  { href: "/legacy", label: "Our Legacy", num: "03" },
  { href: "/forest-walk", label: "The MUREC Collection", num: "04" },
  { href: "/principles", label: "Principles", num: "05" },
  { href: "/design-philosophy", label: "Design Philosophy", num: "06" },
  { href: "/careers", label: "Careers", num: "07" },
  { href: "/news", label: "News & Insights", num: "08" },
  { href: "/blog", label: "Blog", num: "09" },
  { href: "/contact", label: "Contact", num: "10" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 300 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // Animate menu links stagger
      const links = menuRef.current?.querySelectorAll(".murec-menu__link");
      if (links) {
        gsap.fromTo(
          links,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.8,
            ease: "expo.out",
            delay: 0.3,
          }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={`murec-header${scrolled ? " murec-header--scrolled" : ""}${hidden && !menuOpen ? " murec-header--hidden" : ""}`}
      >
        <Link href="/" className="murec-header__logo" aria-label="MUREC Home">
          <Image
            src="/images/murec.png"
            alt="MUREC"
            width={130}
            height={30}
            priority
            style={{ height: "auto", width: "120px" }}
          />
        </Link>

        <nav className="murec-header__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`murec-header__nav-link${pathname === link.href ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="murec-header__menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <span />
          <span />
        </button>
      </header>

      {/* Fullscreen Menu */}
      <div
        ref={menuRef}
        className={`murec-menu${menuOpen ? " murec-menu--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="murec-menu__close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="murec-container" style={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", width: "100%", alignItems: "center" }}>
            <nav className="murec-menu__list">
              <ul>
                {menuLinks.map((link) => (
                  <li key={link.href} className="murec-menu__item">
                    <Link
                      href={link.href}
                      className="murec-menu__link"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.num}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="murec-menu__info" style={{ position: "static", textAlign: "left" }}>
              <p style={{ marginBottom: "1.5rem", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", lineHeight: 1.8 }}>
                Madhusudan, 2nd Floor, Riana Towers,<br />
                51-52, Noida Sector 136,<br />
                Uttar Pradesh - 201301
              </p>
              <p>
                <a href="mailto:info@murec.com">info@murec.com</a><br />
                <a href="tel:+919717773229" style={{ color: "var(--color-cream)" }}>+91 97177 73229</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
