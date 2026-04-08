"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const x = (seededRandom(i + 1) - 0.5) * 20;
      const y = (seededRandom(i + 101) - 0.5) * 20;
      const z = (seededRandom(i + 1001) - 0.5) * 20;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  const orb3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (orb1Ref.current) {
      orb1Ref.current.position.y = Math.sin(t * 0.5) * 0.5 + 1;
      orb1Ref.current.position.x = Math.cos(t * 0.3) * 2;
    }
    
    if (orb2Ref.current) {
      orb2Ref.current.position.y = Math.sin(t * 0.4 + 1) * 0.5 - 0.5;
      orb2Ref.current.position.x = Math.cos(t * 0.4 + 1) * 2.5;
    }
    
    if (orb3Ref.current) {
      orb3Ref.current.position.y = Math.sin(t * 0.6 + 2) * 0.5;
      orb3Ref.current.position.x = Math.cos(t * 0.5 + 2) * 1.5;
    }
  });

  return (
    <>
      <mesh ref={orb1Ref} position={[2, 1, -3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={orb2Ref} position={[-2, -0.5, -4]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={orb3Ref} position={[0, 0, -5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#818cf8"
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
