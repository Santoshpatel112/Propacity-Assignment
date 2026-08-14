"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Plane, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

interface FloatingGeometryProps {
  position: [number, number, number];
  rotationSpeed: number;
  scale: number;
}

function FloatingGeometry({ position, rotationSpeed, scale }: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * rotationSpeed) * 0.1;
    meshRef.current.rotation.y = Math.cos(time * rotationSpeed) * 0.15;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#C4A265"
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  );
}

function ArchitecturalLines() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
  });

  const lines = useMemo(() => {
    const lineGeometries = [];
    
    // Create grid lines
    for (let i = -5; i <= 5; i++) {
      const points1 = [
        new THREE.Vector3(i, -2, -5),
        new THREE.Vector3(i, -2, 5),
      ];
      const points2 = [
        new THREE.Vector3(-5, -2, i),
        new THREE.Vector3(5, -2, i),
      ];
      
      lineGeometries.push(
        <line key={`line1-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points1.length}
              array={new Float32Array(points1.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#C4A265" transparent opacity={0.15} />
        </line>,
        <line key={`line2-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points2.length}
              array={new Float32Array(points2.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#C4A265" transparent opacity={0.15} />
        </line>
      );
    }
    
    return lineGeometries;
  }, []);

  return <group ref={groupRef}>{lines}</group>;
}

interface ArchitecturalDepthProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ArchitecturalDepth({ 
  className = "", 
  style = {} 
}: ArchitecturalDepthProps) {
  return (
    <div
      className={`architectural-depth ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.6,
        ...style,
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 2, 8], 
          fov: 50,
          near: 0.1,
          far: 100 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.3} />
          
          {/* Floating geometric elements */}
          <FloatingGeometry position={[-3, 1, -2]} rotationSpeed={0.3} scale={0.5} />
          <FloatingGeometry position={[3, -1, -1]} rotationSpeed={-0.2} scale={0.3} />
          <FloatingGeometry position={[0, 2, -3]} rotationSpeed={0.4} scale={0.4} />
          <FloatingGeometry position={[-2, -2, 1]} rotationSpeed={-0.3} scale={0.6} />
          
          {/* Architectural grid lines */}
          <ArchitecturalLines />
        </Suspense>
      </Canvas>
    </div>
  );
}