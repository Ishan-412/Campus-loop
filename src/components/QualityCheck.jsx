import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Thermometer, Clock, Shield, ChevronRight, Cpu, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

const sampleReports = [
  {
    name: 'RTX 3060 8GB',
    type: 'GPU',
    icon: '🎮',
    performance: 91,
    temperature: 72,
    lifespan: '3–4 years',
    grade: 'A',
    gradeColor: 'text-emerald-400',
    gradeBg: 'bg-emerald-500/15',
    gradeBorder: 'border-emerald-500/30',
    glowColor: 'rgba(16,185,129,0.3)',
    checks: [
      { name: 'VRAM integrity', pass: true },
      { name: 'Shader units', pass: true },
      { name: 'Thermal paste', pass: true },
      { name: 'PCIe lanes', pass: true },
      { name: 'Clock stability', pass: true },
      { name: 'Fan speed', pass: true },
    ],
    thermalData: [62, 65, 68, 72, 70, 71, 72, 74, 72, 70, 69, 72],
  },
  {
    name: '16GB DDR4 Kit',
    type: 'RAM',
    icon: '💾',
    performance: 85,
    temperature: 45,
    lifespan: '4–5 years',
    grade: 'B+',
    gradeColor: 'text-blue-400',
    gradeBg: 'bg-blue-500/15',
    gradeBorder: 'border-blue-500/30',
    glowColor: 'rgba(59,130,246,0.3)',
    checks: [
      { name: 'Timing stability', pass: true },
      { name: 'No bad sectors', pass: true },
      { name: 'Voltage normal', pass: true },
      { name: 'Speed verified', pass: true },
      { name: 'XMP profile', pass: true },
      { name: 'Dual-channel', pass: false },
    ],
    thermalData: [40, 42, 43, 44, 45, 44, 43, 45, 44, 42, 43, 45],
  },
  {
    name: 'Samsung 1TB NVMe',
    type: 'SSD',
    icon: '💿',
    performance: 97,
    temperature: 42,
    lifespan: '5+ years',
    grade: 'A+',
    gradeColor: 'text-violet-400',
    gradeBg: 'bg-violet-500/15',
    gradeBorder: 'border-violet-500/30',
    glowColor: 'rgba(139,92,246,0.3)',
    checks: [
      { name: 'Sequential R/W', pass: true },
      { name: 'Health: 98%', pass: true },
      { name: 'SMART data', pass: true },
      { name: 'Controller OK', pass: true },
      { name: 'NAND wear', pass: true },
      { name: 'Firmware', pass: true },
    ],
    thermalData: [38, 39, 40, 42, 41, 40, 42, 43, 42, 41, 40, 42],
  },
];

function AnimatedBar({ value, color, delay = 0 }) {
  return (
    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay }}
        className="h-full rounded-full relative"
        style={{ background: color }}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="w-full h-full" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 2.5s infinite',
          }} />
        </div>
      </motion.div>
    </div>
  );
}

