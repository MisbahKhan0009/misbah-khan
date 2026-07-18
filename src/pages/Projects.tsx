import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Layers, Search, Filter, Database, Bot, Workflow, Globe, BarChart3 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  icon: typeof Database;
}

const ALL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Claims Denial Analysis Engine',
    slug: 'claims-denial-engine',
    description: 'Automated PostgreSQL pipeline to identify patterns in insurance claim denials using CTEs, window functions, and Python automation.',
    category: 'Data Engineering',
    tags: ['PostgreSQL', 'Python', 'CTEs', 'Window Functions'],
    icon: Database,
  },
  {
    id: '2',
    title: 'Intelligent Document Processor',
    slug: 'document-processor',
    description: 'LangChain-powered agent that extracts structured data from unstructured medical documents using regex and NLP.',
    category: 'AI Automation',
    tags: ['LangChain', 'LangGraph', 'Python', 'Regex'],
    icon: Bot,
  },
  {
    id: '3',
    title: 'Retool Operations Dashboard',
    slug: 'retool-ops-dashboard',
    description: 'Internal tool for operations team with live PostgreSQL data, automated reports, and n8n workflow integrations.',
    category: 'Internal Tools',
    tags: ['Retool', 'PostgreSQL', 'n8n', 'Automation'],
    icon: Workflow,
  },
  {
    id: '4',
    title: 'Web Scraping & Data Pipeline',
    slug: 'scraping-pipeline',
    description: 'High-volume Selenium & Playwright scraping system with Python ETL pipelines for payer policy data extraction.',
    category: 'Data Pipeline',
    tags: ['Selenium', 'Playwright', 'Python', 'ETL'],
    icon: Globe,
  },
  {
    id: '5',
    title: 'Automated Reporting System',
    slug: 'automated-reporting',
    description: 'Python-based reporting engine with statistical anomaly detection, automated visualizations, and multi-channel delivery.',
    category: 'Analytics',
    tags: ['Python', 'PostgreSQL', 'Automation', 'Visualization'],
    icon: BarChart3,
  },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = ALL_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filter === 'all' || project.category === filter;

    return matchesSearch && matchesFilter;
  });

  const categories = Array.from(new Set(ALL_PROJECTS.map(p => p.category)));

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      <SEO
        title="Case Studies | Data Analyst Portfolio"
        description="Detailed case studies showcasing SQL engineering, data automation, AI integration, and problem-solving."
        type="website"
        url="/projects"
      />
      <Navigation />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[20%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
              <Layers size={12} />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                CASE STUDIES
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl tracking-tighter text-foreground mb-6">
              All Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real-world case studies in data engineering, automation, AI agents, and analytics systems.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-card/30 backdrop-blur-md p-4 rounded-2xl border border-white/5">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all whitespace-nowrap ${filter === 'all' ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-white/10 text-muted-foreground hover:border-primary/50'}`}
              >
                ALL
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all whitespace-nowrap ${filter === cat ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-white/10 text-muted-foreground hover:border-primary/50'}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, i) => {
                const Icon = project.icon;
                return (
                  <Link key={project.id} to={`/work/${project.slug}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group h-full bg-card/30 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
                    >
                      <div className="p-8 h-full flex flex-col">
                        <div className="flex items-start justify-between mb-6">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                            <Icon size={20} />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground border border-white/10 px-2 py-1 rounded-md uppercase">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl mb-3 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-auto">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-primary/70 bg-primary/5 px-2 py-1 rounded border border-primary/10">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-[10px] font-mono text-muted-foreground px-2 py-1">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl">
              <p className="text-muted-foreground font-mono">No projects found matching criteria.</p>
              <button onClick={() => { setFilter('all'); setSearchTerm(''); }} className="mt-4 text-primary hover:underline text-sm">Clear Filters</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;
