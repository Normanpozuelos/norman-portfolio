import { useEffect, useRef } from "react";

// Tracks how far the page has scrolled through `ref`'s element: 0 when its top reaches the
// viewport top, 1 when its bottom reaches the viewport bottom. The value is written to the
// element's `--p` CSS variable (no React re-renders) and passed to the optional onProgress.
export function useScrollProgress(ref, onProgress) {
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    let frame = 0;
    let listening = false;

    function update() {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? Math.min(Math.max(-rect.top / distance, 0), 1) : 0;
      element.style.setProperty("--p", progress.toFixed(4));
      onProgressRef.current?.(progress);
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    // Only listen to scroll while the element is on screen; one last update on leaving
    // settles --p at exactly 0 or 1.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) {
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        listening = true;
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener("scroll", scheduleUpdate);
        listening = false;
      }
      scheduleUpdate();
    });

    observer.observe(element);
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
