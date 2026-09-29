import { useEffect, useRef } from "react";

// Tracks scroll progress through `ref`'s element, a sticky scroll track whose height is
// 100svh (the pinned viewport) plus the sum of the stage lengths (in svh).
//
// Writes to the element, without React re-renders:
//   --p            overall progress, 0 → 1
//   --<stage name> each stage's own progress, 0 → 1, in order
// and calls onProgress(p, stageProgress) with the same values.
export function useScrollProgress(ref, stages, onProgress) {
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const totalLength = stages.reduce((sum, stage) => sum + stage.length, 0);
    let frame = 0;
    let listening = false;

    function update() {
      frame = 0;
      const rect = element.getBoundingClientRect();
      // No scroll distance (e.g. reduced motion collapses the track): everything stays at 0
      const hasTrack = rect.height - window.innerHeight > 0;
      const svh = rect.height / (100 + totalLength);
      const scrolled = hasTrack ? Math.max(-rect.top / svh, 0) : 0;

      const stageProgress = {};
      let start = 0;
      for (const stage of stages) {
        const value = Math.min(Math.max((scrolled - start) / stage.length, 0), 1);
        stageProgress[stage.name] = value;
        element.style.setProperty(`--${stage.name}`, value.toFixed(4));
        start += stage.length;
      }

      const progress = Math.min(scrolled / totalLength, 1);
      element.style.setProperty("--p", progress.toFixed(4));
      onProgressRef.current?.(progress, stageProgress);
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    // Only listen to scroll while the element is on screen; one last update on leaving
    // settles every value at exactly 0 or 1.
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
  }, [ref, stages]);
}
