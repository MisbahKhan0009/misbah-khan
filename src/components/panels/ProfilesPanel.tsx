import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Github,
  ExternalLink,
  Trophy,
  Code2,
  GitBranch,
  Star,
  BookOpen,
  Award,
  Target,
  Flame,
  FileText,
} from 'lucide-react';

const profiles = [
  {
    name: 'GitHub',
    handle: '@MisbahKhan0009',
    url: 'https://github.com/MisbahKhan0009',
    icon: Github,
    color: 'from-gray-500 to-gray-700',
    hoverBorder: 'hover:border-gray-400/30',
    iconBg: 'bg-gray-500/10 text-gray-300',
    stats: [
      { label: 'Repositories', value: '30+', icon: BookOpen },
      { label: 'Contributions', value: '500+', icon: GitBranch },
      { label: 'Stars', value: '15+', icon: Star },
    ],
    description: 'Open source projects, automation scripts, data pipelines, and full-stack applications.',
  },
  {
    name: 'LeetCode',
    handle: '@rqR6VL33PN',
    url: 'https://leetcode.com/u/rqR6VL33PN/',
    icon: Trophy,
    color: 'from-orange-500 to-amber-600',
    hoverBorder: 'hover:border-orange-400/30',
    iconBg: 'bg-orange-500/10 text-orange-400',
    stats: [
      { label: 'Problems Solved', value: '50+', icon: Target },
      { label: 'SQL Challenges', value: '30+', icon: Code2 },
      { label: 'Streak', value: 'Active', icon: Flame },
    ],
    description: 'Focused on SQL, arrays, dynamic programming, and tree/graph problems with optimal solutions.',
  },
  {
    name: 'HackerRank',
    handle: '@mkhanmisbah007',
    url: 'https://www.hackerrank.com/profile/mkhanmisbah007',
    icon: Award,
    color: 'from-green-500 to-emerald-600',
    hoverBorder: 'hover:border-green-400/30',
    iconBg: 'bg-green-500/10 text-green-400',
    stats: [
      { label: 'Problem Solving', value: '5 Star', icon: Star },
      { label: 'SQL Badge', value: 'Gold', icon: Award },
      { label: 'Python', value: '4 Star', icon: Code2 },
    ],
    description: 'Gold badges in SQL and Problem Solving. Consistent performance across algorithm domains.',
  },
];

export const ProfilesPanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full py-32 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      </div>

      <div className="container relative z-10 px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-primary mb-4">
              <Code2 size={18} />
              <span className="font-mono text-sm tracking-widest uppercase">Profiles</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter text-foreground">
              Coding <span className="text-primary">presence</span>
            </h2>
          </div>
          <a
            href="/Resume[Misbah Khan].pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-mono text-primary hover:bg-primary hover:text-background transition-all duration-300 self-start md:self-auto"
          >
            <FileText size={16} />
            Download Resume
          </a>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <motion.a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-3xl p-[1px] overflow-hidden ${profile.hoverBorder}`}
            >
              {/* Gradient border on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

              <div className="relative h-full rounded-[23px] bg-[#050505]/95 backdrop-blur-xl p-7 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${profile.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <profile.icon size={22} />
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground/30 group-hover:text-foreground/60 transition-colors" />
                </div>

                {/* Name & Handle */}
                <h3 className="font-display text-xl text-foreground mb-1 group-hover:text-white transition-colors">
                  {profile.name}
                </h3>
                <p className="text-xs font-mono text-muted-foreground mb-4">{profile.handle}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6 flex-grow">
                  {profile.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/5">
                  {profile.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {stat.value}
                      </p>
                      <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
