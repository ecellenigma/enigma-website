import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["VISION", "PASSION", "EXECUTION"];

export default function IntroPreloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        // Progress Timer
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // Random jump for "hacker" feel
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Cycle words based on progress roughly
        if (progress < 40) setWordIndex(0);
        else if (progress < 80) setWordIndex(1);
        else setWordIndex(2);
    }, [progress]);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(onComplete, 800); // Wait a bit after 100% before exit
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[1000] bg-[#020202] flex flex-col items-center justify-center text-white overflow-hidden cursor-none"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            {/* Background Noise */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Flashing Words */}
                <div className="h-12 overflow-hidden mb-8">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={wordIndex}
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="block text-sm md:text-base font-mono text-[#FFB800] tracking-[0.5em] uppercase font-bold italic"
                        >
                            {words[wordIndex]}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* Main Title Glitch */}
                <motion.h1
                    className="text-6xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        skewX: [0, -5, 0, 5, 0],
                    }}
                    transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatDelay: 3
                    }}
                >
                    ENIGMA
                </motion.h1>

                {/* Counter */}
                <div className="mt-12 font-mono text-4xl md:text-6xl font-bold tabular-nums text-zinc-800">
                    <span className="text-white">{progress}</span>%
                </div>
            </div>

            {/* Progress Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-zinc-900">
                <motion.div
                    className="h-full bg-[#FFB800]"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </motion.div>
    );
}
