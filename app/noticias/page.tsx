"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Ticker } from "@/components/layout/Ticker";
import { BottomNav } from "@/components/layout/BottomNav";
import { NewsCard } from "@/components/news/NewsCard";
import { Article, getPublished } from "@/lib/store";

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
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Ticker />

      <div className="max-w-[1200px] mx-auto px-6 py-9">

        <div className="mb-7">
          <h1 className="font-display text-[32px] font-normal tracking-tight text-text-primary mb-1.5">
            Notícias
          </h1>
          <p className="text-[15px] text-text-secondary">
            Cobertura contínua do mercado financeiro brasileiro
          </p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`text-[13px] font-medium px-4 py-1.5 rounded-full border-[0.5px] cursor-pointer font-sans transition-all ${
                category === cat.key
                  ? "border-accent bg-accent-dim text-accent-text"
                  : "border-border bg-card text-text-secondary hover:border-border-strong"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border-[0.5px] border-border rounded-xl p-12 text-center">
            <p className="text-[32px] mb-3">📰</p>
            <p className="text-base font-medium text-text-primary mb-2">
              Nenhuma notícia publicada ainda
            </p>
            <p className="text-sm text-text-secondary mb-5">
              Vá ao painel admin e publique os rascunhos.
            </p>
            
             <a href="/admin"
              className="text-sm text-accent-text no-underline border-[0.5px] border-accent rounded-lg px-6 py-2.5"
            >
              Ir para o painel admin &#8594;
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filtered.map(article => (
              <div
                key={article.id}
                className="bg-card border-[0.5px] border-border rounded-xl p-5 cursor-pointer hover:border-border-strong transition-colors"
              >
                <div className="flex gap-1.5 mb-2.5 items-center">
                  <span className={`tag-${article.category} text-[11px] font-medium px-2.5 py-0.5 rounded-full`}>
                    {article.category.charAt(0) + article.category.slice(1).toLowerCase()}
                  </span>
                  {article.isPro && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-dim text-accent-text">
                      Pro
                    </span>
                  )}
                </div>
                <h3 className="text-[15px] font-medium leading-[1.4] text-text-primary mb-2">
                  {article.title}
                </h3>
                <p className="text-[13px] text-text-secondary leading-relaxed mb-3">
                  {article.summary}
                </p>
                <div className="flex gap-2">
                  <span className="text-xs text-text-muted">{timeAgo(article.publishedAt)}</span>
                  <span className="text-xs text-text-muted">· {article.readingTime} min</span>
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
