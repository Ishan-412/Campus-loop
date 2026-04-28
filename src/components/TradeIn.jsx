import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, TrendingUp, Zap, ArrowRight, CheckCircle, Wallet } from 'lucide-react';

const components = [
  { name: 'RTX 3060 (8GB)', category: 'GPU', condition: 'Excellent', baseValue: 18500, demand: 'High', icon: '🎮',
    desc: 'VRAM tested, 91% health score', glowColor: 'rgba(124,58,237,0.4)' },
  { name: '16GB DDR4 RAM', category: 'RAM', condition: 'Good', baseValue: 3200, demand: 'Medium', icon: '💾',
    desc: 'Both sticks verified, stable timing', glowColor: 'rgba(59,130,246,0.4)' },
  { name: '1TB NVMe SSD', category: 'Storage', condition: 'Very Good', baseValue: 5500, demand: 'High', icon: '💿',
    desc: '97% SMART health, 3.5GB/s read', glowColor: 'rgba(16,185,129,0.4)' },
  { name: 'Intel i7-10700K', category: 'CPU', condition: 'Good', baseValue: 12000, demand: 'Medium', icon: '⚡',
    desc: 'All cores stable at 4.7GHz', glowColor: 'rgba(245,158,11,0.4)' },
  { name: 'Corsair 650W PSU', category: 'PSU', condition: 'Excellent', baseValue: 4200, demand: 'Low', icon: '🔌',
    desc: '80+ Gold, ripple within spec', glowColor: 'rgba(239,68,68,0.4)' },
  { name: 'ASUS RTX 3070', category: 'GPU', condition: 'Very Good', baseValue: 26000, demand: 'High', icon: '🖥️',
    desc: 'Factory OC, 95% health score', glowColor: 'rgba(139,92,246,0.4)' },
];

const demandConfig = {
  High:   { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.35)',  text: '#10B981', label: '🔥 High Demand' },
  Medium: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', text: '#F59E0B', label: '⚡ Med Demand' },
  Low:    { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.35)',   text: '#EF4444', label: '❄️ Low Demand' },
};

const multipliers = { High: 1.0, Medium: 0.85, Low: 0.7 };

export default function TradeIn() {
  const [selected, setSelected] = useState(null);
  const [credited, setCredited] = useState(false);
  const getValue = (item) => Math.round(item.baseValue * multipliers[item.demand]);

  const handleCredit = () => {
    if (!selected) return;
    setCredited(true);
    setTimeout(() => { setCredited(false); setSelected(null); }, 3500);
  };

  return (
    <section id="trade-in" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 20% 60%, rgba(16,185,129,0.06) 0%, transparent 60%)',
      }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] orb bg-emerald-600 opacity-8" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-emerald-500/30"
            style={{ background: 'rgba(16,185,129,0.08)', backdropFilter: 'blur(10px)' }}
          >
            <RefreshCw size={14} className="text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Instant Liquidity</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Smart <span className="text-gradient">Trade-In</span> System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Real-time demand-based pricing. Get instant campus credits in under 5 minutes.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Components list — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 space-y-3"
          >
            {/* Live header */}
            <div className="flex items-center gap-2 mb-5 px-1">
              <TrendingUp size={15} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Market Board</span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400">Live</span>
              </span>
            </div>

            {components.map((comp, i) => {
              const val = getValue(comp);
              const dm = demandConfig[comp.demand];
              const isSelected = selected?.name === comp.name;
              return (
                <motion.div
                  key={comp.name}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 8, borderColor: 'rgba(16,185,129,0.3)', boxShadow: `0 8px 32px ${comp.glowColor}` }}
                  onClick={() => setSelected(isSelected ? null : comp)}
                  className="rounded-2xl p-4 border cursor-pointer transition-all duration-300 card-shine group"
                  style={{
                    background: isSelected ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(16px)',
                    borderColor: isSelected ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.06)',
                    boxShadow: isSelected ? `0 0 40px ${comp.glowColor}` : 'none',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="text-3xl transition-transform">{comp.icon}</motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-semibold text-white text-sm">{comp.name}</span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: dm.bg, border: `1px solid ${dm.border}`, color: dm.text }}
                        >
                          {dm.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{comp.category} • {comp.condition}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{comp.desc}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-white">₹{val.toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-400 font-medium">Instant credit</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all shrink-0 ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-400 scale-110'
                        : 'border-white/20 bg-transparent'
                    }`}>
                      {isSelected && <CheckCircle size={12} className="text-dark-950 m-auto mt-0.5" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Summary panel — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 sticky top-24"
          >
            <div className="rounded-3xl p-7 border overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(24px)',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Wallet size={18} className="text-emerald-400" />
                Trade-In Summary
              </h3>

              <AnimatePresence mode="wait">
                {credited ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl mb-4"
                    >✅</motion.div>
                    <div className="text-xl font-bold text-emerald-400 mb-2">Credit Added!</div>
                    <p className="text-sm text-slate-400">Your CampusLoop wallet has been updated.</p>
                  </motion.div>
                ) : selected ? (
                  <motion.div key="selected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Component preview */}
                    <div className="text-center py-5 rounded-2xl mb-5 border border-white/5"
                      style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="text-4xl mb-3">{selected.icon}</div>
                      <div className="font-bold text-white text-sm mb-1">{selected.name}</div>
                      <div className="text-xs text-slate-400">{selected.category} • {selected.condition}</div>
                    </div>

                    {/* Payout */}
                    <div className="rounded-2xl p-5 border border-emerald-500/25 mb-5"
                      style={{ background: 'rgba(16,185,129,0.06)' }}>
                      <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Your Payout</div>
                      <motion.div
                        key={selected.name}
                        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-black"
                        style={{
                          background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        ₹{getValue(selected).toLocaleString()}
                      </motion.div>
                      <div className="text-xs text-emerald-400 mt-1">+ Instant store credit</div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2.5 text-sm mb-6">
                      {[
                        ['Market Rate', `₹${selected.baseValue.toLocaleString()}`],
                        ['Demand Factor', `${(multipliers[selected.demand] * 100).toFixed(0)}%`],
                        ['Your Credit', `₹${getValue(selected).toLocaleString()}`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-slate-400 text-xs">{k}</span>
                          <span className="text-white font-semibold text-xs">{v}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: '0 20px 48px rgba(16,185,129,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCredit}
                      className="w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                        boxShadow: '0 8px 28px rgba(16,185,129,0.35)',
                      }}
                    >
                      <Zap size={16} />
                      Claim Instant Credit
                      <ArrowRight size={16} />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center py-12 text-slate-500"
                  >
                    <motion.div
                      animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="w-14 h-14 rounded-full border border-dashed border-slate-700 flex items-center justify-center mx-auto mb-4"
                    >
                      <RefreshCw size={22} className="opacity-30" />
                    </motion.div>
                    <p className="text-sm">Select a component<br />to see its trade-in value</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trust pills */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { icon: '✅', text: 'Fair Price' },
                { icon: '⚡', text: 'Instant' },
                { icon: '🤝', text: 'No Haggling' },
              ].map((t) => (
                <motion.div
                  key={t.text} whileHover={{ y: -2 }}
                  className="rounded-xl p-2.5 text-center border border-white/5 transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)' }}
                >
                  <div className="text-base mb-0.5">{t.icon}</div>
                  <div className="text-[10px] font-semibold text-slate-400">{t.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
