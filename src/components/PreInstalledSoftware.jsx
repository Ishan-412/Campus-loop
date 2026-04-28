import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Check, ChevronRight } from 'lucide-react';

const branches = [
  {
    id: 'cs', label: 'Computer Science', icon: '💻',
    color: 'from-violet-600 to-blue-600', glow: 'rgba(124,58,237,0.35)',
    tagColor: 'text-violet-300',
    software: [
      { name: 'VS Code', icon: '⚙️', desc: 'Full IDE + extensions' },
      { name: 'PyTorch', icon: '🔥', desc: 'ML / Deep Learning' },
      { name: 'Docker', icon: '🐳', desc: 'Containerization' },
      { name: 'Git + GitHub', icon: '🌿', desc: 'Version control' },
      { name: 'Node.js', icon: '🟢', desc: 'JS Runtime' },
      { name: 'Jupyter Lab', icon: '📓', desc: 'Notebook IDE' },
      { name: 'IntelliJ IDEA', icon: '🧠', desc: 'Java / Kotlin IDE' },
      { name: 'Postman', icon: '📮', desc: 'API Testing' },
    ],
  },
  {
    id: 'mech', label: 'Mechanical', icon: '⚙️',
    color: 'from-orange-500 to-rose-600', glow: 'rgba(249,115,22,0.35)',
    tagColor: 'text-orange-300',
    software: [
      { name: 'AutoCAD 2024', icon: '📐', desc: '2D/3D CAD Design' },
      { name: 'SolidWorks', icon: '🔩', desc: '3D Parametric Modeling' },
      { name: 'ANSYS', icon: '🌊', desc: 'FEA Simulation' },
      { name: 'MATLAB', icon: '📊', desc: 'Math & Simulation' },
      { name: 'CATIA V5', icon: '🏎️', desc: 'Advanced CAD' },
      { name: 'Fusion 360', icon: '🎨', desc: 'CAM + CAD' },
      { name: 'PTC Creo', icon: '🔧', desc: 'Product Design' },
      { name: 'Inventor', icon: '🏗️', desc: 'Mechanical Design' },
    ],
  },
  {
    id: 'ee', label: 'Electrical', icon: '⚡',
    color: 'from-yellow-500 to-amber-600', glow: 'rgba(234,179,8,0.35)',
    tagColor: 'text-yellow-300',
    software: [
      { name: 'MATLAB', icon: '📊', desc: 'Math & Simulation' },
      { name: 'Simulink', icon: '🔄', desc: 'Model-based Design' },
      { name: 'Proteus', icon: '🔌', desc: 'Circuit Simulation' },
      { name: 'Eagle PCB', icon: '🦅', desc: 'PCB Design' },
      { name: 'Multisim', icon: '🧮', desc: 'Electronics Sim' },
      { name: 'Cadence', icon: '📡', desc: 'IC/PCB Design' },
      { name: 'LTspice', icon: '⚡', desc: 'SPICE Simulation' },
      { name: 'OrCAD', icon: '🖥️', desc: 'Schematic Design' },
    ],
  },
  {
    id: 'civil', label: 'Civil', icon: '🏗️',
    color: 'from-slate-500 to-zinc-600', glow: 'rgba(100,116,139,0.35)',
    tagColor: 'text-slate-300',
    software: [
      { name: 'AutoCAD Civil 3D', icon: '📐', desc: 'Civil Design' },
      { name: 'STAAD Pro', icon: '🏛️', desc: 'Structural Analysis' },
      { name: 'Revit', icon: '🏠', desc: 'BIM Software' },
      { name: 'ETABS', icon: '🏢', desc: 'Building Analysis' },
      { name: 'SAP2000', icon: '🔍', desc: 'Structural Design' },
      { name: 'AutoCAD 2024', icon: '✏️', desc: '2D Drafting' },
      { name: 'SAFE', icon: '🧱', desc: 'Slab & Foundation' },
      { name: 'Primavera P6', icon: '📅', desc: 'Project Management' },
    ],
  },
  {
    id: 'bio', label: 'Biotechnology', icon: '🧬',
    color: 'from-green-500 to-teal-600', glow: 'rgba(16,185,129,0.35)',
    tagColor: 'text-green-300',
    software: [
      { name: 'R + RStudio', icon: '📊', desc: 'Statistical Analysis' },
      { name: 'ChemDraw', icon: '⚗️', desc: 'Chemical Structures' },
      { name: 'PyMOL', icon: '🔬', desc: 'Molecular Viz' },
      { name: 'BLAST Tools', icon: '🧬', desc: 'Sequence Analysis' },
      { name: 'BioPython', icon: '🐍', desc: 'Bioinformatics' },
      { name: 'Gromacs', icon: '⚛️', desc: 'MD Simulation' },
      { name: 'Autodock Vina', icon: '💊', desc: 'Docking Software' },
      { name: 'ImageJ', icon: '🖼️', desc: 'Image Processing' },
    ],
  },
  {
    id: 'ece', label: 'Electronics', icon: '📡',
    color: 'from-cyan-500 to-blue-600', glow: 'rgba(6,182,212,0.35)',
    tagColor: 'text-cyan-300',
    software: [
      { name: 'Eagle PCB', icon: '🦅', desc: 'PCB Design' },
      { name: 'Altium Designer', icon: '🔵', desc: 'Advanced PCB' },
      { name: 'KiCad EDA', icon: '🔷', desc: 'Open PCB Tool' },
      { name: 'Proteus', icon: '🔌', desc: 'Circuit Sim' },
      { name: 'MATLAB', icon: '📊', desc: 'Signal Processing' },
      { name: 'LabVIEW', icon: '🧪', desc: 'Test & Measurement' },
      { name: 'HFSS', icon: '📡', desc: 'EM Simulation' },
      { name: 'GNS3', icon: '🌐', desc: 'Network Simulation' },
    ],
  },
  {
    id: 'ds', label: 'Data Science', icon: '📊',
    color: 'from-pink-500 to-rose-600', glow: 'rgba(236,72,153,0.35)',
    tagColor: 'text-pink-300',
    software: [
      { name: 'Anaconda', icon: '🐍', desc: 'Python Ecosystem' },
      { name: 'Jupyter Lab', icon: '📓', desc: 'Notebook IDE' },
      { name: 'Tableau', icon: '📈', desc: 'Data Visualization' },
      { name: 'Power BI', icon: '💡', desc: 'BI Analytics' },
      { name: 'R + RStudio', icon: '📊', desc: 'Statistical Analysis' },
      { name: 'TensorFlow', icon: '🤖', desc: 'ML Framework' },
      { name: 'Apache Spark', icon: '⚡', desc: 'Big Data' },
      { name: 'KNIME', icon: '🔗', desc: 'Analytics Platform' },
    ],
  },
];

