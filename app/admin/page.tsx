"use client";

import { useState, useEffect } from "react";
import { Article, getDrafts, saveDrafts, addPublished, seedIfEmpty } from "../../lib/store";

interface Draft {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  isPro: boolean;
  readingTime: number;
  createdAt: string;
}

function getMockDrafts(): Draft[] {
  const now = Date.now();
  return [
    {
      id: "1",
      title: "Banco Central mantém Selic e sinaliza cautela para próxima reunião",
      summary: "A decisão unânime surpreendeu parte do mercado que esperava algum sinal de mudança na trajetória dos juros.",
      content: "O Comitê de Política Monetária (Copom) do Banco Central decidiu, por unanimidade, manter a taxa Selic em 10,75% ao ano.\n\nO BC destacou que o cenário internacional permanece desafiador, com a inflação em economias desenvolvidas ainda acima das metas.\n\nO que isso significa para o investidor brasileiro? Na prática, a Selic estável mantém a renda fixa atrativa. Títulos do Tesouro Selic continuam entregando retorno acima da inflação sem risco de mercado.",
      category: "MACROECONOMIA", isPro: false, readingTime: 3,
      createdAt: new Date(now - 25 * 60000).toISOString(),
    },
    {
      id: "2",
      title: "IBGE divulga IPCA de abril acima das expectativas do mercado",
      summary: "O índice registrou alta de 0,61% no mês, puxado principalmente pelo grupo de alimentação e habitação.",
      content: "O IBGE divulgou que o IPCA registrou alta de 0,61% em abril, acima da mediana das expectativas do mercado.\n\nNo acumulado de 12 meses, o IPCA chegou a 4,83%, mantendo-se acima do centro da meta estabelecida pelo CMN.\n\nOs grupos que mais pressionaram o índice foram alimentação e bebidas (+0,9%) e habitação (+0,7%).",
      category: "MACROECONOMIA", isPro: false, readingTime: 4,
      createdAt: new Date(now - 55 * 60000).toISOString(),
    },
    {
      id: "3",
      title: "CVM aprova novas regras para fundos de investimento em criptoativos",
      summary: "A resolução estabelece requisitos mínimos de transparência e gestão de risco para os veículos que investem em Bitcoin.",
      content: "A CVM publicou resolução que estabelece o novo marco regulatório para fundos de investimento com exposição a criptoativos no Brasil.\n\nEntre as principais mudanças estão a obrigatoriedade de custódia qualificada para os ativos digitais e limites de concentração por emissor.\n\nPara o investidor de varejo, mais regulação significa mais proteção.",
      category: "CRIPTO", isPro: true, readingTime: 5,
      createdAt: new Date(now - 90 * 60000).toISOString(),
    },
    {
      id: "4",
      title: "Petrobras anuncia dividendos extraordinários para o segundo trimestre",
      summary: "A distribuição será de R$ 0,89 por ação, totalizando aproximadamente R$ 11,5 bilhões aos acionistas.",
      content: "A Petrobras anunciou o pagamento de dividendos extraordinários referentes ao resultado do segundo trimestre de 2025.\n\nO valor por ação será de R$ 0,89, com data-base para acionistas registrados até o dia 15 do próximo mês.\n\nAs ações PETR4 reagiram com alta de 2,3% nas primeiras horas de negociação.",
      category: "ENERGIA", isPro: false, readingTime: 3,
      createdAt: new Date(now - 120 * 60000).toISOString(),
    },
  ];
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [drafts, setDrafts] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [publishedToday, setPublishedToday] = useState(3);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    seedIfEmpty();
    const data = getDrafts();
    setDrafts(data);
    setSelected(data[0]);
    setMounted(true);
  }, []);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handlePublish(id: string) {
    const found: Article | undefined = drafts.find(d => d.id === id);
if (!found) return;
    addPublished({ ...found, publishedAt: new Date().toISOString() });
    const remaining = drafts.filter(d => d.id !== id);
    saveDrafts(remaining);
    setDrafts(remaining);
    setPublishedToday(p => p + 1);
    setSelected(remaining[0] || null);
    setEditMode(false);
    showToast("Notícia publicada! Já aparece no site.");
  }

  function handleReject(id: string) {
    const remaining = drafts.filter(d => d.id !== id);
    saveDrafts(remaining);
    setDrafts(remaining);
    setSelected(remaining[0] || null);
    setEditMode(false);
    showToast("Rascunho rejeitado.", "error");
  }

  function handleSaveEdit(id: string) {
    setDrafts(prev => prev.map(d => d.id === id ? { ...d, title: editTitle, summary: editSummary } : d));
    setSelected(prev => prev ? { ...prev, title: editTitle, summary: editSummary } : null);
    setEditMode(false);
    showToast("Edições salvas!");
  }

  function timeAgo(dateStr: string) {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 60) return `Há ${mins} min`;
    return `Há ${Math.floor(mins / 60)}h`;
  }

  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "'DM Sans', sans-serif" }}>

      {toast && (
        <div style={{
          position: "fixed", top: 16, right: 16, zIndex: 100,
          background: toast.type === "success" ? "#1D9E75" : "#E24B4A",
          color: "#fff", padding: "10px 20px", borderRadius: 8,
          fontSize: 14, fontWeight: 500,
        }}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      <header style={{
        background: "var(--bg-nav)", backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid var(--border)",
        padding: "0 24px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "var(--text-primary)" }}>
            Finance<span style={{ color: "var(--accent)" }}>News</span>
          </span>
          <span style={{ fontSize: 11, fontWeight: 500, background: "var(--accent-dim)", color: "var(--accent-text)", padding: "3px 10px", borderRadius: 20 }}>
            Painel Admin
          </span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--text-secondary)" }}>
          <span>📥 <strong style={{ color: "var(--text-primary)" }}>{drafts.length}</strong> aguardando</span>
          <span>✅ <strong style={{ color: "var(--text-primary)" }}>{publishedToday}</strong> publicadas hoje</span>
          <a href="/" style={{ color: "var(--accent-text)", textDecoration: "none" }}>← Ver site</a>
        </div>
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>

        <div style={{ width: 320, flexShrink: 0, borderRight: "0.5px solid var(--border)", overflowY: "auto", background: "var(--bg-secondary)" }}>
          <div style={{ padding: "16px 16px 8px" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Rascunhos para revisar
            </p>
          </div>

          {drafts.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center" }}>
              <p style={{ fontSize: 32, marginBottom: 8 }}>✅</p>
              <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Tudo revisado por hoje!</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Novos rascunhos chegam às 12h e 18h.</p>
            </div>
          ) : (
            drafts.map(draft => (
              <div
                key={draft.id}
                onClick={() => { setSelected(draft); setEditMode(false); }}
                style={{
                  padding: "14px 16px",
                  borderBottom: "0.5px solid var(--border)",
                  cursor: "pointer",
                  background: selected?.id === draft.id ? "var(--bg-card)" : "transparent",
                  borderLeft: selected?.id === draft.id ? "3px solid var(--accent)" : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20, background: "rgba(29,158,117,0.12)", color: "var(--accent-text)" }}>
                    {draft.category}
                  </span>
                  {draft.isPro && (
                    <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20, background: "rgba(83,74,183,0.12)", color: "#534AB7" }}>
                      Pro
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>
                    {timeAgo(draft.createdAt)}
                  </span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)" }}>
                  {draft.title}
                </p>
              </div>
            ))
          )}
        </div>

        {selected ? (
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: "rgba(29,158,117,0.12)", color: "var(--accent-text)" }}>
                {selected.category}
              </span>
              {selected.isPro && (
                <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: "rgba(83,74,183,0.12)", color: "#534AB7" }}>
                  🔒 Pro
                </span>
              )}
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {selected.readingTime} min · Gerado {timeAgo(selected.createdAt)}
              </span>
            </div>

            {editMode ? (
              <textarea
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                style={{ width: "100%", fontSize: 22, fontWeight: 500, lineHeight: 1.3, color: "var(--text-primary)", background: "var(--bg-secondary)", border: "0.5px solid var(--accent)", borderRadius: 8, padding: "10px 14px", fontFamily: "inherit", resize: "none", marginBottom: 12, outline: "none" }}
                rows={3}
              />
            ) : (
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, lineHeight: 1.3, color: "var(--text-primary)", marginBottom: 12 }}>
                {selected.title}
              </h1>
            )}

            <div style={{ background: "var(--bg-secondary)", border: "0.5px solid var(--border)", borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>RESUMO PÚBLICO</p>
              {editMode ? (
                <textarea
                  value={editSummary}
                  onChange={e => setEditSummary(e.target.value)}
                  style={{ width: "100%", fontSize: 14, lineHeight: 1.5, color: "var(--text-primary)", background: "var(--bg-card)", border: "0.5px solid var(--accent)", borderRadius: 6, padding: "8px 10px", fontFamily: "inherit", resize: "none", outline: "none" }}
                  rows={3}
                />
              ) : (
                <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text-secondary)" }}>{selected.summary}</p>
              )}
            </div>

            <div style={{ marginBottom: 100 }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>CONTEÚDO COMPLETO</p>
              {selected.content.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-primary)", marginBottom: 16 }}>
                  {para}
                </p>
              ))}
            </div>

            <div style={{ position: "sticky", bottom: 0, background: "var(--bg-primary)", borderTop: "0.5px solid var(--border)", padding: "16px 0", display: "flex", gap: 10 }}>
              {editMode ? (
                <>
                  <button onClick={() => handleSaveEdit(selected.id)} style={{ flex: 1, padding: "12px", borderRadius: 8, background: "var(--accent)", color: "#fff", border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                    ✓ Salvar edições
                  </button>
                  <button onClick={() => setEditMode(false)} style={{ padding: "12px 20px", borderRadius: 8, background: "transparent", color: "var(--text-secondary)", border: "0.5px solid var(--border)", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handlePublish(selected.id)} style={{ flex: 2, padding: "12px", borderRadius: 8, background: "var(--accent)", color: "#fff", border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                    ✓ Publicar agora
                  </button>
                  <button onClick={() => { setEditTitle(selected.title); setEditSummary(selected.summary); setEditMode(true); }} style={{ flex: 1, padding: "12px", borderRadius: 8, background: "var(--bg-secondary)", color: "var(--text-primary)", border: "0.5px solid var(--border)", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                    ✏ Editar
                  </button>
                  <button onClick={() => handleReject(selected.id)} style={{ padding: "12px 20px", borderRadius: 8, background: "transparent", color: "#E24B4A", border: "0.5px solid #E24B4A", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                    ✕ Rejeitar
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
            <p style={{ fontSize: 32 }}>📋</p>
            <p style={{ fontSize: 15, color: "var(--text-secondary)" }}>Selecione um rascunho para revisar</p>
          </div>
        )}
      </div>
    </div>
  );
}
