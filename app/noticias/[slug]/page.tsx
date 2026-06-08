"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Ticker } from "@/components/layout/Ticker";
import { BottomNav } from "@/components/layout/BottomNav";
import { Article, getPublished } from "@/lib/store";

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const articles = getPublished();
    const found = articles.find(a => a.slug === params.slug);
    if (!found) {
      router.push("/noticias");
      return;
    }
    setArticle(found);
    setMounted(true);
  }, [params.slug, router]);

  if (!mounted || !article) return null;

  function timeAgo(dateStr: string) {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 60) return `Há ${mins} min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Há ${hrs}h`;
    return `Há ${Math.floor(hrs / 24)}d`;
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Ticker />

      <article className="max-w-[720px] mx-auto px-6 py-10">

        {/* Categoria e meta */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`tag-${article.category} text-[11px] font-medium px-2.5 py-0.5 rounded-full`}>
            {article.category.charAt(0) + article.category.slice(1).toLowerCase()}
          </span>
          {article.isPro && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-dim text-accent-text">
              Pro
            </span>
          )}
          <span className="text-xs text-text-muted">
            {timeAgo(article.publishedAt)} · {article.readingTime} min de leitura
          </span>
        </div>

        {/* Título */}
        <h1 className="font-display text-[32px] md:text-[40px] font-normal leading-[1.2] text-text-primary mb-4 tracking-tight">
          {article.title}
        </h1>

        {/* Resumo */}
        <p className="text-lg text-text-secondary leading-relaxed mb-8 pb-8 border-b-[0.5px] border-border">
          {article.summary}
        </p>

        {/* Conteúdo — paywall para Pro */}
        {article.isPro ? (
          <div>
            {/* Mostra só o primeiro parágrafo */}
            <p className="text-[16px] leading-[1.75] text-text-primary mb-4">
              {article.content.split("\n\n")[0]}
            </p>

            {/* Blur + paywall */}
            <div className="relative">
              <div className="text-[16px] leading-[1.75] text-text-primary blur-sm select-none pointer-events-none">
                {article.content.split("\n\n").slice(1).map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary/80 backdrop-blur-sm rounded-xl">
                <p className="text-sm text-text-secondary">Continue lendo esta análise</p>
                
                  <a href="/cadastro"
                  className="bg-accent text-white no-underline px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Acesso completo por R$ 1 na primeira semana
                </a>
                <p className="text-xs text-text-muted">Cancele quando quiser · Sem fidelidade</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {article.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-[16px] leading-[1.75] text-text-primary mb-5">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Voltar */}
        <div className="mt-12 pt-8 border-t-[0.5px] border-border">
          
           <a href="/noticias"
            className="text-sm text-accent-text no-underline hover:underline"
          >
            &#8592; Voltar para notícias
          </a>
        </div>
      </article>

      <BottomNav />
    </div>
  );
}
