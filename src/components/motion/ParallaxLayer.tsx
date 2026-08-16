"use client";

import { useRef, useEffect, ReactNode, useId } from "react";
import { useParallax } from "@/lib/motion/ParallaxProvider";

type ParallaxLayerProps = {
  children: ReactNode;
  amplitude: number;
  depth: number;
  axis?: 'x' | 'y';
  frameClassName?: string;
  layerClassName?: string;
  style?: React.CSSProperties;
};

export function ParallaxLayer({
  children,
  amplitude,
  depth,
  axis = 'y',
  frameClassName = "",
  layerClassName = "",
  style
}: ParallaxLayerProps) {
  const { register, unregister } = useParallax();
  const id = useId();
  const elementRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current || !sectionRef.current) return;

    const registrationId = `parallax-${id}`;

    register({
      id: registrationId,
      element: elementRef.current,
      section: sectionRef.current,
      amplitude,
      depth,
      axis
    });

    return () => unregister(registrationId);
  }, [id, amplitude, depth, axis, register, unregister]);

  return (
    <div ref={sectionRef} className={`parallaxFrame ${frameClassName}`.trim()} style={style}>
      <div ref={elementRef} className={`parallaxLayer ${layerClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}
