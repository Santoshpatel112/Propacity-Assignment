"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Floating Architectural Towers ── */
function ArchitecturalTowers() {
  const groupRef = useRef<THREE.Group>(null);

  const towers = useMemo(() => [
    { pos: [-3.5, 0, -1] as [number, number, number], size: [0.6, 6, 0.6] as [number, number, number], color: "#C4A265", opacity: 0.35 },
    { pos: [-1.8, -1, 1.5] as [number, number, number], size: [1.2, 3.5, 1.2] as [number, number, number], color: "#8B7355", opacity: 0.28 },
    { pos: [0.5, 0.5, -0.5] as [number, number, number], size: [0.8, 8, 0.8] as [number, number, number], color: "#D4C5A9", opacity: 0.22 },
    { pos: [2.5, -1.5, 0.5] as [number, number, number], size: [1.8, 2.5, 1.8] as [number, number, number], color: "#C4A265", opacity: 0.3 },
    { pos: [3.8, 0, -1.5] as [number, number, number], size: [0.5, 5, 0.5] as [number, number, number], color: "#8B7355", opacity: 0.2 },
    { pos: [-0.5, -0.5, 2] as [number, number, number], size: [0.4, 4, 0.4] as [number, number, number], color: "#C4A265", opacity: 0.25 },
  ], []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Base grid */}
      <gridHelper args={[20, 20, "#C4A265", "#1A1A1D"]} position={[0, -3, 0]} />

      {/* Towers */}
      {towers.map((t, i) => (
        <mesh key={i} position={t.pos}>
          <boxGeometry args={t.size} />
          <meshBasicMaterial color={t.color} wireframe />
        </mesh>
      ))}

      {/* Ground plane grid accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20, 15, 15]} />
        <meshBasicMaterial color="#C4A265" wireframe opacity={0.06} transparent />
      </mesh>
    </group>
  );
}

/* ── Ambient Particle Field ── */
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#C4A265" size={0.025} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

export default function ArchitecturalScene() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", opacity: 0.45 }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 2, 10], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[8, 8, 8]} intensity={1} color="#C4A265" />
          <pointLight position={[-8, -4, -4]} intensity={0.4} color="#8B7355" />
          <ArchitecturalTowers />
          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  );
}

