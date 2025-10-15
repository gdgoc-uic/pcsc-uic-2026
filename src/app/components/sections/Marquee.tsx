"use client";
import TribalPattern from "../layouts/TribalPattern";

interface MarqueeProps {
  marqueeText: string;
}


export const Marquee = ({ marqueeText }: MarqueeProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      {/* Static pattern */}
      <div className="w-full select-none">
        <TribalPattern />
      </div>

      {/* Dark overlay for better contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

      {/* Static overlay text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <div className="relative max-w-full">
          {/* Text shadow for depth */}
          <span className="absolute inset-0 text-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide text-center blur-sm opacity-50 break-words">
            {marqueeText}
          </span>
          {/* Main text */}
          <span className="relative text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide text-center drop-shadow-2xl break-words">
            {marqueeText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
