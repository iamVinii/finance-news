"use client";

import { Navbar } from "../components/layout/Navbar";
import { Ticker } from "../components/layout/Ticker";
import { BottomNav } from "../components/layout/BottomNav";
import { NewsCard } from "../components/news/NewsCard";
import { useState } from "react";
import Link from "next/link";

const FEATURED = {
  slug: "banco-central-revisa-pib-2025",
  title: "Banco Central revisa projeção do PIB e sinaliza cenário mais favorável para o segundo semestre",
  summary: "A revisão surpreendeu o mercado.",
  category: "MACROECONOMIA",
  isPro: false,
  readingTime: 4,
  publishedAt: new Date(Date.now() - 18 * 60000).toISOString(),
};

const SIDE = [
  { slug: "dolar-recua", title: "Dólar recua com dados positivos da balança comercial", summary: "", category: "CAMBIO", isPro: false, readingTime: 2, publishedAt: new Date(Date.now() - 45*60000).toISOString() },
  { slug: "fed-corte", title: "Fed sinaliza possível corte de juros no segundo semestre", summary: "", category: "INTERNACIONAL", isPro: false, readingTime: 3, publishedAt: new Date(Date.now() - 80*60000).toISOString() },
  { slug: "bitcoin-105k", title: "Bitcoin rompe resistência dos $105k com volume acima da média", summary: "", category: "CRIPTO", isPro: false, readingTime: 2, publishedAt: new Date(Date.now() - 120*60000).toISOString() },
  { slug: "ibovespa-maxima", title: "Ibovespa sobe e renova máxima do ano em sessão de alívio", summary: "", category: "BOLSA", isPro: false, readingTime: 2, publishedAt: new Date(Date.now() - 180*60000).toISOString() },
];

const SMALL = [
  { slug: "petrobras-plano", title: "Petrobras anuncia revisão do plano estratégico 2025–2029", summary: "", category: "ENERGIA", isPro: false, readingTime: 2, publishedAt: new Date(Date.now() - 240*60000).toISOString() },
  { slug: "governo-deficit", title: "Governo revisará meta de déficit após revisão das receitas", summary: "", category: "FISCAL", isPro: false, readingTime: 2, publishedAt: new Date(Date.now() - 300*60000).toISOString() },
  { slug: "china-exportacoes", title: "Exportações chinesas surpreendem e aliviam tensão nos mercados", summary: "", category: "INTERNACIONAL", isPro: false, readingTime: 2, publishedAt: new Date(Date.now() - 360*60000).toISOString() },
  { slug: "fundos-recorde", title: "Captação de fundos multimercado bate recorde no ano", summary: "", category: "FUNDOS", isPro: false, readingTime: 2, publishedAt: new Date(Date.now() - 420*60000).toISOString() },
];

const METRICS = [
  { name: "Ibovespa",   value: "131.284",  change: "+1.578 pts", up: true,  neutral: false },
  { name: "Dólar/Real", value: "R$ 5,82",  change: "-0,4% hoje", up: false, neutral: false },
  { name: "Selic",      value: "10,75%",   change: "ao ano",     up: false, neutral: true  },
  { name: "Bitcoin",    value: "$106.200", change: "+2,1% hoje", up: true,  neutral: false },
  { name: "IPCA 12m",   value: "4,83%",    change: "acumulado",  up: false, neutral: true  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <Ticker />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E24B4A", display: "inline-block" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Agora no mercado
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          <NewsCard article={FEATURED} variant="main" />
          <div style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 12, padding: 20 }}>
            {SIDE.slice(0, 2).map((a, i) => (
              <div key={a.slug} style={{ borderBottom: i === 0 ? "0.5px solid var(--border)" : "none" }}>
                <NewsCard article={a} variant="side" />
              </div>
            ))}
          </div>
          <div style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 12, padding: 20 }}>
            {SIDE.slice(2, 4).map((a, i) => (
              <div key={a.slug} style={{ borderBottom: i === 0 ? "0.5px solid var(--border)" : "none" }}>
                <NewsCard article={a} variant="side" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 32 }}>
          {SMALL.map(a => <NewsCard key={a.slug} article={a} variant="small" />)}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <Link href="/noticias" style={{
            fontSize: 14, color: "var(--accent-text)", textDecoration: "none",
            border: "0.5px solid var(--accent)", borderRadius: 8, padding: "10px 28px",
          }}>
            Ver todas as notícias →
          </Link>
        </div>
      </section>

      <div style={{ borderTop: "0.5px solid var(--border)", margin: "0 24px" }} />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
          Mercado agora
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {METRICS.map(m => (
            <div key={m.name} style={{ background: "var(--bg-secondary)", border: "0.5px solid var(--border)", borderRadius: 10, padding: "14px 16px" }}>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>{m.name}</p>
              <p style={{ fontSize: 19, fontWeight: 500, color: "var(--text-primary)" }}>{m.value}</p>
              <p style={{ fontSize: 12, marginTop: 2, color: m.neutral ? "var(--text-muted)" : m.up ? "var(--accent)" : "var(--danger)" }}>
                {m.change}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ borderTop: "0.5px solid var(--border)", margin: "0 24px" }} />

      <section style={{ background: "var(--bg-secondary)", borderTop: "0.5px solid var(--border)", borderBottom: "0.5px solid var(--border)", padding: "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, fontWeight: 400, lineHeight: 1.2, color: "var(--text-primary)", marginBottom: 12, letterSpacing: "-0.5px" }}>
            Entenda o mercado.<br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Tome decisões melhores.</em>
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 28 }}>
            Notícias, análises e indicadores — claros, diretos e gratuitos para começar.
          </p>
          <div style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "20px 24px", marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>✉ Resumo diário no seu e-mail</p>
            {submitted ? (
              <p style={{ fontSize: 15, color: "var(--accent-text)", fontWeight: 500 }}>
                ✓ Ótimo! Você receberá a newsletter amanhã cedo.
              </p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                style={{ display: "flex", gap: 8 }} className="email-row">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "0.5px solid var(--border-strong)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit", outline: "none" }}
                />
                <button type="submit" style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                  Quero receber
                </button>
              </form>
            )}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Gratuito, sem spam.</p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
          O que você acessa
        </p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "var(--text-primary)", marginBottom: 28, letterSpacing: "-0.5px" }}>
          Comece grátis, expanda quando quiser
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[
            { icon: "📰", title: "Notícias do dia", desc: "Cobertura contínua dos principais eventos do mercado.", pro: false },
            { icon: "📊", title: "Indicadores ao vivo", desc: "IBOV, câmbio, Selic, IPCA atualizados em tempo real.", pro: false },
            { icon: "✉️", title: "Newsletter diária", desc: "O resumo mais importante direto no seu e-mail.", pro: false },
            { icon: "🔍", title: "Análises exclusivas", desc: "Relatórios aprofundados e alertas personalizados.", pro: true },
          ].map(card => (
            <div key={card.title} style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 14 }}>{card.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginBottom: 6 }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{card.desc}</p>
              <span style={{ display: "inline-block", marginTop: 12, fontSize: 11, fontWeight: 500, padding: "2px 10px", borderRadius: 20, background: card.pro ? "var(--accent-dim)" : "rgba(99,153,34,0.12)", color: card.pro ? "var(--accent-text)" : "#3B6D11" }}>
                {card.pro ? "Finance News Pro" : "Grátis"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "0.5px solid var(--border)", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>© 2025 FinanceNews</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacidade","Termos","Newsletter","Contato"].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
              {l}
            </Link>
          ))}
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}
