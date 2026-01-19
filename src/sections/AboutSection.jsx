import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiquidFog from '../components/LiquidFog';

export default function AboutSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start py-20">
            <LiquidFog />

            <div className="relative z-10 w-[85vw] max-w-7xl mx-auto px-4 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-[8vw] md:text-[6vw] font-black text-[#FFB800] italic tracking-tighter leading-none pl-8">
                        ABOUT ENIGMA
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <motion.div
                        style={{ y }}
                        className="space-y-16"
                    >
                        <div>
                            <span className="block text-[#FFB800] font-mono text-[2.5vw] md:text-[0.8vw] tracking-[0.4em] mb-6 uppercase font-black italic">The Origin</span>
                            <p className="text-[4vw] md:text-[2vw] font-bold text-white/90 leading-relaxed uppercase tracking-tight">
                                Enigma, the Entrepreneurship Cell of NMIT, believes entrepreneurship is the engine of <span className="text-white italic">India’s growth</span>. We design and launch initiatives to support aspiring entrepreneurs, ensuring no vision is hindered by a lack of network or opportunity.
                            </p>
                        </div>

                        <div>
                            <span className="block text-[#FFB800] font-mono text-[2.5vw] md:text-[0.8vw] tracking-[0.4em] mb-6 uppercase font-black italic">The Force</span>
                            <p className="text-[3.5vw] md:text-[1.2vw] text-zinc-400 font-medium leading-relaxed font-mono">
                                Our passionate team works tirelessly to turn this vision into reality. Prioritizing execution over theory. One step at a time.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-[4vw] backdrop-blur-sm self-center hover:border-[#FFB800]/30 transition-colors duration-500 group w-full min-h-[40vh] flex flex-col justify-center"
                    >
                        <span className="block text-zinc-500 font-mono text-[1.8vw] md:text-[0.6vw] tracking-[0.4em] mb-10 uppercase font-black italic group-hover:text-[#FFB800] transition-colors">Core Mission Protocol</span>

                        <p className="text-[5vw] md:text-[2.5vw] font-black text-white italic uppercase tracking-tighter leading-tight mb-12">
                            Cultivating a thriving ecosystem where students transform bold ideas into impactful ventures.
                        </p>

                        <p className="text-[3vw] md:text-[1.1vw] text-zinc-400 font-medium leading-relaxed border-l-2 border-[#FFB800] pl-6">
                            Entrepreneurship is more than starting a business, it's about thinking differently and solving real-world problems. Enigma bridges the gap between <span className="text-white font-bold">Ambition</span> and <span className="text-white font-bold">Execution</span>.
                        </p>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
