"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Ticker } from "../../components/layout/Ticker";
import { BottomNav } from "../../components/layout/BottomNav";
import { Article, getPublished } from "../../lib/store";

const CATEGORIES = [
  { key: "TODOS", label: "Todos" },
  { key: "MACROECONOMIA", label: "Macro" },
  { key: "BOLSA", label: "Bolsa" },
  { key: "CAMBIO", label: "Câmbio" },
  { key: "CRIPTO", label: "Cripto" },
  { key: "INTERNACIONAL", label: "Internacional" },
  { key: "FISCAL", label: "Fiscal" },
  { key: "ENERGIA", label: "Energia" },
  { key: "FUNDOS", label: "Fundos" },
];

function timeAgo(dateStr: string) {
  const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (mins < 60) return `Há ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Há ${hrs}h`;
  return `Há ${Math.floor(hrs / 24)}d`;
}

export default function NoticiasPage() {
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("TODOS");

  useEffect(() => {
    setArticles(getPublished());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filtered = category === "TODOS"
    ? articles
    : articles.filter(a => a.category === category);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <Ticker />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px" }}>

        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, fontWeight: 400, letterSpacing: "-0.5px", color: "var(--text-primary)", marginBottom: 6 }}>
            Notícias
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-secondary)" }}>
            Cobertura contínua do mercado financeiro brasileiro
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              style={{
                fontSize: 13, fontWeight: 500,
                padding: "7px 16px", borderRadius: 20,
                border: category === cat.key ? "0.5px solid var(--accent)" : "0.5px solid var(--border)",
                background: category === cat.key ? "var(--accent-dim)" : "var(--bg-card)",
                color: category === cat.key ? "var(--accent-text)" : "var(--text-secondary)",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "48px 32px", textAlign: "center" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>📰</p>
            <p style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", marginBottom: 8 }}>
              Nenhuma notícia publicada ainda
            </p>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
              Vá ao painel admin e publique os rascunhos.
            </p>
            <a href="/admin" style={{ fontSize: 14, color: "var(--accent-text)", textDecoration: "none", border: "0.5px solid var(--accent)", borderRadius: 8, padding: "10px 24px" }}>
              Ir para o painel admin →
            </a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {filtered.map(article => (
              <div key={article.id} style={{
                background: "var(--bg-card)", border: "0.5px solid var(--border)",
                borderRadius: 12, padding: 20, cursor: "pointer",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: "rgba(29,158,117,0.12)", color: "var(--accent-text)" }}>
                    {article.category.charAt(0) + article.category.slice(1).toLowerCase()}
                  </span>
                  {article.isPro && (
                    <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20, background: "rgba(83,74,183,0.12)", color: "#534AB7" }}>
                      Pro
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)", marginBottom: 8 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 12 }}>
                  {article.summary}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{timeAgo(article.publishedAt)}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>· {article.readingTime} min</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
