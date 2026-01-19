import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: [0.3, 0.6] }
        );

        const sections = ['home', 'about', 'events', 'team', 'contact'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavClick = (link) => {
        setIsOpen(false);
        if (link.isExternal) {
            window.open(link.href, '_blank');
        } else {
            const element = document.getElementById(link.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(link.id);
            }
        }
    };

    const navLinks = [
        { id: 'home', label: 'HOME' },
        { id: 'about', label: 'ABOUT' },
        { id: 'events', label: 'EVENTS' },
        { id: 'team', label: 'TEAM' },
        { id: 'contact', label: 'CONTACT' },
        { id: 'report', label: 'REPORT', isExternal: true, href: '/Report25-26.pdf' },
    ];

    return (
        <>
            <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-full hidden md:flex items-center gap-1 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 ${scrolled ? 'scale-90 opacity-80 hover:scale-100 hover:opacity-100' : 'scale-100'}`}>
                {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                        <button
                            key={link.id}
                            onClick={() => handleNavClick(link)}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 relative group 
                ${isActive
                                    ? 'bg-[#FFB800] text-black font-black italic shadow-[0_0_20px_rgba(255,184,0,0.3)] scale-105'
                                    : 'text-zinc-500 hover:text-white hover:bg-white/5 font-bold'}`}
                        >
                            {link.label}
                            {!isActive && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#FFB800] group-hover:w-1/2 transition-all duration-300" />
                            )}
                        </button>
                    );
                })}
            </nav>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 z-[110] md:hidden p-4 bg-[#FFB800] text-black rounded-full shadow-lg border border-black/20"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link)}
                                className={`text-4xl font-black italic uppercase tracking-tighter transition-colors ${activeSection === link.id ? 'text-[#FFB800]' : 'text-white hover:text-[#FFB800]'}`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
