import { motion } from 'framer-motion';
import { Zap, Brain, RefreshCw, Leaf, ChevronRight } from 'lucide-react';

const values = [
  {
    icon: <Zap size={24} />,
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(124,58,237,0.4)',
    title: '15–30% Cheaper',
    desc: 'Certified refurbished components at a fraction of market price. Get premium performance without the premium cost.',
    stat: '₹15K', statLabel: 'avg savings',
  },
  {
    icon: <Brain size={24} />,
    color: 'from-blue-500 to-cyan-500',
    glow: 'rgba(6,182,212,0.4)',
    title: 'AI-Personalized',
    desc: 'No guesswork. Our AI engine analyzes your branch and budget to build the exact machine you need.',
    stat: '98%', statLabel: 'match rate',
  },
  {
    icon: <RefreshCw size={24} />,
    color: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.4)',
    title: 'Upgrade-Friendly',
    desc: 'Start lean, upgrade smart. Every build comes with a 4-year roadmap aligned to your academic journey.',
    stat: '4yr', statLabel: 'roadmap',
  },
  {
    icon: <Leaf size={24} />,
    color: 'from-green-500 to-lime-500',
    glow: 'rgba(34,197,94,0.4)',
    title: 'Sustainable',
    desc: 'Each refurbished build keeps components out of landfills. Every loop is a step toward a greener campus.',
    stat: '2T+', statLabel: 'e-waste saved',
  },
];

export default function ValueProposition() {
  return (
    <section id="value" className="section-padding bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/10 via-transparent to-transparent" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Why <span className="text-gradient">CampusLoop</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Four pillars that make us the smarter choice for every student.
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
              className="glass rounded-3xl p-6 border border-white/5 transition-all duration-300 group cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white mb-6 shadow-lg transition-transform`}
                style={{ boxShadow: `0 8px 24px ${v.glow}` }}
              >
                {v.icon}
              </motion.div>
              <div className="mb-4">
                <span className="text-3xl font-black text-white">{v.stat}</span>
                <span className="text-sm text-slate-400 ml-1">{v.statLabel}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-violet-400 text-sm font-medium group-hover:gap-2 transition-all">
                <span>Learn more</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-20 overflow-hidden rounded-2xl glass border border-white/5 py-4">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {['AI-Recommended Builds', 'Certified Hardware', 'Pre-installed Software', 'Instant Trade-In', 'Quality Guarantee', '30% Savings', 'Green Computing', '4-Year Roadmap',
              'AI-Recommended Builds', 'Certified Hardware', 'Pre-installed Software', 'Instant Trade-In', 'Quality Guarantee', '30% Savings', 'Green Computing', '4-Year Roadmap'].map((t, i) => (
              <span key={i} className="text-sm font-medium text-slate-400 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
