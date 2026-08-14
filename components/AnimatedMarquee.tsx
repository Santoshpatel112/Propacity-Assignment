"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function AnimatedMarquee({
  children,
  speed = 1,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: AnimatedMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return;

    const marquee = marqueeRef.current;
    const content = contentRef.current;
    const contentWidth = content.scrollWidth;
    const containerWidth = marquee.offsetWidth;

    // Clone content for seamless loop
    const clone = content.cloneNode(true) as HTMLElement;
    marquee.appendChild(clone);

    // Set up animation
    const animationDistance = contentWidth + containerWidth;
    const duration = animationDistance / (100 * speed);

    const tl = gsap.timeline({ repeat: -1 });
    
    if (direction === "left") {
      gsap.set([content, clone], { x: 0 });
      tl.to([content, clone], {
        x: -contentWidth,
        duration,
        ease: "none",
      });
    } else {
      gsap.set([content, clone], { x: -contentWidth });
      tl.to([content, clone], {
        x: 0,
        duration,
        ease: "none",
      });
    }

    // Pause on hover
    if (pauseOnHover) {
      const handleMouseEnter = () => tl.pause();
      const handleMouseLeave = () => tl.resume();

      marquee.addEventListener("mouseenter", handleMouseEnter);
      marquee.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        marquee.removeEventListener("mouseenter", handleMouseEnter);
        marquee.removeEventListener("mouseleave", handleMouseLeave);
        tl.kill();
      };
    }

    return () => tl.kill();
  }, [speed, direction, pauseOnHover]);

  return (
    <div
      ref={marqueeRef}
      className={`marquee ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        ref={contentRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "2rem",
          minWidth: "max-content",
        }}
      >
        {children}
      </div>
    </div>
  );
}