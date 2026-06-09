import { Article } from "@/types/article";
import { getMockDrafts } from "@/data/mock-articles";

// sessionStorage: limpa automaticamente ao fechar o browser
// localStorage: persiste entre sessões (usado só para preferências como tema)

const KEY_PUBLISHED = "fn_published";
const KEY_DRAFTS = "fn_drafts";

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage;
}

export type { Article };

export function getPublished(): Article[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    return JSON.parse(storage.getItem(KEY_PUBLISHED) || "[]");
  } catch { return []; }
}

export function addPublished(article: Article) {
  const storage = getStorage();
  if (!storage) return;
  const current = getPublished();
  storage.setItem(KEY_PUBLISHED, JSON.stringify([article, ...current]));
}

export function getDrafts(): Article[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    return JSON.parse(storage.getItem(KEY_DRAFTS) || "[]");
  } catch { return []; }
}

export function saveDrafts(drafts: Article[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(KEY_DRAFTS, JSON.stringify(drafts));
}

export function seedIfEmpty() {
  const storage = getStorage();
  if (!storage) return;
  if (getDrafts().length > 0) return;
  saveDrafts(getMockDrafts());
}
