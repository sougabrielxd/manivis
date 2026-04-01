'use client';

import { useEffect, useRef } from 'react';

export default function TimeCarousel({ children }: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(true);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Aguarda um pouco para o DOM estar completamente renderizado
    const timer = setTimeout(() => {
      let animationId: number;

      const autoScroll = () => {
        if (scrollContainer && isAnimatingRef.current) {
          scrollContainer.scrollLeft += 1;

          // Quando chega perto do final, volta imperceptivelmente
          const scrollWidth = scrollContainer.scrollWidth;
          const clientWidth = scrollContainer.clientWidth;
          const maxScroll = scrollWidth - clientWidth;
          
          // Volta quando chega a 2/3 (deixando 1/3 para rolar novamente)
          const resetPoint = (maxScroll / 3) * 2;

          if (scrollContainer.scrollLeft >= resetPoint) {
            scrollContainer.scrollLeft = 0;
          }
        }
        animationId = requestAnimationFrame(autoScroll);
      };

      // Event listeners
      const handleMouseEnter = () => {
        isAnimatingRef.current = false;
      };

      const handleMouseLeave = () => {
        isAnimatingRef.current = true;
      };

      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);

      animationId = requestAnimationFrame(autoScroll);

      return () => {
        cancelAnimationFrame(animationId);
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="time-grid">
      {children}
      {children}
      {children}
    </div>
  );
}
