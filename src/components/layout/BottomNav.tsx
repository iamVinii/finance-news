"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/",            label: "Início",     icon: "🏠" },
  { href: "/noticias",    label: "Notícias",   icon: "📰" },
  { href: "/indicadores", label: "Mercado",    icon: "📊" },
  { href: "/newsletter",  label: "Newsletter", icon: "✉️" },
  { href: "/conta",       label: "Conta",      icon: "👤" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav">
      {ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
