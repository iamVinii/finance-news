"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Ticker } from "@/components/layout/Ticker";
import { BottomNav } from "@/components/layout/BottomNav";
import { NewsCard } from "@/components/news/NewsCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Article, getPublished } from "@/lib/store";
import { METRICS } from "@/constants/market";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setArticles(getPublished());
    setMounted(true);
    const onFocus = () => setArticles(getPublished());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const featured = articles[0] || null;
  const sideArticles = articles.slice(1, 5);
  const smallArticles = articles.slice(5, 9);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Ticker />

      {/* Notícias em destaque */}
      <section className="max-w-[1200px] mx-auto px-6 pt-9">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-[7px] h-[7px] rounded-full bg-danger inline-block" />
          <span className="text-[11px] tracking-widest uppercase text-text-muted">
            Agora no mercado
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="bg-card border-[0.5px] border-border rounded-xl p-12 text-center mb-8">
            <p className="text-[32px] mb-3">📰</p>
            <p className="text-base font-medium text-text-primary mb-2">
              Nenhuma notícia publicada ainda
            </p>
            <p className="text-sm text-text-secondary mb-5">
              Vá ao painel admin, aprove os rascunhos e eles aparecerão aqui.
            </p>
            
              <a href="/admin"
              className="text-sm text-accent-text no-underline border-[0.5px] border-accent rounded-lg px-6 py-2.5"
            >
              Ir para o painel admin &#8594;
            </a>
          </div>
        ) : (
          <>
            {featured && (
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-3.5 mb-3.5">
                <NewsCard article={featured} variant="main" />
                {sideArticles.length >= 2 && (
                  <div className="bg-card border-[0.5px] border-border rounded-xl p-5">
                    {sideArticles.slice(0, 2).map((a, i) => (
                      <div key={a.id} className={i === 0 ? "border-b-[0.5px] border-border" : ""}>
                        <NewsCard article={a} variant="side" />
                      </div>
                    ))}
                  </div>
                )}
                {sideArticles.length >= 4 && (
                  <div className="bg-card border-[0.5px] border-border rounded-xl p-5">
                    {sideArticles.slice(2, 4).map((a, i) => (
                      <div key={a.id} className={i === 0 ? "border-b-[0.5px] border-border" : ""}>
                        <NewsCard article={a} variant="side" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {smallArticles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {smallArticles.map(a => (
                  <NewsCard key={a.id} article={a} variant="small" />
                ))}
              </div>
            )}
          </>
        )}

        <div className="flex justify-center mb-12">
          <Link
            href="/noticias"
            className="text-sm text-accent-text no-underline border-[0.5px] border-accent rounded-lg px-7 py-2.5 hover:bg-accent-dim transition-colors"
          >
            Ver todas as notícias &#8594;
          </Link>
        </div>
      </section>

      <div className="border-t-[0.5px] border-border mx-6" />

      {/* Indicadores */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <p className="text-[11px] tracking-widest uppercase text-text-muted mb-3.5">
          Mercado agora
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {METRICS.map(m => (
            <div key={m.name} className="bg-secondary border-[0.5px] border-border rounded-xl p-4">
              <p className="text-xs text-text-muted mb-1.5">{m.name}</p>
              <p className="text-[19px] font-medium text-text-primary tracking-tight">{m.value}</p>
              <p className={`text-xs mt-0.5 ${m.neutral ? "text-text-muted" : m.up ? "text-accent" : "text-danger"}`}>
                {m.change}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t-[0.5px] border-border mx-6" />

      {/* Newsletter */}
      <section className="bg-secondary border-y-[0.5px] border-border py-16 px-6 text-center">
        <div className="max-w-[520px] mx-auto">
          <h2 className="font-display text-[34px] font-normal leading-[1.2] text-text-primary mb-3 tracking-tight">
            Entenda o mercado.<br />
            <em className="text-accent not-italic">Tome decisões melhores.</em>
          </h2>
          <p className="text-base text-text-secondary leading-relaxed mb-7">
            Notícias, análises e indicadores — claros, diretos e gratuitos para começar.
          </p>
          <div className="bg-card border-[0.5px] border-border rounded-xl p-5 mb-3">
            <p className="text-[13px] text-text-muted mb-2.5">✉ Resumo diário no seu e-mail</p>
            {submitted ? (
              <p className="text-[15px] text-accent-text font-medium">
                ✓ Ótimo! Você receberá a newsletter amanhã cedo.
              </p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3.5 py-2.5 rounded-lg border-[0.5px] border-border-strong bg-secondary text-text-primary text-sm font-sans outline-none"
                />
                <button
                  type="submit"
                  className="bg-accent text-white border-none rounded-lg px-5 py-2.5 text-sm font-medium cursor-pointer font-sans whitespace-nowrap hover:opacity-90 transition-opacity"
                >
                  Quero receber
                </button>
              </form>
            )}
          </div>
          <p className="text-xs text-text-muted">Gratuito, sem spam.</p>
        </div>
      </section>

      {/* Freemium */}
      <section className="max-w-[1200px] mx-auto px-6 py-14">
        <p className="text-[11px] tracking-widest uppercase text-text-muted mb-2">
          O que você acessa
        </p>
        <h2 className="font-display text-[28px] font-normal text-text-primary mb-7 tracking-tight">
          Comece grátis, expanda quando quiser
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            { icon: "📰", title: "Notícias do dia", desc: "Cobertura contínua dos principais eventos do mercado.", pro: false },
            { icon: "📊", title: "Indicadores ao vivo", desc: "IBOV, câmbio, Selic, IPCA atualizados em tempo real.", pro: false },
            { icon: "✉️", title: "Newsletter diária", desc: "O resumo mais importante direto no seu e-mail.", pro: false },
            { icon: "🔍", title: "Análises exclusivas", desc: "Relatórios aprofundados e alertas personalizados.", pro: true },
          ].map(card => (
            <div key={card.title} className="bg-card border-[0.5px] border-border rounded-xl p-5">
              <div className="text-2xl mb-3.5">{card.icon}</div>
              <h3 className="text-[15px] font-medium text-text-primary mb-1.5">{card.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">{card.desc}</p>
              <span className={`inline-block mt-3 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                card.pro
                  ? "bg-accent-dim text-accent-text"
                  : "bg-[rgba(99,153,34,0.12)] text-[#3B6D11]"
              }`}>
                {card.pro ? "Finance News Pro" : "Grátis"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[0.5px] border-border px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 max-w-[1200px] mx-auto">
        <span className="text-[13px] text-text-muted">© 2025 FinanceNews</span>
        <div className="flex gap-5">
          {["Privacidade", "Termos", "Newsletter", "Contato"].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} className="text-[13px] text-text-muted no-underline hover:text-text-secondary transition-colors">
              {l}
            </Link>
          ))}
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}
