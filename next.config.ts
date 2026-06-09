import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        // Impede clickjacking
        { key: "X-Frame-Options", value: "DENY" },
        // Impede sniffing de MIME type
        { key: "X-Content-Type-Options", value: "nosniff" },
        // Força HTTPS
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        // Controla referrer
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        // Desativa features desnecessárias
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        // CSP — Content Security Policy
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval necessário para Next.js dev
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
          ].join("; "),
        },
      ],
    },
  ],

  // Desativa source maps em produção — impede exposição do .tsx
  productionBrowserSourceMaps: false,
};

export default nextConfig;
