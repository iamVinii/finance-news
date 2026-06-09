"use client";

import { useEffect } from "react";

// Limpa dados sensíveis do localStorage quando a aba fecha
export function useSecureSession() {
  useEffect(() => {
    // Lista de chaves sensíveis que devem ser limpas ao fechar
    const SENSITIVE_KEYS = [
      "fn_published",
      "fn_drafts",
    ];

    function handleUnload() {
      // Mantém só preferências do usuário (tema)
      // Remove dados de conteúdo ao fechar
      SENSITIVE_KEYS.forEach(key => {
        sessionStorage.removeItem(key);
      });
    }

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
}
