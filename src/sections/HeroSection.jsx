import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReactiveGrid from '../components/ReactiveGrid';
import Interactive3DTitle from '../components/Interactive3DTitle';

export default function HeroSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    return (
        <section id="home" ref={sectionRef} className="relative min-h-screen h-screen flex flex-col items-center justify-center px-8 overflow-hidden snap-start">
            <ReactiveGrid />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.12)_0%,transparent_70%)] pointer-events-none z-0" />

            <motion.div
                style={{ x: useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]) }}
                className="z-10 text-center"
            >
                <Interactive3DTitle text="ENIGMA" />

                <div className="mt-2 ml-12 z-20">
                    <h2 className="text-[3.5vw] font-black italic tracking-tighter text-[#FFB800] leading-none select-none pointer-events-none drop-shadow-[0_0_15px_rgba(255,184,0,0.3)]">
                        ECELL NMIT
                    </h2>
                </div>
            </motion.div>
        </section>
    );
}
