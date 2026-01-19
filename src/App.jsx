import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import BrushCursor from './components/BrushCursor';
import IntroPreloader from './components/IntroPreloader';

import SEO from './components/SEO';

const AMBER = "#FFB800";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const filamentScale = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const filamentColor = useTransform(scrollYProgress, [0, 1], [AMBER, "#FFFFFF"]);

  return (
    <div className="bg-[#020202] min-h-screen text-white font-sans selection:bg-[#FFB800] selection:text-black overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {loading && <IntroPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <SEO />
      <BrushCursor />

      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      <div className="fixed right-8 top-1/2 -translate-y-1/2 h-96 w-[1.5px] bg-white/5 z-[100] hidden lg:block rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.01)]">
        <motion.div
          style={{ height: "100%", scaleY: filamentScale, background: filamentColor, originY: 0 }}
          className="w-full shadow-[0_0_30px_#FFB800]"
        />
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,184,0,0.1)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,184,0,0.1)_1.5px,transparent_1.5px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>

      <Navbar />

      <Home />

      <Footer />
    </div>
  );
}
