import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronDown, Cpu, HardDrive, Zap, TrendingUp, Check, Sparkles, Binary, Rocket } from 'lucide-react';

const branches = [
  'Computer Science', 'Mechanical', 'Electrical', 'Civil',
  'Biotechnology', 'Electronics', 'Chemical', 'Aerospace', 'Physics', 'Data Science',
];

const budgets = [
  'Under ₹30,000', '₹30,000–50,000', '₹50,000–80,000', '₹80,000–1,20,000', '₹1,20,000+',
];

const softwareOptions = {
  'Computer Science': [
    'VS Code + Extensions', 'PyTorch / TensorFlow', 'Docker + Kubernetes',
    'Android Studio', 'IntelliJ IDEA', 'Jupyter Notebook', 'Git + GitHub CLI', 'Node.js + npm',
  ],
  'Mechanical': [
    'AutoCAD 2024', 'SolidWorks Premium', 'ANSYS Workbench', 'Fusion 360',
    'CATIA V5', 'MATLAB + Simulink', 'PTC Creo', 'Inventor Professional',
  ],
  'Electrical': [
    'MATLAB + Simulink', 'Proteus Design Suite', 'Multisim', 'Cadence Virtuoso',
    'LTspice XVII', 'Eagle PCB', 'PSIM', 'OrCAD',
  ],
  'Civil': [
    'AutoCAD Civil 3D', 'STAAD Pro', 'Revit Architecture', 'ETABS',
    'SAP2000', 'SAFE', 'AutoCAD 2024', 'Primavera P6',
  ],
  'Biotechnology': [
    'ChemDraw Professional', 'PyMOL', 'BLAST + NCBI Tools', 'R + RStudio',
    'BioPython Suite', 'Gromacs', 'Autodock Vina', 'ImageJ',
  ],
  'Electronics': [
    'Eagle PCB Designer', 'Altium Designer', 'KiCad EDA', 'Proteus',
    'MATLAB + Simulink', 'LabVIEW', 'HFSS', 'Cadence PSpice',
  ],
  'Chemical': [
    'MATLAB', 'Aspen Plus', 'CHEMCAD', 'COMSOL Multiphysics',
    'Gaussian 16', 'ChemDraw', 'HYSYS', 'Unisim Design',
  ],
  'Aerospace': [
    'MATLAB + Simulink', 'ANSYS Fluent', 'OpenFOAM', 'Catia V5',
    'SolidWorks', 'XFLR5', 'STK', 'MSC Nastran',
  ],
  'Physics': [
    'MATLAB', 'Mathematica 13', 'LabVIEW', 'Origin Pro',
    'COMSOL Multiphysics', 'ROOT (CERN)', 'Python + SciPy', 'Gnuplot',
  ],
  'Data Science': [
    'Python + Anaconda', 'Jupyter Lab', 'Tableau Desktop', 'Power BI',
    'R + RStudio', 'Apache Spark', 'TensorFlow + Keras', 'KNIME Analytics',
  ],
};

const buildResults = {
  'Computer Science': {
    cpu: 'AMD Ryzen 7 5800H', gpu: 'NVIDIA RTX 3060 8GB', ram: '16GB DDR5 4800MHz',
    storage: '512GB NVMe Gen4 SSD', score: 87, grade: 'A',
    upgrade: ['Year 2: RAM → 32GB DDR5', 'Year 3: GPU → RTX 4070', 'Year 4: Trade-in & Full Rebuild'],
  },
  'Mechanical': {
    cpu: 'Intel Core i7-12700H', gpu: 'NVIDIA RTX A2000 6GB', ram: '32GB DDR4 3200MHz',
    storage: '1TB NVMe SSD + 500GB HDD', score: 93, grade: 'A+',
    upgrade: ['Year 2: Storage → 2TB NVMe', 'Year 3: RAM → 64GB ECC', 'Year 4: Workstation Rebuild'],
  },
  'Electrical': {
    cpu: 'AMD Ryzen 5 5600X', gpu: 'NVIDIA GTX 1660 Super', ram: '16GB DDR4 3200MHz',
    storage: '512GB NVMe SSD', score: 79, grade: 'B+',
    upgrade: ['Year 2: RAM → 32GB', 'Year 3: GPU → RTX 3060', 'Year 4: CPU Platform Upgrade'],
  },
  'Civil': {
    cpu: 'Intel Core i9-12900H', gpu: 'NVIDIA RTX 3070 8GB', ram: '32GB DDR5',
    storage: '1TB NVMe Gen4 SSD', score: 91, grade: 'A',
    upgrade: ['Year 2: RAM → 64GB', 'Year 3: GPU → RTX 4080', 'Year 4: Workstation Rebuild'],
  },
  'Biotechnology': {
    cpu: 'AMD Ryzen 5 5600X', gpu: 'NVIDIA GTX 1650', ram: '16GB DDR4',
    storage: '512GB SSD + 1TB HDD', score: 72, grade: 'B',
    upgrade: ['Year 2: RAM → 32GB', 'Year 3: GPU → RTX 3050', 'Year 4: Full Upgrade'],
  },
  'Data Science': {
    cpu: 'AMD Ryzen 9 5900X', gpu: 'NVIDIA RTX 3080 10GB', ram: '32GB DDR5 5200MHz',
    storage: '1TB NVMe Gen4 SSD', score: 95, grade: 'A+',
    upgrade: ['Year 2: RAM → 64GB', 'Year 3: GPU → RTX 4090', 'Year 4: AI Workstation Rebuild'],
  },
};

const defaultBuild = buildResults['Computer Science'];

