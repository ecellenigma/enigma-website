import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function GridSimulation() {
    const { viewport, mouse } = useThree();
    const meshRef = useRef();
    const planeGeo = useMemo(() => new THREE.PlaneGeometry(viewport.width * 1.5, viewport.height * 1.5, 60, 60), [viewport]);

    const originalPositions = useMemo(() => {
        return Float32Array.from(planeGeo.attributes.position.array);
    }, [planeGeo]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position;
        const count = positions.count;
        const mx = (mouse.x * viewport.width) / 2;
        const my = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const ox = originalPositions[i * 3];
            const oy = originalPositions[i * 3 + 1];
            const dx = mx - ox;
            const dy = my - oy;
            const distSq = dx * dx + dy * dy;
            const force = -2 * Math.exp(-distSq * 0.1);
            const wave = Math.sin(ox * 0.5 + state.clock.elapsedTime) * 0.2;

            positions.setZ(i, force + wave);
        }

        positions.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} geometry={planeGeo} rotation={[0, 0, 0]}>
            <meshBasicMaterial
                color="#FFB800"
                wireframe
                transparent
                opacity={0.04}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export default function ReactiveGrid() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <GridSimulation />
            </Canvas>
        </div>
    );
}
