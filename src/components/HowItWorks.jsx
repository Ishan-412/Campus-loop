import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Sparkles, Cpu, ShieldCheck, Zap, Recycle } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <Cpu className="text-violet-400" />,
    title: 'Senior Sells',
    desc: 'Final-year students list their high-end components — GPUs, RAM, and SSDs — on CampusLoop as they graduate.',
    color: 'from-violet-500/20 to-purple-600/20',
    border: 'border-violet-500/30',
  },
  {
    num: '02',
    icon: <ShieldCheck className="text-cyan-400" />,
    title: 'Test & Certify',
    desc: 'Our proprietary quality scanner stress-tests every circuit. We issue a digital health certificate for absolute peace of mind.',
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-cyan-500/30',
  },
  {
    num: '03',
    icon: <Zap className="text-emerald-400" />,
    title: 'Junior Buys',
    desc: 'Freshers get AI-recommended, certified builds at up to 30% below market price. Software comes pre-configured.',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
  },
  {
    num: '04',
    icon: <Recycle className="text-rose-400" />,
    title: 'Cycle Continues',
    desc: 'Trade-in credits fund your next upgrade. The ecosystem self-sustains — zero waste, maximum value for every student.',
    color: 'from-rose-500/20 to-pink-600/20',
    border: 'border-rose-500/30',
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="how-it-works" ref={containerRef} className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03)_0%,transparent_70%)]" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-violet-500/20 glass"
          >
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">The Hardware Lifecycle</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            THE <span className="text-gradient">CAMPUS LOOP</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl font-medium"
          >
            A circular hardware economy designed to power the next generation 
            of engineers, designers, and gamers.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-cyan-500 to-rose-500 -translate-x-1/2 hidden md:block"
          />

          <div className="space-y-32">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${
                  i % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                    <div className="text-5xl font-black text-white/5 mb-4 select-none tabular-nums">
                      {step.num}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className={`text-slate-400 text-lg leading-relaxed max-w-md ${i % 2 === 0 ? '' : 'md:text-right'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center Icon Node */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 10,
                      boxShadow: '0 20px 40px rgba(124,58,237,0.3)'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-20 h-20 rounded-[2.5rem] glass-strong border ${step.border} flex items-center justify-center text-3xl shadow-2xl bg-gradient-to-br ${step.color} cursor-pointer`}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Empty spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final Connector */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 flex flex-col items-center gap-6"
        >
          <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-violet-500 animate-bounce">
            <ChevronDown size={24} />
          </div>
          <span className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">The Loop Never Ends</span>
        </motion.div>
      </div>
    </section>
  );
}
