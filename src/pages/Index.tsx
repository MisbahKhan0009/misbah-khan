import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroPanel } from '@/components/panels/HeroPanel';
import { AutomationPanel } from '@/components/panels/AutomationPanel';
import { ProjectsPanel } from '@/components/panels/ProjectsPanel';
import { TechPanel } from '@/components/panels/TechPanel';
import { DataPipelinePanel } from '@/components/panels/DataPipelinePanel';
import { ExperiencePanel } from '@/components/panels/ExperiencePanel';
import { ArticlesPanel } from '@/components/panels/ArticlesPanel';
import { AboutPanel } from '@/components/panels/AboutPanel';
import { ContactPanel } from '@/components/panels/ContactPanel';
import { SEO } from '@/components/SEO';

const panels = [
  { id: 'hero', Component: HeroPanel },
  { id: 'work', Component: ProjectsPanel },
  // { id: 'pipeline', Component: DataPipelinePanel },
  { id: 'tech', Component: TechPanel },
  { id: 'problem-solving', Component: AutomationPanel },
  { id: 'experience', Component: ExperiencePanel },
  { id: 'articles', Component: ArticlesPanel },
  { id: 'about', Component: AboutPanel },
  { id: 'contact', Component: ContactPanel },
];

const Index = () => {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Misbah | Data Analyst & Automation Engineer"
        description="Data analyst specializing in PostgreSQL, Python scripting, workflow automation, LLM agents, and problem solving. Building systems that research, process, and deliver insights."
      />
      {/* Skip to main content for screen readers */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      <Navigation />
      <div id="main-content">
        {panels.map(({ id, Component }) => (
          <section
            key={id}
            id={id}
            className="relative w-full"
            role="region"
            aria-label={id.charAt(0).toUpperCase() + id.slice(1)}
          >
            <Component />
          </section>
        ))}
      </div>
      <Footer />
    </main>
  );
};

export default Index;
