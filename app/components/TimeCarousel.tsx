'use client';

import { useEffect, useRef } from 'react';

export default function TimeCarousel({ children }: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let isUserInteracting = false;

    const scroll = () => {
      if (!isUserInteracting && scrollContainer) {
        scrollContainer.scrollLeft += 1;

        // Reinicia o scroll quando chega ao final
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    // Event listeners para pausar quando o usuário interage
    const handleMouseDown = () => {
      isUserInteracting = true;
    };

    const handleMouseUp = () => {
      isUserInteracting = false;
    };

    const handleTouchStart = () => {
      isUserInteracting = true;
    };

    const handleTouchEnd = () => {
      isUserInteracting = false;
    };

    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="time-grid">
      {children}
    </div>
  );
}
