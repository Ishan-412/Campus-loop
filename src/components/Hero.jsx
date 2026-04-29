import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Zap, Shield, Recycle, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

const floatingItems = [
  { icon: '🖥️', x: '7%',  y: '22%', delay: 0,    size: 'text-4xl' },
  { icon: '💾', x: '88%', y: '14%', delay: 0.5,  size: 'text-3xl' },
  { icon: '🔧', x: '4%',  y: '68%', delay: 1,    size: 'text-2xl' },
  { icon: '⚡', x: '92%', y: '62%', delay: 0.3,  size: 'text-3xl' },
  { icon: '🎮', x: '76%', y: '78%', delay: 0.8,  size: 'text-2xl' },
  { icon: '💻', x: '18%', y: '84%', delay: 1.2,  size: 'text-3xl' },
];

const stats = [
  { value: 'Grade A', label: 'Certified Hardware',  icon: <Shield size={16} />,  color: 'from-blue-500 to-cyan-500' },
  { value: 'Academic', label: 'Mapped Configs',      icon: <Zap size={16} />,     color: 'from-violet-500 to-purple-600' },
  { value: 'Circular', label: 'Student Economy',    icon: <Recycle size={16} />, color: 'from-emerald-500 to-teal-500' },
];

export default function Hero() {
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), { stiffness: 100, damping: 30 });

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: ['139,92,246', '6,182,212', '99,102,241'][Math.floor(Math.random() * 3)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950 pt-20"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="absolute inset-0 opacity-40 pointer-events-none" />
        <div className="absolute inset-0 animated-gradient opacity-[0.05]" />
        
        {/* Massive Glow Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] mask-radial"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content Container with 3D Tilt */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          perspective: 1000,
          opacity: opacityFade,
          y: yParallax
        }}
        className="container-custom relative z-10 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-violet-500/20 glass"
        >
          <Sparkles size={14} className="text-violet-400 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
            The Future of Campus Hardware
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
        >
          <span className="inline-block hover:scale-105 transition-transform duration-500 cursor-default">
            AFFORDABLE
          </span>
          <br />
          <span className="text-gradient">SUPERCHARGED</span>
          <br />
          <span className="text-white/90">PC ECOSYSTEM</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium"
        >
          A circular hardware economy assisted by AI-driven recommendations. 
          Certifying, building, and trading hardware for the campus community.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
        >
          <motion.a
            href="#ai-recommender"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary group flex items-center gap-2"
          >
            Launch AI Recommender
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#pc-builder"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ghost"
          >
            Custom PC Builder
          </motion.a>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-3xl border border-white/5 relative group overflow-hidden transition-all duration-300 hover:border-violet-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 mx-auto shadow-lg transition-transform`}
              >
                {s.icon}
              </motion.div>
              <div className="text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} pointer-events-none z-10 opacity-20`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-1 h-12 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-violet-500 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
