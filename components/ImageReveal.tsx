"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  direction?: "left" | "right" | "top" | "bottom";
  scale?: boolean;
  parallax?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImageReveal({
  src,
  alt,
  aspectRatio = "4/3",
  direction = "bottom",
  scale = true,
  parallax = false,
  className = "",
  style = {},
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !imageRef.current) return;

    const clipPathMap = {
      left: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      right: ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
      top: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
      bottom: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Clip-path reveal animation
    tl.fromTo(
      wrapperRef.current,
      { clipPath: clipPathMap[direction][0] },
      {
        clipPath: clipPathMap[direction][1],
        duration: 1.6,
        ease: "expo.out",
      }
    );

    // Scale effect on image
    if (scale) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.8,
          ease: "expo.out",
        },
        0
      );
    }

    // Parallax effect
    if (parallax) {
      gsap.to(imageRef.current, {
        y: "-10%",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, [direction, scale, parallax]);

  return (
    <div
      ref={wrapperRef}
      className={`image-reveal ${className}`}
      style={{
        position: "relative",
        aspectRatio,
        overflow: "hidden",
        clipPath: "inset(0 0 100% 0)",
        ...style,
      }}
    >
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: 0,
          transform: "scale(1.2)",
        }}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