function MiniChart({ data, color, height = 48 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100 / (data.length - 1);

  const points = data.map((v, i) => `${i * w},${height - ((v - min) / range) * (height - 8)}`).join(' ');
  const areaPoints = `0,${height} ${points} 100,${height}`;

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id={`chartFill-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#chartFill-${color})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={i * w} cy={height - ((v - min) / range) * (height - 8)} r="1.5" fill={color} />
      ))}
    </svg>
  );
}

function AnimatedScore({ value, delay = 0 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const step = value / 40;
      const interval = setInterval(() => {
        start += step;
        if (start >= value) { setCount(value); clearInterval(interval); }
        else setCount(Math.round(start));
      }, 25);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return <span>{count}</span>;
}

export default function QualityCheck() {
  const [active, setActive] = useState(0);
  const report = sampleReports[active];

  return (
    <section id="quality" className="section-padding bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 80% 40%, rgba(59,130,246,0.05) 0%, transparent 60%)',
      }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] orb bg-blue-600 opacity-8" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-blue-500/30"
            style={{ background: 'rgba(59,130,246,0.08)', backdropFilter: 'blur(10px)' }}
          >
            <Shield size={14} className="text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">Automated Diagnostics</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Quality <span className="text-gradient">Health Report</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Every component undergoes 50+ stress tests, benchmarks, and thermal analysis before certification.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Component selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-1">Select Component</div>
            {sampleReports.map((r, i) => (
              <motion.button
                key={r.name}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActive(i)}
                className={`w-full rounded-2xl p-4 border text-left transition-all duration-300 flex items-center gap-4 group
                  ${active === i
                    ? 'border-white/15'
                    : 'border-white/5 hover:border-white/10'}`}
                style={{
                  background: active === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: active === i ? `0 0 40px ${r.glowColor}` : 'none',
                }}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="text-3xl transition-transform">{r.icon}</motion.div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{r.name}</div>
                  <div className="text-xs text-slate-400">{r.type}</div>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${r.gradeBg} ${r.gradeBorder} ${r.gradeColor}`}>
                  {r.grade}
                </div>
                <ChevronRight size={14} className={`transition-all ${active === i ? `${r.gradeColor} translate-x-0.5` : 'text-slate-600'}`} />
              </motion.button>
            ))}

            {/* Certification badge */}
            <div className="mt-6 p-4 rounded-2xl border border-emerald-500/20"
              style={{ background: 'rgba(16,185,129,0.05)', backdropFilter: 'blur(12px)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">CampusLoop Certified</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">All components include a 6-month warranty and detailed health certificate.</p>
            </div>
          </motion.div>

          {/* Report dashboard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-2 rounded-3xl border overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(24px)',
                borderColor: 'rgba(255,255,255,0.06)',
                boxShadow: `0 0 80px ${report.glowColor}`,
              }}
            >
              {/* Dashboard header */}
              <div className="p-6 pb-0 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="text-4xl transition-transform">{report.icon}</motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{report.name}</h3>
                    <p className="text-sm text-slate-400">{report.type} Health Diagnostics</p>
                  </div>
                </div>
                <div className={`flex flex-col items-center rounded-2xl px-5 py-3 border ${report.gradeBg} ${report.gradeBorder}`}>
                  <span className={`text-3xl font-black ${report.gradeColor}`}>{report.grade}</span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Grade</span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="p-6 grid md:grid-cols-2 gap-5">
                {/* Performance score */}
                <div className="p-5 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Activity size={14} className="text-violet-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Performance</span>
                    <span className="ml-auto text-lg font-black text-white"><AnimatedScore value={report.performance} delay={0.3} />%</span>
                  </div>
                  <AnimatedBar value={report.performance} color="linear-gradient(90deg, #7C3AED, #A78BFA)" delay={0.3} />
                  <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                    <span>Poor</span><span>Average</span><span>Excellent</span>
                  </div>
                </div>

                {/* Thermal */}
                <div className="p-5 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Thermometer size={14} className="text-orange-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Thermal Profile</span>
                    <span className="ml-auto text-sm font-bold text-white">{report.temperature}°C avg</span>
                  </div>
                  <MiniChart data={report.thermalData} color={report.temperature > 70 ? '#F59E0B' : '#10B981'} height={44} />
                  <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                    <span>{Math.min(...report.thermalData)}°C min</span>
                    <span>{Math.max(...report.thermalData)}°C max</span>
                  </div>
                </div>

                {/* Lifespan */}
                <div className="p-5 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={14} className="text-cyan-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Estimated Lifespan</span>
                  </div>
                  <div className="text-2xl font-black text-white mb-2">{report.lifespan}</div>
                  <AnimatedBar value={85} color="linear-gradient(90deg, #06B6D4, #22D3EE)" delay={0.5} />
                </div>

                {/* Quick stats */}
                 <div className="p-5 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/10 group" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu size={14} className="text-blue-400 group-hover:rotate-12 transition-transform" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">System Status</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Clock Speed', status: 'Stable', ok: true },
                      { label: 'Power Draw', status: 'Normal', ok: true },
                      { label: 'Stress Test', status: 'Passed', ok: true },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 text-xs">{s.label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-medium text-emerald-400">{s.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diagnostic checks */}
              <div className="px-6 pb-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Diagnostic Checks</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {report.checks.map((check, i) => (
                    <motion.div
                      key={check.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-white/5"
                      style={{ background: 'rgba(255,255,255,0.015)' }}
                    >
                      {check.pass
                        ? <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                        : <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                      }
                      <span className="text-xs text-slate-300 font-medium">{check.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
