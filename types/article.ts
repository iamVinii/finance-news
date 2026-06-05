export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  isPro: boolean;
  readingTime: number;
  publishedAt: string;
  createdAt: string;
}

export type Category =
  | "TODOS"
  | "MACROECONOMIA"
  | "CAMBIO"
  | "BOLSA"
  | "CRIPTO"
  | "INTERNACIONAL"
  | "FISCAL"
  | "ENERGIA"
  | "FUNDOS";
