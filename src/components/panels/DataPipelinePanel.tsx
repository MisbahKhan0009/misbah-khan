import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Database, Code2, Brain, Workflow, Send } from 'lucide-react';

// Node positions for the pipeline graph (SVG viewBox: 900 x 500)
const nodes = [
  { id: 0, label: 'Source', sublabel: 'Raw Data', x: 80, y: 250, icon: Database, color: '#3b82f6' },
  { id: 1, label: 'Extract', sublabel: 'Selenium', x: 260, y: 120, icon: Database, color: '#06b6d4' },
  { id: 2, label: 'Extract', sublabel: 'SQL Query', x: 260, y: 380, icon: Database, color: '#0ea5e9' },
  { id: 3, label: 'Transform', sublabel: 'Python', x: 460, y: 180, icon: Code2, color: '#eab308' },
  { id: 4, label: 'Transform', sublabel: 'Pandas', x: 460, y: 320, icon: Code2, color: '#f59e0b' },
  { id: 5, label: 'Analyze', sublabel: 'CTEs', x: 640, y: 250, icon: Brain, color: '#a855f7' },
  { id: 6, label: 'Automate', sublabel: 'LangChain', x: 780, y: 150, icon: Workflow, color: '#f97316' },
  { id: 7, label: 'Deliver', sublabel: 'Retool', x: 780, y: 350, icon: Send, color: '#22c55e' },
];

const connections = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 5, to: 7 },
];

// Data particles that flow along connections
interface Particle {
  id: number;
  connectionIdx: number;
  progress: number;
}

const logMessages = [
  { text: 'Scraping payer portal → 2,847 records', type: 'success' },
  { text: 'PostgreSQL query executed in 0.8s', type: 'success' },
  { text: 'Pandas: 12 duplicates dropped', type: 'warn' },
  { text: 'CTE analysis: 3 patterns found', type: 'success' },
  { text: 'LangChain agent → 94% confidence', type: 'success' },
  { text: 'Retool dashboard refreshed', type: 'success' },
  { text: 'Data validated: schema OK', type: 'info' },
  { text: 'Window function: ranked by payer', type: 'success' },
];

