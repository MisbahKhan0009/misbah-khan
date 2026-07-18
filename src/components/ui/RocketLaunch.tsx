import { motion } from 'framer-motion';

export const RocketLaunch = () => {
    return (
        <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
            {/* System Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-primary/30 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10 rounded-full" />

                {/* Crosshairs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>

            {/* Main Rocket Container */}
            <motion.div
                className="relative z-10"
                animate={{
                    y: [-10, 10, -10],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Rocket SVG */}
                <svg width="120" height="240" viewBox="0 0 120 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Rocket Body */}
                    <path d="M60 20C60 20 85 80 85 140V190H35V140C35 80 60 20 60 20Z" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
                    <path d="M60 20V190" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />

                    {/* Fins */}
                    <path d="M35 160L15 190V200H35" stroke="currentColor" strokeWidth="2" fill="var(--background)" />
                    <path d="M85 160L105 190V200H85" stroke="currentColor" strokeWidth="2" fill="var(--background)" />

                    {/* Window */}
                    <circle cx="60" cy="90" r="12" stroke="currentColor" strokeWidth="2" fill="var(--primary)" fillOpacity="0.1" />
                    <circle cx="60" cy="90" r="4" fill="currentColor" />

                    {/* Thruster Detail */}
                    <path d="M40 190V195H80V190" stroke="currentColor" strokeWidth="2" />
                </svg>

                {/* Thrust/Fire */}
                <motion.div
                    className="absolute top-[195px] left-1/2 -translate-x-1/2 flex justify-center"
                    initial={{ opacity: 0.8, height: 20 }}
                    animate={{
                        height: [40, 60, 35, 70, 40],
                        opacity: [0.8, 0.4, 0.8, 0.5, 0.8],
                    }}
                    transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    <div className="relative">
                        {/* Core Flame */}
                        <div className="w-4 h-full bg-gradient-to-b from-primary via-blue-400 to-transparent blur-[2px] rounded-lg" />
                        {/* Outer Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[80%] bg-primary/30 blur-md rounded-full" />
                    </div>
                </motion.div>

                {/* Particles/Sparks */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-[200px] left-1/2 w-1 h-1 bg-primary rounded-full"
                        animate={{
                            y: [0, 80],
                            x: [0, (Math.random() - 0.5) * 40],
                            opacity: [1, 0],
                            scale: [1, 0]
                        }}
                        transition={{
                            duration: 0.5 + Math.random() * 0.5,
                            repeat: Infinity,
                            delay: Math.random() * 0.5,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </motion.div>

            {/* Stats / UI Labels */}
            <div className="absolute bottom-10 flex gap-8">
                <div className="text-center">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Velocity</p>
                    <motion.p
                        className="text-sm font-bold font-mono text-primary"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        4.2 km/s
                    </motion.p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Altitude</p>
                    <motion.p
                        className="text-sm font-bold font-mono text-primary"
                    >
                        LEO-2
                    </motion.p>
                </div>
            </div>

            {/* Launch Status Text */}
            <motion.div
                className="absolute top-10 right-10 text-xs font-mono text-primary/80 border border-primary/20 px-3 py-1 rounded"
                animate={{ borderColor: ['rgba(var(--primary-rgb), 0.2)', 'rgba(var(--primary-rgb), 0.8)', 'rgba(var(--primary-rgb), 0.2)'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                SYSTEM_GO
            </motion.div>
        </div>
    );
};
