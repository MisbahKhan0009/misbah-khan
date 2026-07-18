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
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl p-[1px] overflow-hidden"
          >
            {/* Gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative h-full rounded-[23px] bg-[#030303]/90 backdrop-blur-xl overflow-hidden p-8 md:p-10 space-y-8">
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              {/* Corner glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />

              {/* Email */}
              <div className="relative z-10">
                <p className="text-[9px] font-mono uppercase tracking-widest text-primary/60 mb-2">Reach me at</p>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=mkhanmisbah007@gmail.com&su=Hello%20Misbah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl font-mono text-foreground hover:text-primary transition-colors break-all"
                >
                  mkhanmisbah007@gmail.com
                </a>
              </div>

              {/* Divider */}
              <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Local Time */}
              <div className="relative z-10">
                <p className="text-[9px] font-mono uppercase tracking-widest text-primary/60 mb-2">Local Time (Dhaka, GMT+6)</p>
                <p className="text-3xl md:text-4xl font-mono font-bold text-foreground tracking-tight">
                  {currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
              </div>

              {/* Divider */}
              <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Status */}
              <div className="relative z-10 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
                <span className="text-sm text-muted-foreground">Currently available for new opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
