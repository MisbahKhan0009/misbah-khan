import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ArrowRight, CheckCircle2, Terminal, Loader2, Mail, Database, Zap, Bot, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const workflowSteps = [
  { id: 1, label: 'Signal Received', icon: Send, status: 'pending' },
  { id: 2, label: 'Db Write', icon: Database, status: 'pending' },
  { id: 3, label: 'Trigger n8n', icon: Zap, status: 'pending' },
  { id: 4, label: 'AI Analysis', icon: Bot, status: 'pending' },
  { id: 5, label: 'Dispatch', icon: Mail, status: 'pending' },
];

export const NewsletterPanel = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // 1. Database Write (Supabase)
      const { error } = await supabase.from('subscribers').insert({ email } as any);
      if (error) {
        if (error.code === '23505') {
          toast.info("This frequency is already monitored (You're subscribed!)");
          return;
        }
        throw error;
      }

      setIsSubmitted(true);

      // 2. Trigger n8n Workflow
      const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_NEWSLETTER_URL || 'https://primary.automation.studio/webhook/newsletter-sub';

      // Robustness Fix: Append params to URL to bypass potential CORS/Body parsing issues
      const webhookUrl = new URL(N8N_WEBHOOK_URL);
      webhookUrl.searchParams.append('email', email);
      webhookUrl.searchParams.append('source', 'portfolio_terminal');
      webhookUrl.searchParams.append('timestamp', new Date().toISOString());

      fetch(webhookUrl.toString(), {
        method: 'POST', // Keep POST, but data is now in URL too
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: 'portfolio_terminal'
        }),
      }).catch(err => console.error("n8n webhook failed:", err));

      // Simulate workflow progression for UI feedback
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setActiveStep(currentStep);
        if (currentStep > workflowSteps.length) {
          clearInterval(interval);
        }
      }, 800);

    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Signal lost. Transmission failed.');
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background-deep" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

      <div className="container relative z-10 px-6" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Text & Context */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono text-primary mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                LIVE SYSTEM DEMO
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-[1.1]">
                Join the <span className="text-primary">neural network</span>.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Subscribe to trigger a live automated pipeline. Watch as your request is processed by Supabase, analyzed by AI, and routed via n8n in real-time.
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/60">
                <div className="flex items-center gap-2">
                  <Database size={14} /> POSTGRES
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <Zap size={14} /> WEBHOOKS
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <Bot size={14} /> GPT-4
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Terminal/Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-lg opacity-50" />

              <div className="relative bg-card/40 backdrop-blur-xl border border-primary/10 rounded-2xl p-2 shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-background/40 border-b border-white/5 p-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1.5">
                    <Terminal size={10} />
                    bash — pipeline-sub
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 min-h-[300px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-primary uppercase tracking-widest ml-1">
                            Input Parameter (Email)
                          </label>
                          <div className="relative group">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="enter_frequency@domain.com"
                              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-4 pl-11 text-sm font-mono focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/30"
                              required
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors" size={16} />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-primary text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        >
                          <span>INITIATE SEQUENCE</span>
                          <ArrowRight size={16} />
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6 w-full"
                      >
                        <div className="space-y-3">
                          {workflowSteps.map((step, i) => {
                            const isActive = activeStep === step.id;
                            const isCompleted = activeStep > step.id;

                            return (
                              <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-lg border transition-all duration-500",
                                  isCompleted ? "bg-primary/10 border-primary/20" :
                                    isActive ? "bg-white/5 border-primary/40" : "border-transparent opacity-50"
                                )}
                              >
                                <div className={cn(
                                  "w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300",
                                  isCompleted ? "bg-primary border-primary text-background" :
                                    isActive ? "bg-transparent border-primary text-primary" : "bg-white/5 border-white/10 text-muted-foreground"
                                )}>
                                  {isCompleted ? <CheckCircle2 size={14} /> :
                                    isActive ? <Loader2 size={14} className="animate-spin" /> :
                                      <step.icon size={14} />}
                                </div>

                                <span className={cn(
                                  "text-sm font-mono uppercase tracking-wider",
                                  isCompleted ? "text-primary" :
                                    isActive ? "text-foreground" : "text-muted-foreground"
                                )}>
                                  {step.label}
                                </span>

                                {isActive && (
                                  <motion.div
                                    className="ml-auto text-[10px] font-mono text-primary animate-pulse"
                                  >
                                    PROCESSING...
                                  </motion.div>
                                )}
                                {isCompleted && (
                                  <div className="ml-auto text-[10px] font-mono text-primary">DONE</div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>

                        {activeStep > workflowSteps.length && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center pt-4"
                          >
                            <p className="text-primary font-mono text-sm">✓ SYSTEM SYNC COMPLETE</p>
                            <button
                              onClick={() => { setIsSubmitted(false); setActiveStep(0); setEmail(''); }}
                              className="text-xs text-muted-foreground hover:text-foreground mt-2 underline decoration-dashed underline-offset-4"
                            >
                              Run new sequence
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Decorative Code Snippet Behind */}
              <div className="absolute -z-10 -right-12 -bottom-12 w-full h-full opacity-10 blur-[1px] select-none pointer-events-none overflow-hidden">
                <pre className="text-[10px] font-mono text-primary leading-tight">
                  {`
async function processSubscription(email: string) {
  const user = await db.create({ email });
  
  await n8n.trigger('on_signup', {
    user_id: user.id,
    timestamp: Date.now(),
    source: 'web_terminal'
  });

  const analysis = await ai.analyze({
    context: 'new_subscriber',
    enrich: true
  });

  return dispatch(analysis);
}
                   `}
                </pre>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
