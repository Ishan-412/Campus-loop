import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Zap, Brain, RefreshCw, Leaf, ChevronRight, Activity, Cpu, Laptop, CheckCircle } from 'lucide-react';

function Counter({ from, to, duration, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: duration, ease: 'easeOut' });
      const unsubscribe = rounded.on("change", (v) => setDisplay(v));
      return () => { controls.stop(); unsubscribe(); };
    }
  }, [inView, count, to, duration, rounded]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const values = [
  {
    icon: <Zap size={24} />,
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(124,58,237,0.4)',
    title: 'Drastic Savings',
    desc: 'Certified refurbished components at a fraction of market price. Get premium performance without the premium cost.',
    statNode: <Counter from={0} to={30} duration={2} suffix="%" />,
    statLabel: 'avg cost savings',
  },
  {
    icon: <Brain size={24} />,
    color: 'from-blue-500 to-cyan-500',
    glow: 'rgba(6,182,212,0.4)',
    title: 'AI-Personalized',
    desc: 'No guesswork. Our AI engine analyzes your branch and budget to build the exact machine you need.',
    statNode: <Counter from={0} to={98} duration={2.5} suffix="%" />,
    statLabel: 'match rate accuracy',
  },
  {
    icon: <RefreshCw size={24} />,
    color: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.4)',
    title: 'Upgrade-Friendly',
    desc: 'Start lean, upgrade smart. Every build comes with a 4-year roadmap aligned to your academic journey.',
    statNode: <Counter from={0} to={4} duration={1.5} suffix="yr" />,
    statLabel: 'ecosystem lifecycle',
  },
  {
    icon: <Leaf size={24} />,
    color: 'from-green-500 to-lime-500',
    glow: 'rgba(34,197,94,0.4)',
    title: 'Sustainable',
    desc: 'Each refurbished build keeps components out of landfills. Every loop is a step toward a greener campus.',
    statNode: <Counter from={0} to={2000} duration={3} suffix="kg+" />,
    statLabel: 'e-waste prevented',
  },
];

const liveActivities = [
  { text: "Rahul (Mechanical '25) traded an RTX 3060 for ₹18,000 credit", icon: <RefreshCw size={14} className="text-emerald-400" /> },
  { text: "Aman synthesized a High-End CAD Laptop", icon: <Laptop size={14} className="text-violet-400" /> },
  { text: "CampusLoop verified an Intel i7-10700K • Health: 96%", icon: <CheckCircle size={14} className="text-cyan-400" /> },
  { text: "Priya (CS '27) upgraded to 32GB RAM", icon: <Cpu size={14} className="text-rose-400" /> },
  { text: "New High-End GPU arrived in the marketplace", icon: <Zap size={14} className="text-amber-400" /> },
];

export default function ValueProposition() {
  return (
    <section id="value" className="section-padding bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-violet-500/30 glass"
          >
            <Activity size={14} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-300">Live Campus Statistics</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tighter"
          >
            Why <span className="text-gradient">CampusLoop</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-xl mx-auto font-medium"
          >
            Four pillars that make us the smartest hardware choice for every student on campus.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.15)', boxShadow: `0 20px 40px ${v.glow}` }}
              className="glass rounded-3xl p-6 border border-white/5 transition-all duration-300 group cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white mb-6 shadow-lg transition-transform`}
                style={{ boxShadow: `0 8px 24px ${v.glow}` }}
              >
                {v.icon}
              </motion.div>
              <div className="mb-4">
                <span className="text-4xl font-black text-white tracking-tighter">{v.statNode}</span>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{v.statLabel}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">{v.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-violet-400 text-sm font-bold group-hover:gap-2 transition-all">
                <span>View Details</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Marketplace Activity Ticker */}
        <div className="mt-20 overflow-hidden rounded-2xl glass-strong border border-white/10 py-5 relative group">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-950 to-transparent z-10" />
          
          <div className="absolute top-0 left-0 px-4 py-1 bg-violet-500/20 text-[10px] font-black text-violet-300 uppercase tracking-widest rounded-br-xl z-20 flex items-center gap-2 border-r border-b border-violet-500/30">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Live Ecosystem
          </div>

          <div className="flex gap-16 animate-marquee whitespace-nowrap mt-2 group-hover:[animation-play-state:paused]">
            {/* Double array for seamless loop */}
            {[...liveActivities, ...liveActivities, ...liveActivities].map((activity, i) => (
              <span key={i} className="text-sm font-semibold text-slate-300 flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer">
                {activity.icon}
                {activity.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
