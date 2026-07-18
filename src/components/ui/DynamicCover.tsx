import { useMemo } from 'react';

interface DynamicCoverProps {
    title: string;
    className?: string;
}

/**
 * Generates a unique, modern, grainy gradient background based on a string (like an article title).
 * This ensures every article has a distinct but cohesive look without needing external image assets.
 */
export const DynamicCover = ({ title, className = "" }: DynamicCoverProps) => {
    const styles = useMemo(() => {
        // Generate a simple hash from the title to pick colors
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Modern "mesh" gradient style colors
        const hue1 = Math.abs(hash % 360);
        const hue2 = Math.abs((hash * 2) % 360);

        // We want to stay within a somewhat professional palette (purples, blues, greens, cyans)
        // but the hash will give it variety
        return {
            background: `
        radial-gradient(at 0% 0%, hsla(${hue1}, 70%, 50%, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 0%, hsla(${hue2}, 60%, 40%, 0.15) 0px, transparent 50%),
        radial-gradient(at 50% 50%, hsla(${hue1}, 50%, 30%, 0.1) 0px, transparent 80%),
        hsl(var(--background-deep))
      `,
        };
    }, [title]);

    return (
        <div
            className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-background-deep ${className}`}
            style={styles}
        >
            {/* Noise/Grain Layer */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
            />

            {/* Decorative Blur Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full mix-blend-screen opacity-50" />

            {/* Abstract Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
                style={{ backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
            />

            {/* Centered Monogram / Symbol */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl border border-primary/20 bg-background/40 backdrop-blur-md flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <span className="text-primary font-display text-2xl font-bold opacity-40">/</span>
                </div>
                <div className="h-px w-8 bg-primary/20" />
            </div>
        </div>
    );
};
