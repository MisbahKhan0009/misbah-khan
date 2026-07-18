import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { TextScramble } from '../ui/TextScramble';
import { Database, ArrowRight, FileDown } from 'lucide-react';

const stats = [
  { label: 'LeetCode Problems', value: '50+' },
  { label: 'SQL Queries Daily', value: '50+' },
  { label: 'Automations Built', value: '40+' },
];

interface CodeFile {
  name: string;
  lang: string;
  lines: { text: string; color: string }[];
}

const codeFiles: CodeFile[] = [
  {
    name: 'analysis.sql',
    lang: 'sql',
    lines: [
      { text: 'WITH claim_denials AS (', color: 'text-purple-400' },
      { text: '  SELECT', color: 'text-purple-400' },
      { text: '    payer_id,', color: 'text-muted-foreground' },
      { text: '    denial_code,', color: 'text-muted-foreground' },
      { text: '    COUNT(*) AS total,', color: 'text-yellow-400' },
      { text: '    ROW_NUMBER() OVER (', color: 'text-yellow-400' },
      { text: '      PARTITION BY payer_id', color: 'text-purple-400' },
      { text: '      ORDER BY COUNT(*) DESC', color: 'text-purple-400' },
      { text: '    ) AS rank', color: 'text-muted-foreground' },
      { text: '  FROM claims', color: 'text-purple-400' },
      { text: "  WHERE status = 'denied'", color: 'text-primary' },
      { text: '  GROUP BY 1, 2', color: 'text-purple-400' },
      { text: ')', color: 'text-muted-foreground' },
      { text: 'SELECT * FROM claim_denials', color: 'text-purple-400' },
      { text: 'WHERE rank <= 3', color: 'text-primary' },
      { text: 'ORDER BY payer_id, rank;', color: 'text-primary' },
    ],
  },
  {
    name: 'pipeline.py',
    lang: 'python',
    lines: [
      { text: 'import pandas as pd', color: 'text-purple-400' },
      { text: 'from langchain.agents import Agent', color: 'text-purple-400' },
      { text: 'from pydantic import BaseModel', color: 'text-purple-400' },
      { text: '', color: 'text-muted-foreground' },
      { text: 'class ClaimRecord(BaseModel):', color: 'text-yellow-400' },
      { text: '    claim_id: str', color: 'text-muted-foreground' },
      { text: '    amount: float', color: 'text-muted-foreground' },
      { text: '    payer_id: str', color: 'text-muted-foreground' },
      { text: '', color: 'text-muted-foreground' },
      { text: 'def process(df: pd.DataFrame):', color: 'text-yellow-400' },
      { text: '    df = df.dropna(subset=["payer_id"])', color: 'text-muted-foreground' },
      { text: '    df["amount"] = (', color: 'text-muted-foreground' },
      { text: '        df["amount"]', color: 'text-muted-foreground' },
      { text: '        .str.replace("$", "")', color: 'text-primary' },
      { text: '        .astype(float)', color: 'text-primary' },
      { text: '    )', color: 'text-muted-foreground' },
    ],
  },
  {
    name: 'scraper.py',
    lang: 'python',
    lines: [
      { text: 'from playwright.sync_api import (', color: 'text-purple-400' },
      { text: '    sync_playwright', color: 'text-purple-400' },
      { text: ')', color: 'text-purple-400' },
      { text: 'import pandas as pd', color: 'text-purple-400' },
      { text: '', color: 'text-muted-foreground' },
      { text: 'def scrape_payer(url: str):', color: 'text-yellow-400' },
      { text: '    with sync_playwright() as p:', color: 'text-muted-foreground' },
      { text: '        browser = p.chromium.launch()', color: 'text-muted-foreground' },
      { text: '        page = browser.new_page()', color: 'text-muted-foreground' },
      { text: '        page.goto(url)', color: 'text-primary' },
      { text: '        page.wait_for_selector(".tbl")', color: 'text-muted-foreground' },
      { text: '        rows = page.query_selector_all(', color: 'text-yellow-400' },
      { text: '            "table.policy tr"', color: 'text-primary' },
      { text: '        )', color: 'text-muted-foreground' },
      { text: '        data = [parse(r) for r in rows]', color: 'text-muted-foreground' },
      { text: '        return pd.DataFrame(data)', color: 'text-primary' },
    ],
  },
];

