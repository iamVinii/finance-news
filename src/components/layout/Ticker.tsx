"use client";
import { useState } from "react";

const QUOTES = [
  { symbol: "IBOV",   price: "131.284",  changePct: 1.2  },
  { symbol: "USD/BRL",price: "R$ 5,82",  changePct: -0.4 },
  { symbol: "SELIC",  price: "10,75%",   changePct: 0    },
  { symbol: "BTC",    price: "$106.200", changePct: 2.1  },
  { symbol: "WTI",    price: "$78,4",    changePct: -0.8 },
  { symbol: "Ouro",   price: "$3.180",   changePct: 0.5  },
  { symbol: "EUR/BRL",price: "R$ 6,31",  changePct: -0.2 },
  { symbol: "IPCA",   price: "4,83%",    changePct: 0    },
];

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
