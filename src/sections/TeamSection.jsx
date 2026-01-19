import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';
import LiquidFog from '../components/LiquidFog';

const teamMembers = [
    { id: 1, name: "Divyarajsinh Matieda", role: "President", linkedin: "#", image: "/Team/Divyaraj.JPG" },
    { id: 2, name: "Nischith N", role: "Vice President", linkedin: "#", image: "/Team/NischithN.jpeg" },
    { id: 3, name: "Ayush Sikriwal", role: "General Secretary", linkedin: "#", image: "/Team/Ayush.JPG" },
    { id: 4, name: "Ramya", role: "Joint General Secretary", linkedin: "#", image: "/Team/Ramya.jpeg" },
    { id: 5, name: "Nandan S R", role: "Startup Ecosystem Head", linkedin: "#", image: "/Team/Nandan.jpg" },
    { id: 6, name: "Hrishitha Prasad", role: "Startup Ecosystem Co-Head", linkedin: "#", image: "/Team/Hrishitha.JPG" },
    { id: 7, name: "Praveen Raj Srivastav", role: "Startup Ecosystem Lead", linkedin: "#", image: "/Team/Praveen.jpeg" },
    { id: 8, name: "Ishani Sharma", role: "Startup Ecosystem Co-Lead", linkedin: "#", image: "/Team/ISHANISHARMA.jpg" },
    { id: 9, name: "Syed Mannan Saood", role: "Technical Lead", linkedin: "#", image: "/Team/SyedMannanSaood.jpeg" },
    { id: 10, name: "Rohit Soni", role: "Technical Co-Lead", linkedin: "#", image: "/Team/ROHITSONI.jpg" },
    { id: 11, name: "Parker Harshan Vijay", role: "Sponsorship & Finance Lead", linkedin: "#", image: "/Team/Parker.jpeg" },
    { id: 12, name: "Nilesh Baichwal", role: "Sponsorship & Finance Co-Lead", linkedin: "#", image: "/Team/Nilesh.JPG" },
    { id: 13, name: "G Yuvraj Kashyap", role: "Operations Lead", linkedin: "#", image: "/Team/YUVRAJ.JPG" },
    { id: 14, name: "Prit Mehta", role: "Operations Co-Lead", linkedin: "#", image: "/Team/Prit.jpeg" },
    { id: 15, name: "Shirin John", role: "Operations Co-Head", linkedin: "#", image: "/Team/Shirin.jpeg" },
    { id: 16, name: "Himanshu Agarwal", role: "Strategy & Analysis Lead", linkedin: "#", image: "/Team/Himanshu.JPG" },
    { id: 17, name: "Diya R", role: "Strategy & Analysis Co-Lead", linkedin: "#", image: "/Team/DiyaR.JPG" },
    { id: 18, name: "Shubha Khandelwal", role: "Marketing Lead", linkedin: "#", image: "/Team/SHUBHAKHANDELWAL.jpg" },
    { id: 19, name: "Akanksha", role: "Design Lead", linkedin: "#", image: "/Team/Akanksha.jpg" },
    { id: 20, name: "CH V Sneha", role: "Design Co-Lead", linkedin: "#", image: "/Team/SNEHA.jpg" },
    { id: 21, name: "Syed Haziq Syeed", role: "Social Media Lead", linkedin: "#", image: "/Team/SyedHaziq.JPG" },
    { id: 22, name: "Shreya Rawani", role: "Social Media Co-Lead", linkedin: "#", image: "/Team/SHREYARAWANI.JPG" },
    { id: 23, name: "Shubham Mathad", role: "Design Advisory", linkedin: "#", image: "/Team/SHUBHAM.jpg" },
    { id: 24, name: "Anushrava Bhat", role: "Student Advisory", linkedin: "#", image: "/Team/Anushrava.jpg" },
    { id: 25, name: "Dr. L Harish Kumar", role: "Faculty Advisory", linkedin: "#", image: "/Team/Harish.jpg" },
    { id: 26, name: "Sanjana", role: "Core", linkedin: "#", image: "/Team/Sanjana.jpeg" },
    { id: 27, name: "Monish Gowda", role: "Core", linkedin: "#", image: "/Team/MONISH.jpg" },
    { id: 28, name: "Tejas", role: "Core", linkedin: "#", image: "/Team/Tejas.jpg" },
];

