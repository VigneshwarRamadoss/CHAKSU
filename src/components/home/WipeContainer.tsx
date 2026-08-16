"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import styles from "./NarrativeSection.module.css";

export function WipeContainer({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [wiped, setWiped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setWiped(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`${styles.narrativeSection} ${className}`} data-wipe={wiped}>
      {children}
    </section>
  );
}
