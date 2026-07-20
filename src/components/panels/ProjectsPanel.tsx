import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Database, Bot, Workflow, Globe, BarChart3, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  icon: typeof Database;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Claims Denial Analysis Engine',
    slug: 'claims-denial-engine',
    description: 'Built an automated PostgreSQL pipeline to identify patterns in insurance claim denials. Uses CTEs and window functions to analyze denial reasons across payers, flagging systematic issues.',
    category: 'Data Engineering',
    tags: ['PostgreSQL', 'Python', 'CTEs', 'Window Functions', 'Data Analysis'],
    icon: Database,
    featured: true,
  },
  {
    id: '2',
    title: 'Intelligent Document Processor',
    slug: 'document-processor',
    description: 'LangChain-powered agent that ingests unstructured medical documents, extracts structured data using regex and NLP, and populates a normalized PostgreSQL schema for downstream analysis.',
    category: 'AI Automation',
    tags: ['LangChain', 'LangGraph', 'Python', 'Regex', 'PostgreSQL'],
    icon: Bot,
    featured: true,
  },
  {
    id: '3',
    title: 'Retool Operations Dashboard',
    slug: 'retool-ops-dashboard',
    description: 'End-to-end internal tool built in Retool for operations team. Connects to PostgreSQL for live data, automates report generation, and integrates with n8n for workflow triggers.',
    category: 'Internal Tools',
    tags: ['Retool', 'PostgreSQL', 'n8n', 'Workflow Automation'],
    icon: Workflow,
  },
  {
    id: '4',
    title: 'Web Scraping & Data Pipeline',
    slug: 'scraping-pipeline',
    description: 'High-volume Selenium & Playwright scraping system that extracts payer policy data from multiple sources, processes it through Python ETL pipelines, and loads into a structured data warehouse.',
    category: 'Data Pipeline',
    tags: ['Selenium', 'Playwright', 'Python', 'ETL', 'Pandas'],
    icon: Globe,
  },
  {
    id: '5',
    title: 'Automated Reporting System',
    slug: 'automated-reporting',
    description: 'Python-based system that generates daily analytics reports from PostgreSQL queries, detects anomalies using statistical methods, and dispatches findings via automated workflows.',
    category: 'Analytics',
    tags: ['Python', 'PostgreSQL', 'Automation', 'Data Visualization'],
    icon: BarChart3,
  },
];

export const ProjectsPanel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !containerRef.current || !sectionRef.current) return;
    const wrapper = wrapperRef.current;
    const container = containerRef.current;

    const scrollWidth = wrapper.scrollWidth - container.offsetWidth;

    const tween = gsap.to(wrapper, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div ref={containerRef} className="h-screen flex items-center overflow-hidden">
        <div ref={wrapperRef} className="flex gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-24 items-stretch">
          {/* Section Header */}
          <div className="flex-shrink-0 w-[360px] md:w-[440px] flex flex-col justify-center pr-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Database size={18} />
              <span className="font-mono text-sm tracking-widest uppercase">Case Studies</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter text-foreground mb-6">
              Selected <span className="text-primary">Work</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Real-world projects showcasing SQL engineering, data automation, AI integration,
              and problem-solving at scale.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-primary font-mono text-sm mt-8 hover:gap-3 transition-all"
            >
              View all projects <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Project Cards */}
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.id}
                to={`/work/${project.slug}`}
                className="flex-shrink-0 w-[360px] md:w-[420px] group"
              >
                <motion.article
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative h-full rounded-3xl overflow-hidden border border-primary/10 group-hover:border-primary/40 transition-all duration-500 bg-[#060e0a]"
                >
                  {/* Ghost icon background */}
                  <div className="absolute top-4 right-4 opacity-[0.07] group-hover:opacity-[0.15] group-hover:scale-125 transition-all duration-500 pointer-events-none origin-top-right">
                    <Icon size={140} strokeWidth={0.8} />
                  </div>

                  {/* Green tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10 p-7 h-full flex flex-col">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Icon size={18} />
                        </div>
                        <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
                          {project.category}
                        </span>
                      </div>

                      {project.featured && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="text-[9px] font-mono text-primary uppercase tracking-widest">Featured</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    {/* Bottom row */}
                    <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-end justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[9px] font-mono text-muted-foreground/60 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
                            #{tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[9px] font-mono text-muted-foreground/40 px-2 py-1">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Arrow button */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 ml-4">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