function Select({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" style={{ zIndex: open ? 50 : 1 }}>
      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full glass border border-white/5 rounded-2xl px-5 py-4 text-left flex items-center justify-between text-sm hover:border-violet-500/30 transition-all duration-300 group"
      >
        <span className={value ? 'text-white font-bold' : 'text-slate-500'}>{value || `Select ${label}`}</span>
        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform duration-300 ${open ? 'rotate-180 text-violet-400' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-3 left-0 right-0 glass-strong border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 p-2"
          >
            <div className="max-h-60 overflow-y-auto space-y-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full px-4 py-3 rounded-xl text-left text-sm transition-all flex items-center justify-between
                    ${value === opt ? 'bg-violet-500 text-white font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                  {opt}
                  {value === opt && <Check size={16} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScoreHUD({ score, grade }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Architecture Grade</div>
          <div className="text-4xl font-black text-white">{grade}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Performance Index</div>
          <div className="text-4xl font-black text-gradient">{score}</div>
        </div>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        />
      </div>
    </div>
  );
}

export default function AIRecommender() {
  const [branch, setBranch] = useState('');
  const [budget, setBudget] = useState('');
  const [software, setSoftware] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const availableSoftware = branch ? (softwareOptions[branch] || []) : [];

  const toggleSoftware = (sw) =>
    setSoftware((prev) => prev.includes(sw) ? prev.filter((s) => s !== sw) : [...prev, sw]);

  const generate = () => {
    if (!branch || !budget) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(buildResults[branch] || defaultBuild);
      setLoading(false);
    }, 2500);
  };

  return (
    <section id="ai-recommender" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Visual Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-cyan-500/20 glass"
          >
            <Binary size={14} className="text-cyan-400" />
            <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">Neural Prediction Engine v1.0</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            AI BUILD <span className="text-gradient">ARCHITECT</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl font-medium max-w-2xl"
          >
            Input your academic requirements and budget. Our neural engine will 
            synthesize the optimal hardware configuration for your 4-year journey.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Inputs Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass-strong rounded-[2.5rem] p-10 border border-white/10"
          >
            <div className="flex flex-col gap-8">
              <Select label="Academic Specialization" options={branches} value={branch}
                onChange={(v) => { setBranch(v); setSoftware([]); }} />
              
              <Select label="Investment Range" options={budgets} value={budget} onChange={setBudget} />

              <AnimatePresence>
                {branch && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                      Required Software Suite
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {availableSoftware.map((sw) => (
                        <motion.button
                          key={sw}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleSoftware(sw)}
                          className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                            software.includes(sw)
                              ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                              : 'glass border-white/5 text-slate-500 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <span className="truncate">{sw}</span>
                          {software.includes(sw) && <Check size={14} className="shrink-0 ml-2" />}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={generate}
                disabled={!branch || !budget || loading}
                className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-sm transition-all tracking-widest uppercase ${
                  (!branch || !budget)
                    ? 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed'
                    : 'btn-primary shadow-[0_10px_40px_rgba(124,58,237,0.4)]'
                }`}
              >
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                      <Brain size={20} className="text-cyan-300" />
                    </motion.div>
                    Processing Data...
                  </>
                ) : (
                  <>
                    <Rocket size={20} />
                    Synthesize Build
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Results Panel */}
          <div className={`relative h-full min-h-[500px] ${loading ? 'shimmer rounded-[2.5rem]' : ''}`}>
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-strong rounded-[2.5rem] p-10 border border-violet-500/30 relative h-full flex flex-col shadow-[0_0_80px_rgba(124,58,237,0.15)]"
                >
                  <div className="absolute inset-0 scan-line-container opacity-10 pointer-events-none rounded-[2.5rem]" />
                  
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                        <Sparkles size={20} className="text-violet-400" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Optimal Synthesis</h3>
                    </div>
                  </div>

                  <ScoreHUD score={result.score} grade={result.grade} />

                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {[
                      { icon: <Cpu />, label: 'Processor', value: result.cpu },
                      { icon: <Zap />, label: 'Graphics', value: result.gpu },
                      { icon: <HardDrive />, label: 'Memory', value: result.ram },
                      { icon: <Binary />, label: 'Storage', value: result.storage },
                    ].map((spec, i) => (
                      <motion.div
                        key={spec.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5, borderColor: 'rgba(139,92,246,0.3)' }}
                        className="p-5 glass border border-white/5 rounded-[1.5rem] transition-colors group"
                      >
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <motion.span 
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="text-violet-400 scale-75 transition-transform"
                          >
                            {spec.icon}
                          </motion.span>
                          {spec.label}
                        </div>
                        <div className="text-sm font-black text-white leading-tight">{spec.value}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-auto p-6 rounded-3xl bg-violet-500/5 border border-violet-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp size={16} className="text-violet-400" />
                      <span className="text-[10px] font-black text-violet-300 uppercase tracking-widest">4-Year Lifecycle Roadmap</span>
                    </div>
                    <div className="space-y-3">
                      {result.upgrade.map((u, i) => (
                        <div key={i} className="flex items-start gap-4 text-sm text-slate-400 font-medium">
                          <span className="text-violet-500 font-black tabular-nums">0{i+1}.</span>
                          {u}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-[2.5rem] p-10 border border-white/5 h-full flex flex-col items-center justify-center text-center group"
                >
                  <div className="w-24 h-24 rounded-[2rem] glass-strong flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Brain size={48} className="text-violet-500/50" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Ready for Synthesis</h3>
                  <p className="text-slate-500 max-w-xs font-medium leading-relaxed">
                    Complete your profile configuration to generate a high-fidelity 
                    hardware roadmap.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
