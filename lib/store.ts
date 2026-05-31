export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  isPro: boolean;
  readingTime: number;
  publishedAt: string;
  createdAt: string;
}

const KEY_PUBLISHED = "fn_published";
const KEY_DRAFTS = "fn_drafts";

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

  const now = Date.now();
  saveDrafts([
    {
      id: "d1",
      title: "Banco Central mantém Selic e sinaliza cautela para próxima reunião",
      summary: "A decisão unânime surpreendeu parte do mercado que esperava algum sinal de mudança na trajetória dos juros.",
      content: "O Comitê de Política Monetária (Copom) do Banco Central decidiu, por unanimidade, manter a taxa Selic em 10,75% ao ano.\n\nO BC destacou que o cenário internacional permanece desafiador, com a inflação em economias desenvolvidas ainda acima das metas.\n\nO que isso significa para o investidor brasileiro? Na prática, a Selic estável mantém a renda fixa atrativa.",
      category: "MACROECONOMIA", isPro: false, readingTime: 3,
      publishedAt: "", createdAt: new Date(now - 25 * 60000).toISOString(),
    },
    {
      id: "d2",
      title: "IBGE divulga IPCA de abril acima das expectativas do mercado",
      summary: "O índice registrou alta de 0,61% no mês, puxado principalmente pelo grupo de alimentação e habitação.",
      content: "O IBGE divulgou que o IPCA registrou alta de 0,61% em abril, acima da mediana das expectativas do mercado.\n\nNo acumulado de 12 meses, o IPCA chegou a 4,83%, mantendo-se acima do centro da meta.\n\nOs grupos que mais pressionaram o índice foram alimentação e bebidas (+0,9%) e habitação (+0,7%).",
      category: "MACROECONOMIA", isPro: false, readingTime: 4,
      publishedAt: "", createdAt: new Date(now - 55 * 60000).toISOString(),
    },
    {
      id: "d3",
      title: "CVM aprova novas regras para fundos de investimento em criptoativos",
      summary: "A resolução estabelece requisitos mínimos de transparência e gestão de risco para fundos que investem em Bitcoin.",
      content: "A CVM publicou resolução que estabelece o novo marco regulatório para fundos de investimento com exposição a criptoativos no Brasil.\n\nEntre as principais mudanças estão a obrigatoriedade de custódia qualificada para os ativos digitais.\n\nPara o investidor de varejo, mais regulação significa mais proteção.",
      category: "CRIPTO", isPro: true, readingTime: 5,
      publishedAt: "", createdAt: new Date(now - 90 * 60000).toISOString(),
    },
    {
      id: "d4",
      title: "Petrobras anuncia dividendos extraordinários para o segundo trimestre",
      summary: "A distribuição será de R$ 0,89 por ação, totalizando aproximadamente R$ 11,5 bilhões aos acionistas.",
      content: "A Petrobras anunciou o pagamento de dividendos extraordinários referentes ao resultado do segundo trimestre de 2025.\n\nO valor por ação será de R$ 0,89, com data-base para acionistas registrados até o dia 15.\n\nAs ações PETR4 reagiram com alta de 2,3% nas primeiras horas de negociação.",
      category: "ENERGIA", isPro: false, readingTime: 3,
      publishedAt: "", createdAt: new Date(now - 120 * 60000).toISOString(),
    },
  ]);
}
