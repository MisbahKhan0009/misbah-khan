import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[90] w-12 h-12 flex items-center justify-center rounded-full bg-background/60 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary hover:text-background transition-all duration-300 shadow-lg shadow-primary/10 group overflow-hidden"
                    aria-label="Scroll to top"
                >
                    <div className="relative z-10">
                        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>

                    {/* Ripple Effect Background */}
                    <motion.div
                        className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"
                        initial={false}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
