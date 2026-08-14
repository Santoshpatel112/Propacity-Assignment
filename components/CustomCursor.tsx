"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check for touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      cursor.style.display = "none";
      return;
    }

    // Check for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cursor.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth follow with GSAP
    gsap.ticker.add(() => {
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: "expo.out",
      });
    });

    // Hover states
    const onEnterLink = () => {
      cursor.classList.add("murec-cursor--expanded");
    };
    const onLeaveLink = () => {
      cursor.classList.remove("murec-cursor--expanded");
      cursor.classList.remove("murec-cursor--text");
      if (labelRef.current) labelRef.current.textContent = "";
    };
    const onEnterImage = () => {
      cursor.classList.add("murec-cursor--text");
      if (labelRef.current) labelRef.current.textContent = "View";
    };
    const onLeaveImage = () => {
      cursor.classList.remove("murec-cursor--text");
      if (labelRef.current) labelRef.current.textContent = "";
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Attach to interactive elements
    const links = document.querySelectorAll("a, button");
    const images = document.querySelectorAll("[data-cursor='view']");

    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });
    images.forEach((el) => {
      el.addEventListener("mouseenter", onEnterImage);
      el.addEventListener("mouseleave", onLeaveImage);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      images.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterImage);
        el.removeEventListener("mouseleave", onLeaveImage);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="murec-cursor">
      <span ref={labelRef} className="murec-cursor__label" />
    </div>
  );
}
