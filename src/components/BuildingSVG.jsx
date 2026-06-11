export default function BuildingSVG({ className = "", opacity = 0.12 }) {
  return (
    <svg
      viewBox="0 0 400 700"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* ── Spire ── */}
      <path
        d="M200 10 L196 80 L204 80 Z"
        fill="none"
        stroke="#47C341"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Spire base box */}
      <rect x="190" y="78" width="20" height="18" rx="2"
        fill="none" stroke="#47C341" strokeWidth="1.5" />

      {/* ── Antenna on spire ── */}
      <line x1="200" y1="10" x2="200" y2="2" stroke="#47C341" strokeWidth="1" />
      <circle cx="200" cy="2" r="2" fill="#47C341" />

      {/* ── Upper tower — curved right side (cylindrical) ── */}
      {/* Left straight wall */}
      <line x1="168" y1="96" x2="158" y2="420" stroke="#47C341" strokeWidth="1.5" />
      {/* Right curved wall */}
      <path d="M232 96 C270 150, 275 300, 262 420"
        fill="none" stroke="#47C341" strokeWidth="1.5" />
      {/* Top of tower */}
      <path d="M168 96 Q200 88 232 96" fill="none" stroke="#47C341" strokeWidth="1.5" />

      {/* ── Horizontal floor lines — left wall side ── */}
      {Array.from({ length: 22 }, (_, i) => {
        const y = 110 + i * 14;
        const leftX = 158 + (168 - 158) * ((y - 96) / (420 - 96));
        return (
          <line key={`fl${i}`}
            x1={leftX} y1={y}
            x2={168} y2={y}
            stroke="#47C341" strokeWidth="0.8" opacity="0.7"
          />
        );
      })}

      {/* ── Horizontal floor lines — cylindrical right side ── */}
      {Array.from({ length: 22 }, (_, i) => {
        const y = 110 + i * 14;
        const t = (y - 96) / (420 - 96);
        const rightX = 232 + t * (262 - 232) + Math.sin(t * Math.PI) * 38;
        return (
          <path key={`fr${i}`}
            d={`M168 ${y} Q${200 + t * 10} ${y - 2} ${rightX} ${y}`}
            fill="none" stroke="#47C341" strokeWidth="0.8" opacity="0.7"
          />
        );
      })}

      {/* ── Window columns — left section ── */}
      {Array.from({ length: 6 }, (_, col) =>
        Array.from({ length: 18 }, (_, row) => {
          const x = 170 + col * 7;
          const y = 112 + row * 14;
          if (x > 230) return null;
          return (
            <rect key={`wl${col}-${row}`}
              x={x} y={y} width="4" height="8" rx="1"
              fill="none" stroke="#47C341" strokeWidth="0.6" opacity="0.5"
            />
          );
        })
      )}

      {/* ── Building base / lower section ── */}
      <path d="M158 420 L148 520 L252 520 L262 420 Z"
        fill="none" stroke="#47C341" strokeWidth="1.5" />

      {/* Base floor lines */}
      {Array.from({ length: 7 }, (_, i) => {
        const y = 435 + i * 13;
        const t = (y - 420) / (520 - 420);
        const lx = 158 - t * 10;
        const rx = 262 + t * (252 - 262);
        return (
          <line key={`bl${i}`}
            x1={lx} y1={y} x2={rx} y2={y}
            stroke="#47C341" strokeWidth="0.8" opacity="0.6"
          />
        );
      })}

      {/* Base windows */}
      {Array.from({ length: 8 }, (_, col) =>
        Array.from({ length: 5 }, (_, row) => {
          const x = 152 + col * 13;
          const y = 435 + row * 13;
          if (x > 248) return null;
          return (
            <rect key={`wb${col}-${row}`}
              x={x} y={y} width="8" height="9" rx="1"
              fill="none" stroke="#47C341" strokeWidth="0.6" opacity="0.5"
            />
          );
        })
      )}

      {/* ── Lobby / podium ── */}
      <rect x="128" y="520" width="144" height="24" rx="2"
        fill="none" stroke="#47C341" strokeWidth="1.5" />
      {/* Lobby columns */}
      {[140, 158, 176, 194, 212, 230, 248, 260].map((x, i) => (
        <line key={`lc${i}`}
          x1={x} y1="520" x2={x} y2="544"
          stroke="#47C341" strokeWidth="0.8" opacity="0.6"
        />
      ))}

      {/* ── Ground platform ── */}
      <line x1="100" y1="548" x2="300" y2="548" stroke="#47C341" strokeWidth="1.5" />
      <line x1="110" y1="556" x2="290" y2="556" stroke="#47C341" strokeWidth="0.8" opacity="0.5" />

      {/* ── Vertical center seam ── */}
      <line x1="200" y1="96" x2="200" y2="420"
        stroke="#47C341" strokeWidth="0.6" opacity="0.3"
        strokeDasharray="4 6"
      />
    </svg>
  );
}