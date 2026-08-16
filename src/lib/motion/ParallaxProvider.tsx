"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";

export type ParallaxRegistration = {
  id: string;
  element: HTMLElement;
  section: HTMLElement;
  amplitude: number;
  depth: number;
  axis: 'x' | 'y';
};

type ParallaxContextType = {
  register: (item: ParallaxRegistration) => void;
  unregister: (id: string) => void;
};

const ParallaxContext = createContext<ParallaxContextType | null>(null);

export function useParallax() {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error("useParallax must be used within a ParallaxProvider");
  }
  return context;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

function computeProgress(rect: DOMRect, viewportHeight: number) {
  return clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));
}

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const registrations = useRef(new Map<string, ParallaxRegistration>());
  const activeIds = useRef(new Set<string>());
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    let scheduled = false;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = (entry.target as HTMLElement).dataset.parallaxId;
        if (!id) return;
        
        if (entry.isIntersecting) {
          activeIds.current.add(id);
          const item = registrations.current.get(id);
          if (item) item.element.dataset.active = 'true';
        } else {
          activeIds.current.delete(id);
          const item = registrations.current.get(id);
          if (item) item.element.dataset.active = 'false';
        }
      });
    }, { rootMargin: '100px 0px 100px 0px' });
    
    observerRef.current = observer;

    const render = () => {
      scheduled = false;
      const viewportHeight = window.innerHeight;

      for (const id of activeIds.current) {
        const item = registrations.current.get(id);
        if (!item) continue;

        const rect = item.section.getBoundingClientRect();
        const progress = computeProgress(rect, viewportHeight);
        const centered = progress * 2 - 1;
        const travel = centered * item.amplitude * item.depth;
        
        const transform = item.axis === 'x'
          ? `translate3d(${travel.toFixed(2)}px, 0, 0)`
          : `translate3d(0, ${travel.toFixed(2)}px, 0)`;
          
        item.element.style.transform = transform;
      }
    };

    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(render);
      }
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, []);

  const value = {
    register: (item: ParallaxRegistration) => {
      registrations.current.set(item.id, item);
      item.section.dataset.parallaxId = item.id;
      if (observerRef.current) {
        observerRef.current.observe(item.section);
      }
    },
    unregister: (id: string) => {
      const item = registrations.current.get(id);
      if (item && observerRef.current) {
        observerRef.current.unobserve(item.section);
      }
      registrations.current.delete(id);
      activeIds.current.delete(id);
    }
  };

  return (
    <ParallaxContext.Provider value={value}>
      {children}
    </ParallaxContext.Provider>
  );
}
