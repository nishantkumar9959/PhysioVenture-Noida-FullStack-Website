"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number; // in ms
  prefix?: string;
  suffix?: string;
  className?: string;
  syncId?: string; // If provided, counters with the same syncId will start and end at the exact same frame
}

const syncStartTimes: Record<string, number> = {};

// Ease-out quad function for a smoother, synchronized professional feel
const easeOutQuad = (t: number): number => {
  return t * (2 - t);
};

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
  syncId,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let localStartTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      let activeStartTime: number;

      if (syncId) {
        if (!syncStartTimes[syncId]) {
          syncStartTimes[syncId] = currentTime;
        }
        activeStartTime = syncStartTimes[syncId];
      } else {
        if (!localStartTime) {
          localStartTime = currentTime;
        }
        activeStartTime = localStartTime;
      }

      const progress = Math.min((currentTime - activeStartTime) / duration, 1);
      const currentCount = Math.floor(easeOutQuad(progress) * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end at the exact number
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, end, duration, syncId]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
