"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Animate children individually instead of the wrapper. */
  stagger?: boolean;
  y?: number;
}

/**
 * Scroll-triggered entrance animation, mirroring awrs.me's GSAP reveals.
 * Respects prefers-reduced-motion by rendering content immediately visible.
 */
export default function Reveal({
  children,
  as,
  className,
  delay = 0,
  stagger = false,
  y = 28,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets: Element[] = stagger
      ? Array.from(el.children)
      : [el];

    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
