import { useState, useEffect } from "react";
import { Article } from "../types/article";
import { getDrafts, saveDrafts, addPublished, seedIfEmpty } from "../lib/store";

export function useAdmin() {
  const [mounted, setMounted] = useState(false);
  const [drafts, setDrafts] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editContent, setEditContent] = useState("");
  const [publishedToday, setPublishedToday] = useState(0);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    seedIfEmpty();
    const data = getDrafts();
    setDrafts(data);
    setSelected(data[0] || null);
    setMounted(true);
  }, []);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function selectDraft(draft: Article) {
    setSelected(draft);
    setEditMode(false);
  }

  function publish(id: string) {
    const current = getDrafts();
    const found = current.find(d => d.id === id);
    if (!found) return;
    addPublished({ ...found, publishedAt: new Date().toISOString() });
    const remaining = current.filter(d => d.id !== id);
    saveDrafts(remaining);
    setDrafts(remaining);
    setPublishedToday(p => p + 1);
    setSelected(remaining[0] || null);
    setEditMode(false);
    showToast("Notícia publicada! Já aparece no site.");
  }

  function reject(id: string) {
    const current = getDrafts();
    const remaining = current.filter(d => d.id !== id);
    saveDrafts(remaining);
    setDrafts(remaining);
    setSelected(remaining[0] || null);
    setEditMode(false);
    showToast("Rascunho rejeitado.", "error");
  }

  function startEdit(draft: Article) {
    setEditTitle(draft.title);
    setEditSummary(draft.summary);
    setEditContent(draft.content);
    setEditMode(true);
  }

  function saveEdit(id: string) {
    const updated = drafts.map(d =>
      d.id === id ? { ...d, title: editTitle, summary: editSummary, content: editContent } : d
    );
    saveDrafts(updated);
    setDrafts(updated);
    setSelected(prev => prev ? { ...prev, title: editTitle, summary: editSummary, content: editContent } : null);
    setEditMode(false);
    showToast("Edições salvas!");
  }

  function cancelEdit() {
    setEditMode(false);
  }

  function timeAgo(dateStr: string) {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 60) return `Há ${mins} min`;
    return `Há ${Math.floor(mins / 60)}h`;
  }

  return {
    mounted, drafts, selected, editMode,
    editTitle, editSummary, editContent, publishedToday, toast,
    setEditTitle, setEditSummary, setEditContent,
    selectDraft, publish, reject,
    startEdit, saveEdit, cancelEdit,
    timeAgo,
  };
}
