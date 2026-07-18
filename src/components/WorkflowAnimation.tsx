import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
}

const nodes: Node[] = [
  { id: 1, label: 'Trigger', x: 50, y: 80 },
  { id: 2, label: 'Logic', x: 180, y: 40 },
  { id: 3, label: 'AI', x: 180, y: 120 },
  { id: 4, label: 'Process', x: 310, y: 80 },
  { id: 5, label: 'Output', x: 440, y: 80 },
];

const connections = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
];

export const WorkflowAnimation = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  useEffect(() => {
    const sequence = [
      { node: 1, connections: [] },
      { node: 1, connections: [0, 1] },
      { node: 2, connections: [0, 1] },
      { node: 3, connections: [0, 1] },
      { node: 2, connections: [0, 1, 2] },
      { node: 3, connections: [0, 1, 2, 3] },
      { node: 4, connections: [0, 1, 2, 3] },
      { node: 4, connections: [0, 1, 2, 3, 4] },
      { node: 5, connections: [0, 1, 2, 3, 4] },
    ];

    let step = 0;
    const interval = setInterval(() => {
      const current = sequence[step];
      setActiveNode(current.node);
      setActiveConnections(current.connections);
      step = (step + 1) % sequence.length;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const getNodePosition = (id: number) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x + 40, y: node.y + 20 } : { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full h-full min-h-[300px]">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />

      <svg
        viewBox="0 0 530 200"
        className="w-full h-full"
        style={{ maxWidth: '530px' }}
      >
        {/* Connections */}
        {connections.map((conn, index) => {
          const from = getNodePosition(conn.from);
          const to = getNodePosition(conn.to);
          const isActive = activeConnections.includes(index);

          return (
            <motion.line
              key={index}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className={isActive ? 'workflow-line-active' : 'workflow-line'}
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                stroke: isActive ? 'hsl(156, 64%, 52%)' : 'hsl(215, 19%, 15%)',
              }}
              transition={{ duration: 0.4 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;

          return (
            <g key={node.id}>
              {/* Node Glow */}
              {isActive && (
                <motion.rect
                  x={node.x - 4}
                  y={node.y - 4}
                  width={88}
                  height={48}
                  rx={10}
                  fill="hsl(156, 64%, 52%)"
                  opacity={0.2}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Node Box */}
              <motion.rect
                x={node.x}
                y={node.y}
                width={80}
                height={40}
                rx={8}
                fill="hsl(217, 33%, 11%)"
                stroke={isActive ? 'hsl(156, 64%, 52%)' : 'hsl(215, 19%, 15%)'}
                strokeWidth={1.5}
                animate={{
                  stroke: isActive ? 'hsl(156, 64%, 52%)' : 'hsl(215, 19%, 15%)',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Node Label */}
              <text
                x={node.x + 40}
                y={node.y + 25}
                textAnchor="middle"
                className="font-mono text-xs"
                fill={isActive ? 'hsl(156, 64%, 52%)' : 'hsl(218, 11%, 65%)'}
              >
                {node.label}
              </text>

              {/* Active Dot */}
              {isActive && (
                <motion.circle
                  cx={node.x + 70}
                  cy={node.y + 10}
                  r={4}
                  fill="hsl(156, 64%, 52%)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
