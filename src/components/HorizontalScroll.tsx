import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: ReactNode;
}

export const HorizontalScroll = ({ children }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    
    if (!container || !wrapper) return;

    // Get all section panels
    const sections = gsap.utils.toArray<HTMLElement>('.scroll-panel');
    
    if (sections.length === 0) return;

    // Calculate total width
    const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);
    
    // Create the horizontal scroll animation
    const scrollTween = gsap.to(sections, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="horizontal-scroll-container overflow-hidden">
      <div ref={wrapperRef} className="flex flex-nowrap">
        {children}
      </div>
    </div>
  );
};

interface ScrollPanelProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const ScrollPanel = ({ children, className = '', id }: ScrollPanelProps) => {
  return (
    <section 
      id={id}
      className={`scroll-panel w-screen h-screen flex-shrink-0 relative overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};
