import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { ArrowLeft, Database, Bot, Workflow, Globe, BarChart3, Layers, CheckCircle2, Target, Zap } from 'lucide-react';

interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  icon: typeof Database;
  problem: string;
  approach: string[];
  solution: string;
  techDetails: string;
  metrics: { label: string; value: string }[];
  keyFeatures: string[];
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  'claims-denial-engine': {
    slug: 'claims-denial-engine',
    title: 'Claims Denial Analysis Engine',
    category: 'Data Engineering',
    tags: ['PostgreSQL', 'Python', 'CTEs', 'Window Functions', 'Data Analysis'],
    icon: Database,
    problem: 'Insurance claim denials were being processed manually with no visibility into systemic patterns. The team spent hours each day reviewing denials without understanding which payers denied claims most frequently, or which denial codes indicated fixable vs. unfixable issues.',
    approach: [
      'Analyzed 2+ years of historical denial data to identify schema and data quality issues',
      'Designed PostgreSQL queries using CTEs and window functions to rank denial patterns by payer',
      'Built Python scripts to automate daily report generation and anomaly detection',
      'Created a feedback loop that flagged new denial patterns for immediate review',
    ],
    solution: 'An automated PostgreSQL pipeline that processes denial data nightly, identifies systematic patterns using statistical analysis, and generates prioritized action items for the operations team. The system uses window functions to track denial rate trends over time and CTEs to build complex multi-step analyses that remain readable and maintainable.',
    techDetails: 'The core engine runs as a series of parameterized SQL queries orchestrated by Python. Each analysis step is a CTE that builds on the previous one — first filtering relevant claims, then computing per-payer denial rates, then applying window functions to detect trend changes, and finally ranking issues by impact. Results feed into a Retool dashboard for the ops team.',
    metrics: [
      { label: 'Query Execution', value: '<2s' },
      { label: 'Denial Patterns Found', value: '47' },
      { label: 'Manual Work Reduced', value: '80%' },
      { label: 'Data Points Processed', value: '500K+' },
    ],
    keyFeatures: [
      'Complex CTEs for multi-step denial analysis',
      'Window functions for time-series trend detection',
      'Parameterized queries for safe, dynamic filtering',
      'Python orchestration with error handling and logging',
      'Automated anomaly detection using statistical thresholds',
      'Daily report generation and Slack notification dispatch',
    ],
  },
  'document-processor': {
    slug: 'document-processor',
    title: 'Intelligent Document Processor',
    category: 'AI Automation',
    tags: ['LangChain', 'LangGraph', 'Python', 'Regex', 'PostgreSQL'],
    icon: Bot,
    problem: 'Medical policy documents arrive in unstructured formats — PDFs, HTML pages, and scanned images. Extracting billing rules, CPT code mappings, and payer-specific requirements manually takes hours per document and is error-prone.',
    approach: [
      'Built a LangChain pipeline with document loaders for multiple format types',
      'Designed regex patterns for precision extraction of medical codes and billing rules',
      'Used LangGraph for multi-step agent orchestration with validation loops',
      'Created a normalized PostgreSQL schema to store extracted structured data',
    ],
    solution: 'A LangGraph-powered agent system that ingests documents, classifies content sections, extracts structured data using a combination of LLM reasoning and precision regex, validates extractions against known patterns, and loads results into a queryable PostgreSQL database. The system handles ambiguity by flagging low-confidence extractions for human review.',
    techDetails: 'The agent graph has four nodes: Ingest (document parsing), Extract (LLM + regex), Validate (pattern matching against known codes), and Load (PostgreSQL insertion). LangGraph manages state transitions and conditional routing — if validation fails, the extract node retries with refined prompts. Regex handles CPT/ICD-10 code formats while the LLM handles context-dependent rule extraction.',
    metrics: [
      { label: 'Extraction Accuracy', value: '94%' },
      { label: 'Processing Time', value: '~30s/doc' },
      { label: 'Documents Processed', value: '2000+' },
      { label: 'Manual Review Reduced', value: '70%' },
    ],
    keyFeatures: [
      'Multi-format document ingestion (PDF, HTML, images)',
      'LangGraph agent orchestration with retry logic',
      'Precision regex for medical code extraction',
      'Confidence scoring for human-in-the-loop validation',
      'Normalized PostgreSQL schema for structured storage',
      'Batch processing with progress tracking',
    ],
  },
  'retool-ops-dashboard': {
    slug: 'retool-ops-dashboard',
    title: 'Retool Operations Dashboard',
    category: 'Internal Tools',
    tags: ['Retool', 'PostgreSQL', 'n8n', 'Workflow Automation'],
    icon: Workflow,
    problem: 'Operations team members were jumping between 5+ tools to get basic visibility into claim statuses, team workloads, and process bottlenecks. No single source of truth existed, and generating reports required manual data pulls.',
    approach: [
      'Interviewed stakeholders to map all data sources and key metrics',
      'Designed a unified PostgreSQL view layer that joins across tables',
      'Built Retool app with role-based access and real-time data',
      'Connected n8n workflows for automated alerts and scheduled reports',
    ],
    solution: 'A Retool application that serves as the operational command center. Live PostgreSQL queries power real-time metrics, filterable tables, and drill-down views. n8n integrations trigger automated workflows — like escalation alerts when denial rates spike, or weekly summary reports dispatched to leadership.',
    techDetails: 'The Retool app connects directly to PostgreSQL via read replicas for performance. Complex queries use materialized views for heavy aggregations. n8n webhooks are triggered by Retool button actions and scheduled jobs. Role-based access is managed through Retool\'s permission system with row-level security in PostgreSQL.',
    metrics: [
      { label: 'Daily Active Users', value: '25+' },
      { label: 'Reports Automated', value: '12' },
      { label: 'Data Sources Unified', value: '5' },
      { label: 'Avg Response Time', value: '<500ms' },
    ],
    keyFeatures: [
      'Real-time PostgreSQL-powered dashboards',
      'Role-based access control with row-level security',
      'n8n workflow integrations for automated alerts',
      'Scheduled report generation and distribution',
      'Custom SQL queries with parameterized inputs',
      'Drill-down views from summary to individual records',
    ],
  },
  'scraping-pipeline': {
    slug: 'scraping-pipeline',
    title: 'Web Scraping & Data Pipeline',
    category: 'Data Pipeline',
    tags: ['Selenium', 'Playwright', 'Python', 'ETL', 'Pandas'],
    icon: Globe,
    problem: 'Payer policy information is scattered across dozens of websites with no API access. Policies change frequently and keeping track of updates manually is impossible at scale. The team needs current data to process claims correctly.',
    approach: [
      'Evaluated target sites and chose Playwright for JS-heavy pages, Selenium for simpler ones',
      'Built robust scraping with retry logic, proxy rotation, and rate limiting',
      'Designed Python ETL pipeline with Pandas for cleaning and transformation',
      'Implemented change detection to flag policy updates automatically',
    ],
    solution: 'A scheduled scraping system that visits 30+ payer portals daily, extracts policy documents and fee schedules, processes them through a multi-stage ETL pipeline, and loads clean data into PostgreSQL. Change detection compares new extractions against previous versions and alerts the team to meaningful policy updates.',
    techDetails: 'Playwright handles dynamic JavaScript-rendered pages with proper wait conditions. The ETL stage uses Pandas for data normalization, deduplication, and type coercion. A staging table pattern ensures data integrity — new data lands in staging, gets validated, then upserts into production tables. Cron jobs orchestrate the full pipeline.',
    metrics: [
      { label: 'Sites Monitored', value: '30+' },
      { label: 'Records Processed Daily', value: '10K+' },
      { label: 'Data Freshness', value: '<24h' },
      { label: 'Extraction Success Rate', value: '97%' },
    ],
    keyFeatures: [
      'Playwright & Selenium for different site architectures',
      'Proxy rotation and intelligent rate limiting',
      'Pandas-based ETL with validation and cleaning',
      'Change detection for policy update alerts',
      'Staging table pattern for data integrity',
      'Scheduled cron execution with failure notifications',
    ],
  },
  'automated-reporting': {
    slug: 'automated-reporting',
    title: 'Automated Reporting System',
    category: 'Analytics',
    tags: ['Python', 'PostgreSQL', 'Automation', 'Data Visualization'],
    icon: BarChart3,
    problem: 'Leadership required weekly and daily reports that took analysts 2-3 hours to compile manually. Reports involved pulling data from PostgreSQL, computing metrics, creating visualizations, and formatting findings into digestible summaries.',
    approach: [
      'Mapped all report requirements and identified common query patterns',
      'Built a Python reporting framework with templated SQL queries',
      'Implemented statistical anomaly detection for proactive insights',
      'Automated distribution via email and Slack with proper formatting',
    ],
    solution: 'A Python-based reporting engine that executes parameterized PostgreSQL queries on schedule, computes KPIs and trend metrics, generates visualizations, detects statistical anomalies, and delivers formatted reports to stakeholders. The system is self-maintaining — new report types can be added by defining a SQL template and output format.',
    techDetails: 'The framework uses Jinja2 for SQL templating, Pandas for computation, and Matplotlib/Plotly for visualization. Anomaly detection uses z-score analysis on rolling windows. Reports are rendered as HTML emails with inline charts. The system runs on cron and logs all executions for audit trails.',
    metrics: [
      { label: 'Reports Generated/Week', value: '35+' },
      { label: 'Analyst Hours Saved', value: '15h/week' },
      { label: 'Anomalies Detected', value: '120+' },
      { label: 'Stakeholders Served', value: '40+' },
    ],
    keyFeatures: [
      'Templated SQL with Jinja2 for reusable queries',
      'Statistical anomaly detection with z-scores',
      'Automated visualization generation',
      'Multi-channel distribution (email, Slack)',
      'Self-service report builder for new requirements',
      'Full execution logging and audit trail',
    ],
  },
};

const WorkDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const caseStudy = CASE_STUDIES[slug || ''];

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Layers className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-display tracking-tight text-foreground">Case study not found</h1>
        <p className="text-muted-foreground text-center max-w-md px-4">
          The project you requested doesn't exist or has been archived.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary text-background font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Return home
        </button>
      </div>
    );
  }

  const Icon = caseStudy.icon;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      <SEO
        title={`${caseStudy.title} | Case Study`}
        description={caseStudy.problem}
        type="website"
        url={`/work/${caseStudy.slug}`}
      />
      <Navigation />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 pt-32 pb-24">
        <div className="container max-w-5xl mx-auto px-6">
          {/* Header */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-20"
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => navigate('/')}
                className="mb-12 group flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors px-4 py-2 border border-primary/10 rounded-full hover:bg-primary/5"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                BACK TO PORTFOLIO
              </motion.button>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                <Icon size={12} />
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                  {caseStudy.category}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tighter text-foreground mb-8 leading-[0.95]">
                {caseStudy.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-primary/70 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="p-6 rounded-2xl bg-card/30 border border-white/5 text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-primary">{metric.value}</p>
                <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-wider">{metric.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Case Study Content */}
          <div className="space-y-16">
            {/* Problem */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Target size={16} className="text-red-400" />
                </div>
                <h2 className="font-display text-2xl text-foreground">The Problem</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed pl-11">
                {caseStudy.problem}
              </p>
            </motion.section>

            {/* Approach */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Zap size={16} className="text-yellow-400" />
                </div>
                <h2 className="font-display text-2xl text-foreground">Approach</h2>
              </div>
              <div className="pl-11 space-y-4">
                {caseStudy.approach.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-mono font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground text-base leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Solution */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-primary" />
                </div>
                <h2 className="font-display text-2xl text-foreground">Solution</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed pl-11 mb-8">
                {caseStudy.solution}
              </p>

              {/* Technical Details */}
              <div className="pl-11">
                <div className="rounded-2xl bg-card/50 border border-white/5 p-8">
                  <h3 className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Technical Implementation</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {caseStudy.techDetails}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Layers size={16} className="text-blue-400" />
                </div>
                <h2 className="font-display text-2xl text-foreground">Key Features</h2>
              </div>
              <div className="pl-11 grid md:grid-cols-2 gap-3">
                {caseStudy.keyFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-white/5">
                    <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <div className="mt-32 border-t border-white/10 pt-16 flex flex-col items-center text-center">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 text-2xl font-display hover:text-primary transition-colors mb-4"
            >
              <span>View More Work</span>
              <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-muted-foreground text-sm">Browse the full portfolio</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkDetail;
