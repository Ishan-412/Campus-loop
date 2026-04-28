import { motion } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden" style={{ padding: '120px 0 0 0' }}>
      {/* Multi-layer premium background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 60%)',
      }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-15"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }} />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="w-20 h-20 rounded-3xl animated-gradient flex items-center justify-center mx-auto mb-8"
            style={{ boxShadow: '0 0 80px rgba(99,102,241,0.5)' }}
          >
            <Cpu size={36} className="text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-black mb-6 leading-tight"
          >
            Ready to Build Your
            <br />
            <span className="relative inline-block">
              <span className="text-gradient">Dream Machine?</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6366F1, #22D3EE)',
                  boxShadow: '0 0 16px rgba(99,102,241,0.6)',
                  transformOrigin: 'left',
                }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Join hundreds of students already using CampusLoop to get the best hardware at the
            best price — powered by AI, driven by community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href="#pc-builder"
              whileHover={{ scale: 1.03, boxShadow: '0 24px 60px rgba(99,102,241,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 text-lg px-10 py-5 rounded-2xl font-bold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #22D3EE)',
                boxShadow: '0 8px 36px rgba(99,102,241,0.4)',
              }}
            >
              Start Building
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.03, borderColor: 'rgba(99,102,241,0.5)', backgroundColor: 'rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.97 }}
              className="text-lg px-10 py-5 rounded-2xl font-semibold text-slate-200 border transition-all duration-300 backdrop-blur-xl"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              Join CampusLoop
            </motion.a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-8"
          >
            {[
              { icon: '🔒', text: 'Certified Hardware' },
              { icon: '🤖', text: 'AI-Powered' },
              { icon: '🌱', text: 'Eco Friendly' },
              { icon: '⚡', text: 'Instant Delivery' },
            ].map((badge) => (
              <motion.div
                key={badge.text}
                whileHover={{ y: -5, scale: 1.05, borderColor: 'rgba(99,102,241,0.3)' }}
                className="flex items-center gap-2 text-sm text-slate-400 px-4 py-2 rounded-xl border transition-all duration-300 bg-white/[0.02]"
                style={{
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <motion.span whileHover={{ rotate: 15, scale: 1.2 }}>{badge.icon}</motion.span>
                <span className="font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 pt-8 pb-8" style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(0,0,0,0.3)',
      }}>
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg animated-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu size={14} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm">
              Campus<span className="text-gradient">Loop</span>
            </span>
          </a>
          <p className="text-sm text-slate-500">
            © 2026 CampusLoop. Built for students, by students. 🎓
          </p>
          <div className="flex items-center gap-5 text-sm text-slate-500">
            {['Privacy', 'Terms', 'Contact'].map((t) => (
              <a key={t} href="#" className="hover:text-slate-300 transition-colors duration-200">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
