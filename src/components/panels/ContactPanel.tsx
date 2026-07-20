import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Globe, Cpu, MapPin, Send } from 'lucide-react';

export const ContactPanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMail = () => {
    window.open('https://mail.google.com/mail/?view=cm&to=mkhanmisbah007@gmail.com&su=Hello%20Misbah', '_blank');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-deep" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12" ref={ref}>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">

          {/* Left side — wider */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono text-primary uppercase tracking-widest mb-8">
              <Cpu size={12} className="animate-pulse" />
              Contact
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-tight mb-8 leading-[1.1]">
              Let's <span className="text-primary">connect</span>.
            </h2>

            <p className="text-muted-foreground text-lg mb-12 max-w-lg leading-relaxed">
              Looking for a data analyst who builds automation systems? I'd love to hear about your project or opportunity. Drop me a message.
            </p>

            {/* Contact Details */}
            <div className="space-y-5 mb-12">
              <div className="flex items-center gap-4 text-muted-foreground group">
                <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-primary/60">Location</p>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground group">
                <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-primary/60">Availability</p>
                  <p>Open to full-time, on-site roles</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleMail}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-bold rounded-2xl text-base border border-transparent hover:bg-transparent hover:text-primary hover:border-primary transition-all duration-300"
            >
              <Send size={18} />
              Send me an Email
            </motion.button>
          </motion.div>

          {/* Right side — info card */}
          <motion.a
            href="https://mail.google.com/mail/?view=cm&to=mkhanmisbah007@gmail.com&su=Hello%20Misbah"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative rounded-3xl overflow-hidden border border-primary/10 hover:border-primary/40 bg-[#060e0a] transition-all duration-500"
          >
            {/* Ghost icon */}
            <div className="absolute top-4 right-4 opacity-[0.07] group-hover:opacity-[0.15] group-hover:scale-125 transition-all duration-500 pointer-events-none origin-top-right">
              <Mail size={140} strokeWidth={0.8} />
            </div>

            {/* Green tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 p-8 flex flex-col gap-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Mail size={18} />
                  </div>
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Contact</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-mono text-primary uppercase tracking-widest">Available</span>
                </div>
              </div>

              {/* Email */}
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/50 mb-2">Reach me at</p>
                <p className="text-lg md:text-xl font-mono text-foreground group-hover:text-primary transition-colors break-all">
                  mkhanmisbah007@gmail.com
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

              {/* Local Time */}
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/50 mb-2">Local Time — Dhaka (GMT+6)</p>
                <p className="text-3xl md:text-4xl font-mono font-bold text-foreground tracking-tight">
                  {currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

              {/* Bottom row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {['PostgreSQL', 'Python', 'Retool', 'LangChain'].map(tag => (
                    <span key={tag} className="text-[9px] font-mono text-muted-foreground/50 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 ml-4">
                  <Send size={16} />
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  );
};
