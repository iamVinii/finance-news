"use client";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Navbar() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "var(--bg-nav)",
      backdropFilter: "blur(12px)",
      borderBottom: "0.5px solid var(--border)",
    }}>
      <nav style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 24px", height: 56,
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 16,
      }}>
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 20, color: "var(--text-primary)", letterSpacing: "-0.5px",
          }}>
            Finance<span style={{ color: "var(--accent)" }}>News</span>
          </span>
        </Link>

        <div className="nav-links-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[
            { href: "/noticias", label: "Notícias" },
            { href: "/analises", label: "Análises" },
            { href: "/indicadores", label: "Indicadores" },
            { href: "/newsletter", label: "Newsletter" },
          ].map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontSize: 14, color: "var(--text-secondary)", textDecoration: "none",
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          <ThemeToggle />
          <Link href="/login" style={{
            fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", padding: "0 12px",
          }}>
            Entrar
          </Link>
          <Link href="/cadastro" style={{
            fontSize: 14, fontWeight: 500,
            background: "var(--accent)", color: "#fff",
            textDecoration: "none", padding: "8px 18px", borderRadius: 8,
          }}>
            Participar — grátis
          </Link>
        </div>
      </nav>
    </header>
  );
}