export default function PreInstalledSoftware() {
  const [active, setActive] = useState('cs');
  const current = branches.find((b) => b.id === active);

  return (
    <section id="software" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.06) 0%, transparent 60%)',
      }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb bg-cyan-600 opacity-8" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-cyan-500/30"
            style={{ background: 'rgba(6,182,212,0.08)', backdropFilter: 'blur(10px)' }}
          >
            <Package size={14} className="text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">Zero Setup Required</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Ready from <span className="text-gradient">Day 1</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Every PC comes with branch-specific, pre-licensed software — installed, configured, and
            ready to use the moment you power on.
          </motion.p>
        </div>

        {/* Branch selector — scrollable row */}
        <div className="flex items-center gap-3 mb-12 flex-wrap justify-center">
          {branches.map((b) => (
            <motion.button
              key={b.id}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(b.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 border`}
              style={active === b.id ? {
                background: `linear-gradient(135deg, ${b.glow.replace('0.35', '0.5')}, ${b.glow.replace('0.35', '0.2')})`,
                borderColor: b.glow.replace('0.35', '0.5'),
                color: 'white',
                boxShadow: `0 8px 24px ${b.glow}`,
              } : {
                background: 'rgba(255,255,255,0.02)',
                borderColor: 'rgba(255,255,255,0.08)',
                color: '#94a3b8',
              }}
            >
              <motion.span whileHover={{ scale: 1.2, rotate: 10 }}>{b.icon}</motion.span>
              {b.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Software grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 gap-4"
            >
              {current.software.map((sw, i) => (
                <motion.div
                  key={sw.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.15)', boxShadow: `0 16px 40px ${current.glow}` }}
                  className="rounded-2xl p-4 border cursor-default transition-all duration-300 group bg-white/[0.02] backdrop-blur-2xl"
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="text-3xl mb-3 transition-transform">{sw.icon}</motion.div>
                  <div className="font-semibold text-white text-sm mb-1">{sw.name}</div>
                  <div className="text-xs text-slate-400 mb-3">{sw.desc}</div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold">Pre-installed</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Laptop mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`laptop-${active}`}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg lg:scale-110 lg:translate-x-4">
                {/* Glow halo */}
                <div className="absolute -inset-6 rounded-3xl opacity-40 blur-2xl"
                  style={{ background: `radial-gradient(ellipse, ${current.glow}, transparent 70%)` }} />

                {/* Laptop body */}
                <div className="relative rounded-2xl p-1 shadow-2xl overflow-hidden z-10"
                  style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', boxShadow: `0 40px 80px ${current.glow}` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-2xl" />
                  {/* Screen */}
                  <div className="relative rounded-xl bg-dark-950 p-4 overflow-hidden z-10" style={{ aspectRatio: '16/10' }}>
                    {/* Traffic lights */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <div className="ml-3 flex-1 h-1.5 rounded-full bg-white/5" />
                      <div className="text-[9px] text-slate-500 font-mono ml-2">CampusLoop OS</div>
                    </div>

                    {/* App grid */}
                    <div className="grid grid-cols-4 gap-2 mt-1">
                      {current.software.map((sw, i) => (
                        <motion.div
                          key={sw.name}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06, duration: 0.25 }}
                          className="flex flex-col items-center gap-1 p-1.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <div className="text-2xl">{sw.icon}</div>
                          <span className="text-[8px] text-slate-300 text-center leading-tight font-medium">{sw.name}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom bar */}
                    <div className="absolute bottom-3 left-4 right-4 h-8 rounded-lg flex items-center justify-center gap-4"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {current.software.slice(0, 4).map((sw, i) => (
                        <span key={i} className="text-lg">{sw.icon}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Laptop base */}
                <div className="relative z-10 mx-auto mt-0.5 h-3 rounded-b-xl w-11/12"
                  style={{ background: 'linear-gradient(180deg, #334155, #1e293b)' }} />
                <div className="relative z-10 mx-auto h-1 w-full rounded-b-lg bg-dark-800" />

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-4 -right-4 rounded-xl px-3 py-2 border flex items-center gap-1.5 z-20 shadow-xl"
                  style={{
                    background: 'rgba(16,185,129,0.12)',
                    borderColor: 'rgba(16,185,129,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-semibold whitespace-nowrap">All Software Ready</span>
                </motion.div>

                {/* Branch label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 w-max z-20 bg-dark-900/80 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
                  <span className="text-lg">{current.icon}</span>
                  <span className={`text-sm font-bold ${current.tagColor}`}>{current.label} Bundle</span>
                  <ChevronRight size={14} className="text-slate-500" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
