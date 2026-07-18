import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, Brain, Target, Workflow } from 'lucide-react';

const philosophies = [
  {
    icon: Database,
    title: "SQL-First Thinking",
    desc: "Every analysis starts with the right query. I write SQL that's readable, performant, and tells the full story of the data."
  },
  {
    icon: Brain,
    title: "Ambiguity is Solvable",
    desc: "Undocumented systems and unclear requirements don't scare me. I research, reverse-engineer, and build clarity from chaos."
  },
  {
    icon: Target,
    title: "Automation Over Repetition",
    desc: "If I do something twice, the third time it's automated. Python scripts, workflows, and AI agents handle the routine."
  },
  {
    icon: Workflow,
    title: "End-to-End Ownership",
    desc: "From raw data extraction to processed insights to automated delivery — I own the full pipeline."
  }
];

export const AboutPanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full min-h-screen flex items-center py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background-deep" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-30" />

      <div className="container relative z-10 px-6 md:px-12" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono text-primary uppercase tracking-widest mb-8">
              <Brain size={12} />
              About Me
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-tight mb-8 leading-[1.1]">
              Data-driven <span className="text-primary">problem solver</span>.
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-xl">
              <p>
                I'm a data analyst who builds things. Not dashboards for the sake of dashboards — 
                but <span className="text-foreground font-medium">systems that research, process, and automate</span> the 
                tedious work that slows teams down.
              </p>
              <p>
                My day involves writing <span className="text-foreground font-medium">complex PostgreSQL queries</span>, 
                building <span className="text-foreground font-medium">Python automation scripts</span>, 
                engineering <span className="text-foreground font-medium">Retool internal tools</span>, and 
                researching ambiguous problems that don't have clear documentation.
              </p>
              <p>
                I thrive in environments where the problem is unclear and the system is undocumented. 
                That's where the real analytical work happens.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="text-3xl font-display font-bold text-foreground">50+</p>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">Problems Solved</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-display font-bold text-foreground">40+</p>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">Automations Built</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-display font-bold text-foreground">2+</p>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">Years Experience</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Cards */}
          <div className="space-y-6">
            {philosophies.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative p-6 rounded-2xl bg-card/30 border border-white/5 hover:border-primary/20 hover:bg-card/50 transition-colors duration-300 backdrop-blur-sm overflow-hidden"
              >
                {/* Sliding Gradient Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                <div className="relative flex items-start gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 z-10 relative">
                      <item.icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
