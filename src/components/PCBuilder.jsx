import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Plus, Minus, Zap, ShoppingCart, Save, TrendingUp, BarChart3, Activity } from 'lucide-react';

const componentOptions = {
  CPU: [
    { name: 'Intel i3-12100F',   price: 9200,  score: 55, icon: '⚡', tier: 'Budget' },
    { name: 'AMD Ryzen 5 5600',  price: 14000, score: 72, icon: '⚡', tier: 'Balanced' },
    { name: 'Intel i7-12700K',   price: 29200, score: 92, icon: '⚡', tier: 'Pro' },
    { name: 'AMD Ryzen 9 7900X', price: 42800, score: 96, icon: '⚡', tier: 'Beast' },
  ],
  GPU: [
    { name: 'GTX 1660 Super',   price: 31500,  score: 55, icon: '🖥️', tier: 'Budget' },
    { name: 'RTX 3060 12GB',    price: 55000,  score: 75, icon: '🖥️', tier: 'Balanced' },
    { name: 'RTX 3070 Ti',      price: 74800,  score: 88, icon: '🖥️', tier: 'Pro' },
    { name: 'RTX 4070 Super',   price: 118000, score: 95, icon: '🖥️', tier: 'Beast' },
  ],
  RAM: [
    { name: '8GB DDR4 3200MHz',  price: 6800,  score: 50, icon: '💾', tier: 'Budget' },
    { name: '16GB DDR4 3200MHz', price: 14000, score: 75, icon: '💾', tier: 'Balanced' },
    { name: '32GB DDR5 5200MHz', price: 34800, score: 92, icon: '💾', tier: 'Pro' },
    { name: '64GB DDR5 6000MHz', price: 66000, score: 98, icon: '💾', tier: 'Beast' },
  ],
  Storage: [
    { name: '500GB NVMe Gen3', price: 10200, score: 65, icon: '💿', tier: 'Budget' },
    { name: '1TB NVMe Gen3',   price: 16700, score: 75, icon: '💿', tier: 'Balanced' },
    { name: '1TB NVMe Gen4',   price: 21800, score: 85, icon: '💿', tier: 'Pro' },
    { name: '2TB NVMe Gen4',   price: 36900, score: 95, icon: '💿', tier: 'Beast' },
  ],
  PSU: [
    { name: '550W 80+ Bronze',    price: 3800,  score: 60, icon: '🔌', tier: 'Budget' },
    { name: '650W 80+ Gold',      price: 6500,  score: 80, icon: '🔌', tier: 'Balanced' },
    { name: '850W 80+ Gold',      price: 10500, score: 92, icon: '🔌', tier: 'Pro' },
    { name: '1000W 80+ Platinum', price: 18500, score: 98, icon: '🔌', tier: 'Beast' },
  ],
};

const tierColors = {
  Budget:   { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)',  border: 'rgba(148,163,184,0.2)' },
  Balanced: { color: '#60A5FA', bg: 'rgba(96,165,250,0.1)',   border: 'rgba(96,165,250,0.25)' },
  Pro:      { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)',  border: 'rgba(167,139,250,0.3)' },
  Beast:    { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.35)' },
};

const catGlow = {
  CPU: 'rgba(139,92,246,0.35)',
  GPU: 'rgba(59,130,246,0.35)',
  RAM: 'rgba(6,182,212,0.35)',
  Storage: 'rgba(16,185,129,0.35)',
  PSU: 'rgba(245,158,11,0.3)',
};

function PerfRing({ score }) {
  const r = 38; const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 filter drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r={r} fill="none"
          stroke="url(#pcGrad)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          key={score}
        />
        <defs>
          <linearGradient id="pcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span key={score} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-black text-white leading-none tracking-tighter">{score}</motion.span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Score</span>
      </div>
    </div>
  );
}

