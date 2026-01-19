import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Interactive3DTitle({ text }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative z-20 cursor-default select-none perspective-1000"
        >
            <h1
                className="text-[22vw] font-black italic tracking-tighter text-white leading-[0.8]"
                style={{ transform: "translateZ(60px)" }}
            >
                {text}
            </h1>
            <h1
                className="absolute inset-0 text-[22vw] font-black italic tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.1)] leading-[0.8] -z-10 blur-sm"
                style={{ transform: "translateZ(20px) scale(0.95)" }}
            >
                {text}
            </h1>
        </motion.div>
    );
}
