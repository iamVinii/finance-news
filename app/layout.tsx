import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceNews — O mercado explicado com clareza",
  description: "Notícias, análises e indicadores econômicos para você tomar decisões mais inteligentes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('fn-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);})();`
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
