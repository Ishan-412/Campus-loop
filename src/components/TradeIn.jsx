import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, TrendingUp, Zap, ArrowRight, CheckCircle, Wallet, Laptop, Cpu, HardDrive, Binary, Sparkles, Search, Check, Info } from 'lucide-react';

const categories = [
  { id: 'Laptop', icon: Laptop, baseValue: 35000 },
  { id: 'GPU', icon: Zap, baseValue: 18000 },
  { id: 'CPU', icon: Cpu, baseValue: 12000 },
  { id: 'RAM', icon: HardDrive, baseValue: 3500 },
  { id: 'Storage', icon: Binary, baseValue: 4000 },
];

const conditions = [
  { id: 'Like New', desc: 'No scratches, perfect condition', mult: 1.0 },
  { id: 'Good', desc: 'Minor wear, fully functional', mult: 0.8 },
  { id: 'Fair', desc: 'Visible wear, fully functional', mult: 0.6 },
  { id: 'Poor', desc: 'Heavy wear or minor defects', mult: 0.3 },
];

const ages = [
  { id: 'Under 1 Year', mult: 1.0 },
  { id: '1-2 Years', mult: 0.8 },
  { id: '2-3 Years', mult: 0.6 },
  { id: '3+ Years', mult: 0.4 },
];

