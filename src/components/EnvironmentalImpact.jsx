import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Recycle, Globe, ArrowUpRight } from 'lucide-react';

const stats = [
  { value: 'Goal', label: 'Minimise Campus e-Waste', icon: <Recycle size={20} />, color: 'from-emerald-400 to-green-500', barWidth: '70%' },
  { value: 'Target: 70%', label: 'Component Reuse Rate', icon: <Leaf size={20} />, color: 'from-green-400 to-teal-500', barWidth: '68%' },
  { value: 'Est. 30–40%', label: 'Lower Carbon Footprint', icon: <TrendingDown size={20} />, color: 'from-cyan-400 to-blue-500', barWidth: '40%' },
];

const flowNodes = [
  { label: 'Senior Sells', icon: '👨‍🎓', angle: 0 },
  { label: 'Verified', icon: '🔬', angle: 90 },
  { label: 'Junior Buys', icon: '🛒', angle: 180 },
  { label: 'Upgrade', icon: '📈', angle: 270 },
];

export default function EnvironmentalImpact() {
  return (
    <section id="impact" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-emerald-500/20 glass"
          >
            <Globe size={14} className="text-emerald-400" />
            <span className="text-xs font-black text-emerald-300 uppercase tracking-widest">Sustainability Mission</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            COMPUTING THAT <span className="text-gradient-emerald">MATTERS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl font-medium max-w-2xl"
          >
            By extending the lifecycle of hardware, we reduce the carbon debt 
            of manufacturing and prevent tons of toxic e-waste.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Visual Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Pulsing Outer Ring */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-pulse" />
              
              {/* Rotating Dashed Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-dashed border-emerald-500/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-14 rounded-full border border-dashed border-cyan-500/10"
              />

              {/* Center Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full glass-strong flex flex-col items-center justify-center text-center border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <span className="text-4xl md:text-5xl mb-2">🌱</span>
                  <span className="text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase">Circular</span>
                </div>
              </div>

              {/* Nodes */}
              {flowNodes.map((node, i) => {
                const angle = (node.angle * Math.PI) / 180;
                const radius = 160;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="absolute left-1/2 top-1/2 flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <div className="w-14 h-14 rounded-2xl glass-strong border border-emerald-500/20 flex items-center justify-center text-2xl shadow-xl">
                      {node.icon}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{node.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Impact Stats */}
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 10, borderColor: 'rgba(16,185,129,0.3)' }}
                className="glass-strong rounded-[2rem] p-8 border border-white/5 relative group cursor-default transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg transition-transform`}
                    >
                      {stat.icon}
                    </motion.div>
                    <div>
                      <div className="text-3xl font-black text-white tracking-tighter">{stat.value}</div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: stat.barWidth }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] border border-emerald-500/10 bg-emerald-500/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Leaf size={40} className="text-emerald-400" />
              </div>
              <p className="text-emerald-100/70 text-sm font-medium leading-relaxed italic">
                "Our mission is to decouple high-performance computing from 
                environmental degradation. Every senior trade-in is a victory for 
                the planet."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
