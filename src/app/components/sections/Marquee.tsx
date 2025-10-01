"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MarqueeProps {
  marqueeText: string;
}

export const Marquee = ({ marqueeText }: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        // Create infinite marquee animation
        gsap.to(contentRef.current, {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
        });

        // Add pulse animation to the circles
        gsap.to(contentRef.current?.querySelectorAll(".pulse-circle") || [], {
          scale: 1.1,
          duration: 1,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
        });
      }
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={marqueeRef} className=" py-8 overflow-hidden relative">
      <div ref={contentRef} className="flex whitespace-nowrap">
        {[...Array(10)].map((_, index) => (
          <div key={index} className={`flex items-center ${index === 0 ? 'mr-4' : 'mx-4'}`}>
            <span className="text-white text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-wide">
              {marqueeText}
            </span>
            <div className="w-16 h-16 sm:w-20 sm:h-20 ml-4 bg-white rounded-full flex items-center justify-center">
              <div className="pulse-circle w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-rose-100 to-rose-500 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
