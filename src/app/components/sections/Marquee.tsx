"use client";

interface MarqueeProps {
  marqueeText: string;
}

const TribalPattern = () => (
  <svg
    className="w-full h-32"
    viewBox="0 0 1200 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      {/* Tribal Diamond Pattern */}
      <pattern
        id="tribalDiamond"
        x="0"
        y="0"
        width="80"
        height="80"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M40 0L60 20L40 40L20 20L40 0Z"
          fill="#7c2d12"
          opacity="0.8"
        />
        <path
          d="M40 10L50 20L40 30L30 20L40 10Z"
          fill="#991b1b"
          opacity="0.9"
        />
        <circle cx="40" cy="20" r="3" fill="#b91c1c" opacity="1" />
      </pattern>

      {/* Zigzag Pattern */}
      <pattern
        id="tribalZigzag"
        x="0"
        y="0"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 30 L15 15 L30 30 L45 15 L60 30"
          stroke="#7c2d12"
          strokeWidth="3"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M0 45 L15 30 L30 45 L45 30 L60 45"
          stroke="#991b1b"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
      </pattern>

      {/* Geometric Triangles */}
      <pattern
        id="tribalTriangle"
        x="0"
        y="0"
        width="100"
        height="100"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M50 0 L75 43.3 L25 43.3 Z"
          fill="#7c2d12"
          opacity="0.7"
        />
        <path
          d="M50 56.7 L75 100 L25 100 Z"
          fill="#991b1b"
          opacity="0.7"
        />
        <path
          d="M0 50 L25 75 L0 100 Z"
          fill="#b91c1c"
          opacity="0.6"
        />
        <path
          d="M100 50 L75 75 L100 100 Z"
          fill="#b91c1c"
          opacity="0.6"
        />
      </pattern>

      {/* Okir-inspired Curves */}
      <pattern
        id="tribalCurve"
        x="0"
        y="0"
        width="120"
        height="120"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M20 60 Q40 40, 60 60 T100 60"
          stroke="#7c2d12"
          strokeWidth="4"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M20 80 Q40 100, 60 80 T100 80"
          stroke="#991b1b"
          strokeWidth="3"
          fill="none"
          opacity="0.85"
        />
        <circle cx="60" cy="60" r="6" fill="#b91c1c" opacity="0.9" />
      </pattern>
    </defs>

    {/* Layer the patterns for rich texture */}
    <rect width="1200" height="128" fill="url(#tribalDiamond)" />
    <rect width="1200" height="128" fill="url(#tribalZigzag)" />
    <rect width="1200" height="128" fill="url(#tribalTriangle)" />
    <rect width="1200" height="128" fill="url(#tribalCurve)" />

    {/* Border accents */}
    <line
      x1="0"
      y1="10"
      x2="1200"
      y2="10"
      stroke="#991b1b"
      strokeWidth="2"
      opacity="1"
    />
    <line
      x1="0"
      y1="118"
      x2="1200"
      y2="118"
      stroke="#991b1b"
      strokeWidth="2"
      opacity="1"
    />
  </svg>
);

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
        <div className="relative">
          {/* Text shadow for depth */}
          <span className="absolute inset-0 text-black text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide text-center blur-sm opacity-50">
            {marqueeText}
          </span>
          {/* Main text */}
          <span className="relative text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide text-center drop-shadow-2xl">
            {marqueeText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
