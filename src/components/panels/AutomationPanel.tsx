import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code2,
  Trophy,
  Brain,
  Target,
  TrendingUp,
  Github,
  ExternalLink,
  Star,
  Flame,
  Award,
} from 'lucide-react';

const platforms = [
  {
    name: 'LeetCode',
    handle: '@rqR6VL33PN',
    url: 'https://leetcode.com/u/rqR6VL33PN/',
    icon: Trophy,
    color: 'orange',
    borderHover: 'hover:border-orange-400/40',
    iconBg: 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-background',
    stats: [
      { value: '50+', label: 'Solved' },
      { value: '30+', label: 'SQL' },
      { value: 'Active', label: 'Streak' },
    ],
    tags: ['DP', 'Trees', 'SQL 50', 'Arrays'],
  },
  {
    name: 'HackerRank',
    handle: '@mkhanmisbah007',
    url: 'https://www.hackerrank.com/profile/mkhanmisbah007',
    icon: Award,
    color: 'green',
    borderHover: 'hover:border-green-400/40',
    iconBg: 'bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-background',
    stats: [
      { value: '5 Star', label: 'Problem Solving' },
      { value: 'Gold', label: 'SQL Badge' },
      { value: '4 Star', label: 'Python' },
    ],
    tags: ['Algorithms', 'SQL', 'Python', 'Data Structures'],
  },
  {
    name: 'GitHub',
    handle: '@MisbahKhan0009',
    url: 'https://github.com/MisbahKhan0009',
    icon: Github,
    color: 'purple',
    borderHover: 'hover:border-purple-400/40',
    iconBg: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-background',
    stats: [
      { value: '30+', label: 'Repos' },
      { value: '500+', label: 'Contributions' },
      { value: '15+', label: 'Stars' },
    ],
    tags: ['Python', 'Automation', 'Data Pipelines', 'Full Stack'],
  },
];

const approaches = [
  { label: 'Understand the problem deeply', icon: Brain },
  { label: 'Break into smaller subproblems', icon: Code2 },
  { label: 'Optimize for edge cases', icon: Target },
  { label: 'Document & iterate', icon: TrendingUp },
];

export const AutomationPanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full min-h-screen flex items-center py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-deep" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-primary mb-4">
            <Code2 size={18} />
            <span className="font-mono text-sm tracking-widest uppercase">Problem Solving</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-tighter text-foreground max-w-3xl">
            I solve <span className="text-primary">hard problems</span> consistently.
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl">
            Algorithms and data structures aren't just interview prep — they're how I think about
            data pipelines, query optimization, and system design every day.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`group relative rounded-3xl overflow-hidden border border-primary/10 ${platform.borderHover} bg-[#060e0a] transition-all duration-500`}
            >
              {/* Ghost icon background */}
              <div className="absolute top-4 right-4 opacity-[0.07] group-hover:opacity-[0.15] group-hover:scale-125 transition-all duration-500 pointer-events-none origin-top-right">
                <platform.icon size={140} strokeWidth={0.8} />
              </div>

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 p-7 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${platform.iconBg} flex items-center justify-center transition-all duration-300`}>
                      <platform.icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
                      {platform.name}
                    </span>
                  </div>
                  <ExternalLink size={13} className="text-muted-foreground/20 group-hover:text-muted-foreground/60 transition-colors" />
                </div>

                {/* Handle */}
                <p className="text-xs font-mono text-muted-foreground/50 mb-6">{platform.handle}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 py-5 border-y border-white/[0.06] mb-6">
                  {platform.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-base font-display font-bold text-primary">{stat.value}</p>
                      <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {platform.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono text-muted-foreground/60 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Approach Section — Animated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-3xl bg-card/30 border border-white/5 p-8 md:p-12 overflow-hidden relative"
        >
          {/* Background pulse */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.02, 0.06, 0.02] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
            />
          </div>

          <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-10 relative z-10">My Approach to Complex Problems</h3>

          <div className="relative z-10">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-6 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-[2px]">
              <div className="w-full h-full bg-white/5 rounded-full" />
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary to-primary/30 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="grid md:grid-cols-4 gap-8 md:gap-6">
              {approaches.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Animated step circle */}
                    <div className="relative mb-4">
                      {/* Outer ring pulse */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                        animate={isInView ? {
                          scale: [1, 1.4, 1.4],
                          opacity: [0.5, 0, 0],
                        } : {}}
                        transition={{
                          duration: 2,
                          delay: 1.2 + i * 0.25,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                      {/* Main circle */}
                      <motion.div
                        className="relative w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
                        whileHover={{ scale: 1.15, backgroundColor: 'hsl(156, 64%, 52%)' }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={isInView ? { rotate: 0, opacity: 1 } : {}}
                          transition={{ duration: 0.6, delay: 1 + i * 0.25 }}
                        >
                          <StepIcon size={20} className="text-primary group-hover:text-background transition-colors" />
                        </motion.div>
                      </motion.div>
                      {/* Step number */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border border-primary/40 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 1.1 + i * 0.25, type: 'spring', stiffness: 300 }}
                      >
                        <span className="text-[9px] font-mono text-primary font-bold">{i + 1}</span>
                      </motion.div>
                    </div>

                    {/* Label */}
                    <motion.p
                      className="text-sm text-foreground font-medium leading-snug"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 1.2 + i * 0.25 }}
                    >
                      {step.label}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
