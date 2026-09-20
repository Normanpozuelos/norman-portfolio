import { useEffect, useRef } from "react";


export const RevealOnScroll = ({children}) => {
    const ref = useRef(null);

    useEffect(() => {
      const current = ref.current;
      if (!current) return undefined;

      // threshold 0: reveal as soon as any part of the element is inside the
      // top half of the viewport. A ratio threshold (e.g. 0.2) is relative to
      // the element's height and can never be met by tall sections on short
      // viewports. The observer also reports the initial state on observe(),
      // so elements already in view on mount are revealed without a scroll.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            current.classList.add("visible");
            observer.disconnect();
          }
        },
        {
          threshold: 0,
          rootMargin: "0px 0px -50% 0px",
        }
      );

      observer.observe(current);

      return () => observer.disconnect();
    }, []);
    
  return (
    <div  ref={ref} className="reveal">
        {children}
    </div>
  )
}

