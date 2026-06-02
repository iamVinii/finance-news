import { getMockDrafts } from "../mocks/mock-articles";
import { Article } from "../types/article";

const KEY_PUBLISHED: string = "fn_published";
const KEY_DRAFTS: string = "fn_drafts";

export function getPublished(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY_PUBLISHED) || "[]");
  } catch { return []; }
}

export function addPublished(article: Article) {
  const current = getPublished();
  localStorage.setItem(KEY_PUBLISHED, JSON.stringify([article, ...current]));
}

export function getDrafts(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY_DRAFTS) || "[]");
  } catch { return []; }
}

export function saveDrafts(drafts: Article[]) {
  localStorage.setItem(KEY_DRAFTS, JSON.stringify(drafts));
}

export function seedIfEmpty() {
  if (typeof window === "undefined") return;
  if (getDrafts().length > 0) return;
  saveDrafts(getMockDrafts());
}
