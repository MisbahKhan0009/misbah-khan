import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface ImageRevealProps {
    src: string;
    alt: string;
    className?: string;
}

export const ImageReveal = ({ src, alt, className = '' }: ImageRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {/* Reveal overlay */}
            <motion.div
                className="absolute inset-0 bg-primary z-10"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: 'left' }}
            />

            {/* Image */}
            <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2,
                }}
            />
        </div>
    );
};
