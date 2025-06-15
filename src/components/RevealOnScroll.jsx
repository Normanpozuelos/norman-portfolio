import { useEffect, useRef } from "react";


export const RevealOnScroll = ({children}) => {
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.current?.classList.add("visible");
          }
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50% 0px",
        }
      );
    
      const current = ref.current;
      if (current) {
        observer.observe(current);
      }
    
      return () => {
        if (current) observer.unobserve(current); // slightly more precise cleanup
        observer.disconnect();
      };
    }, []);
    
  return (
    <div  ref={ref} className="reveal">
        {children}
    </div>
  )
}

