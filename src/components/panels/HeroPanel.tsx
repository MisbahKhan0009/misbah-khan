import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { TextScramble } from '../ui/TextScramble';
import { Database, Terminal, BarChart3, Bot } from 'lucide-react';

const stats = [
  { label: 'LeetCode Problems', value: '50+' },
  { label: 'SQL Queries Daily', value: '50+' },
  { label: 'Automations Built', value: '40+' },
];

export const HeroPanel = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-background-deep" />

      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Typography */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono text-primary uppercase tracking-widest mb-6">
                <Database size={12} />
                Data Analyst & Automation Engineer
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
                I turn raw data
                <br />
                into{' '}
                <span className="text-primary inline-block whitespace-nowrap">
                  <TextScramble text="actionable systems" />
                </span>
                <br />
                that scale.
              </h1>
            </motion.div>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Data analyst specializing in PostgreSQL, Python scripting, workflow automation,
              and AI-powered data processing. I build systems that research, process, and deliver insights autonomously.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton>
                <a href="#work" className="btn-primary cursor-pointer block">
                  View Case Studies →
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="/Resume[Misbah Khan].pdf" download className="btn-ghost cursor-pointer block">
                  Download Resume
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Stats & Code Block */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-[500px] space-y-6">
              {/* SQL Code Block */}
              <div className="rounded-2xl bg-card/50 border border-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-[10px] font-mono text-muted-foreground ml-2">query.sql</span>
                </div>
                <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
                  <code>
                    <span className="text-purple-400">WITH</span> claim_analysis <span className="text-purple-400">AS</span> (
{'\n'}  <span className="text-purple-400">SELECT</span>
{'\n'}    patient_id,
{'\n'}    denial_reason,
{'\n'}    <span className="text-yellow-400">ROW_NUMBER</span>() <span className="text-purple-400">OVER</span> (
{'\n'}      <span className="text-purple-400">PARTITION BY</span> payer_id
{'\n'}      <span className="text-purple-400">ORDER BY</span> submitted_at <span className="text-purple-400">DESC</span>
{'\n'}    ) <span className="text-purple-400">AS</span> rn
{'\n'}  <span className="text-purple-400">FROM</span> claims
{'\n'}  <span className="text-purple-400">WHERE</span> status = <span className="text-primary">'denied'</span>
{'\n'})
{'\n'}<span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> claim_analysis
{'\n'}<span className="text-purple-400">WHERE</span> rn = <span className="text-primary">1</span>;
                  </code>
                </pre>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-center p-3 rounded-xl bg-card/30 border border-white/5"
                  >
                    <p className="text-xl font-display font-bold text-primary">{stat.value}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="absolute bottom-12 right-12 flex items-center gap-3 px-5 py-2.5 bg-background/40 backdrop-blur-md border border-primary/20 rounded-full shadow-2xl shadow-primary/5 hover:border-primary/40 transition-colors group cursor-default"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary"
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  );
};
