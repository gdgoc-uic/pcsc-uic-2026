const TribalPattern = () => (
  <svg
    className="w-full h-full"
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
        <path d="M40 0L60 20L40 40L20 20L40 0Z" fill="#7c2d12" opacity="0.8" />
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
        <path d="M50 0 L75 43.3 L25 43.3 Z" fill="#7c2d12" opacity="0.7" />
        <path d="M50 56.7 L75 100 L25 100 Z" fill="#991b1b" opacity="0.7" />
        <path d="M0 50 L25 75 L0 100 Z" fill="#b91c1c" opacity="0.6" />
        <path d="M100 50 L75 75 L100 100 Z" fill="#b91c1c" opacity="0.6" />
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
export default TribalPattern;
