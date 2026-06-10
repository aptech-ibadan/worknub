/* ─── Pill badge ─────────────────────────────────────────────── */
export function Pill({ children, colorClass = "text-worknub-green bg-worknub-green/10 border-worknub-green/20" }) {
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full border ${colorClass}`}>
      {children}
    </span>
  );
}

/* ─── Section label with green bar ──────────────────────────── */
export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span className="w-7 h-0.5 bg-worknub-green rounded-sm inline-block" />
      <span className="text-worknub-green text-[11px] font-bold tracking-[0.12em] uppercase">
        {children}
      </span>
    </div>
  );
}