const COLOR_MAP = {
  amber: { stroke: "#f0883e", glow: "rgba(240,136,62,0.4)" },
  green: { stroke: "#3fb950", glow: "rgba(63,185,80,0.4)" },
  purple: { stroke: "#bc8cff", glow: "rgba(188,140,255,0.4)" },
};

export default function ScoreBadge({ score, color = "green" }) {
  const c = COLOR_MAP[color] || COLOR_MAP.green;
  const r = 22;
  const circumference = 2 * Math.PI * r;
  const pct = (score / 10) * circumference;

  return (
    <div
      className="flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
      style={{ filter: `drop-shadow(0 0 6px ${c.glow})` }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60">
        {/* Track ring */}
        <circle
          cx="30"
          cy="30"
          r={r}
          fill="none"
          stroke="#21262d"
          strokeWidth="4"
        />
        {/* Progress ring */}
        <circle
          cx="30"
          cy="30"
          r={r}
          fill="none"
          stroke={c.stroke}
          strokeWidth="4"
          strokeDasharray={`${pct} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
          style={{ filter: `drop-shadow(0 0 4px ${c.stroke})` }}
        />
        {/* Score text */}
        <text
          x="30"
          y="34"
          textAnchor="middle"
          fill={c.stroke}
          fontSize="13"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
          style={{ filter: `drop-shadow(0 0 3px ${c.stroke})` }}
        >
          {score}/10
        </text>
      </svg>
    </div>
  );
}
