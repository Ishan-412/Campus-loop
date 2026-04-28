import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Menu, X, ChevronRight, Zap } from 'lucide-react';

const navLinks = [
  { label: 'AI Recommender', href: '#ai-recommender' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Trade-In', href: '#trade-in' },
  { label: 'PC Builder', href: '#pc-builder' },
  { label: 'Impact', href: '#impact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 border ${
            scrolled
              ? 'w-full max-w-5xl glass-strong border-white/10 shadow-2xl'
              : 'w-full max-w-6xl glass border-white/5'
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Cpu size={20} className="text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter hidden sm:block">
              CAMPUS<span className="text-gradient">LOOP</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-xs font-black text-slate-400 hover:text-white uppercase tracking-widest transition-all duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a href="#ai-recommender" className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-400 hover:text-violet-300 transition-colors px-4">
              <Zap size={14} />
              AI Build
            </a>
            <motion.a 
              href="#pc-builder" 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex items-center justify-center text-center text-xs py-2.5 px-6 font-black uppercase tracking-widest leading-none" 
              style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '24px', paddingRight: '24px' }}
            >
              Build Now
            </motion.a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl glass border-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed inset-0 z-[90] lg:hidden p-4 pt-28 bg-dark-950/80 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-5 glass-strong rounded-2xl text-lg font-black text-white flex items-center justify-between border-white/5"
                >
                  {link.label}
                  <ChevronRight size={20} className="text-violet-500" />
                </motion.a>
              ))}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex flex-col gap-4"
              >
                <motion.a href="#ai-recommender" onClick={() => setMobileOpen(false)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-ghost text-center py-5">
                  AI RECOMMENDATIONS
                </motion.a>
                <motion.a href="#pc-builder" onClick={() => setMobileOpen(false)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary text-center py-5">
                  START BUILDING
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
