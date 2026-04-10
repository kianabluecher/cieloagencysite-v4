
import { useState, useEffect, useRef } from 'react';

export function useSequentialLoad(itemCount: number, delayMs: number = 100) {
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());
  const timeoutRefs = useRef<number[]>([]);

  useEffect(() => {
    // Clear any existing timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];

    // Load items sequentially
    for (let i = 0; i < itemCount; i++) {
      const timeout = window.setTimeout(() => {
        setLoadedIndices(prev => new Set(prev).add(i));
      }, i * delayMs);
      
      timeoutRefs.current.push(timeout);
    }

    // Cleanup
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [itemCount, delayMs]);

  return loadedIndices;
}

export function useInViewSequential(totalItems: number, staggerMs: number = 150, batchSize: number = 1) {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  // Keep track of how many we've scheduled to show so we can add more if totalItems increases
  const scheduledCount = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scheduleItems = () => {
      // If we haven't started, start from 0. If we have, start from where we left off.
      const start = scheduledCount.current;
      
      // If we already scheduled everything, do nothing
      if (start >= totalItems) return;

      const itemsToSchedule = totalItems - start;
      
      for (let i = 0; i < itemsToSchedule; i++) {
        const absoluteIndex = start + i;
        // Calculate delay:
        // If batchSize is 1: index * staggerMs
        // If batchSize is 2: floor(index / 2) * staggerMs
        const batchIndex = Math.floor(i / batchSize);
        const delay = batchIndex * staggerMs;

        setTimeout(() => {
          setVisibleCount(prev => Math.max(prev, absoluteIndex + 1));
        }, delay);
      }
      
      scheduledCount.current = totalItems;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasStarted.current) {
              hasStarted.current = true;
              scheduleItems();
            } else if (scheduledCount.current < totalItems) {
              // If we already started but totalItems increased, schedule the new ones
              // We do this immediately if it's already in view
              scheduleItems();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    
    // If already started and totalItems increased, we might need to trigger manually if not scrolling
    // But IntersectionObserver should handle it if it's still in view. 
    // However, if the component re-renders, the observer is recreated.
    // If the element is already in view, the callback will fire immediately.
    
    return () => observer.disconnect();
  }, [totalItems, staggerMs, batchSize]);

  return { containerRef, visibleCount };
}