export const HeroPanel = () => {
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeFile = codeFiles[activeFileIdx];

  // Total characters in the file
  const totalChars = activeFile.lines.reduce((sum, line) => sum + line.text.length + 1, 0); // +1 for newline

  // Typing animation — character by character
  useEffect(() => {
    setTypedChars(0);
    setIsTyping(true);

    let chars = 0;
    intervalRef.current = setInterval(() => {
      chars += 1;
      if (chars >= totalChars) {
        setTypedChars(totalChars);
        setIsTyping(false);
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Switch to next file after a pause
        setTimeout(() => {
          setActiveFileIdx(prev => (prev + 1) % codeFiles.length);
        }, 2000);
        return;
      }
      setTypedChars(chars);
    }, 25); // 25ms per character for realistic typing speed

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeFileIdx, totalChars]);

  // Get visible text for each line based on typed chars
  const getVisibleLines = () => {
    let remaining = typedChars;
    return activeFile.lines.map(line => {
      if (remaining <= 0) return '';
      const visible = line.text.substring(0, remaining);
      remaining -= (line.text.length + 1); // +1 for the newline
      return visible;
    });
  };

  const visibleLines = getVisibleLines();

  return (
    <div className="relative w-full min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background-deep" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/[0.04] blur-[120px] pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Typography */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono text-primary uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Data Analyst & Automation Engineer
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
                Turning raw data
                <br />
                into{' '}
                <span className="text-primary inline-block whitespace-nowrap">
                  <TextScramble text="actionable systems" />
                </span>
                <br />
                that scale.
              </h1>
            </motion.div>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Data analyst specializing in PostgreSQL, Python scripting, workflow automation,
              and AI-powered data processing. I build systems that research, process, and deliver insights autonomously.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton>
                <a href="#work" className="inline-flex items-center gap-2 btn-primary cursor-pointer">
                  <Database size={16} />
                  View Case Studies
                  <ArrowRight size={14} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="/Resume[Misbah Khan].pdf" download className="inline-flex items-center gap-2 btn-ghost cursor-pointer">
                  <FileDown size={16} />
                  Download Resume
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Animated Code Block + Stats */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-[520px] space-y-5">
              {/* Code Block */}
              <div className="group relative rounded-2xl p-[1px] overflow-hidden">
                {/* Border gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-500/20 opacity-40 group-hover:opacity-80 transition-opacity duration-700" />

                <div className="relative rounded-[15px] bg-[#0a0a0a]/95 backdrop-blur-xl overflow-hidden">
                  {/* Noise */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                  {/* Header: tabs */}
                  <div className="relative z-10 flex items-center border-b border-white/5 px-4">
                    {codeFiles.map((file, idx) => (
                      <button
                        key={file.name}
                        onClick={() => setActiveFileIdx(idx)}
                        className={`px-3 py-2.5 text-[10px] font-mono transition-all border-b-2 ${
                          idx === activeFileIdx
                            ? 'text-foreground border-primary bg-white/[0.03]'
                            : 'text-muted-foreground/40 border-transparent hover:text-muted-foreground/70'
                        }`}
                      >
                        {file.name}
                      </button>
                    ))}
                    <div className="ml-auto flex items-center gap-1.5 pr-2">
                      <motion.div
                        animate={isTyping ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }}
                        transition={{ duration: 0.8, repeat: isTyping ? Infinity : 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                      <span className="text-[8px] font-mono text-primary/50">
                        {isTyping ? 'TYPING' : 'DONE'}
                      </span>
                    </div>
                  </div>

                  {/* Code body */}
                  <div className="relative z-10 p-5 h-[340px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFileIdx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <pre className="text-[12.5px] font-mono leading-[1.8]">
                          {activeFile.lines.map((line, idx) => {
                            const lineVisible = visibleLines[idx];
                            if (lineVisible === undefined) return null;

                            return (
                              <div key={idx} className="flex">
                                <span className="w-6 text-right mr-4 text-muted-foreground/20 select-none text-[10px]">
                                  {idx + 1}
                                </span>
                                <span className={line.color}>
                                  {lineVisible}
                                  {/* Show cursor at the end of the currently typing line */}
                                  {isTyping && lineVisible.length > 0 && lineVisible.length < line.text.length && (
                                    <motion.span
                                      animate={{ opacity: [1, 0] }}
                                      transition={{ duration: 0.4, repeat: Infinity }}
                                      className="inline-block w-[7px] h-[14px] bg-primary/90 ml-[1px] translate-y-[2px]"
                                    />
                                  )}
                                </span>
                              </div>
                            );
                          })}
                          {/* Cursor at end when done typing last visible line */}
                          {isTyping && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="inline-block w-[7px] h-[14px] bg-primary/80 ml-10"
                              style={{ display: visibleLines.every(l => l === '' || l.length === activeFile.lines[visibleLines.indexOf(l)]?.text.length) ? 'inline-block' : 'none' }}
                            />
                          )}
                        </pre>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    className="text-center p-4 rounded-xl bg-[#0a0a0a]/80 border border-white/5 hover:border-primary/20 transition-colors"
                  >
                    <p className="text-xl font-display font-bold text-primary">{stat.value}</p>
                    <p className="text-[9px] font-mono text-muted-foreground/60 mt-1 uppercase tracking-wider">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-primary/60"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
