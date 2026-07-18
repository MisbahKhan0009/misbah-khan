import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    role: 'Research Assistant',
    company: 'Big Matrix Lab, North South University',
    location: 'Dhaka, Bangladesh',
    period: 'January 2025 – Present',
    current: true,
    highlights: [
      'Developed an Attention-Driven Multimodal AI model for enhanced breast cancer diagnosis, integrating multiple medical data modalities, and contributed to its hospital-deployed clinical testing pipeline.',
      'Designed and implemented a deep learning framework for AI-Driven Dehazing and Denoising of Echocardiographic Images, significantly improving image clarity for downstream cardiac analysis.',
      'Worked with advanced architectures including U-Net, GANs, Diffusion Models, and State-Space Models (Mamba), focusing on medical image enhancement and robustness.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'PerceptronBD',
    location: 'Dhaka, Bangladesh',
    period: 'May 2024 – July 2024',
    current: false,
    highlights: [
      'Integrated Google Firebase authentication and backend data flows for an EdTech platform using React.js, ensuring accurate and reliable user data capture.',
      'Supported backend development with Express.js for a restaurant chain\'s order system, working with transactional data structures handling over 1,000 customer records daily while maintaining data accuracy and performance.',
    ],
  },
];

export const ExperiencePanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full py-32 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="container relative z-10 px-6 md:px-12 max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-primary mb-4">
            <Briefcase size={18} />
            <span className="font-mono text-sm tracking-widest uppercase">Experience</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-tighter text-foreground">
            Where I've <span className="text-primary">worked</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative md:pl-14"
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-0 top-2 items-center justify-center">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                    exp.current
                      ? 'border-primary bg-primary/10'
                      : 'border-white/10 bg-card/50'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      exp.current ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'
                    }`} />
                  </div>
                </div>

                {/* Card */}
                <div className="group rounded-2xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all duration-300 p-8 backdrop-blur-sm">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-primary/80 font-medium">{exp.company}</p>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs font-mono text-muted-foreground md:text-right">
                      <span className="flex items-center gap-1.5 md:justify-end">
                        <Calendar size={12} className="text-primary/50" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 md:justify-end">
                        <MapPin size={12} className="text-primary/50" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/50 mt-2.5" />
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
