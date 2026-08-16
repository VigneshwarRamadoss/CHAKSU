"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import styles from "./IntersectionReveal.module.css";

export function IntersectionReveal({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${styles.revealWrapper} ${isVisible ? styles.visible : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
