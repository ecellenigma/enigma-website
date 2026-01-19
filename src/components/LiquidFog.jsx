import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
precision lowp float;

uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

// Simple hash
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Fast noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv - 0.5;
    uv *= 2.5;
    
    float t = uTime * 0.3;
    
    // Simplified domain warping - fewer iterations
    vec2 q = vec2(
        noise(uv + vec2(t * 0.2, t * 0.15)),
        noise(uv + vec2(t * 0.15, -t * 0.2))
    );
    
    float f = noise(uv + 1.5 * q);
    f = f * 0.5 + 0.5;
    
    // Simple colors
    vec3 colorBg = vec3(0.01, 0.01, 0.02);
    vec3 colorMid = vec3(0.04, 0.04, 0.05);
    vec3 gold = vec3(0.3, 0.22, 0.08);
    
    vec3 color = mix(colorBg, colorMid, f * 0.5);
    
    float goldAmount = smoothstep(0.65, 0.85, f);
    color = mix(color, gold, goldAmount * 0.3);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function FogMesh() {
  const mesh = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LiquidFog() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 bg-black">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={1}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
          frameloop="always"
        >
          <FogMesh />
        </Canvas>
      )}
    </div>
  );
}
