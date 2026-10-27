const VW = 1200;
const VH = 800;

// Sagging "net" curves: verticals that drift sideways at their midpoint,
// horizontals that dip down. The sine offset varies per line so the mesh
// looks draped rather than drawn.
const verticals = Array.from({ length: 25 }, (_, i) => {
  const x = i * 50;
  const drift = Math.sin((x / VW) * Math.PI * 2) * 26;
  return `M ${x} -20 Q ${x + drift} ${VH / 2} ${x} ${VH + 20}`;
});

const horizontals = Array.from({ length: 17 }, (_, i) => {
  const y = i * 50;
  const dip = Math.sin((y / VH) * Math.PI * 2) * 22;
  return `M -20 ${y} Q ${VW / 2} ${y + dip} ${VW + 20} ${y}`;
});

export default function NetBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="net-fade" cx="42%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="net-mask">
          <rect width={VW} height={VH} fill="url(#net-fade)" />
        </mask>
      </defs>

      <g
        mask="url(#net-mask)"
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="1"
        strokeOpacity="0.35"
      >
        {verticals.map((d) => (
          <path key={d} d={d} />
        ))}
        {horizontals.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}