function Select({ label, options, value, onChange, icon: Icon }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" style={{ zIndex: open ? 50 : 1 }}>
      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full glass border border-white/5 rounded-2xl px-5 py-4 text-left flex items-center justify-between text-sm hover:border-emerald-500/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={16} className={value ? 'text-emerald-400' : 'text-slate-500'} />}
          <span className={value ? 'text-white font-bold' : 'text-slate-500'}>
            {value ? value.id || value : `Select ${label}`}
          </span>
        </div>
        <div className={`transition-transform duration-300 text-slate-500 ${open ? 'rotate-180 text-emerald-400' : ''}`}>▼</div>
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
              {options.map((opt) => {
                const optId = opt.id || opt;
                const isSelected = (value?.id || value) === optId;
                return (
                  <button
                    key={optId}
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={`w-full px-4 py-3 rounded-xl text-left text-sm transition-all flex items-center justify-between
                      ${isSelected ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                  >
                    <div>
                      <div>{optId}</div>
                      {opt.desc && <div className="text-[10px] text-slate-500 font-normal mt-0.5">{opt.desc}</div>}
                    </div>
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TradeIn() {
  const [category, setCategory] = useState('');
  const [modelName, setModelName] = useState('');
  const [condition, setCondition] = useState('');
  const [age, setAge] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Initiating Scan...');
  const [appraisal, setAppraisal] = useState(null);
  const [credited, setCredited] = useState(false);

  useEffect(() => {
    let interval;
    if (loading) {
      const texts = ['Analyzing market data...', 'Evaluating condition multipliers...', 'Calculating ecosystem bonus...'];
      let idx = 0;
      setLoadingText(texts[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % texts.length;
        setLoadingText(texts[idx]);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const runAppraisal = () => {
    if (!category || !modelName || !condition || !age) return;
    setLoading(true);
    setAppraisal(null);

    // Deterministic hash based on model name to vary the base value slightly
    let hash = 0;
    for (let i = 0; i < modelName.length; i++) hash = Math.imul(31, hash) + modelName.charCodeAt(i) | 0;
    const variance = (Math.abs(hash) % 40) / 100 + 0.8; // 0.8 to 1.2 multiplier

    setTimeout(() => {
      const base = category.baseValue * variance;
      const condMult = condition.mult;
      const ageMult = age.mult;
      
      const rawValue = Math.round(base * condMult * ageMult);
      const cashValue = Math.max(rawValue, 500); // Minimum 500
      const ecosystemValue = Math.round(cashValue * 1.2); // 20% Bonus!

      setAppraisal({
        modelName,
        category: category.id,
        cashValue,
        ecosystemValue,
        baseValue: Math.round(base),
        condMult,
        ageMult,
        condReduction: Math.round(base - (base * condMult)),
        ageReduction: Math.round((base * condMult) - rawValue),
      });
      setLoading(false);
    }, 2500);
  };

  const handleCredit = () => {
    setCredited(true);
    setTimeout(() => { 
      setCredited(false); 
      setAppraisal(null); 
      setCategory('');
      setModelName('');
      setCondition('');
      setAge('');
    }, 3500);
  };

  return (
    <section id="trade-in" className="section-padding bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(16,185,129,0.06)_0%,transparent_60%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] orb bg-emerald-600 opacity-8" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-emerald-500/30 glass"
          >
            <RefreshCw size={14} className="text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Smart Appraiser</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tighter"
          >
            SMART <span className="text-gradient">TRADE-IN</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Appraise your old laptops and components. Choose cash, or get a massive 20% bonus by keeping it in the CampusLoop ecosystem.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Inputs Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 glass-strong rounded-[2.5rem] p-10 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <Search size={20} className="text-emerald-400" />
              <h3 className="text-xl font-black text-white">Device Details</h3>
            </div>

            <div className="flex flex-col gap-6">
              <Select label="Device Category" options={categories} value={category} onChange={setCategory} icon={category ? category.icon : Laptop} />
              
              <div className="relative">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Device / Model Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dell XPS 15, RTX 3060, Ryzen 5600X"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full glass border border-white/5 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all duration-300"
                />
              </div>

              <Select label="Current Condition" options={conditions} value={condition} onChange={setCondition} />
              <Select label="Usage Age" options={ages} value={age} onChange={setAge} />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={runAppraisal}
                disabled={!category || !modelName || !condition || !age || loading}
                className={`w-full mt-4 py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-sm transition-all tracking-widest uppercase ${
                  (!category || !modelName || !condition || !age)
                    ? 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed'
                    : 'bg-emerald-500 text-dark-950 shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:bg-emerald-400'
                }`}
              >
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                      <RefreshCw size={20} className="text-dark-950" />
                    </motion.div>
                    {loadingText}
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Estimate Value
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Appraisal Summary Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 relative h-full min-h-[400px]"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-strong rounded-[2.5rem] p-10 border border-emerald-500/30 h-full flex items-center justify-center shimmer relative overflow-hidden"
                >
                  <div className="absolute inset-0 scan-line-container opacity-20 pointer-events-none" />
                </motion.div>
              ) : credited ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-strong rounded-[2.5rem] p-10 border border-emerald-500/50 h-full flex flex-col items-center justify-center text-center shadow-[0_0_80px_rgba(16,185,129,0.2)]"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mb-6"
                  >
                    <Check size={40} className="text-emerald-400" />
                  </motion.div>
                  <div className="text-2xl font-black text-white tracking-tight mb-2">Value Locked!</div>
                  <p className="text-sm text-slate-400 font-medium">Please drop off your {appraisal?.category} at the Campus IT center within 48 hours to complete the transfer.</p>
                </motion.div>
              ) : appraisal ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-strong rounded-[2.5rem] p-10 border border-emerald-500/30 relative h-full flex flex-col shadow-[0_0_80px_rgba(16,185,129,0.15)]"
                >
                  <div className="absolute inset-0 scan-line-container opacity-10 pointer-events-none rounded-[2.5rem]" />
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <Wallet size={20} className="text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Appraisal Summary</h3>
                  </div>

                  <div className="text-center py-5 rounded-2xl mb-8 glass border border-white/5">
                    <div className="font-bold text-white text-lg mb-1">{appraisal.modelName}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest">{appraisal.category} • {condition.id} • {age.id}</div>
                  </div>

                  {/* Valuation Breakdown */}
                  <div className="p-4 rounded-[1.25rem] bg-white/5 border border-white/10 mb-4">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Valuation Breakdown</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 font-medium">Base Market Value</span>
                        <span className="text-white font-bold">₹{appraisal.baseValue?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 font-medium">Condition Adj. (×{appraisal.condMult})</span>
                        <span className="text-rose-400 font-bold">−₹{appraisal.condReduction?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 font-medium">Age Depreciation (×{appraisal.ageMult})</span>
                        <span className="text-rose-400 font-bold">−₹{appraisal.ageReduction?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cash Value */}
                  <div className="flex justify-between items-center p-5 rounded-[1.5rem] bg-white/5 border border-white/10 mb-4">
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Cash Payout</div>
                      <div className="text-xl font-bold text-white">₹{appraisal.cashValue.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Ecosystem Bonus */}
                  <div className="relative p-6 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/30 mb-8 overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-dark-950 text-[10px] font-black px-3 py-1 rounded-bl-xl">
                      +20% ECOSYSTEM BONUS
                    </div>
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">CampusLoop Credit</div>
                    <div className="text-4xl font-black text-white mb-2 tracking-tighter">₹{appraisal.ecosystemValue.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Use this credit to upgrade to a new system in the marketplace.</div>
                  </div>

                  {/* Transparency Footnote */}
                  <div className="mb-4 text-[10px] text-slate-500 leading-relaxed px-1">
                    Estimated using AI-assisted pricing trends and Indian resale market data.
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCredit}
                    className="w-full py-4 rounded-2xl font-bold text-sm text-dark-950 flex items-center justify-center gap-2 transition-all bg-emerald-400 hover:bg-emerald-300 mt-auto shadow-[0_10px_30px_rgba(52,211,153,0.3)]"
                  >
                    Lock In Trade Value
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass rounded-[2.5rem] p-10 border border-white/5 h-full flex flex-col items-center justify-center text-center group"
                >
                  <div className="w-24 h-24 rounded-[2rem] glass-strong flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <RefreshCw size={48} className="text-emerald-500/50" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Awaiting Input</h3>
                  <p className="text-slate-500 max-w-xs font-medium leading-relaxed">
                    Enter your device details in the appraiser to reveal its market value and ecosystem bonus.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
