"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  type?: "word" | "line" | "char" | "fade";
  stagger?: number;
  delay?: number;
  duration?: number;
  triggerStart?: string;
}

export default function AnimatedText({
  children,
  className = "",
  style = {},
  type = "line",
  stagger = 0.05,
  delay = 0,
  duration = 1,
  triggerStart = "top 80%",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const text = containerRef.current.textContent || "";
    let elements: HTMLElement[] = [];

    // Split text based on type
    if (type === "word") {
      const words = text.split(" ");
      containerRef.current.innerHTML = words
        .map(
          (word) =>
            `<span style="display: inline-block; overflow: hidden; padding-bottom: 0.1em;"><span class="word-inner" style="display: inline-block;">${word}</span></span> `
        )
        .join("");
      elements = Array.from(containerRef.current.querySelectorAll(".word-inner"));
    } else if (type === "line") {
      containerRef.current.innerHTML = `<span style="display: inline-block; overflow: hidden; padding-bottom: 0.1em;"><span class="line-inner" style="display: inline-block;">${text}</span></span>`;
      elements = [containerRef.current.querySelector(".line-inner") as HTMLElement];
    } else if (type === "char") {
      const chars = text.split("");
      containerRef.current.innerHTML = chars
        .map(
          (char) =>
            `<span style="display: inline-block;"><span class="char-inner">${
              char === " " ? "&nbsp;" : char
            }</span></span>`
        )
        .join("");
      elements = Array.from(containerRef.current.querySelectorAll(".char-inner"));
    }

    if (type === "fade") {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
          },
        }
      );
    } else if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: "100%", rotateX: -10 },
        {
          opacity: 1,
          y: "0%",
          rotateX: 0,
          stagger,
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
          },
        }
      );
    }
  }, [children, type, stagger, delay, duration, triggerStart]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
}