export const DataPipelinePanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());
  const [activeConnections, setActiveConnections] = useState<Set<number>>(new Set());
  const [particles, setParticles] = useState<Particle[]>([]);
  const [logQueue, setLogQueue] = useState<{ text: string; type: string; id: number }[]>([]);
  const particleIdRef = useRef(0);
  const logIdRef = useRef(0);

  // Animate pipeline flow
  useEffect(() => {
    if (!isInView) return;

    // Node activation sequence
    const sequence = [
      { nodes: [0], connections: [] },
      { nodes: [0, 1, 2], connections: [0, 1] },
      { nodes: [1, 2, 3, 4], connections: [2, 3] },
      { nodes: [3, 4, 5], connections: [4, 5] },
      { nodes: [5, 6, 7], connections: [6, 7] },
    ];

    let step = 0;
    const stepInterval = setInterval(() => {
      const current = sequence[step % sequence.length];
      setActiveNodes(new Set(current.nodes));
      setActiveConnections(new Set(current.connections));
      step++;
    }, 2200);

    // Spawn particles
    const particleInterval = setInterval(() => {
      const connIdx = Math.floor(Math.random() * connections.length);
      const newParticle: Particle = {
        id: particleIdRef.current++,
        connectionIdx: connIdx,
        progress: 0,
      };
      setParticles(prev => [...prev.slice(-15), newParticle]); // cap at 15
    }, 400);

    // Animate particles
    const animFrame = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, progress: p.progress + 0.025 }))
          .filter(p => p.progress <= 1)
      );
    }, 30);

    // Log messages
    const logInterval = setInterval(() => {
      const msg = logMessages[logIdRef.current % logMessages.length];
      setLogQueue(prev => {
        const next = [...prev, { ...msg, id: logIdRef.current }];
        logIdRef.current++;
        return next.slice(-5);
      });
    }, 1800);

    return () => {
      clearInterval(stepInterval);
      clearInterval(particleInterval);
      clearInterval(animFrame);
      clearInterval(logInterval);
    };
  }, [isInView]);

  const getParticlePosition = useCallback((connectionIdx: number, progress: number) => {
    const conn = connections[connectionIdx];
    if (!conn) return { x: 0, y: 0 };
    const from = nodes[conn.from];
    const to = nodes[conn.to];
    return {
      x: from.x + 35 + (to.x + 35 - (from.x + 35)) * progress,
      y: from.y + 25 + (to.y + 25 - (from.y + 25)) * progress,
    };
  }, []);

  return (
    <div className="relative w-full py-24 md:py-32 bg-background-deep overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/[0.03] blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container relative z-10 px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono text-primary uppercase tracking-widest mb-6">
            <Workflow size={12} />
            Live Pipeline
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tighter text-foreground mb-4">
            How I <span className="text-primary">process data</span>
          </h2>
        </motion.div>

        {/* Main SVG Pipeline Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full max-w-5xl mx-auto"
        >
          {/* SVG Graph */}
          <div className="relative w-full aspect-[9/5] md:aspect-[9/5]">
            <svg
              viewBox="0 0 900 500"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definitions */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-strong">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="conn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(156, 64%, 52%)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(156, 64%, 52%)" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Connection lines */}
              {connections.map((conn, idx) => {
                const from = nodes[conn.from];
                const to = nodes[conn.to];
                const isActive = activeConnections.has(idx);
                const midX = (from.x + 35 + to.x + 35) / 2;

                return (
                  <g key={`conn-${idx}`}>
                    {/* Background line */}
                    <path
                      d={`M ${from.x + 35} ${from.y + 25} C ${midX} ${from.y + 25}, ${midX} ${to.y + 25}, ${to.x + 35} ${to.y + 25}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="2"
                    />
                    {/* Active line */}
                    <motion.path
                      d={`M ${from.x + 35} ${from.y + 25} C ${midX} ${from.y + 25}, ${midX} ${to.y + 25}, ${to.x + 35} ${to.y + 25}`}
                      fill="none"
                      stroke={isActive ? 'hsl(156, 64%, 52%)' : 'rgba(255,255,255,0.08)'}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      strokeDasharray={isActive ? '0' : '4 6'}
                      filter={isActive ? 'url(#glow)' : undefined}
                      animate={{
                        stroke: isActive ? 'hsl(156, 64%, 52%)' : 'rgba(255,255,255,0.08)',
                        strokeWidth: isActive ? 2.5 : 1.5,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </g>
                );
              })}

              {/* Data particles */}
              {particles.map(particle => {
                const pos = getParticlePosition(particle.connectionIdx, particle.progress);
                const opacity = particle.progress < 0.1
                  ? particle.progress * 10
                  : particle.progress > 0.9
                    ? (1 - particle.progress) * 10
                    : 1;

                return (
                  <circle
                    key={particle.id}
                    cx={pos.x}
                    cy={pos.y}
                    r={3}
                    fill="hsl(156, 64%, 52%)"
                    opacity={opacity * 0.8}
                    filter="url(#glow)"
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const isActive = activeNodes.has(node.id);

                return (
                  <g key={node.id}>
                    {/* Node glow */}
                    {isActive && (
                      <motion.circle
                        cx={node.x + 35}
                        cy={node.y + 25}
                        r={40}
                        fill={node.color}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.12 }}
                        transition={{ duration: 0.4 }}
                        filter="url(#glow-strong)"
                      />
                    )}

                    {/* Node body */}
                    <motion.rect
                      x={node.x}
                      y={node.y}
                      width={70}
                      height={50}
                      rx={14}
                      fill={isActive ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)'}
                      stroke={isActive ? node.color : 'rgba(255,255,255,0.06)'}
                      strokeWidth={isActive ? 2 : 1}
                      animate={{
                        stroke: isActive ? node.color : 'rgba(255,255,255,0.06)',
                        strokeWidth: isActive ? 2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Node icon placeholder (circle) */}
                    <motion.circle
                      cx={node.x + 35}
                      cy={node.y + 18}
                      r={8}
                      fill={isActive ? node.color : 'rgba(255,255,255,0.1)'}
                      animate={{
                        fill: isActive ? node.color : 'rgba(255,255,255,0.1)',
                        scale: isActive ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Node label */}
                    <text
                      x={node.x + 35}
                      y={node.y + 40}
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="monospace"
                      fill={isActive ? node.color : 'rgba(255,255,255,0.4)'}
                    >
                      {node.sublabel}
                    </text>

                    {/* Pulse ring on active */}
                    {isActive && (
                      <motion.circle
                        cx={node.x + 35}
                        cy={node.y + 25}
                        r={30}
                        fill="none"
                        stroke={node.color}
                        strokeWidth={1}
                        initial={{ opacity: 0.5, r: 25 }}
                        animate={{ opacity: 0, r: 45 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Floating metrics */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 space-y-2">
            {[
              { label: 'Throughput', value: '2.8K/s' },
              { label: 'Latency', value: '120ms' },
              { label: 'Accuracy', value: '99.2%' },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + i * 0.2 }}
                className="flex items-center gap-3 px-3 py-2 bg-card/50 backdrop-blur-md border border-white/5 rounded-lg"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-mono text-muted-foreground uppercase">{metric.label}</span>
                <span className="text-xs font-mono text-primary font-bold">{metric.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom: Live log feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="rounded-xl bg-[#050505] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <span className="text-[9px] font-mono text-muted-foreground/50 ml-2">pipeline.stdout</span>
              <div className="ml-auto flex items-center gap-1.5">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
                <span className="text-[8px] font-mono text-primary/70">STREAMING</span>
              </div>
            </div>
            <div className="px-4 py-3 h-[140px] flex flex-col justify-end overflow-hidden">
              <AnimatePresence mode="popLayout">
                {logQueue.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="py-1"
                  >
                    <span className={`font-mono text-xs ${
                      log.type === 'success'
                        ? 'text-primary/90'
                        : log.type === 'warn'
                          ? 'text-yellow-400/80'
                          : 'text-muted-foreground/60'
                    }`}>
                      <span className="text-muted-foreground/30 mr-2">
                        {new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)}
                      </span>
                      {log.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="flex items-center gap-1 pt-1">
                <span className="text-primary/60 font-mono text-xs">$</span>
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="w-1.5 h-3.5 bg-primary/70"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
