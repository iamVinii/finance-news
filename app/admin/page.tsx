"use client";

import { useAdmin } from "../../hooks/useAdmin";

export default function AdminPage() {
  const {
    mounted, drafts, selected, editMode,
    editTitle, editSummary, editContent, publishedToday, toast,
    setEditTitle, setEditSummary, setEditContent,
    selectDraft, publish, reject,
    startEdit, saveEdit, cancelEdit,
    timeAgo,
  } = useAdmin();

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-primary font-sans">

      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-5 py-2.5 rounded-lg text-sm font-medium text-white ${
          toast.type === "success" ? "bg-accent" : "bg-danger"
        }`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      <header className="sticky top-0 z-50 bg-[var(--bg-nav)] backdrop-blur-md border-b-[0.5px] border-border px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg text-text-primary">
            Finance<span className="text-accent">News</span>
          </span>
          <span className="text-[11px] font-medium bg-accent-dim text-accent-text px-2.5 py-0.5 rounded-full">
            Painel Admin
          </span>
        </div>
        <div className="flex gap-5 text-[13px] text-text-secondary">
          <span>📥 <strong className="text-text-primary">{drafts.length}</strong> aguardando</span>
          <span>✅ <strong className="text-text-primary">{publishedToday}</strong> publicadas hoje</span>
          <a href="/" className="text-accent-text no-underline">&#8592; Ver site</a>
        </div>
      </header>

      <div className="flex h-[calc(100vh-56px)]">

        {/* Lista de rascunhos */}
        <div className="w-80 shrink-0 border-r-[0.5px] border-border overflow-y-auto bg-secondary">
          <div className="px-4 py-4 pb-2">
            <p className="text-[11px] tracking-widest uppercase text-text-muted">
              Rascunhos para revisar
            </p>
          </div>

          {drafts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[32px] mb-2">✅</p>
              <p className="text-sm text-text-secondary">Tudo revisado por hoje!</p>
              <p className="text-xs text-text-muted mt-1">Novos rascunhos chegam às 12h e 18h.</p>
            </div>
          ) : (
            drafts.map(draft => (
              <div
                key={draft.id}
                onClick={() => selectDraft(draft)}
                className={`px-4 py-3.5 border-b-[0.5px] border-border cursor-pointer transition-all ${
                  selected?.id === draft.id
                    ? "bg-card border-l-[3px] border-l-accent"
                    : "border-l-[3px] border-l-transparent hover:bg-card/50"
                }`}
              >
                <div className="flex gap-1.5 mb-1.5 items-center">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-dim text-accent-text">
                    {draft.category}
                  </span>
                  {draft.isPro && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[rgba(83,74,183,0.12)] text-[#534AB7]">
                      Pro
                    </span>
                  )}
                  <span className="text-[11px] text-text-muted ml-auto">
                    {timeAgo(draft.createdAt)}
                  </span>
                </div>
                <p className="text-[13px] font-medium leading-[1.4] text-text-primary">
                  {draft.title}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Preview e ações */}
        {selected ? (
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="flex gap-2 mb-4 items-center">
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-accent-dim text-accent-text">
                {selected.category}
              </span>
              {selected.isPro && (
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[rgba(83,74,183,0.12)] text-[#534AB7]">
                  🔒 Pro
                </span>
              )}
              <span className="text-xs text-text-muted">
                {selected.readingTime} min · Gerado {timeAgo(selected.createdAt)}
              </span>
            </div>

            {editMode ? (
              <textarea
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="w-full text-[22px] font-medium leading-[1.3] text-text-primary bg-secondary border-[0.5px] border-accent rounded-lg p-3.5 font-sans resize-none mb-3 outline-none"
                rows={3}
              />
            ) : (
              <h1 className="font-display text-[26px] font-normal leading-[1.3] text-text-primary mb-3">
                {selected.title}
              </h1>
            )}

            <div className="bg-secondary border-[0.5px] border-border rounded-lg p-4 mb-5">
              <p className="text-[11px] text-text-muted mb-1.5">RESUMO PÚBLICO</p>
              {editMode ? (
                <textarea
                  value={editSummary}
                  onChange={e => setEditSummary(e.target.value)}
                  className="w-full text-sm leading-relaxed text-text-primary bg-card border-[0.5px] border-accent rounded-md p-2.5 font-sans resize-none outline-none"
                  rows={3}
                />
              ) : (
                <p className="text-sm leading-relaxed text-text-secondary">{selected.summary}</p>
              )}
            </div>

            <div className="mb-24">
              <p className="text-[11px] text-text-muted mb-3">CONTEÚDO COMPLETO</p>
              {editMode ? (
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  className="w-full text-[15px] leading-[1.75] text-text-primary bg-secondary border-[0.5px] border-accent rounded-lg p-3.5 font-sans resize-y outline-none min-h-[300px]"
                  rows={12}
                />
              ) : (
                selected.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[15px] leading-[1.75] text-text-primary mb-4">
                    {para}
                  </p>
                ))
              )}
            </div>

            <div className="sticky bottom-0 bg-primary border-t-[0.5px] border-border py-4 flex gap-2.5">
              {editMode ? (
                <>
                  <button
                    onClick={() => saveEdit(selected.id)}
                    className="flex-1 py-3 rounded-lg bg-accent text-white border-none text-sm font-medium cursor-pointer font-sans hover:opacity-90 transition-opacity"
                  >
                    ✓ Salvar edições
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-5 py-3 rounded-lg bg-transparent text-text-secondary border-[0.5px] border-border text-sm cursor-pointer font-sans"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => publish(selected.id)}
                    className="flex-[2] py-3 rounded-lg bg-accent text-white border-none text-sm font-medium cursor-pointer font-sans hover:opacity-90 transition-opacity"
                  >
                    ✓ Publicar agora
                  </button>
                  <button
                    onClick={() => startEdit(selected)}
                    className="flex-1 py-3 rounded-lg bg-secondary text-text-primary border-[0.5px] border-border text-sm cursor-pointer font-sans"
                  >
                    ✏ Editar
                  </button>
                  <button
                    onClick={() => reject(selected.id)}
                    className="px-5 py-3 rounded-lg bg-transparent text-danger border-[0.5px] border-danger text-sm cursor-pointer font-sans"
                  >
                    ✕ Rejeitar
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col gap-2">
            <p className="text-[32px]">📋</p>
            <p className="text-[15px] text-text-secondary">Selecione um rascunho para revisar</p>
          </div>
        )}
      </div>
    </div>
  );
}
