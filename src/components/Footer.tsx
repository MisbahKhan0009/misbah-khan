import { Github, Linkedin, ExternalLink, Mail, ArrowUp } from 'lucide-react';

const links = [
  { label: 'GitHub', href: 'https://github.com/MisbahKhan0009', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/misbah-khan-mejba/', icon: Linkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/u/rqR6VL33PN/', icon: ExternalLink },
  { label: 'HackerRank', href: 'https://www.hackerrank.com/profile/mkhanmisbah007', icon: ExternalLink },
  { label: 'Email', href: 'mailto:mkhanmisbah007@gmail.com', icon: Mail },
];

const navItems = ['Work', 'Skills', 'Problem Solving', 'Experience', 'Articles', 'About', 'Contact'];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#030303] border-t border-white/5">
      <div className="container px-6 md:px-12 py-16">
        {/* Top row: brand + back to top */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="font-display text-xl tracking-tight text-foreground">
              <span className="text-primary">\</span>Misbah
            </p>
            <p className="text-xs font-mono text-muted-foreground/50 mt-1">Data Analyst & Automation Engineer</p>
          </div>
        </div>

        {/* Middle: nav links + social */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Navigation */}
          <div>
            <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-4">Navigation</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navItems.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm text-muted-foreground/70 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-4">Connect</p>
            <div className="flex flex-wrap gap-2">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[11px] font-mono text-muted-foreground/60 hover:text-primary hover:border-primary/20 transition-all"
                >
                  <link.icon size={11} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: copyright + status */}
        <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-muted-foreground/30">
            &copy; {new Date().getFullYear()} Misbah Khan. Built with React, TypeScript & Tailwind.
          </p>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/40">Available for hire</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
