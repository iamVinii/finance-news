export interface Quote {
  symbol: string;
  price: string;
  changePct: number;
}

export interface Metric {
  name: string;
  value: string;
  change: string;
  up: boolean;
  neutral: boolean;
}

export const QUOTES: Quote[] = [
  { symbol: "IBOV",    price: "131.284",  changePct: 1.2  },
  { symbol: "USD/BRL", price: "R$ 5,82",  changePct: -0.4 },
  { symbol: "SELIC",   price: "10,75%",   changePct: 0    },
  { symbol: "BTC",     price: "$106.200", changePct: 2.1  },
  { symbol: "WTI",     price: "$78,4",    changePct: -0.8 },
  { symbol: "Ouro",    price: "$3.180",   changePct: 0.5  },
  { symbol: "EUR/BRL", price: "R$ 6,31",  changePct: -0.2 },
  { symbol: "IPCA",    price: "4,83%",    changePct: 0    },
];

export const METRICS: Metric[] = [
  { name: "Ibovespa",   value: "131.284",  change: "+1.578 pts", up: true,  neutral: false },
  { name: "Dólar/Real", value: "R$ 5,82",  change: "-0,4% hoje", up: false, neutral: false },
  { name: "Selic",      value: "10,75%",   change: "ao ano",     up: false, neutral: true  },
  { name: "Bitcoin",    value: "$106.200", change: "+2,1% hoje", up: true,  neutral: false },
  { name: "IPCA 12m",   value: "4,83%",    change: "acumulado",  up: false, neutral: true  },
];
