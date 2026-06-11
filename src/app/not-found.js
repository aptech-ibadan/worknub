import Link from 'next/link';
import { FiArrowRight, FiHome, FiSearch } from 'react-icons/fi';

/* ── 404 SVG art ────────────────────────────────────────────── */
function NotFoundSVG() {
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm mx-auto" aria-hidden="true">

      {/* Ground shadow */}
      <ellipse cx="200" cy="258" rx="90" ry="8" fill="#47C341" opacity="0.08" />

      {/* Large "404" text — outlined */}
      <text x="200" y="160" textAnchor="middle"
        fontSize="130" fontWeight="900"
        letterSpacing="-6"
        fill="none"
        stroke="#47C341"
        strokeWidth="2.5"
        opacity="0.12"
        fontFamily="system-ui, sans-serif">
        404
      </text>

      {/* Desk */}
      <rect x="100" y="200" width="200" height="10" rx="3" fill="#47C341" opacity="0.18" />
      <rect x="112" y="210" width="8" height="40" rx="2" fill="#47C341" opacity="0.12" />
      <rect x="280" y="210" width="8" height="40" rx="2" fill="#47C341" opacity="0.12" />

      {/* Monitor body */}
      <rect x="148" y="140" width="104" height="58" rx="5" fill="none" stroke="#47C341" strokeWidth="2" opacity="0.55" />
      {/* Screen bg */}
      <rect x="155" y="147" width="90" height="44" rx="3" fill="#47C341" opacity="0.06" />
      {/* Monitor stand */}
      <line x1="200" y1="198" x2="200" y2="202" stroke="#47C341" strokeWidth="3" opacity="0.3" />
      <rect x="186" y="201" width="28" height="4" rx="2" fill="#47C341" opacity="0.18" />

      {/* Screen — lost connection illustration */}
      {/* Globe outline */}
      <circle cx="200" cy="168" r="14" fill="none" stroke="#47C341" strokeWidth="1.5" opacity="0.5" />
      <line x1="186" y1="168" x2="214" y2="168" stroke="#47C341" strokeWidth="1" opacity="0.35" />
      <ellipse cx="200" cy="168" rx="6" ry="14" fill="none" stroke="#47C341" strokeWidth="1" opacity="0.35" />
      {/* X over globe */}
      <line x1="190" y1="158" x2="210" y2="178" stroke="#E8620A" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="210" y1="158" x2="190" y2="178" stroke="#E8620A" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

      {/* Disconnected plug left */}
      <rect x="104" y="172" width="28" height="14" rx="3" fill="none" stroke="#47C341" strokeWidth="1.5" opacity="0.45" />
      <line x1="109" y1="168" x2="109" y2="172" stroke="#47C341" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="127" y1="168" x2="127" y2="172" stroke="#47C341" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Cable left — wavy, disconnected */}
      <path d="M132 179 Q140 179 142 179" fill="none" stroke="#47C341" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" strokeDasharray="3 3" />

      {/* Disconnected plug right */}
      <rect x="268" y="172" width="28" height="14" rx="3" fill="none" stroke="#47C341" strokeWidth="1.5" opacity="0.45" />
      <line x1="273" y1="168" x2="273" y2="172" stroke="#47C341" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="291" y1="168" x2="291" y2="172" stroke="#47C341" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Cable right — wavy, disconnected */}
      <path d="M268 179 Q260 179 258 179" fill="none" stroke="#47C341" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" strokeDasharray="3 3" />

      {/* Floating question marks */}
      <text x="82" y="150" fontSize="18" fill="#47C341" opacity="0.25" fontWeight="700" fontFamily="system-ui">?</text>
      <text x="308" y="145" fontSize="14" fill="#E8620A" opacity="0.3" fontWeight="700" fontFamily="system-ui">?</text>
      <text x="72" y="190" fontSize="10" fill="#47C341" opacity="0.18" fontWeight="700" fontFamily="system-ui">?</text>

      {/* Ambient dots */}
      {[[55,130,2.5],[330,160,2],[350,120,1.8],[50,220,2],[340,210,1.5],[170,100,1.8],[230,95,2.2]].map(([cx,cy,r],i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#47C341" opacity={0.1 + i * 0.02} />
      ))}

      {/* Dashed orbit ring */}
      <ellipse cx="200" cy="170" rx="70" ry="55" fill="none" stroke="#47C341" strokeWidth="0.6" opacity="0.1" strokeDasharray="5 8" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-worknub-mint overflow-hidden px-6 py-24 text-center">

      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(https://res.cloudinary.com/ddldviftf/image/upload/v1781088299/Untitled-1_tuqrgv.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-worknub-mint/80 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(240,249,240,0.6) 100%)" }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle, #2D7B4F 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Content */}
      <div className="relative z-10 max-w-lg w-full">

        {/* SVG art */}
        <div className="mb-6">
          <NotFoundSVG />
        </div>

        {/* Label */}
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
          <span className="text-worknub-green text-[11px] font-black tracking-[0.15em] uppercase">Error 404</span>
          <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
        </div>

        <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-worknub-dark tracking-[-0.03em] leading-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-base leading-[1.75] max-w-sm mx-auto mb-10">
          Looks like this desk is empty. The page you're looking for doesn't exist or may have moved.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-worknub-green text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#3aad35] transition-colors whitespace-nowrap"
            style={{ boxShadow: '0 6px 20px rgba(71,195,65,0.35)' }}
          >
            <FiHome size={14} /> Back to Home
          </Link>
          <Link
            href="/spaces"
            className="inline-flex items-center gap-2 bg-white text-worknub-dark px-7 py-3 rounded-xl font-semibold text-sm border border-gray-200 hover:border-worknub-green/40 hover:bg-worknub-mint transition-colors whitespace-nowrap shadow-sm"
          >
            <FiSearch size={14} /> Browse Spaces <FiArrowRight size={13} />
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-gray-200/80 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { label: "Pricing",    href: "/pricing" },
            { label: "Gallery",    href: "/gallery" },
            { label: "Offer",      href: "/offer" },
            { label: "Contact Us", href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="text-gray-400 text-sm font-medium hover:text-worknub-green transition-colors whitespace-nowrap">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}