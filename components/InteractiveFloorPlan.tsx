"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Room {
  id: string;
  name: string;
  area: string;
  description: string;
  coordinates: { x: number; y: number; width: number; height: number };
  color: string;
}

const floorPlanRooms: Room[] = [
  {
    id: "living",
    name: "Living Room",
    area: "450 sq ft",
    description: "Spacious living area with panoramic windows",
    coordinates: { x: 10, y: 20, width: 40, height: 30 },
    color: "rgba(196, 162, 101, 0.3)"
  },
  {
    id: "kitchen",
    name: "Kitchen",
    area: "180 sq ft", 
    description: "Modern modular kitchen with island counter",
    coordinates: { x: 55, y: 20, width: 25, height: 20 },
    color: "rgba(59, 130, 246, 0.3)"
  },
  {
    id: "master-bedroom",
    name: "Master Bedroom",
    area: "320 sq ft",
    description: "Master suite with walk-in closet",
    coordinates: { x: 10, y: 55, width: 35, height: 25 },
    color: "rgba(34, 197, 94, 0.3)"
  },
  {
    id: "bedroom-2",
    name: "Bedroom 2",
    area: "240 sq ft",
    description: "Comfortable bedroom with built-in storage",
    coordinates: { x: 50, y: 55, width: 30, height: 20 },
    color: "rgba(168, 85, 247, 0.3)"
  },
  {
    id: "bathroom",
    name: "Bathroom",
    area: "80 sq ft",
    description: "Premium fixtures and fittings",
    coordinates: { x: 55, y: 45, width: 15, height: 10 },
    color: "rgba(239, 68, 68, 0.3)"
  }
];

