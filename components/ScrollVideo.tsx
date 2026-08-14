"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  playOnScroll?: boolean;
  scrubDuration?: boolean;
}

export default function ScrollVideo({
  src,
  poster,
  className = "",
  style = {},
  playOnScroll = false,
  scrubDuration = false,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !containerRef.current) return;

    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
      setVideoDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container || !videoLoaded) return;

    let scrollTriggerInstance: ScrollTrigger | null = null;

    if (scrubDuration && videoDuration > 0) {
      // Scrub video based on scroll position
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          video.currentTime = progress * videoDuration;
        },
      });

      // Pause video when not in view
      video.pause();
    } else if (playOnScroll) {
      // Play/pause based on visibility
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          video.play().catch(() => {
            // Autoplay failed, possibly due to browser policy
          });
        },
        onLeave: () => video.pause(),
        onEnterBack: () => {
          video.play().catch(() => {});
        },
        onLeaveBack: () => video.pause(),
      });
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [videoLoaded, videoDuration, playOnScroll, scrubDuration]);

  return (
    <div
      ref={containerRef}
      className={`scroll-video ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        poster={poster}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading overlay */}
      {!videoLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--color-void)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-gold)",
            fontSize: "0.875rem",
            letterSpacing: "0.1em",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}