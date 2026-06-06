"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 24,
            color: "var(--text-primary)",
            letterSpacing: "-0.5px",
          }}>
            Finance<span style={{ color: "var(--accent)" }}>News</span>
          </span>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8 }}>
            Acesso restrito ao painel admin
          </p>
        </div>

        <div style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: 12,
          padding: "28px 24px",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@financenews.com"
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8,
                  border: "0.5px solid var(--border-strong)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: 14, fontFamily: "inherit", outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8,
                  border: "0.5px solid var(--border-strong)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: 14, fontFamily: "inherit", outline: "none",
                }}
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: "var(--danger)", textAlign: "center" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "var(--bg-secondary)" : "var(--accent)",
                color: loading ? "var(--text-muted)" : "#fff",
                border: "none", borderRadius: 8,
                padding: "12px", fontSize: 15,
                fontWeight: 500, cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit", marginTop: 4,
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", marginTop: 20 }}>
          <a href="/" style={{ color: "var(--accent-text)", textDecoration: "none" }}>
            ← Voltar para o site
          </a>
        </p>
      </div>
    </div>
  );
}
