import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, ShieldCheck, Zap, Recycle, ArrowRight, Play, Pause } from 'lucide-react';

const steps = [
  {
    id: 'sell',
    num: '01',
    icon: <Cpu className="text-violet-400" size={32} />,
    title: 'Senior Sells',
    desc: 'Final-year students list their high-end components — GPUs, RAM, and SSDs — on CampusLoop as they graduate. This keeps valuable hardware within the campus rather than being discarded or underpriced.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    glow: 'rgba(124,58,237,0.4)',
  },
  {
    id: 'certify',
    num: '02',
    icon: <ShieldCheck className="text-cyan-400" size={32} />,
    title: 'Test & Certify',
    desc: 'Our proprietary quality scanner stress-tests every circuit. We issue a digital health certificate for absolute peace of mind, ensuring every refurbished laptop or component is campus-ready.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    glow: 'rgba(6,182,212,0.4)',
  },
  {
    id: 'buy',
    num: '03',
    icon: <Zap className="text-emerald-400" size={32} />,
    title: 'Junior Buys',
    desc: 'Freshers get AI-recommended, certified builds at up to 30% below market price. Software comes pre-configured based on their exact academic branch (e.g., AutoCAD for Mechanical).',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    id: 'recycle',
    num: '04',
    icon: <Recycle className="text-rose-400" size={32} />,
    title: 'Cycle Continues',
    desc: 'Trade-in credits fund your next upgrade. At the end of Year 4, the student sells it back to CampusLoop. The ecosystem self-sustains — zero e-waste, maximum value for every student.',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    glow: 'rgba(244,63,94,0.4)',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="how-it-works" className="section-padding bg-dark-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-violet-500/20 glass"
          >
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Interactive Visualization</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tighter"
          >
            THE <span className="text-gradient">CAMPUS LOOP</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg font-medium"
          >
            Click the nodes below or let the simulation run to see exactly how our circular hardware economy powers the campus.
          </motion.p>
        </div>

        {/* Interactive Interactive Visualizer */}
        <div className="max-w-5xl mx-auto">
          {/* Controls */}
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors glass px-4 py-2 rounded-full border border-white/10"
            >
              {isPlaying ? <><Pause size={14} /> Pause Simulation</> : <><Play size={14} /> Run Simulation</>}
            </button>
          </div>

          {/* Node Map */}
          <div className="relative mb-12">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-rose-500 -translate-y-1/2 hidden md:block rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 relative z-10">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                const isPast = activeStep > i;
                return (
                  <div key={step.id} className="flex flex-col items-center justify-center">
                    <motion.button
                      onClick={() => { setActiveStep(i); setIsPlaying(false); }}
                      className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive ? 'scale-110 glass-strong shadow-2xl' : isPast ? 'glass bg-white/5 scale-95' : 'glass scale-95 opacity-50 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: isActive ? step.glow.replace('0.4', '0.8') : 'rgba(255,255,255,0.1)',
                        boxShadow: isActive ? `0 0 40px ${step.glow}` : 'none'
                      }}
                      whileHover={!isActive ? { scale: 1.05 } : {}}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeGlow"
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20`}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className={`relative z-10 ${isActive ? '' : 'grayscale'}`}>
                        {step.icon}
                      </div>
                      
                      {/* Number Badge */}
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                        isActive ? `bg-white text-dark-950 shadow-lg` : 'bg-dark-950 border border-white/10 text-slate-500'
                      }`}>
                        {step.num}
                      </div>
                    </motion.button>
                    <div className={`mt-6 text-center font-bold uppercase tracking-widest text-sm transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Content Panel */}
          <div className="relative min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-strong rounded-[2.5rem] p-8 md:p-12 border ${steps[activeStep].border} shadow-2xl`}
                style={{ boxShadow: `0 20px 80px ${steps[activeStep].glow.replace('0.4', '0.1')}` }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className={`w-32 h-32 rounded-3xl shrink-0 flex items-center justify-center bg-gradient-to-br ${steps[activeStep].color} shadow-lg relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="text-white drop-shadow-lg"
                    >
                      {steps[activeStep].icon}
                    </motion.div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-xs font-black uppercase tracking-[0.3em] mb-2" style={{ color: steps[activeStep].glow.replace('rgba(', 'rgb(').replace(',0.4)', ')') }}>
                      Phase {steps[activeStep].num}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed font-medium">
                      {steps[activeStep].desc}
                    </p>
                    
                    <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                      <button 
                        onClick={() => {
                          setActiveStep((prev) => (prev + 1) % steps.length);
                          setIsPlaying(false);
                        }}
                        className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors border border-white/5"
                      >
                        Next Phase <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
