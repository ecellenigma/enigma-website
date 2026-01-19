import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import LiquidFog from '../components/LiquidFog';

const events = [
    {
        id: 'ideathon',
        title: 'IDEATHON 6.0',
        tagline: 'Where Ideas Shape The Future',
        description: 'An innovative and intense brainstorming event that encourages individuals from all over the nation to bring forward new and modern ideas to solve real-life issues. A platform where creativity and true potential help shape the future.',
        highlights: [
            'Business Plan Development',
            'Industry Expert Feedback',
            'National Participation',
            'Innovation Showcase'
        ],
        color: '#00bdf6',
        logo: '/logos/ideathon.png',
        link: 'https://ideathon6-0.ecellnmit.in'
    },
    {
        id: 'enfinity',
        title: 'ENFINITY 2025',
        tagline: 'National Entrepreneurship Festival',
        description: 'The flagship national entrepreneurship festival serving as a dynamic convergence point for aspiring student entrepreneurs, innovators, startup founders, mentors, and industry professionals from institutions across the country.',
        highlights: [
            'Multi-Event Festival',
            'Industry Networking',
            'Startup Ecosystem',
            'Leadership Development'
        ],
        color: '#b963ff',
        logo: '/logos/enfinity.png',
        link: 'https://enfinity.ecellnmit.in'
    }
];

function EventCard({ event, index }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0.6, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

    return (
        <motion.div
            ref={cardRef}
            style={{ x, opacity }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="group relative"
        >
            <div
                className="absolute -inset-1 rounded-[4rem] opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700"
                style={{ background: event.color }}
            />
            <div className="relative bg-zinc-950/80 border border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-[5vw] overflow-hidden backdrop-blur-sm group-hover:border-white/10 transition-all duration-500">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl" style={{ background: event.color }} />
                </div>
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 md:mb-12 gap-8 md:gap-0">
                        <div>
                            <span
                                className="text-[1.8vw] md:text-[0.7vw] font-mono tracking-[0.5em] uppercase font-black italic mb-4 block"
                                style={{ color: event.color }}
                            >
                                Flagship Event
                            </span>
                            <h3 className="text-[6vw] md:text-[4vw] font-black text-white italic tracking-tighter uppercase leading-none break-words">
                                {event.title}
                            </h3>
                            <p className="text-zinc-500 text-[2.5vw] md:text-[1.1vw] mt-4 italic font-medium tracking-wide">
                                {event.tagline}
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-20 h-20 md:w-32 md:h-32 rounded-3xl overflow-hidden flex flex-shrink-0 items-center justify-center self-start"
                            style={{ background: `${event.color}15`, border: `1px solid ${event.color}30` }}
                        >
                            <img
                                src={event.logo}
                                alt={event.title}
                                className="w-full h-full object-contain p-2"
                            />
                        </motion.div>
                    </div>
                    <p className="text-zinc-400 text-[3vw] md:text-[1.2vw] leading-relaxed mb-8 md:mb-12 max-w-3xl">
                        {event.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
                        {event.highlights.map((highlight, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * i }}
                                className="bg-white/5 border border-white/5 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-center md:text-left"
                            >
                                <span className="text-[1.8vw] md:text-[0.7vw] font-mono text-zinc-400 uppercase tracking-wider font-bold block">
                                    {highlight}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex w-full md:w-auto justify-center items-center gap-4 px-6 py-4 md:px-8 md:py-5 rounded-full font-black italic uppercase tracking-wider text-black text-[2.5vw] md:text-[1vw] transition-all duration-300"
                        style={{ background: event.color }}
                    >
                        Explore Event
                        <ArrowUpRight size={18} />
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}

export default function EventsSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const headerX = useTransform(scrollYProgress, [0.7, 1], ["0%", "30%"]);
    const headerOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    return (
        <section ref={sectionRef} id="events" className="relative min-h-screen py-24 md:py-[15vh] px-8 overflow-hidden snap-start">
            <LiquidFog />

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-[1]" />

            <div className="w-[90vw] max-w-[1600px] mx-auto relative z-10">
                <motion.div
                    style={{ x: headerX, opacity: headerOpacity }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-32"
                >
                    <span className="text-[#FFB800] font-mono text-xs tracking-[0.6em] uppercase mb-6 block font-black italic">
                        Flagship Initiatives
                    </span>
                    <h2 className="text-[12vw] md:text-[10vw] font-black text-white italic tracking-tighter uppercase leading-none">
                        THE EVENTS.
                    </h2>
                    <p className="text-zinc-600 text-[4vw] md:text-[1.5vw] mt-8 max-w-3xl font-bold italic uppercase tracking-tight">
                        Where innovation meets opportunity. Our signature events that shape the entrepreneurial landscape.
                    </p>
                </motion.div>

                <div className="space-y-12 md:space-y-[8vh]">
                    {events.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-32 h-px bg-gradient-to-r from-transparent via-[#FFB800]/50 to-transparent origin-left"
                />
            </div>
        </section>
    );
}
