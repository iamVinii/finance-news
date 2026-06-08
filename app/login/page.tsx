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
    <div className="min-h-screen bg-primary flex items-center justify-center font-sans p-6">
      <div className="w-full max-w-[380px]">

        <div className="text-center mb-8">
          <span className="font-display text-2xl text-text-primary tracking-tight">
            Finance<span className="text-accent">News</span>
          </span>
          <p className="text-sm text-text-secondary mt-2">
            Acesso restrito ao painel admin
          </p>
        </div>

        <div className="bg-card border-[0.5px] border-border rounded-xl p-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="text-[13px] text-text-secondary block mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@financenews.com"
                className="w-full px-3.5 py-2.5 rounded-lg border-[0.5px] border-border-strong bg-secondary text-text-primary text-sm font-sans outline-none"
              />
            </div>

            <div>
              <label className="text-[13px] text-text-secondary block mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border-[0.5px] border-border-strong bg-secondary text-text-primary text-sm font-sans outline-none"
              />
            </div>

            {error && (
              <p className="text-[13px] text-danger text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`mt-1 py-3 rounded-lg text-[15px] font-medium cursor-pointer font-sans border-none ${
                loading
                  ? "bg-secondary text-text-muted cursor-not-allowed"
                  : "bg-accent text-white hover:opacity-90 transition-opacity"
              }`}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-[13px] text-text-muted mt-5">
          <a href="/" className="text-accent-text no-underline">
            ← Voltar para o site
          </a>
        </p>
      </div>
    </div>
  );
}
