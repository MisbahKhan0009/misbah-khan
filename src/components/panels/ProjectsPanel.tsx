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
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Claims Denial Analysis Engine',
    slug: 'claims-denial-engine',
    description: 'Built an automated PostgreSQL pipeline to identify patterns in insurance claim denials. Uses CTEs and window functions to analyze denial reasons across payers, flagging systematic issues and recommending corrective actions.',
    category: 'Data Engineering',
    tags: ['PostgreSQL', 'Python', 'CTEs', 'Window Functions', 'Data Analysis'],
    icon: Database,
  },
  {
    id: '2',
    title: 'Intelligent Document Processor',
    slug: 'document-processor',
    description: 'LangChain-powered agent that ingests unstructured medical documents, extracts structured data using regex and NLP, and populates a normalized PostgreSQL schema for downstream analysis.',
    category: 'AI Automation',
    tags: ['LangChain', 'LangGraph', 'Python', 'Regex', 'PostgreSQL'],
    icon: Bot,
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
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div ref={containerRef} className="h-screen flex items-center overflow-hidden">
        <div ref={wrapperRef} className="flex gap-8 px-12 md:px-24 items-stretch">
          {/* Section Header Card */}
          <div className="flex-shrink-0 w-[400px] md:w-[500px] flex flex-col justify-center pr-8">
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
          {PROJECTS.map((project, index) => (
            <Link
              key={project.id}
              to={`/work/${project.slug}`}
              className="flex-shrink-0 w-[380px] md:w-[450px] group"
            >
              <motion.article
                whileHover={{ y: -8 }}
                className="h-full rounded-3xl p-[1px] overflow-hidden"
              >
                <div className="h-full rounded-[23px] bg-card/50 backdrop-blur-sm border border-white/5 group-hover:border-primary/30 transition-all duration-500 p-8 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <project.icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground border border-white/10 px-2 py-1 rounded-md uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-auto">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-primary/70 bg-primary/5 px-2 py-1 rounded border border-primary/10">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] font-mono text-muted-foreground px-2 py-1">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 mt-6 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read Case Study <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
