import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, Globe, ArrowUpRight } from 'lucide-react';

const SocialLink = ({ href, icon: Icon, label }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-4 p-6 border border-white/10 bg-white/5 rounded-2xl overflow-hidden hover:border-[#FFB800]/50 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800]/0 via-[#FFB800]/10 to-[#FFB800]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

        <div className="p-3 bg-black/50 rounded-xl border border-white/5 group-hover:bg-[#FFB800] group-hover:text-black transition-colors duration-300">
            <Icon size={24} />
        </div>

        <span className="text-lg font-bold font-mono uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
            {label}
        </span>

        <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB800]" />
    </motion.a>
);

export default function ContactSection() {
    return (
        <section id="contact" className="relative min-h-screen py-32 px-6 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[#020202]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,184,0,0.15),transparent_70%)]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FFB800]/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#FFB800] font-mono text-sm tracking-[0.5em] uppercase font-black italic block mb-8"
                        >
                            Initiate Conversation
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[12vw] lg:text-[7vw] font-black text-white italic uppercase tracking-tighter leading-[0.85] mb-12"
                        >
                            LET'S <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-yellow-200">TALK.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-zinc-400 font-medium max-w-xl leading-relaxed mb-16"
                        >
                            Ready to transform your vision into venture capital reality?
                            Enigma is always listening.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-12"
                        >
                            <a
                                href="mailto:ecell@nmit.ac.in"
                                className="inline-flex items-center gap-4 text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter hover:text-[#FFB800] transition-colors group"
                            >
                                <Mail className="w-8 h-8 md:w-12 md:h-12 group-hover:rotate-12 transition-transform" />
                                ecell@nmit.ac.in
                            </a>

                            <div className="flex flex-col gap-6 pt-8 border-t border-white/10">
                                <p className="text-[#FFB800] font-mono text-xs tracking-[0.2em] uppercase font-black italic">Other Contact</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1">Vice President</p>
                                        <p className="text-white text-xl font-black italic uppercase tracking-tighter group-hover:text-[#FFB800] transition-colors">Nischith N</p>
                                        <a href="tel:+917022437456" className="text-zinc-400 font-mono text-sm hover:text-white transition-colors block mt-1">+91 70224 37456</a>
                                    </div>
                                    <div className="group">
                                        <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1">Startup Ecosystem Head</p>
                                        <p className="text-white text-xl font-black italic uppercase tracking-tighter group-hover:text-[#FFB800] transition-colors">Nandan S R</p>
                                        <a href="tel:+918050362146" className="text-zinc-400 font-mono text-sm hover:text-white transition-colors block mt-1">+91 80503 62146</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <SocialLink href="https://www.instagram.com/ecellnmit/" icon={Instagram} label="Instagram" />
                        <SocialLink href="https://in.linkedin.com/company/enigma-e-cell-nmit" icon={Linkedin} label="LinkedIn" />
                    </div>
                </div>
            </div>
        </section>
    );
}
