'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '300px' });
  const [isVisible, setIsVisible] = useState(false);

  // Check if element is in viewport on mount and after a short delay
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      return;
    }

    // If not in view, check after a short delay to prevent layout shift
    const timer = setTimeout(() => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const isInViewport = rect.top < window.innerHeight + 500; // 500px buffer
        setIsVisible(isInViewport);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isInView]);

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] as any,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible || isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
