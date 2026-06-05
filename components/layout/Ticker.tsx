"use client";
import { QUOTES } from "../../constants/market";

export function Ticker() {
  const items = [...QUOTES, ...QUOTES];
  return (
    <div style={{
      background: "var(--ticker-bg)",
      borderBottom: "0.5px solid var(--border)",
      overflow: "hidden", height: 36,
      display: "flex", alignItems: "center",
    }}>
      <div className="ticker-track" style={{
        display: "flex", whiteSpace: "nowrap", willChange: "transform",
      }}>
        {items.map((q, i) => (
          <div key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0 24px",
            borderRight: "0.5px solid rgba(255,255,255,0.08)",
            height: 36,
          }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{q.symbol}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ticker-text)" }}>{q.price}</span>
            {q.changePct !== 0 && (
              <span style={{ fontSize: 11, color: q.changePct > 0 ? "#5DCAA5" : "#F09595" }}>
                {q.changePct > 0 ? "+" : ""}{q.changePct.toFixed(1)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
