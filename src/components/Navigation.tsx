import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TextScramble } from './ui/TextScramble';
import { RocketLaunch } from './ui/RocketLaunch';

const menuItems = [
  { label: 'About', href: '#about' },
   { label: 'Skills', href: '#tech' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Articles', href: '#articles' },
  { label: 'Contact', href: '#contact' },
];

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => (
  <button
    onClick={toggle}
    className="relative z-[110] flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    aria-expanded={isOpen}
  >
    <svg width="24" height="24" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 5 L 20 5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
      <Path
        d="M 2 11.5 L 20 11.5"
        variants={{
          closed: { opacity: 1, x: 0 },
          open: { opacity: 0, x: 20 }
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.2 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 18 L 20 18" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
    </svg>
  </button>
);

const NavItem = ({ item, index, handleNavClick }: { item: any, index: number, handleNavClick: (href: string) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      key={item.label}
      variants={{
        open: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }
        },
        closed: {
          opacity: 0,
          x: -40,
          transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => handleNavClick(item.href)}
        className="group flex items-center gap-4 py-2 transition-transform duration-300 hover:translate-x-6"
        aria-label={`Navigate to ${item.label}`}
      >
        <div className="relative">
          <span className={`text-4xl md:text-6xl lg:text-7xl tracking-tight transition-all duration-300 ${isHovered ? 'text-primary font-mono' : 'text-foreground font-display'}`}>
            <TextScramble text={item.label} trigger={isHovered} />
          </span>
          <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
        <span className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 text-2xl md:text-3xl" aria-hidden="true">
          →
        </span>
      </button>
    </motion.li>
  );
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Fixed Capsule Header */}
      <header className="fixed top-6 left-0 right-0 z-[110]" role="banner">
        <div className="container">
          <div className="flex justify-between items-center px-6 py-2 md:px-8 md:py-3 bg-background/60 backdrop-blur-xl border border-primary/10 rounded-full shadow-2xl shadow-primary/5">
            {/* Logo / Monogram */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/"
                className="text-foreground font-display text-xl md:text-2xl tracking-tight"
                aria-label="Home"
              >
                <span className="text-primary">\</span>Misbah
              </Link>
            </motion.div>

            {/* Menu Toggle Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center"
            >
              <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-backdrop"
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(false)}
          />
        )}

        {isOpen && (
          <motion.nav
            key="nav-menu"
            className="fixed inset-0 z-[101]"
            variants={{
              open: {
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              },
              closed: {
                opacity: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.08,
                  staggerDirection: -1
                }
              }
            }}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container h-full flex flex-col pt-32 md:pt-32 pb-12 overflow-y-auto scrollbar-hide">
              {/* Note: The toggle icon in the header remains visible and functional */}

              {/* Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

              {/* Menu Items */}
              {/* Menu Items & Rocket */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center">
                <div className="flex-1 order-2 md:order-1">
                  <ul className="relative space-y-2 md:space-y-4">
                    {menuItems.map((item, index) => (
                      <NavItem
                        key={item.label}
                        item={item}
                        index={index}
                        handleNavClick={handleNavClick}
                      />
                    ))}
                  </ul>
                </div>

                {/* Rocket Animation - Desktop Only */}
                <div className="hidden md:flex flex-1 order-2 h-[400px] items-center justify-center relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-full h-full"
                  >
                    <RocketLaunch />
                  </motion.div>
                </div>
              </div>

              {/* System Status Dashboard */}
              <motion.div
                className="relative pt-12"
                variants={{
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.5 }
                  },
                  closed: {
                    opacity: 0,
                    y: 10,
                    transition: { duration: 0.3 }
                  }
                }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-12 pb-12">
                  {/* Status Pillar */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">System Operational</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                      <div>
                        <p className="text-[9px] font-mono text-muted-foreground uppercase opacity-50">Pulse</p>
                        <p className="text-xs font-mono font-bold tracking-tighter">64 BPM</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-muted-foreground uppercase opacity-50">Latency</p>
                        <p className="text-xs font-mono font-bold tracking-tighter">12 MS</p>
                      </div>
                    </div>
                  </div>

                  {/* Data Pillar */}
                  <div className="hidden md:block h-8 w-[1px] bg-border/50 self-end mb-1" />

                  <div className="space-y-4">
                    <div className="flex gap-1.5 h-3 items-end">
                      {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.2].map((height, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-primary/20 rounded-full"
                          style={{ height: '100%' }}
                          animate={{
                            height: [`${height * 100}%`, `${(1 - height) * 100}%`, `${height * 100}%`],
                            backgroundColor: height > 0.6 ? ['rgba(62,207,142,0.2)', 'rgba(62,207,142,0.5)', 'rgba(62,207,142,0.2)'] : 'rgba(62,207,142,0.2)'
                          }}
                          transition={{
                            duration: 1.5 + i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest leading-none">
                      Orchestration Engine: <span className="text-foreground">ACTIVE</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