function TeamCard({ member, isActive, onClick, width = 300 }) {
    return (
        <motion.div
            onClick={onClick}
            className="relative flex-shrink-0 cursor-pointer group"
            style={{
                width: width,
                height: `${width * 1.4}px`, // Aspect Ratio 5:7
                maxHeight: '65vh'
            }}
            animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.4,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                className="w-full h-full rounded-[2rem] overflow-hidden relative border border-white/10 group-hover:border-[#FFB800]/40 transition-all duration-500"
                animate={{
                    borderRadius: "2rem"
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Background Image */}
                <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="lazy"
                />

                {/* Fallback Gradient - always behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" style={{ zIndex: -1 }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <span className="text-[12rem] font-black text-white italic leading-none select-none">
                            {member.name.charAt(0)}
                        </span>
                    </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-colors duration-500" />

                {/* LinkedIn */}
                <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-[#0A66C2] transition-colors">
                        <Linkedin size={16} className="text-white" />
                    </div>
                </a>

                {/* ID Badge */}
                <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-mono text-[#FFB800] tracking-[0.2em] uppercase font-black italic bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm border border-[#FFB800]/20">
                        {String(member.id).padStart(2, '0')}
                    </span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="text-lg md:text-2xl font-black text-white italic uppercase tracking-tighter leading-tight mb-1">
                        {member.name}
                    </h3>
                    <p className="text-[9px] md:text-[10px] font-mono text-[#FFB800] uppercase tracking-[0.2em] font-bold">
                        {member.role}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function TeamSection() {
    const sectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const lastScrollTime = useRef(0);
    const hasEnteredOnce = useRef(false);

    const totalCards = teamMembers.length;

    useEffect(() => {
        let lockTimer;

        const checkIfFullyVisible = () => {
            const section = sectionRef.current;
            if (!section || isLocked) return;

            const rect = section.getBoundingClientRect();


            const isAligned = Math.abs(rect.top) < 50;

            if (isAligned) {
                if (!lockTimer && !hasEnteredOnce.current) {
                    lockTimer = setTimeout(() => {
                        const currentRect = section.getBoundingClientRect();
                        const stillAligned = Math.abs(currentRect.top) < 30;

                        if (stillAligned) {
                            hasEnteredOnce.current = true;
                            setIsLocked(true);
                            setCurrentIndex(0);
                            section.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 200);
                }
            } else {
                if (lockTimer) {
                    clearTimeout(lockTimer);
                    lockTimer = null;
                }
            }
        };

        window.addEventListener('scroll', checkIfFullyVisible, { passive: true });
        return () => {
            window.removeEventListener('scroll', checkIfFullyVisible);
            if (lockTimer) clearTimeout(lockTimer);
        };
    }, [isLocked]);

    useEffect(() => {
        const handleWheel = (e) => {
            if (!isLocked) return;

            e.preventDefault();

            const now = Date.now();
            if (now - lastScrollTime.current < 250) return;
            lastScrollTime.current = now;

            if (e.deltaY > 0) {
                if (currentIndex < totalCards - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    setIsLocked(false);
                    setTimeout(() => { hasEnteredOnce.current = false; }, 1000);
                }
            }
            else if (e.deltaY < 0) {
                if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                } else {
                    setIsLocked(false);
                    setTimeout(() => { hasEnteredOnce.current = false; }, 1000);
                }
            }
        };

        if (isLocked) {
            window.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => window.removeEventListener('wheel', handleWheel);
    }, [isLocked, currentIndex, totalCards]);

    // Dynamic width calculation based on screen size
    // Mobile: 300px base? Or vh based?
    // Let's use responsive constant.
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isLaptop = typeof window !== 'undefined' && window.innerHeight < 800;

    // Card Dimensions
    const baseCardWidth = isMobile ? 280 : (isLaptop ? 300 : 350);
    const gap = isMobile ? 16 : 24;
    const cardTotalWidth = baseCardWidth + gap;

    const carouselX = -currentIndex * cardTotalWidth + (typeof window !== 'undefined' ? window.innerWidth / 2 - (baseCardWidth / 2) : 400);

    const goNext = () => setCurrentIndex(prev => Math.min(prev + 1, totalCards - 1));
    const goPrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

    const handleSkip = () => {
        setIsLocked(false);
        setCurrentIndex(totalCards - 1);
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <section
            ref={sectionRef}
            id="team"
            className="relative h-screen overflow-hidden snap-start snap-always flex flex-col pt-16 pb-8 md:py-12"
        >
            <LiquidFog />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90 pointer-events-none z-[1]" />

            <div className="relative z-10 w-full h-full flex flex-col justify-between">

                {/* Header - Compact on small screens */}
                <div className="px-8 md:px-16 flex-shrink-0">
                    <span className="text-[#FFB800] font-mono text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase mb-2 block font-black italic">
                        The Force Behind Enigma
                    </span>
                    <h2 className="text-[8vw] md:text-[5vw] font-black text-white italic tracking-tighter uppercase leading-none">
                        OUR TEAM.
                    </h2>
                </div>

                {/* Carousel Container */}
                <div className="flex-1 flex items-center overflow-hidden min-h-0 py-4 md:py-8">
                    <motion.div
                        animate={{ x: carouselX }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center"
                        style={{ gap: gap }}
                    >
                        {teamMembers.map((member, index) => (
                            <TeamCard
                                key={member.id}
                                member={member}
                                isActive={index === currentIndex}
                                onClick={() => setCurrentIndex(index)}
                                width={baseCardWidth}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Bar - Compact */}
                <div className="px-8 md:px-16 flex items-center justify-between flex-shrink-0 h-16 md:h-20">
                    {/* Counter - Smaller on mobile */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="text-xl md:text-3xl font-black text-white italic tabular-nums">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <div className="h-px w-8 md:w-12 bg-zinc-700" />
                        <span className="text-xs md:text-sm font-mono text-zinc-600">
                            {String(totalCards).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Nav Buttons */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <motion.button
                            onClick={goPrev}
                            disabled={currentIndex === 0}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 md:p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-zinc-400 hover:text-white hover:border-[#FFB800]/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={18} className="md:w-5 md:h-5" />
                        </motion.button>
                        <motion.button
                            onClick={goNext}
                            disabled={currentIndex === totalCards - 1}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 md:p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-zinc-400 hover:text-white hover:border-[#FFB800]/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={18} className="md:w-5 md:h-5" />
                        </motion.button>
                    </div>

                    {/* Progress Bar (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="h-1 bg-zinc-800 rounded-full w-24 md:w-32 overflow-hidden">
                            <motion.div
                                className="h-full bg-[#FFB800] rounded-full"
                                animate={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    {/* Skip Button */}
                    <motion.button
                        onClick={handleSkip}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-zinc-400 hover:text-white hover:border-[#FFB800]/50 transition-all duration-300"
                    >
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">Skip</span>
                        <ChevronDown size={12} className="md:w-3.5 md:h-3.5" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
