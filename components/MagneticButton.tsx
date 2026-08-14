"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  magnetic?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "medium",
  magnetic = true,
  className = "",
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const getStyles = () => {
    const baseStyles = {
      position: "relative" as const,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      borderRadius: "50px",
      border: "1px solid",
      textDecoration: "none",
      fontSize: size === "small" ? "0.875rem" : size === "large" ? "1.125rem" : "1rem",
      fontWeight: 500,
      letterSpacing: "0.025em",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      overflow: "hidden" as const,
      padding: size === "small" ? "0.75rem 1.5rem" : size === "large" ? "1.25rem 2.5rem" : "1rem 2rem",
    };

    const variants = {
      primary: {
        backgroundColor: "var(--color-gold)",
        borderColor: "var(--color-gold)",
        color: "var(--color-void)",
      },
      secondary: {
        backgroundColor: "transparent",
        borderColor: "var(--color-gold)",
        color: "var(--color-gold)",
      },
      outline: {
        backgroundColor: "transparent",
        borderColor: "rgba(240, 235, 224, 0.3)",
        color: "var(--color-cream)",
      },
    };

    return { ...baseStyles, ...variants[variant] };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic || disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic effect - move button towards cursor
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });

    // Move text slightly less for depth
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!magnetic || disabled) return;

    // Return to original position with elastic easing
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    // Subtle scale on hover
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveScale = () => {
    if (disabled) return;

    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const buttonProps = {
    ref: buttonRef as any,
    style: getStyles(),
    className: `magnetic-button ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: () => {
      handleMouseLeave();
      handleMouseLeaveScale();
    },
    onMouseEnter: handleMouseEnter,
    onClick: disabled ? undefined : onClick,
    "aria-disabled": disabled,
  };

  const content = (
    <>
      {/* Background gradient that animates on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: variant === "primary" 
            ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)"
            : "linear-gradient(135deg, rgba(196,162,101,0.1) 0%, transparent 50%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        className="button-gradient"
      />
      
      <span ref={textRef} style={{ position: "relative", zIndex: 1 }}>
        {children}
      </span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link {...buttonProps} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button {...buttonProps} disabled={disabled}>
      {content}
    </button>
  );
}