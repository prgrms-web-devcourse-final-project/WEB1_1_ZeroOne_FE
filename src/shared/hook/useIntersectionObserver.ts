import { useRef, useEffect } from 'react';

export const useIntersectionObserver = (
  onIntersect: () => void,
  options: IntersectionObserverInit = { threshold: 0.5 },
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [onIntersect, options]);

  return ref;
};