export default function InteractiveFloorPlan() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<SVGSVGElement>(null);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !planRef.current) return;

    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(".floor-plan-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Floor plan container animation
      gsap.fromTo(".floor-plan-container",
        { opacity: 0, scale: 0.8, rotateX: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".floor-plan-container",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate rooms sequentially
      gsap.fromTo(".floor-room",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: planRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate room labels
      gsap.fromTo(".room-label",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: planRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRoomHover = (roomId: string) => {
    setHoveredRoom(roomId);
    
    // Scale up hovered room
    gsap.to(`#${roomId}`, {
      scale: 1.05,
      transformOrigin: "center",
      duration: 0.3,
      ease: "power2.out"
    });

    // Dim other rooms
    floorPlanRooms.forEach(room => {
      if (room.id !== roomId) {
        gsap.to(`#${room.id}`, {
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  const handleRoomLeave = () => {
    setHoveredRoom(null);
    
    // Reset all rooms
    floorPlanRooms.forEach(room => {
      gsap.to(`#${room.id}`, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  };

  const handleRoomClick = (roomId: string) => {
    setActiveRoom(activeRoom === roomId ? null : roomId);
  };

  const activeRoomData = activeRoom ? floorPlanRooms.find(r => r.id === activeRoom) : null;

  return (
    <section 
      ref={sectionRef}
      className="interactive-floor-plan murec-section murec-section--dark"
      style={{ position: "relative" }}
    >
      <div className="murec-container">
        {/* Section Header */}
        <div className="floor-plan-title" style={{ 
          textAlign: "center", 
          marginBottom: "4rem",
          opacity: 0
        }}>
          <span 
            className="text-label"
            style={{ 
              display: "block", 
              marginBottom: "1.5rem",
              color: "var(--color-gold)" 
            }}
          >
            Design & Layout
          </span>
          <h2 className="text-display-lg" style={{ marginBottom: "1.5rem" }}>
            Interactive <em>Floor Plans</em>
          </h2>
          <p 
            className="text-body-lg"
            style={{ 
              maxWidth: "600px",
              margin: "0 auto",
              color: "rgba(240,235,224,0.85)"
            }}
          >
            Explore our thoughtfully designed spaces. Hover over each room to discover the details and functionality of every area.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "4rem",
          alignItems: "center"
        }}>
          {/* Floor Plan SVG */}
          <div 
            className="floor-plan-container"
            style={{
              perspective: "1000px",
              opacity: 0
            }}
          >
            <svg
              ref={planRef}
              viewBox="0 0 100 100"
              style={{
                width: "100%",
                maxWidth: "600px",
                height: "auto",
                background: "rgba(22, 22, 24, 0.8)",
                borderRadius: "16px",
                border: "1px solid rgba(196, 162, 101, 0.15)",
                padding: "2rem",
                backdropFilter: "blur(20px)"
              }}
            >
              {/* Floor plan outline */}
              <rect
                x="8"
                y="18"
                width="74"
                height="64"
                fill="none"
                stroke="rgba(240, 235, 224, 0.3)"
                strokeWidth="0.5"
              />

              {/* Rooms */}
              {floorPlanRooms.map((room) => (
                <g key={room.id}>
                  {/* Room rectangle */}
                  <rect
                    id={room.id}
                    className="floor-room"
                    x={room.coordinates.x}
                    y={room.coordinates.y}
                    width={room.coordinates.width}
                    height={room.coordinates.height}
                    fill={room.color}
                    stroke={hoveredRoom === room.id ? "var(--color-gold)" : "rgba(240, 235, 224, 0.2)"}
                    strokeWidth={hoveredRoom === room.id ? "0.3" : "0.15"}
                    rx="1"
                    style={{ 
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transformOrigin: "center",
                      opacity: 0
                    }}
                    onMouseEnter={() => handleRoomHover(room.id)}
                    onMouseLeave={handleRoomLeave}
                    onClick={() => handleRoomClick(room.id)}
                  />

                  {/* Room label */}
                  <text
                    className="room-label"
                    x={room.coordinates.x + room.coordinates.width / 2}
                    y={room.coordinates.y + room.coordinates.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--color-cream)"
                    fontSize="2.2"
                    fontWeight="500"
                    style={{ 
                      pointerEvents: "none",
                      userSelect: "none",
                      opacity: 0
                    }}
                  >
                    {room.name}
                  </text>

                  {/* Area indicator */}
                  <text
                    className="room-label"
                    x={room.coordinates.x + room.coordinates.width / 2}
                    y={room.coordinates.y + room.coordinates.height / 2 + 3}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(240, 235, 224, 0.6)"
                    fontSize="1.5"
                    style={{ 
                      pointerEvents: "none",
                      userSelect: "none",
                      opacity: 0
                    }}
                  >
                    {room.area}
                  </text>
                </g>
              ))}

              {/* Interactive hotspots */}
              {floorPlanRooms.map((room) => (
                <circle
                  key={`hotspot-${room.id}`}
                  cx={room.coordinates.x + room.coordinates.width - 3}
                  cy={room.coordinates.y + 3}
                  r="1.5"
                  fill="var(--color-gold)"
                  style={{ 
                    cursor: "pointer",
                    opacity: hoveredRoom === room.id ? 1 : 0.6
                  }}
                  onMouseEnter={() => handleRoomHover(room.id)}
                  onMouseLeave={handleRoomLeave}
                  onClick={() => handleRoomClick(room.id)}
                >
                  <animate
                    attributeName="r"
                    values="1.5;2.2;1.5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </svg>
          </div>

          {/* Room Details Panel */}
          <div style={{
            minWidth: "300px",
            padding: "2rem",
            background: "rgba(22, 22, 24, 0.6)",
            borderRadius: "16px",
            border: "1px solid rgba(196, 162, 101, 0.15)",
            backdropFilter: "blur(20px)"
          }}>
            {activeRoomData ? (
              <div>
                <div style={{
                  width: "40px",
                  height: "4px",
                  background: activeRoomData.color.replace('0.3', '1'),
                  borderRadius: "2px",
                  marginBottom: "1.5rem"
                }} />
                
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                  color: "var(--color-cream)"
                }}>
                  {activeRoomData.name}
                </h3>
                
                <div style={{
                  fontSize: "1.1rem",
                  color: "var(--color-gold)",
                  fontWeight: 600,
                  marginBottom: "1rem"
                }}>
                  {activeRoomData.area}
                </div>
                
                <p style={{
                  color: "rgba(240, 235, 224, 0.8)",
                  lineHeight: 1.6,
                  marginBottom: "2rem"
                }}>
                  {activeRoomData.description}
                </p>

                <button
                  onClick={() => setActiveRoom(null)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "rgba(196, 162, 101, 0.1)",
                    border: "1px solid rgba(196, 162, 101, 0.4)",
                    borderRadius: "30px",
                    color: "var(--color-gold)",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      background: "var(--color-gold)",
                      color: "var(--color-void)",
                      duration: 0.3
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      background: "rgba(196, 162, 101, 0.1)",
                      color: "var(--color-gold)",
                      duration: 0.3
                    });
                  }}
                >
                  Close Details
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", color: "rgba(240, 235, 224, 0.6)" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  border: "2px solid rgba(196, 162, 101, 0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h4 style={{
                  fontSize: "1.125rem",
                  marginBottom: "0.75rem",
                  color: "var(--color-cream)"
                }}>
                  Explore Floor Plan
                </h4>
                <p style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.5
                }}>
                  Hover over or click on rooms to see detailed information about each space.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .floor-plan-container svg {
          touch-action: pan-zoom;
        }
        
        @media (max-width: 1200px) {
          .murec-container > div {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .floor-plan-container {
            order: 1;
          }
          
          .murec-container > div > div:last-child {
            order: 2;
            max-width: none;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .floor-plan-title h2 {
            font-size: clamp(2rem, 6vw, 2.5rem);
          }
          
          .floor-plan-title p {
            font-size: 1rem;
            padding: 0 1rem;
          }
          
          .floor-plan-container {
            padding: 0 1rem;
          }
          
          .floor-plan-container svg {
            padding: 1rem;
            border-radius: 12px;
          }
          
          .murec-container > div > div:last-child {
            min-width: auto;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
          }
          
          .floor-room text {
            font-size: 1.8;
          }
          
          .floor-room text:nth-of-type(2) {
            font-size: 1.2;
          }
        }

        @media (max-width: 480px) {
          .floor-plan-title {
            margin-bottom: 2.5rem;
          }
          
          .floor-plan-title h2 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
          }
          
          .floor-plan-container svg {
            padding: 0.75rem;
          }
          
          .murec-container > div > div:last-child {
            padding: 1.5rem;
          }
          
          .murec-container > div > div:last-child h3 {
            font-size: 1.25rem;
          }
          
          .murec-container > div > div:last-child > div:first-child > div:nth-child(3) {
            font-size: 1rem;
          }
          
          .floor-room text {
            font-size: 1.5;
          }
          
          .floor-room text:nth-of-type(2) {
            font-size: 1;
          }
        }

        @media (max-width: 360px) {
          .floor-room text {
            font-size: 1.2;
          }
          
          .floor-room text:nth-of-type(2) {
            font-size: 0.8;
          }
          
          .murec-container > div > div:last-child {
            padding: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floor-room,
          .room-label,
          .floor-plan-title,
          .floor-plan-container {
            animation: none !important;
            transition: none !important;
          }
          
          circle animate {
            display: none;
          }
        }

        @media (hover: none) {
          .floor-room:hover {
            transform: none;
          }
        }

        @media (max-height: 600px) and (orientation: landscape) {
          .floor-plan-title {
            margin-bottom: 2rem;
          }
          
          .murec-container > div {
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}