export default function PCBuilder() {
  const [selections, setSelections] = useState({
    CPU: componentOptions.CPU[1],
    GPU: componentOptions.GPU[1],
    RAM: componentOptions.RAM[1],
    Storage: componentOptions.Storage[1],
    PSU: componentOptions.PSU[1],
  });
  const [expanded, setExpanded] = useState('GPU');

  const totalPrice = Object.values(selections).reduce((s, c) => s + c.price, 0);
  const avgScore = Math.round(Object.values(selections).reduce((s, c) => s + c.score, 0) / 5);

  return (
    <section id="pc-builder" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-violet-500/20 glass"
          >
            <Settings size={14} className="text-violet-400" />
            <span className="text-xs font-black text-violet-300 uppercase tracking-widest">Component Selector</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            CUSTOM <span className="text-gradient">PC BUILDER</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl font-medium leading-relaxed"
          >
            Architect your ideal workstation with transparent, real-time 
            pricing based on current Indian hardware data.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Component accordion — 8 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-8 space-y-4"
          >
            {Object.entries(componentOptions).map(([cat, opts]) => {
              const isExpanded = expanded === cat;
              const glow = catGlow[cat];
              return (
                <div key={cat} className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                  isExpanded ? 'glass-strong border-white/20' : 'glass border-white/5'
                }`}>
                  {/* Header row */}
                  <motion.button
                    onClick={() => setExpanded(isExpanded ? null : cat)}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className="w-full flex items-center gap-6 p-6 transition-colors text-left group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-inner border border-white/5 transition-transform"
                    >
                      {selections[cat].icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{cat}</div>
                      <div className="text-xl font-black text-white tracking-tight">{selections[cat].name}</div>
                    </div>
                    
                    <div className="hidden sm:flex flex-col items-end mr-6">
                      <div className="text-xl font-black text-white">₹{selections[cat].price.toLocaleString()}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Activity size={12} className="text-violet-400" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selections[cat].score}/100</span>
                      </div>
                    </div>

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                      isExpanded ? 'bg-violet-500 text-white border-violet-400' : 'bg-white/5 text-slate-400 border-white/10'
                    }`}>
                      {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </motion.button>

                  {/* Expanded options */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0">
                          {opts.map((opt) => {
                            const chosen = selections[cat].name === opt.name;
                            return (
                              <motion.button
                                key={opt.name}
                                whileHover={{ scale: 1.03, y: -5 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setSelections(prev => ({ ...prev, [cat]: opt }))}
                                className={`p-5 rounded-2xl border transition-all duration-300 text-left relative group overflow-hidden ${
                                  chosen ? 'bg-violet-500/10 border-violet-500/50' : 'bg-white/2 border-white/5 hover:border-white/20'
                                }`}
                              >
                                {chosen && <div className="absolute top-0 right-0 p-2"><Zap size={14} className="text-violet-400" /></div>}
                                <div className="flex items-center gap-4">
                                  <span className="text-2xl">{opt.icon}</span>
                                  <div>
                                    <div className="font-black text-white text-sm mb-1">{opt.name}</div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-lg font-black text-white/90">₹{opt.price.toLocaleString()}</span>
                                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 uppercase tracking-widest">
                                        {opt.tier}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* HUD Summary — 4 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-4 sticky top-28"
          >
            <div className="glass-strong rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden group">
              {/* Scanline effect */}
              <div className="absolute inset-0 scan-line-container opacity-20 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Build Summary</h3>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>

                {/* Main Performance Ring */}
                <div className="mb-12">
                  <PerfRing score={avgScore} />
                  <div className="flex justify-center gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Components</div>
                      <div className="text-sm font-black text-white">5 selected</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Market Data</div>
                      <div className="text-sm font-black text-emerald-400">Live</div>
                    </div>
                  </div>
                </div>

                {/* Pricing Block */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Base Estimate</span>
                    <span className="text-sm font-black text-white">₹{(totalPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Assembly & Warranty</span>
                    <span className="text-sm font-black text-emerald-400">₹1,499 (FREE)</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Total</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2, color: '#8B5CF6' }}
                      animate={{ scale: 1, color: '#ffffff' }}
                      className="text-3xl font-black tracking-tighter"
                    >
                      ₹{totalPrice.toLocaleString()}
                    </motion.span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full btn-primary flex items-center justify-center gap-3 py-5 rounded-[1.25rem] font-black uppercase tracking-[0.1em]"
                  >
                    <ShoppingCart size={18} />
                    REQUEST THIS BUILD
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-[1.25rem] border border-white/5 glass transition-all text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                  >
                    <Save size={14} />
                    SAVE & SHARE
                  </motion.button>
                </div>

                {/* Footer status */}
                <div className="mt-8 flex items-center gap-2">
                  <BarChart3 size={12} className="text-violet-500" />
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Prices based on current Indian market estimates</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
