"use client";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-nav)] backdrop-blur-md border-b-[0.5px] border-border">
      <nav className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between gap-4">

        <Link href="/" className="no-underline shrink-0">
          <span className="font-display text-xl text-text-primary tracking-tight">
            Finance<span className="text-accent">News</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-7 items-center">
          {[
            { href: "/noticias",    label: "Notícias" },
            { href: "/analises",    label: "Análises" },
            { href: "/indicadores", label: "Indicadores" },
            { href: "/newsletter",  label: "Newsletter" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-2.5 items-center shrink-0">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm text-text-secondary no-underline px-3"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="text-sm font-medium bg-accent text-white no-underline px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Participar — grátis
          </Link>
        </div>
      </nav>
    </header>
  );
}
