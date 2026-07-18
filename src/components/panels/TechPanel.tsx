import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Database,
  Terminal,
  Workflow,
  Globe,
  BarChart3,
  Bot,
  Brain,
  Code2,
  Search
} from 'lucide-react';

const technologies = [
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Complex subqueries, window functions, CTEs, joins, indexing & query optimization for large datasets.',
    icon: Database,
    status: 'ADVANCED',
    colSpan: 'md:col-span-6 lg:col-span-4',
    rowSpan: 'md:row-span-2',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    name: 'Python',
    category: 'Scripting & Automation',
    description: 'Data processing, scripting, automation pipelines, Pandas, regex, and API integrations.',
    icon: Terminal,
    status: 'NATIVE',
    colSpan: 'md:col-span-6 lg:col-span-4',
    rowSpan: 'md:row-span-2',
    gradient: 'from-yellow-500/20 to-amber-500/20'
  },
  {
    name: 'LLM & AI Agents',
    category: 'Intelligence',
    description: 'LangChain, LangGraph, agent orchestration, RAG pipelines & prompt engineering.',
    icon: Brain,
    status: 'BUILDING',
    colSpan: 'md:col-span-6 lg:col-span-4',
    rowSpan: 'md:row-span-2',
    gradient: 'from-purple-500/20 to-indigo-500/20'
  },
  {
    name: 'Selenium & Playwright',
    category: 'Web Automation',
    description: 'Browser automation, data extraction, E2E testing & scraping at scale.',
    icon: Globe,
    status: 'EXPERT',
    colSpan: 'md:col-span-6 lg:col-span-4',
    rowSpan: 'md:row-span-1',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    name: 'Retool & Workflow Automation',
    category: 'Internal Tools',
    description: 'Building internal dashboards, automation workflows, n8n integrations & business logic.',
    icon: Workflow,
    status: 'FLUENT',
    colSpan: 'md:col-span-6 lg:col-span-4',
    rowSpan: 'md:row-span-1',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    name: 'Data Processing',
    category: 'Analytics',
    description: 'ETL pipelines, data cleaning, transformation, Pandas, NumPy & visualization.',
    icon: BarChart3,
    status: 'CORE',
    colSpan: 'md:col-span-6 lg:col-span-4',
    rowSpan: 'md:row-span-1',
    gradient: 'from-cyan-500/20 to-teal-500/20'
  },
  {
    name: 'Problem Solving',
    category: 'Algorithms',
    description: '50+ LeetCode, HackerRank challenges. Strong DSA foundations & system design thinking.',
    icon: Code2,
    status: 'CONSISTENT',
    colSpan: 'md:col-span-6 lg:col-span-6',
    rowSpan: 'md:row-span-1',
    gradient: 'from-pink-500/20 to-rose-500/20'
  },
  {
    name: 'Regex & Pattern Matching',
    category: 'Precision',
    description: 'Complex regex for data extraction, validation & text processing with precision.',
    icon: Search,
    status: 'SHARP',
    colSpan: 'md:col-span-6 lg:col-span-6',
    rowSpan: 'md:row-span-1',
    gradient: 'from-slate-500/20 to-gray-500/20'
  },
];

export const TechPanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full min-h-screen py-32 bg-background overflow-hidden">
      {/* Matrix Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6" ref={ref}>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-primary mb-4">
              <Terminal size={18} />
              <span className="font-mono text-sm tracking-widest uppercase">Technical Arsenal</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter text-foreground max-w-2xl">
              The <span className="text-primary/90">Stack</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-right hidden md:block"
          >
            <p className="font-mono text-xs text-muted-foreground mb-1">PROBLEM_SOLVING</p>
            <div className="text-3xl font-display text-primary">50+ solved</div>
          </motion.div>
        </div>

        {/* Tech Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${tech.colSpan} ${tech.rowSpan || ''} group relative rounded-3xl p-[1px] overflow-hidden`}
            >
              {/* Animated Gradient Border Layer */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Main Card Content Layer */}
              <div className="relative h-full w-full rounded-[23px] bg-[#030303]/90 backdrop-blur-xl overflow-hidden">
                {/* Subtle Noise Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Hover Grid Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100" />

                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:scale-110 transition-all duration-500">
                      <tech.icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-[10px] text-white/10 group-hover:text-primary/50 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-white transition-colors">
                        {tech.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className="h-px w-6 bg-primary" />
                      <span className="text-[10px] uppercase font-mono tracking-widest text-primary">
                        {tech.category}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground font-light leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2 md:line-clamp-none">
                      {tech.description}
                    </p>
                  </div>

                  {/* Interactive corner glow */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl ${tech.gradient} blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
