"use client";
import { QUOTES } from "../../constants/market";

export function Ticker() {
  const items = [...QUOTES, ...QUOTES];
  return (
    <div className="bg-[var(--ticker-bg)] border-b-[0.5px] border-border overflow-hidden h-9 flex items-center">
      <div className="ticker-track flex whitespace-nowrap will-change-transform">
        {items.map((q, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 px-6 border-r-[0.5px] border-white/10 h-9"
          >
            <span className="text-[11px] text-white/45">{q.symbol}</span>
            <span className="text-xs font-medium text-[var(--ticker-text)]">{q.price}</span>
            {q.changePct !== 0 && (
              <span className={`text-[11px] ${q.changePct > 0 ? "text-[#5DCAA5]" : "text-[#F09595]"}`}>
                {q.changePct > 0 ? "+" : ""}{q.changePct.toFixed(1)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
