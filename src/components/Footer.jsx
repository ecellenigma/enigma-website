import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/[0.04] bg-[#020202] py-20 px-8 relative overflow-hidden">
            <div className="max-w-[1700px] mx-auto flex flex-col xl:flex-row justify-between items-end gap-16 relative z-10">

                <div className="max-w-xl">
                    <div className="flex items-center gap-6 mb-8">
                        <img src="/logos/enigma.png" alt="Enigma Logo" className="h-16 w-auto object-contain" />
                        <div className="w-[1px] h-10 bg-white/20" />
                        <img src="/logos/nitte-compact.png" alt="Nitte Logo" className="h-12 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                    </div>
                    <h5 className="text-4xl md:text-5xl font-black italic uppercase text-[#FFB800] mb-8 tracking-tighter">ENIGMA E-CELL NMIT</h5>
                    <p className="text-zinc-600 text-lg md:text-xl leading-[1.3] uppercase tracking-wide font-bold italic">
                        BROUGHT TO YOU BY E-CELL NMIT
                    </p>
                </div>

                <div className="flex flex-col xl:items-end gap-10 w-full xl:w-auto">
                    {/* Mobile: Grid / Desktop: Flex End */}
                    <div className="grid grid-cols-2 gap-12 w-full xl:w-auto xl:flex xl:flex-col xl:gap-10 xl:items-end">

                        {/* Pages Column */}
                        <div className="flex flex-col xl:contents">
                            <span className="xl:hidden text-[#FFB800] font-mono text-xs mb-6 tracking-widest">EXPLORE</span>
                            <div className="flex flex-col xl:flex-row xl:flex-wrap xl:justify-end gap-y-4 gap-x-8 text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-black italic">
                                <a href="#hero" className="hover:text-white transition-colors">Home</a>
                                <a href="#about" className="hover:text-white transition-colors">About</a>
                                <a href="#events" className="hover:text-white transition-colors">Events</a>
                                <a href="#team" className="hover:text-white transition-colors">Team</a>
                                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                                <a href="/Report25-26.pdf" className="hover:text-white transition-colors">Report</a>
                            </div>
                        </div>

                        {/* Divider only on Desktop */}
                        <div className="hidden xl:block w-full h-px bg-white/10" />

                        {/* Socials Column */}
                        <div className="flex flex-col xl:contents">
                            <span className="xl:hidden text-[#FFB800] font-mono text-xs mb-6 tracking-widest">CONNECT</span>
                            <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-black italic">
                                <a href="https://in.linkedin.com/company/enigma-e-cell-nmit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                                    <Linkedin size={14} /> <span className="xl:inline">LINKEDIN</span>
                                </a>
                                <a href="https://github.com/ecellenigma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                                    <Github size={14} /> <span className="xl:inline">GITHUB</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1700px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-zinc-800 tracking-[0.2em] uppercase font-black italic">
                <span>© 2026 ENIGMA E-CELL NMIT</span>
            </div>
        </footer>
    );
}
